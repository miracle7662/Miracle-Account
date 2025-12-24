import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'react-hot-toast';

interface WhatsAppAuthModalProps {
  show: boolean;
  onHide: () => void;
  onAuthenticated?: () => void;
}

const WhatsAppAuthModal: React.FC<WhatsAppAuthModalProps> = ({
  show,
  onHide,
  onAuthenticated
}) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [, setIsReady] = useState(false);
  const [message, setMessage] = useState('Initializing WhatsApp...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQRCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/whatsapp/qr');
      const data = await response.json();

      setQrCode(data.qr);
      setIsReady(data.ready);
      setMessage(data.message);
      setError(null);
      setIsLoading(false);

      if (data.ready) {
        toast.success('WhatsApp is ready!');
        onAuthenticated?.();
        onHide();
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
      setError('Couldn\'t link device. Try again later. Please show message: mobile WhatsApp linked device');
      setMessage('Failed to connect to WhatsApp service');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      setIsLoading(true);
      setQrCode(null);
      setIsReady(false);
      setMessage('Initializing WhatsApp...');
      fetchQRCode();

      // Poll for status updates every 3 seconds
      const interval = setInterval(fetchQRCode, 3000);

      return () => clearInterval(interval);
    }
  }, [show]);

  const handleRetry = () => {
    setIsLoading(true);
    setQrCode(null);
    setIsReady(false);
    setMessage('Reinitializing WhatsApp...');
    fetchQRCode();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>WhatsApp Authentication</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        {isLoading ? (
          <div className="mb-4">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>{message}</p>
          </div>
        ) : qrCode ? (
          <div className="mb-4">
            <Alert variant="info">
              <strong>Step 1:</strong> Open WhatsApp on your phone<br />
              <strong>Step 2:</strong> Go to Settings → Linked Devices<br />
              <strong>Step 3:</strong> Tap "Link a Device"<br />
              <strong>Step 4:</strong> Scan the QR code below
            </Alert>

            <div className="d-flex justify-content-center mb-3">
              <QRCodeCanvas
                value={qrCode}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>

            <p className="text-muted small">
              {message}
            </p>

            <Button variant="outline-secondary" size="sm" onClick={handleRetry}>
              Refresh QR Code
            </Button>
          </div>
        ) : (
          <div className="mb-4">
            {error ? (
              <Alert variant="danger">
                <strong>Device Linking Failed</strong><br />
                {error}
              </Alert>
            ) : (
              <Alert variant="warning">
                {message}
              </Alert>
            )}

            <Button variant="primary" onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WhatsAppAuthModal;
