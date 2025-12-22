import React from 'react'
import { Alert, Stack, Table } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Logo from '@/components/Common/Logo'

interface InvoiceContentDetailsProps {
  selectedInvoice: any
  colSpan?: number | undefined
}

const InvoiceContentDetails: React.FC<InvoiceContentDetailsProps> = ({ selectedInvoice }) => {
  if (!selectedInvoice) {
    return null
  }

  return (
    <>
      <PerfectScrollbar className="h-100">
        <div id="invoice-content" className="bg-body-tertiary mx-auto">
          <div className="px-4 py-4 d-md-flex align-items-start">
            <div className="flex-grow-1 mb-8 mb-md-0">
              <Logo />
              <h6 className="mt-6 mb-3">WRAPCODERS INC.</h6>
              <address className="mb-2">
                3094 Taylor Street <br /> Mamaroneck, NY 10543, USA
              </address>
              <span className="mb-2">
                <abbr title="Phone">Phone: </abbr>
                <span>+1(914)-698-9680</span>
              </span>
            </div>
            <div className="ms-md-auto w-100" style={{ maxWidth: '300px' }}>
              <Stack direction="horizontal" className="fs-16 fw-bold text-dark mb-3">
                <div style={{ width: '150px' }}>Invoice:</div>
                <div>{selectedInvoice.invnumber}</div>
              </Stack>
              <Stack direction="horizontal" className="mb-3">
                <div style={{ width: '150px' }}>Issue Date:</div>
                <div>26 MAR, 2024</div>
              </Stack>
              <Stack direction="horizontal" className="mb-3">
                <div style={{ width: '150px' }}>Date Date:</div>
                <div>02 APR, 2024</div>
              </Stack>
              <Stack direction="horizontal" className="mb-3">
                <div style={{ width: '150px' }}>Amount:</div>
                <div>{selectedInvoice.amount}</div>
              </Stack>
              <Stack direction="horizontal">
                <div style={{ width: '150px' }}>Status:</div>
                <div>
                  <span dangerouslySetInnerHTML={{ __html: selectedInvoice.status }} />
                </div>
              </Stack>
            </div>
          </div>
          <hr />
          <div className="px-4 py-4 d-md-flex">
            <div className="flex-grow-1 mb-8 mb-md-0">
              <label className="fs-12 fw-bold text-muted text-uppercase mb-3">ISSUE FROM:</label>
              <h6>WRAPCODERS</h6>
              <address className="mb-2">Gorasthan Para, Gaibandha-5700, BD</address>
              <div className="mb-2">
                <abbr title="Phone">Phone: </abbr>
                <span>+8801765952765</span>
              </div>
              <div>
                <abbr title="Email">Email: </abbr>
                <span>wrapcoders@gmail.com</span>
              </div>
            </div>
            <div className="ms-md-auto w-100" style={{ maxWidth: '300px' }}>
              <label className="fs-12 fw-bold text-muted text-uppercase mb-3">ISSUE FOR:</label>
              <h6>Mark Strokes</h6>
              <address className="mb-2">405 Mulberry Rd. Mc Grady, NC, 28649, USA</address>
              <div className="mb-2">
                <abbr title="Phone">Phone: </abbr>
                <span>+1(357)-987-6589</span>
              </div>
              <div>
                <abbr title="Email">Email: </abbr>
                <span>strokes@company.com</span>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="text-end">Rate</th>
                  <th className="text-end">QTY</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>React Bootstrap Dashboard</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">2</td>
                  <td className="text-dark fw-semibold text-end">$500</td>
                </tr>
                <tr>
                  <td>React TypeScript Webapps Application</td>
                  <td className="text-end">$300.00</td>
                  <td className="text-end">2</td>
                  <td className="text-dark fw-semibold text-end">$600</td>
                </tr>
                <tr>
                  <td>Window React Admin Dashboard</td>
                  <td className="text-end">$150.00</td>
                  <td className="text-end">3</td>
                  <td className="text-dark fw-semibold text-end">$450</td>
                </tr>
                <tr className="border-0">
                  <td colSpan={2} className="border-0"></td>
                  <td className="border-0 text-muted text-end">Sub Total</td>
                  <td className="border-0 fw-semibold text-dark text-end">$2,450</td>
                </tr>
                <tr className="border-0">
                  <td colSpan={2} className="border-0"></td>
                  <td className="border-0 text-muted text-end">Discount (25%)</td>
                  <td className="border-0 fw-semibold text-dark text-end">$225</td>
                </tr>
                <tr className="border-0">
                  <td colSpan={2} className="border-0"></td>
                  <td className="border-0 text-muted text-end">Estimated Tax (12%)</td>
                  <td className="border-0  fw-semibold text-dark text-end">$250</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-0"></td>
                  <td className="border-0 fw-bold text-dark text-end">Grand Total</td>
                  <td className="border-0 fs-16 fw-bolder text-dark text-end">$2,225</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="px-4 py-4">
            <Alert variant={'danger'} className="text-danger" style={{ borderStyle: 'dashed' }}>
              <span className="fs-12 fw-semibold">NOTES: </span>
              <span className="fs-13">
                All accounts are to be paid within 7 days from receipt of invoice. To be paid by
                cheque or credit card or direct payment online. If account is not paid within 7 days
                the credits details supplied as confirmation of work undertaken will be charged the
                agreed quoted fee noted above.{' '}
              </span>
            </Alert>
          </div>
        </div>
      </PerfectScrollbar>
    </>
  )
}

export default InvoiceContentDetails
