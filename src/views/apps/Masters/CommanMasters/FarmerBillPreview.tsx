import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "@/common/context";
interface FarmerBillLineItem {
  farmerName: string;
  qty: number;
  rate: number;
  amount: number;
  soudaDate?: string;
}
interface FarmerBillHeader {
  billNumber: string;
  billDate: string;
  customerName: string;
  farmerName: string;
  farmerno?: number;
  farmerAddress?: string;
  fromDate: string;
  toDate: string;
  lastBillDate?: string;
  lastBalance?: number;
  dalali?: number;
  shillak?: number;
  vatav?: number;
  jama?: number;
  advance?: number;
  katala?: number;
  discount?: number;
  totalKharch?: number;
  totalAmount?: number;
  totalBaki?: number;
}

interface FarmerBillPreviewProps {
  show: boolean;
  onHide: () => void;
  bill: FarmerBillHeader | null;
  items: FarmerBillLineItem[];
}

interface Farmer {
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

const FarmerBillPreview: React.FC<FarmerBillPreviewProps> = ({
  show,
  onHide,
  bill,
  items,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState<any>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (user?.companyid) {
          // Fetch company data based on user's selected company ID
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
    const fetchFarmer = async () => {
      if (bill?.farmerno) {
        try {
          const response = await axios.get(`/api/mandi-ledger/farmer/${bill.farmerno}`);
          setFarmer(response.data);
        } catch (error) {
          console.error('Error fetching farmer data:', error);
          setFarmer(null);
        }
      } else {
        setFarmer(null);
      }
    };
    fetchFarmer();
  }, [bill?.farmerno]);

  const calculateTotals = () => {
    const totalKharch = items.reduce((sum, item) => sum + item.amount, 0);
    return {
      totalKharch,
    };
  };
  

  const { totalKharch } = calculateTotals();
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  /* -------------------- PRINT -------------------- */
  const handlePrint = () => {
    if (!previewRef.current) return;
    const printWindow = window.open("", "_blank", "width=560,height=794");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Farmer Bill</title>
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
  const handleGeneratePDF = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPDF(true);

    // Temporarily remove sticky positioning for accurate PDF capture
    const headerDiv = previewRef.current.firstElementChild as HTMLElement;
    const originalPosition = headerDiv?.style.position || '';
    if (headerDiv) headerDiv.style.position = 'static';

    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");
      const width = 148;
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      const blob = pdf.output("blob");
      setPdfBlob(blob);
      // Auto-download the PDF
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Farmer_Bill_${bill?.billNumber || 'Invoice'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PDF Generated and Downloaded");
    } catch (error) {
      toast.error("PDF Error");
    } finally {
      // Restore original position
      if (headerDiv) headerDiv.style.position = originalPosition;
      setIsGeneratingPDF(false);
    }
  };

  /* -------------------- WHATSAPP -------------------- */
  const handleShareWhatsApp = () => {
    if (!pdfBlob) return;
    // Auto-download for sharing prep
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Farmer_Bill_${bill?.billNumber || 'Invoice'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    const message = `Bill No: ${bill?.billNumber}\nCustomer: ${bill?.customerName}\nTotal: ₹${bill?.totalBaki || totalKharch}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    toast("PDF downloaded. Attach it manually in WhatsApp.");
  };

  if (!bill) return null;

  /* -------------------- REUSABLE STYLES -------------------- */
  const th = {
    border: "1px solid #ccc",
    padding: "6px 4px",
    fontWeight: "bold",
    textAlign: "center" as const,
    background: "#f5f5f5",
  };

  const td = {
    border: "1px solid #ccc",
    padding: "6px 4px",
    textAlign: "center" as const,
  };

  const tdBold = {
    ...td,
    fontWeight: "bold",
    background: "#e8e8e8",
  };

  // Column widths
  const colWidths = {
    sr: "6%",
    soudaDate: "18%",
    farmerName: "30%",
    qty: "12%",
    rate: "15%",
    amount: "19%",
  };



  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Farmer Bill Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          ref={previewRef}
          style={{
            width: "148mm",
            minHeight: "210mm",
            margin: "0 auto",
            padding: "6mm",
            border: "1px solid #ccc",
            background: "white",
            fontSize: "11px",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            lineHeight: 1.3,
          }}
        >
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
                        {company?.Name1 || "व्यक्ती 1"}
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


          {/* ================= CUSTOMER INFO WITH BILL NO & DATE ================= */}
          <div
            style={{

              padding: "5px",
              marginBottom: "8px",
              fontSize: "12px",
              borderRadius: "2px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Farmer Name: {bill.customerName}
                </div>

                <div style={{ marginTop: "2px", color: "#666" }}>
                  शेतकरी नाव
                </div>
              </div>
              <div style={{ fontSize: "11px", lineHeight: "16px" }}>
                <div style={{ display: "flex" }}>
                  <strong style={{ width: "60px" }}>बिल नंबर:</strong>
                  <span>{bill.billNumber}</span>
                </div>

                <div style={{ display: "flex" }}>
                  <strong style={{ width: "60px" }}>दिनांक:</strong>
                  <span>{bill.billDate}</span>
                </div>
              </div>

            </div>
            <div style={{ textAlign: "left", marginTop: "4px" }}>
              <div style={{ marginBottom: "2px", fontSize: "11px" }}>
                <strong>पत्ता:</strong> {farmer?.address || bill.farmerAddress || ""}
              </div>
              <div style={{ fontSize: "11px" }}>
                <strong>मो. नं. : {farmer?.MobileNo || ""}</strong>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "11px" }}>
              <div>
                <strong>पासून तारीख:</strong> {bill.fromDate}
              </div>
              <div style={{ textAlign: "right" }}>
                <strong>पर्यंत तारीख:</strong> {bill.toDate}
              </div>
            </div>
          </div>

          {/* ================= ITEMS TABLE ================= */}
          <div
            style={{
              minHeight: "380px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* TABLE HEADER + ROWS */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed" as const,
                fontSize: "11px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...th, width: colWidths.sr }}>#</th>
                  <th style={{ ...th, width: colWidths.soudaDate }}>सौदा तारीख</th>
                  <th style={{ ...th, width: colWidths.qty }}>Qty</th>
                  <th style={{ ...th, width: colWidths.rate }}>दर</th>
                  <th style={{ ...th, width: colWidths.amount }}>किंमत</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const currentDate = item.soudaDate || bill.fromDate || '';
                  const previousDate = index > 0 ? (items[index - 1].soudaDate || bill.fromDate || '') : null;
                  const showDate = currentDate !== previousDate ? currentDate : '';
                  
                  return (
                    <tr key={index}>
                      <td style={{ ...td, width: colWidths.sr }}>{index + 1}</td>
                      <td style={{ ...td, width: colWidths.soudaDate }}>{showDate}</td>
                     
                      <td style={{ ...td, width: colWidths.qty }}>{item.qty} </td>
                      <td style={{ ...td, width: colWidths.rate }}>{item.rate}</td>
                      <td style={{ ...td, width: colWidths.amount }}>{item.amount.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* BLANK SPACE WITHOUT ANY HORIZONTAL LINES */}
            <div style={{ flexGrow: 1 }}></div>
            {/* FOOTER FIXED BOTTOM WITH SEPARATE BORDER TOP */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderTop: "1px solid #ccc",
                tableLayout: "fixed" as const,
                fontSize: "11px",
              }}
            >
              <tfoot>
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      ...tdBold,
                    }}
                  >
                    एकूण
                  </td>
                  <td style={{ ...tdBold, width: colWidths.qty }}>{totalQty.toFixed(2)}</td>
                  <td style={{ ...tdBold, width: colWidths.rate }}></td>
                   <td style={{ ...tdBold, width: colWidths.rate }}></td>
                  <td style={{ ...tdBold, width: colWidths.amount }}>₹{totalKharch.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* ================= FOOTER CHARGES ================= */}
          <div
  style={{
    display: "flex",
    border: "1px solid #ccc",
    padding: "10px",
    fontSize: "13px",
    justifyContent: "space-between",
    gap: "10px",
  }}
>
  {/* ================= LEFT BLOCK ================= */}
  <div style={{ flex: 1 }}>
    {[
  { label: "दलाली", value: bill.dalali, hideZero: false },
  { label: "हमाली", value: bill.shillak, hideZero: false },
  { label: "वटाव", value: bill.vatav, hideZero: false },

  // These 3 should hide when 0
  { label: "Advance", value: bill.advance, hideZero: true },
  { label: "कतला", value: bill.katala, hideZero: true },
  { label: "Discount", value: bill.discount, hideZero: true },
]
  .filter(item => {
    if (item.hideZero) {
      return item.value && item.value !== 0; // hide zero
    }
    return true; // always show
  })
  .map((item, i) => (
    <div
      key={i}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
      }}
    >
      <strong>{item.label}:</strong>
      <span>{item.value}</span>
    </div>
  ))}

  </div>

  {/* ======= VERTICAL LINE ======= */}
  <div
    style={{
      width: "1px",
      background: "#ccc",
      margin: "0 5px",
    }}
  />

  {/* ================= RIGHT BLOCK ================= */}
  <div style={{ flex: 1 }}>
  {[
    { label: "भाडे/एकूण खर्च", value: bill.totalKharch },
    { label: "एकूण रक्कम", value: bill.totalBaki },
    { label: "मागील बाकी", value: bill.lastBalance },
  ].map((item, i) => (
    <div
      key={i}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
      }}
    >
      <strong>{item.label}:</strong>

      {/* VALUE LEFT SHIFT */}
      <span
        style={{
          minWidth: "60px",        // value ko equal spacing deta hai
          textAlign: "left",       // right se hata kar left align
          paddingLeft: "10px",     // thoda left shift
        }}
      >
        {item.value}
      </span>
    </div>
  ))}

  {/* LINE BEFORE TOTAL */}
  <div
    style={{
      width: "100%",
      height: "1px",
      background: "#ccc",
      margin: "8px 0",
    }}
  />

  {/* TOTAL FIELD SAME ALIGNMENT */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
    }}
  >
    <strong>एकूण बाकी:</strong>

    <span
      style={{
        minWidth: "60px",
        textAlign: "left",
        paddingLeft: "10px",
      }}
    >
      ₹ {((bill.totalBaki || 0) + (bill.lastBalance || 0)).toFixed(2)}
    </span>
  </div>
</div>

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
        {pdfBlob && (
          <Button variant="info" onClick={handleShareWhatsApp}>
            WhatsApp
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default FarmerBillPreview;