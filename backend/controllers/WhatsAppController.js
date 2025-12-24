// WhatsApp functionality disabled
const fs = require('fs');
const path = require('path');
const multer = require('multer');

let isClientReady = false;

const initializeWhatsApp = () => {
  // WhatsApp client initialization disabled
  return null;
};

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

const sendMessageWithPDF = [
  upload.single('pdf'),
  async (req, res) => {
    res.status(503).json({ error: 'WhatsApp functionality is currently disabled.' });
  }
];

const getQRCode = (req, res) => {
  res.json({
    qr: null,
    ready: false,
    message: 'WhatsApp functionality is currently disabled.'
  });
};

const getStatus = (req, res) => {
  res.json({
    ready: false,
    hasClient: false,
    qrAvailable: false,
    message: 'WhatsApp functionality is currently disabled.'
  });
};

module.exports = {
  initializeWhatsApp,
  sendMessageWithPDF,
  getQRCode,
  getStatus
};
