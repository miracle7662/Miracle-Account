import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { WhatsAppService } from '../services/WhatsAppService';

interface WhatsAppSendButtonProps {
  phone: string;
  pdfBlob: Blob;
  message: string;
  disabled?: boolean;
}

const WhatsAppSendButton: React.FC<WhatsAppSendButtonProps> = ({
  phone,
  pdfBlob,
  message,
  disabled = false,
}) => {
  const [isSending, setIsSending] = useState(false);
  const whatsAppService = WhatsAppService.getInstance();

  const handleSend = async () => {
    if (!phone || !pdfBlob) {
      toast.error('Phone number and PDF are required');
      return;
    }

    setIsSending(true);

    try {
      // Set up status callback
      whatsAppService.setStatusCallback((status) => {
        if (status.status === 'opened') {
          toast.success(status.message);
        } else if (status.status === 'error') {
          toast.error(status.message);
        }
      });

      // Send PDF via WhatsApp
      const success = await whatsAppService.sendPDF(phone, pdfBlob, message);

      if (success) {
        // WhatsApp opened successfully, user needs to attach PDF manually
        toast.info('Please attach the PDF file in WhatsApp and send the message.');
      }
    } catch (error) {
      console.error('Error sending PDF:', error);
      toast.error('Failed to send PDF via WhatsApp');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      onClick={handleSend}
      disabled={disabled || isSending || !phone || !pdfBlob}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        disabled || isSending || !phone || !pdfBlob
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
    >
      {isSending ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
    </button>
  );
};

export default WhatsAppSendButton;
