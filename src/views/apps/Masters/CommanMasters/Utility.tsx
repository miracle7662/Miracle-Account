import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Utility: React.FC = () => {
  const [backupPath, setBackupPath] = useState('');
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const [backupStatus, setBackupStatus] = useState('');
  const [restoreStatus, setRestoreStatus] = useState('');
  const [isBackupLoading, setIsBackupLoading] = useState(false);
  const [isRestoreLoading, setIsRestoreLoading] = useState(false);

  const handleChooseLocation = async () => {
    try {
      const result = await (window as any).electronAPI.showSaveDialog({
        title: 'Choose Backup Location',
        defaultPath: 'database_backup.db',
        filters: [
          { name: 'Database Files', extensions: ['db'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (!result.canceled && result.filePath) {
        setBackupPath(result.filePath);
      }
    } catch (error) {
      console.error('Error opening save dialog:', error);
      toast.error('Failed to open save dialog');
    }
  };

  const handleBackup = async () => {
    if (!backupPath.trim()) {
      toast.error('Please enter a backup path');
      return;
    }

    setIsBackupLoading(true);
    setBackupStatus('Backing up database...');

    try {
      const response = await axios.post('http://localhost:3001/api/backup-restore/backup', {
        backupPath: backupPath.trim()
      });

      if (response.data.success) {
        setBackupStatus('Backup completed successfully!');
        toast.success('Database backup completed successfully!');
      } else {
        setBackupStatus('Backup failed: ' + response.data.message);
        toast.error('Backup failed: ' + response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setBackupStatus('Backup failed: ' + errorMessage);
      toast.error('Backup failed: ' + errorMessage);
    } finally {
      setIsBackupLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!restoreFile) {
      toast.error('Please select a backup file to restore');
      return;
    }

    setIsRestoreLoading(true);
    setRestoreStatus('Restoring database...');

    const formData = new FormData();
    formData.append('backupFile', restoreFile);

    try {
      const response = await axios.post('http://localhost:3001/api/backup-restore/restore', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setRestoreStatus('Restore completed successfully! Please restart the application.');
        toast.success('Database restore completed successfully! Please restart the application.');
      } else {
        setRestoreStatus('Restore failed: ' + response.data.message);
        toast.error('Restore failed: ' + response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setRestoreStatus('Restore failed: ' + errorMessage);
      toast.error('Restore failed: ' + errorMessage);
    } finally {
      setIsRestoreLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRestoreFile(file);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Utility - Database Backup & Restore</h3>

      <div className="row">
        {/* Backup Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Database Backup</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="backupPath" className="form-label">Backup File Path</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="backupPath"
                    placeholder="e.g., C:\backups\database_backup.db"
                    value={backupPath}
                    onChange={(e) => setBackupPath(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleChooseLocation}
                  >
                    Choose Location
                  </button>
                </div>
                <small className="form-text text-muted">
                  Enter the full path where you want to save the backup file or click "Choose Location"
                </small>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleBackup}
                disabled={isBackupLoading}
              >
                {isBackupLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Backing up...
                  </>
                ) : (
                  'Backup Database'
                )}
              </button>
              {backupStatus && (
                <div className={`alert mt-3 ${backupStatus.includes('failed') ? 'alert-danger' : 'alert-success'}`}>
                  {backupStatus}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Restore Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Database Restore</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="restoreFile" className="form-label">Select Backup File</label>
                <input
                  type="file"
                  className="form-control"
                  id="restoreFile"
                  accept=".db"
                  onChange={handleFileChange}
                />
                <small className="form-text text-muted">
                  Select the backup file (.db) to restore from
                </small>
              </div>
              <button
                className="btn btn-warning w-100"
                onClick={handleRestore}
                disabled={isRestoreLoading || !restoreFile}
              >
                {isRestoreLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Restoring...
                  </>
                ) : (
                  'Restore Database'
                )}
              </button>
              {restoreStatus && (
                <div className={`alert mt-3 ${restoreStatus.includes('failed') ? 'alert-danger' : 'alert-success'}`}>
                  {restoreStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Important Notes</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-info-circle text-info me-2"></i>
                  <strong>Backup:</strong> Creates a copy of the current database to the specified location.
                </li>
                <li className="mb-2">
                  <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                  <strong>Restore:</strong> Replaces the current database with the selected backup. This action cannot be undone.
                </li>
                <li className="mb-2">
                  <i className="fas fa-power-off text-danger me-2"></i>
                  <strong>Restart Required:</strong> After restore, please restart the application for changes to take effect.
                </li>
                <li className="mb-2">
                  <i className="fas fa-shield-alt text-success me-2"></i>
                  <strong>Security:</strong> Ensure backup files are stored securely and regularly backed up.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utility;
