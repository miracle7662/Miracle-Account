const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../config/db');

// Configure multer for file uploads
const upload = multer({
  dest: 'backend/uploads/temp/', // Temporary upload directory
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.db') {
      cb(null, true);
    } else {
      cb(new Error('Only .db files are allowed'));
    }
  }
});

// Backup database
exports.backupDatabase = async (req, res) => {
    try {
        const { backupPath } = req.body;

        if (!backupPath) {
            return res.status(400).json({ message: 'Backup path is required' });
        }

        // Get the database file path
        const dbPath = db.name; // This gets the database file path

        // Check if database file exists
        if (!fs.existsSync(dbPath)) {
            return res.status(404).json({ message: 'Database file not found' });
        }

        // Ensure backup directory exists
        const backupDir = path.dirname(backupPath);
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        // Copy database file to backup location
        fs.copyFileSync(dbPath, backupPath);

        // Also backup any related files (like -wal, -shm files for SQLite)
        const dbDir = path.dirname(dbPath);
        const dbBaseName = path.basename(dbPath, '.db');

        const walFile = path.join(dbDir, `${dbBaseName}.db-wal`);
        const shmFile = path.join(dbDir, `${dbBaseName}.db-shm`);

        if (fs.existsSync(walFile)) {
            const backupWalPath = `${backupPath}-wal`;
            fs.copyFileSync(walFile, backupWalPath);
        }

        if (fs.existsSync(shmFile)) {
            const backupShmPath = `${backupPath}-shm`;
            fs.copyFileSync(shmFile, backupShmPath);
        }

        res.json({
            success: true,
            message: 'Database backup completed successfully',
            backupPath: backupPath
        });

    } catch (error) {
        console.error('Backup error:', error);
        res.status(500).json({
            success: false,
            message: 'Backup failed',
            error: error.message
        });
    }
};

// Restore database with file upload
exports.restoreDatabase = [
  upload.single('backupFile'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Backup file is required' });
      }

      const tempFilePath = req.file.path;
      const dbPath = db.name;

      // Close database connection before restore
      db.close();

      // Copy uploaded file to database location
      fs.copyFileSync(tempFilePath, dbPath);

      // Clean up temp file
      fs.unlinkSync(tempFilePath);

      // Note: In a real application, you might need to restart the application
      // or handle reconnection properly

      res.json({
        success: true,
        message: 'Database restore completed successfully. Please restart the application.',
        restoredFile: req.file.originalname
      });

    } catch (error) {
      console.error('Restore error:', error);
      // Clean up temp file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({
        success: false,
        message: 'Restore failed',
        error: error.message
      });
    }
  }
];

// Get database info
exports.getDatabaseInfo = (req, res) => {
    try {
        const dbPath = db.name;
        const stats = fs.statSync(dbPath);

        res.json({
            databasePath: dbPath,
            size: stats.size,
            modified: stats.mtime,
            created: stats.birthtime
        });

    } catch (error) {
        console.error('Error getting database info:', error);
        res.status(500).json({
            message: 'Failed to get database info',
            error: error.message
        });
    }
};
