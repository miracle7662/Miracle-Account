import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Lock } from 'lucide-react';

interface HandoverPasswordModalProps {
  show: boolean;
  onVerify: (password: string) => Promise<boolean>;
  onSuccess: () => void;
  onCancel: () => void;
}

const HandoverPasswordModal: React.FC<HandoverPasswordModalProps> = ({
  show,
  onVerify,
  onSuccess,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await onVerify(password);
      if (success) {
        setPassword('');
        onSuccess();
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onCancel();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title className="d-flex align-items-center">
          <Lock size={20} className="me-2" />
          Password Verification Required
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">
          Please re-enter your password to access the page.
        </p>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
        </Button>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HandoverPasswordModal;
