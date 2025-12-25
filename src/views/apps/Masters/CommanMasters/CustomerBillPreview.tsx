import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from '@/common/context';

interface CustomerBillLineItem {
  id?: number;
  farmerId?: number;
  farmerName: string;
  itemName: string;
  qty: number;
  customerAmt: number;
  commission: number;
  farmerAmt: number;
}
interface CustomerBillHeader {
  BillID?: number;
  custBillNumber: string;
  CustomerName: string;
  customerAddress?: string;
  CustomerNo?: number;
  BillDate: string;
  TotalItems: number;
  TotalCustomerAmt: number;
  TotalCommission: number;
  Created_by_id?: number;
  Updated_date?: string;
  StatusCode?: number;
  previousDate?: string;
  previousBalance?: number;
  previousAdvance?: number;
  depositCash?: number;
  totaldiscount?: number;
  discount?: number;
  totalExpense?: number;
  totalBill?: number;
  finalBalance?: number;
}
interface CustomerBillPreviewProps {
  show: boolean;
  onHide: () => void;
  bill: CustomerBillHeader | null;
  items: CustomerBillLineItem[];
}

interface Customer {
  LedgerId?: string;
  LedgerNo: string;
  CustomerNo?: string;
  FarmerNo?: string;
  Name: string;
  MarathiName?: string;
  address: string;
  state_id?: string;
  state?: string;
  cityid?: string;
  city?: string;
  MobileNo: string;
  PhoneNo?: string;
  GstNo?: string;
  PanNo?: string;
  OpeningBalance: string;
  OpeningBalanceDate?: string;
  AccountTypeId?: string;
  AccountType: string;
  Status: number;
}
const CustomerBillPreview: React.FC<CustomerBillPreviewProps> = ({
  show,
  onHide,
  bill,
  items,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [, setPdfBlob] = useState<Blob | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState<any>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { user } = useAuthContext();

  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (user?.companyid) {
          const response = await axios.get(`/api/companymaster/${user.companyid}`);
          setCompany(response.data);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchCompany();
  }, [user?.companyid]);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (bill?.CustomerNo) {
        try {
          const response = await axios.get(`/api/mandi-ledger/customer/${bill.CustomerNo}`);
          setCustomer(response.data);
        } catch (error) {
          console.error('Error fetching customer data:', error);
          setCustomer(null);
        }
      } else {
        setCustomer(null);
      }
    };
    fetchCustomer();
  }, [bill?.CustomerNo]);

  const calculateTotals = () => {
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalCustomerAmt = items.reduce(
      (sum, item) => sum + item.customerAmt * item.qty,
      0
    );
    const totalCommission = items.reduce(
      (sum, item) => sum + item.commission * item.qty,
      0
    );
    const totalLineTotal = totalCustomerAmt + totalCommission;

    return {
      totalItems,
      totalCustomerAmt,
      totalCommission,
      totalLineTotal,
    };
  };

  const { totalItems, totalCustomerAmt,  } =
    calculateTotals();

  const adjustedTotal = (bill?.TotalCustomerAmt || 0) - (bill?.totaldiscount || 0) + (bill?.totalExpense || 0);

  /* -------------------- PRINT -------------------- */
  const handlePrint = () => {
    if (!previewRef.current) return;

    const printWindow = window.open("", "_blank", "width=560,height=794");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Customer Bill</title>
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

    // Temporarily remove sticky positioning for accurate PDF capture
    const headerDiv = previewRef.current.firstElementChild as HTMLElement;
    const originalPosition = headerDiv?.style.position || '';
    if (headerDiv) headerDiv.style.position = 'static';

    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const width = 148;
      const height = (canvas.height * width) / canvas.width;

      const pdf = new jsPDF("p", "mm", [width, height]);

      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      const blob = pdf.output("blob");
      setPdfBlob(blob);
      return blob;
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("PDF Error");
      return null;
    } finally {
      // Restore original position
      if (headerDiv) headerDiv.style.position = originalPosition;
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);

    const blob = await generatePDFBlob();
    if (blob) {
      // Auto-download the PDF
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Bill_${bill?.custBillNumber || 'Invoice'}.pdf`;
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
    if (!bill?.CustomerNo) {
      toast.error("Customer phone number is required for WhatsApp sharing");
      return;
    }

    setIsSharingWhatsApp(true);

    try {
      const blob = await generatePDFBlob();
      if (!blob) {
        throw new Error("Failed to generate PDF");
      }

      const formData = new FormData();
      formData.append('pdf', blob, `Bill_${bill.custBillNumber || 'Invoice'}.pdf`);
      formData.append('phoneNumber', bill.CustomerNo.toString());
      formData.append('message', `Here is your bill: ${bill.custBillNumber}`);

      const response = await fetch('http://localhost:3001/api/whatsapp/send-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Bill sent via WhatsApp successfully!");
      } else {
        throw new Error(result.error || "Failed to send WhatsApp message");
      }
    } catch (error) {
      console.error("WhatsApp sharing error:", error);
      toast.error("Failed to share via WhatsApp. Please ensure WhatsApp is authenticated.");
    }

    setIsSharingWhatsApp(false);
  };



  if (!bill) return null;

  /* -------------------- REUSABLE STYLES -------------------- */
  const th = {
    border: "1px solid #ccc",
    padding: "8px",
    fontWeight: "bold",
    textAlign: "center" as const,
    background: "#eaeaea",
  };

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

  // Column widths
  const colWidths = {
    srNo: "9%",
    farmerName: "50%",
    qty: "10%",
    rate: "15%",
    amount: "15%",
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Customer Bill </Modal.Title>
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
          {/* ================= HEADER ================= */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
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
                        {company?.Name1 || ""}
                      </th>
                      <th
                        style={{

                          padding: "3px 6px",
                          fontWeight: "bold",
                          background: "#f8f8f8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company?.Name2 || ""}
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
                        {company?.mobile1 || ""}
                      </td>
                      <td
                        style={{

                          padding: "3px 6px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company?.mobile2 || ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
          <hr />

          {/* ================= BILL INFO & CUSTOMER INFO ================= */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontSize: "13px",
            }}
          >
            {/* Left Side: Customer Name, Address, and Mo No */}
            <div style={{ textAlign: "left", flex: 1 }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Customer Name: {bill.CustomerName}
                </div>

                <div style={{ marginTop: "2px", color: "#666" }}>
                  ग्राहकाचे नाव
                </div>
              </div>

              <div style={{ marginTop: "5px" }}>
                <strong>पत्ता:</strong> {customer?.address || bill.customerAddress || ""}
              </div>
              <div style={{ marginTop: "5px" }}>
                <strong>मो. नं. : {customer?.MobileNo || ""}</strong>
              </div>
            </div>

            {/* Right Side: Date and Bill No */}
            <div style={{ fontSize: "11px", lineHeight: "16px" }}>
              <div style={{ display: "flex" }}>
                <strong style={{ width: "60px" }}>बिल नंबर:</strong>
                <span>{bill.custBillNumber}</span>
              </div>

              <div style={{ display: "flex" }}>
                <strong style={{ width: "60px" }}>दिनांक:</strong>
                <span>{formatDate(bill.BillDate)}</span>
              </div>
            </div>
          </div>

          {/* ================= ITEMS TABLE ================= */}
          <div
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",     // ← Full table border
              borderRadius: "4px",
            }}
          >
            {/* TABLE HEADER + ROWS */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed" as const,
                fontSize: "12px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...th, width: colWidths.srNo }}>Sr No</th>
                  <th style={{ ...th, width: colWidths.farmerName }}>शेतकरी नाव</th>
                  <th style={{ ...th, width: colWidths.qty }}>Qty</th>
                  <th style={{ ...th, width: colWidths.rate }}>दर</th>
                  <th style={{ ...th, width: colWidths.amount }}>किम्मत</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ ...td, width: colWidths.srNo }}>{index + 1}</td>
                    <td style={{ ...td, width: colWidths.farmerName, textAlign: "left" }}>{item.farmerName}</td>
                    <td style={{ ...td, width: colWidths.qty }}>{item.qty}</td>
                    <td style={{ ...td, width: colWidths.rate }}>{item.customerAmt}</td>
                    <td style={{ ...td, width: colWidths.amount }}>{(item.customerAmt * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* BLANK SPACE WITHOUT ANY HORIZONTAL LINES */}
            <div style={{ flexGrow: 1 }}></div>

            {/* FOOTER FIXED BOTTOM WITH SEPARATE BORDER TOP */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderTop: "1px solid #ccc",   // footer separator line
                tableLayout: "fixed" as const,
                fontSize: "12px",
              }}
            >
              <tfoot>
                <tr>
                  <td style={{ ...tdBold, width: colWidths.srNo }}></td>
                  <td style={{ ...tdBold, width: colWidths.farmerName }}>Total</td>
                  <td style={{ ...tdBold, width: colWidths.qty }}>{totalItems}</td>
                  <td style={{ ...tdBold, width: colWidths.rate }}></td>
                  <td style={{ ...tdBold, width: colWidths.amount }}>{totalCustomerAmt.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>



          {/* ================= FOOTER CHARGES ================= */}
          <table
            style={{
              width: "100%",
              marginTop: "5px",
              borderCollapse: "collapse",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
   <tbody>
  <tr>
    <td
      colSpan={5}
      style={{
        ...td,
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div
          style={{
            width: "50%",
            borderRight: "1px solid #ccc",
            paddingRight: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            fontSize: "13px",
          }}
        >
     {[
  { label: "मागील तारीख", value: formatDate(bill.previousDate) || "" },
  { label: "Advance", value: bill.previousAdvance || 0 },
  { label: "Katala", value: bill.TotalCommission || 0 },


]
  .filter(item => item.label === "मागील तारीख" || (item.value && item.value !== 0 && item.value !== "-")) // Always show "मागील तारीख"

  .map((item, index) => (
    <div
      key={index}
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        justifyContent: "space-between",
      }}
    >
      <strong>{item.label}:</strong>
      <span style={{ textAlign: "right" }}>{item.value}</span>
    </div>
  ))}


        </div>

      {/* ================= RIGHT SIDE ================= */}
<div
  style={{
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "13px",
  }}
>
  {[
    { label: "Discount", value: bill.totaldiscount || 0 },
    { label: "भाडे/एकूण खर्च", value: bill.totalExpense?.toFixed(2) },
    { label: "एकूण रक्कम", value: adjustedTotal.toFixed(2) },
    { label: "मागील बाकी", value: bill.previousBalance?.toFixed(2) || "-" },
  ].map((item, index) => (
    <div
      key={index}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 120px",
        alignItems: "center",
      }}
    >
      <strong>{item.label}:</strong>

      {/* VALUE LEFT SHIFTED + GOOD ALIGNMENT */}
      <span
        style={{
          minWidth: "60px",        // value ko equal spacing deta hai
          textAlign: "left",       // right se hata kar left align
          paddingLeft: "60px",     // thoda left shift
        }}
      >
        {item.value}
      </span>
    </div>
  ))}

  {/* FINAL BALANCE */}
  <div
    style={{
      marginTop: "10px",
      paddingTop: "6px",
      borderTop: "1px solid #ccc",
      display: "grid",
      gridTemplateColumns: "1fr 120px",
      fontWeight: "bold",
      fontSize: "14px",
      alignItems: "center",
      
    }}
  >
    <span>एकूण बाकी:</span>

    <span
      style={{
        textAlign: "left",
        paddingLeft: "60px",
        minWidth: "80px",
        
      }}
    >
      ₹ {(adjustedTotal + (bill.previousBalance || 0)).toFixed(2)}
    </span>
  </div>
</div>

      </div>
    </td>
  </tr>
</tbody>



          </table>

          {/* ================= COMMISSION & GRAND TOTAL ================= */}
         
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
          disabled={isSharingWhatsApp || !bill?.CustomerNo}
        >
          {isSharingWhatsApp ? "Sharing..." : "WhatsApp"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerBillPreview;