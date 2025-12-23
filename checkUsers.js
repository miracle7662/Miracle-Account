import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
const dbPath = path.join(__dirname, 'backend', 'config', 'miresto.db');
const db = new Database(dbPath);

console.log('🔍 Checking all users in the database...\n');

try {
    // Query all users with their details
    const users = db.prepare(`
        SELECT 
            u.userid,
            u.username,
            u.email,
            u.password,
            u.full_name,
            u.role_level,
            u.is_active,
            u.brand_id,
            u.hotel_id,
            u.parent_user_id,
            b.hotel_name as brand_name,
            h.hotel_name as hotel_name
        FROM mst_users u
        LEFT JOIN HotelMasters b ON u.brand_id = b.Hotelid
        LEFT JOIN HotelMasters h ON u.hotel_id = h.Hotelid
        ORDER BY u.userid
    `).all();

    console.log(`Found ${users.length} users:\n`);
    
    users.forEach((user, index) => {
        console.log(`${index + 1}. User ID: ${user.userid}`);
        console.log(`   Username: ${user.username || 'N/A'}`);
        console.log(`   Email: ${user.email || 'N/A'}`);
        console.log(`   Password: ${user.password ? '***' + user.password.slice(-4) : 'N/A'}`);
        console.log(`   Full Name: ${user.full_name || 'N/A'}`);
        console.log(`   Role: ${user.role_level || 'N/A'}`);
        console.log(`   Active: ${user.is_active ? 'Yes' : 'No'}`);
        console.log(`   Brand ID: ${user.brand_id || 'N/A'}`);
        console.log(`   Hotel ID: ${user.hotel_id || 'N/A'}`);
        console.log(`   Brand Name: ${user.brand_name || 'N/A'}`);
        console.log(`   Hotel Name: ${user.hotel_name || 'N/A'}`);
        console.log(`   Parent User ID: ${user.parent_user_id || 'N/A'}`);
        console.log('   ---');
    });

} catch (error) {
    console.error('❌ Error checking users:', error);
} finally {
    db.close();
} 