const db = require('../config/db');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Email transporter configuration (update with your email service)
const emailTransporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send email OTP
exports.sendEmailOTP = async (req, res) => {
    try {
        const { email, type = 'email_verification' } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user exists for verification types
        if (type === 'login_otp') {
            const user = db.prepare('SELECT userid FROM mst_users WHERE email = ? AND status = 1').get(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        }

        // Check rate limiting (max 3 attempts per hour per email)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const recentAttempts = db.prepare(`
            SELECT COUNT(*) as count FROM otp_verifications
            WHERE email = ? AND created_at > ?
        `).get(email, oneHourAgo);

        if (recentAttempts.count >= 3) {
            return res.status(429).json({ message: 'Too many OTP requests. Please try again later.' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store OTP in database
        const stmt = db.prepare(`
            INSERT INTO otp_verifications (email, otp_code, otp_type, expires_at)
            VALUES (?, ?, ?, ?)
        `);
        stmt.run(email, otp, type, expiresAt.toISOString());

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: `Your OTP Code - ${type.replace('_', ' ').toUpperCase()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Your OTP Code</h2>
                    <p>Your one-time password is:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #007bff; padding: 10px; border: 2px solid #007bff; text-align: center; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                </div>
            `
        };

        await emailTransporter.sendMail(mailOptions);

        res.json({
            message: 'OTP sent successfully to your email',
            expires_in: '10 minutes'
        });

    } catch (error) {
        console.error('Send email OTP error:', error);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
};

// Send mobile OTP (using Twilio or similar service)
exports.sendMobileOTP = async (req, res) => {
    try {
        const { phone, type = 'phone_verification' } = req.body;

        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required' });
        }

        // Validate phone format (basic validation)
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }

        // Check if user exists for verification types
        if (type === 'login_otp') {
            const user = db.prepare('SELECT userid FROM mst_users WHERE phone = ? AND status = 1').get(phone);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        }

        // Check rate limiting (max 3 attempts per hour per phone)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const recentAttempts = db.prepare(`
            SELECT COUNT(*) as count FROM otp_verifications
            WHERE phone = ? AND created_at > ?
        `).get(phone, oneHourAgo);

        if (recentAttempts.count >= 3) {
            return res.status(429).json({ message: 'Too many OTP requests. Please try again later.' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store OTP in database
        const stmt = db.prepare(`
            INSERT INTO otp_verifications (phone, otp_code, otp_type, expires_at)
            VALUES (?, ?, ?, ?)
        `);
        stmt.run(phone, otp, type, expiresAt.toISOString());

        // Send SMS using Twilio (you'll need to install twilio package)
        // const twilio = require('twilio');
        // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        //
        // await client.messages.create({
        //     body: `Your OTP code is: ${otp}. Valid for 10 minutes.`,
        //     from: process.env.TWILIO_PHONE_NUMBER,
        //     to: phone
        // });

        // For now, just log the OTP (replace with actual SMS sending)
        console.log(`📱 SMS OTP for ${phone}: ${otp}`);

        res.json({
            message: 'OTP sent successfully to your mobile',
            expires_in: '10 minutes'
        });

    } catch (error) {
        console.error('Send mobile OTP error:', error);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, phone, otp_code, type } = req.body;

        if (!otp_code) {
            return res.status(400).json({ message: 'OTP code is required' });
        }

        if (!email && !phone) {
            return res.status(400).json({ message: 'Email or phone is required' });
        }

        // Find the latest unused OTP
        let otpRecord;
        if (email) {
            otpRecord = db.prepare(`
                SELECT * FROM otp_verifications
                WHERE email = ? AND otp_type = ? AND is_used = 0
                ORDER BY created_at DESC LIMIT 1
            `).get(email, type);
        } else {
            otpRecord = db.prepare(`
                SELECT * FROM otp_verifications
                WHERE phone = ? AND otp_type = ? AND is_used = 0
                ORDER BY created_at DESC LIMIT 1
            `).get(phone, type);
        }

        if (!otpRecord) {
            return res.status(400).json({ message: 'No valid OTP found. Please request a new one.' });
        }

        // Check if OTP is expired
        if (new Date() > new Date(otpRecord.expires_at)) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Check attempts
        if (otpRecord.attempts >= otpRecord.max_attempts) {
            return res.status(400).json({ message: 'Maximum verification attempts exceeded. Please request a new OTP.' });
        }

        // Verify OTP
        if (otpRecord.otp_code !== otp_code) {
            // Increment attempts
            db.prepare('UPDATE otp_verifications SET attempts = attempts + 1 WHERE otp_id = ?').run(otpRecord.otp_id);
            return res.status(400).json({ message: 'Invalid OTP code' });
        }

        // Mark OTP as used
        db.prepare('UPDATE otp_verifications SET is_used = 1 WHERE otp_id = ?').run(otpRecord.otp_id);

        // Handle different OTP types
        let response = { message: 'OTP verified successfully' };

        if (type === 'email_verification' && email) {
            // Update user email verification status
            db.prepare('UPDATE mst_users SET email_verified = 1 WHERE email = ?').run(email);
            response.user_updated = 'email_verified';
        } else if (type === 'phone_verification' && phone) {
            // Update user phone verification status
            db.prepare('UPDATE mst_users SET phone_verified = 1 WHERE phone = ?').run(phone);
            response.user_updated = 'phone_verified';
        } else if (type === 'login_otp') {
            // For login OTP, return user info for authentication
            let user;
            if (email) {
                user = db.prepare('SELECT * FROM mst_users WHERE email = ? AND status = 1').get(email);
            } else {
                user = db.prepare('SELECT * FROM mst_users WHERE phone = ? AND status = 1').get(phone);
            }

            if (user) {
                // Create JWT token
                const token = jwt.sign(
                    {
                        userid: user.userid,
                        username: user.username,
                        role_level: user.role_level,
                        email: user.email
                    },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                response.token = token;
                response.user = {
                    userid: user.userid,
                    username: user.username,
                    full_name: user.full_name,
                    email: user.email,
                    role_level: user.role_level
                };
            }
        }

        res.json(response);

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email, phone, type } = req.body;

        if (!email && !phone) {
            return res.status(400).json({ message: 'Email or phone is required' });
        }

        // Mark previous OTPs as used
        if (email) {
            db.prepare('UPDATE otp_verifications SET is_used = 1 WHERE email = ? AND otp_type = ? AND is_used = 0').run(email, type);
        } else {
            db.prepare('UPDATE otp_verifications SET is_used = 1 WHERE phone = ? AND otp_type = ? AND is_used = 0').run(phone, type);
        }

        // Call the appropriate send function
        if (email) {
            req.body.type = type;
            return exports.sendEmailOTP(req, res);
        } else {
            req.body.type = type;
            return exports.sendMobileOTP(req, res);
        }

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
