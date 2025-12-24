import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-hot-toast";
import axios from "axios";

interface CashBookEntry {
  CashBookID?: number;
  TransactionDate: string;
  VoucherNumber?: string;
  TransactionType: string;
  PaymentMode: string;
  CashBankID?: number;
  CashBankIDName?: string;
  OppBankID?: number;
  OppBankIDName?: string;
  Amount: number;
  Description?: string;
}

interface CashBookPreviewProps {
  show: boolean;
  onHide: () => void;
  entry: CashBookEntry | null;
}

const CashBookPreview: React.FC<CashBookPreviewProps> = ({
  show,
  onHide,
  entry,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [, setPdfBlob] = useState<Blob | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('/api/companymaster');
        if (response.data && response.data.length > 0) {
          setCompany(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchCompany();
  }, []);

  /* -------------------- PRINT -------------------- */
  const handlePrint = () => {
    if (!previewRef.current) return;

    const printWindow = window.open("", "_blank", "width=560,height=794");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Cash Book Receipt</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Noto Sans Devanagari', sans-serif; }
          </style>
        </head>
        <body>${previewRef.current.innerHTML}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  /* -------------------- PDF -------------------- */
  const generatePDFBlob = async (): Promise<Blob | null> => {
    if (!previewRef.current) return null;

    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");

      const width = 148;
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      const blob = pdf.output("blob");
      setPdfBlob(blob);
      return blob;
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("PDF Error");
      return null;
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);

    const blob = await generatePDFBlob();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CashBook_${entry?.VoucherNumber || 'Receipt'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("PDF Generated and Downloaded");
    }

    setIsGeneratingPDF(false);
  };

  /* -------------------- WHATSAPP SHARE -------------------- */
  const handleShareWhatsApp = async () => {
    setIsSharingWhatsApp(true);

    try {
      const blob = await generatePDFBlob();
      if (!blob) {
        throw new Error("Failed to generate PDF");
      }

      const formData = new FormData();
      formData.append('pdf', blob, `CashBook_${entry?.VoucherNumber || 'Receipt'}.pdf`);
      formData.append('phoneNumber', company?.mobile1 || '8888985373');
      formData.append('message', `Here is your cash book receipt: ${entry?.VoucherNumber}`);

      const response = await fetch('http://localhost:3001/api/whatsapp/send-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Receipt sent via WhatsApp successfully!");
      } else {
        throw new Error(result.error || "Failed to send WhatsApp message");
      }
    } catch (error) {
      console.error("WhatsApp sharing error:", error);
      toast.error("Failed to share via WhatsApp. Please ensure WhatsApp is authenticated.");
    }

    setIsSharingWhatsApp(false);
  };

  if (!entry) return null;

  /* -------------------- REUSABLE STYLES -------------------- */
  const th = {
    border: "1px solid #ccc",
    padding: "8px",
    fontWeight: "bold",
    textAlign: "center" as const,
    background: "#eaeaea",
  };
  console.log('company data in cashbook preview:', th);

  const td = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center" as const,
  };

  const tdBold = {
    ...td,
    fontWeight: "bold",
    background: "#f0f0f0",
  };

  // Transaction type colors
  const getTransactionColor = (type: string) => {
    return type === "Receipt" ? "#28a745" : "#dc3545";
  };

  const getTransactionBg = (type: string) => {
    return type === "Receipt" ? "#d4edda" : "#f8d7da";
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Cash Book Receipt Preview</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          ref={previewRef}
          style={{
            width: "148mm",
            minHeight: "210mm",
            margin: "0 auto",
            padding: "8mm",
            border: "1px solid #ccc",
            background: "white",
            fontSize: "12px",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            lineHeight: 1.3,
          }}
        >
          {/* ================= HEADER ================= */}
          <div
            style={{
              backgroundColor: "white",
              padding: "2px",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* ---------- LEFT SIDE LOGO ---------- */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
             
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "10px",
                }}
              >
                <img
                  src={
                    company?.companylogo
                      ? `http://localhost:3001/uploads/company_logos/${company.companylogo}`
                      : "http://localhost:3001/logo.png"
                  }
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  alt="Logo"
                />
              </div>

              {/* ---------- CENTER COMPANY NAME ---------- */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", marginBottom: "2px" }}>{company?.company_title || "Company Title"}</div>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "2px" }}>
                  {company?.company_name || "Company Name"}
                </div>
                <div style={{ fontSize: "12px", color: "#555" }}>
                  {company?.company_address || "Company Address"}
                </div>
              </div>

              {/* ---------- RIGHT SIDE PERSON TABLE ---------- */}
              <div
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                  fontSize: "10px",
                
                  background: "white",
                }}
              >
                <table
                  style={{
                    borderCollapse: "collapse",
                    textAlign: "center",
                    fontSize: "10px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                       
                          padding: "3px 6px",
                          fontWeight: "bold",
                          background: "#f8f8f8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company?.Name1 || "Person 1"}
                      </th>
                      <th
                        style={{
                         
                          padding: "3px 6px",
                          fontWeight: "bold",
                          background: "#f8f8f8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company?.Name2 || "Person 2"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          
                          padding: "3px 6px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company?.mobile1 || "8888985373"}
                      </td>
                      <td
                        style={{
                       
                          padding: "3px 6px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company?.mobile2 || "9604851485"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <hr />

          {/* ================= RECEIPT/PAYMENT HEADER ================= */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "10px",
              border: `2px solid ${getTransactionColor(entry.TransactionType)}`,
              borderRadius: "8px",
              backgroundColor: getTransactionBg(entry.TransactionType),
            }}
          >
            <h2
              style={{
                color: getTransactionColor(entry.TransactionType),
                margin: "0",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {entry.TransactionType.toUpperCase()} RECEIPT
            </h2>
            <div style={{ fontSize: "14px", marginTop: "5px" }}>
              Voucher No: {entry.VoucherNumber || "N/A"}
            </div>
          </div>

          {/* ================= TRANSACTION DETAILS ================= */}
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ ...tdBold, width: "30%" }}>Date:</td>
                  <td style={td}>{entry.TransactionDate}</td>
                </tr>
                <tr>
                  <td style={tdBold}>Transaction Type:</td>
                  <td style={{ ...td, color: getTransactionColor(entry.TransactionType), fontWeight: "bold" }}>
                    {entry.TransactionType}
                  </td>
                </tr>
                <tr>
                  <td style={tdBold}>Payment Mode:</td>
                  <td style={td}>{entry.PaymentMode}</td>
                </tr>
                <tr>
                  <td style={tdBold}>Cash/Bank Account:</td>
                  <td style={td}>{entry.CashBankIDName || "N/A"}</td>
                </tr>
                {entry.OppBankIDName && (
                  <tr>
                    <td style={tdBold}>Opposite Account:</td>
                    <td style={td}>{entry.OppBankIDName}</td>
                  </tr>
                )}
                <tr>
                  <td style={tdBold}>Amount:</td>
                  <td style={{ ...td, fontSize: "18px", fontWeight: "bold", color: getTransactionColor(entry.TransactionType) }}>
                    ₹ {entry.Amount.toFixed(2)}
                  </td>
                </tr>
                {entry.Description && (
                  <tr>
                    <td style={tdBold}>Description:</td>
                    <td style={td}>{entry.Description}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= AMOUNT IN WORDS ================= */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <strong>Amount in Words:</strong> {entry.Amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace('₹', 'Rupees ')}
          </div>

          {/* ================= SIGNATURE SECTION ================= */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
              paddingTop: "20px",
              borderTop: "1px solid #ccc",
            }}
          >
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ marginBottom: "40px", borderBottom: "1px solid #ccc", width: "150px", margin: "0 auto" }}></div>
              <div>Receiver's Signature</div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ marginBottom: "40px", borderBottom: "1px solid #ccc", width: "150px", margin: "0 auto" }}></div>
              <div>Authorized Signature</div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "10px",
              color: "#666",
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
            }}
          >
            This is a computer generated receipt. No signature required.
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          Print
        </Button>
        <Button
          variant="success"
          onClick={handleGeneratePDF}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? "Generating..." : "PDF"}
        </Button>
        <Button
          variant="info"
          onClick={handleShareWhatsApp}
          disabled={isSharingWhatsApp}
        >
          {isSharingWhatsApp ? "Sharing..." : "WhatsApp"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CashBookPreview;
