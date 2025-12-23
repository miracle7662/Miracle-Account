import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Printer, FileEarmarkPdf } from "react-bootstrap-icons";


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

interface CashBookTablePreviewProps {
  show: boolean;
  onHide: () => void;
  entries: CashBookEntry[];
  exportToPDF: () => void;
}

const CashBookTablePreview: React.FC<CashBookTablePreviewProps> = ({
  show,
  onHide,
  entries,
  exportToPDF,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Cash Book Table Preview1234</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Voucher No</th>
              <th>Type</th>
              <th>Payment Mode</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No entries
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.CashBookID}>
                  <td>{entry.CashBookID}</td>
                  <td>{entry.TransactionDate}</td>
                  <td>{entry.VoucherNumber || "-"}</td>
                  <td>{entry.TransactionType}</td>
                  <td>{entry.PaymentMode}</td>
                  <td>{entry.Amount.toFixed(2)}</td>
                  <td>{entry.Description || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <Printer className="me-1" /> Print
        </Button>
        <Button variant="success" onClick={exportToPDF}>
          <FileEarmarkPdf className="me-1" /> PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CashBookTablePreview;
