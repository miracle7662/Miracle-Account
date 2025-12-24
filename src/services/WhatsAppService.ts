import { toast } from 'react-toastify';

declare global {
  interface Window {
    whatsappAPI: {
      sendPDF: (phone: string, arrayBuffer: ArrayBuffer, message: string) => Promise<{ success: boolean; error?: string }>;
      onStatus: (callback: (event: any, status: any) => void) => void;
    };
  }
}

export class WhatsAppService {
  private static instance: WhatsAppService;
  private statusCallback?: (status: any) => void;

  private constructor() {
    // Listen for status updates from main process
    if (window.whatsappAPI) {
      window.whatsappAPI.onStatus((event, status) => {
        if (this.statusCallback) {
          this.statusCallback(status);
        }
      });
    }
  }

  static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  setStatusCallback(callback: (status: any) => void) {
    this.statusCallback = callback;
  }

async sendPDF(phone: string, pdfBlob: Blob, message: string): Promise<boolean> {
  try {
    // Convert blob to ArrayBuffer
    const arrayBuffer = await pdfBlob.arrayBuffer();

    // Call the exposed API
    const result = await window.whatsappAPI.sendPDF(phone, arrayBuffer, message);

    if (result.success) {
      toast.success('WhatsApp खुल गया। PDF paste हो गया। ENTER दबाकर भेजें।');
      return true;
    } else {
      toast.error(`PDF भेजने में विफल: ${result.error}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending PDF:', error);
    toast.error('WhatsApp पर PDF भेजने में त्रुटि');
    return false;
  }
}
}
