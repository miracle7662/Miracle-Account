import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button, Col, Form, InputGroup, Row, Stack, Table } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface Item {
  id: number
  name: string
  qty: string
  unitPrice: string
  totalPrice: string
}

interface InvoiceCreateContentProps {
  handleSendClick: () => void
  setSelectedInvoice: React.Dispatch<React.SetStateAction<null>>
  setShowInvoiceCreate: React.Dispatch<React.SetStateAction<boolean>>
  sidebarLeftToggle: boolean
  setSidebarLeftToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrencyOptions = [
  { value: 'USD - US Dollar - $', label: 'USD - US Dollar - $' },
  { value: 'AFN - Afghan Afghani - ؋', label: 'AFN - Afghan Afghani - ؋' },
  { value: 'BDT - Bangladeshi Taka - ৳', label: 'BDT - Bangladeshi Taka - ৳' },
  { value: 'DEM - German Mark - DM', label: 'DEM - German Mark - DM' },
  {
    value: 'XOF - CFA Franc BCEAO - CFA',
    label: 'XOF - CFA Franc BCEAO - CFA',
  },
  {
    value: 'GBP - British Pound Sterling - £',
    label: 'GBP - British Pound Sterling - £',
  },
  { value: 'INR - Indian Rupee - ₹', label: 'INR - Indian Rupee - ₹' },
  { value: 'PKR - Pakistani Rupee - ₨', label: 'PKR - Pakistani Rupee - ₨' },
  { value: 'RUB - Russian Ruble - ₽', label: 'RUB - Russian Ruble - ₽' },
]

const PaymentOptions = [
  { value: 'Paypal', label: 'Paypal' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Credit/Debit Card', label: 'Credit/Debit Card' },
  { value: 'Cashapp', label: 'Cashapp' },
]

const InvoiceCreateContent: React.FC<InvoiceCreateContentProps> = ({
  handleSendClick,
  setSelectedInvoice,
  setShowInvoiceCreate,
  sidebarLeftToggle,
  setSidebarLeftToggle,
}) => {
  const [subtotal, setSubtotal] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [tax, setTax] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: 'Window React Admin Dashboard',
      qty: '1',
      unitPrice: '39',
      totalPrice: '39',
    },
  ])

  useEffect(() => {
    calculateTotals()
  }, [items])

  const handleAddNewItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      name: '',
      qty: '',
      unitPrice: '',
      totalPrice: '',
    }
    setItems((prevItems) => [...prevItems, newItem])
  }

  const handleDeleteItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const handleInputChange = (itemId: number, field: keyof Item, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    )
  }

  const calculateTotal = (item: Item) => {
    const { qty, unitPrice } = item
    return qty && unitPrice ? (parseFloat(qty) * parseFloat(unitPrice)).toFixed(2) : ''
  }

  const calculateTotals = () => {
    const subtotal = items.reduce((acc, item) => {
      const total = parseFloat(calculateTotal(item)) || 0
      return acc + total
    }, 0)

    const defaultDiscount = 25
    const defaultTax = 12

    const discount = subtotal * (defaultDiscount / 100)
    const tax = subtotal * (defaultTax / 100)

    const total = subtotal - discount + tax

    setSubtotal(subtotal)
    setDiscount(discount)
    setTax(tax)
    setTotal(total)
  }

  const handleToggleLateFees = (checked: boolean) => {
    if (checked) {
      toast.success('Late Fees enabled')
    } else {
      toast.error('Late Fees disabled')
    }
  }

  const handleToggleClientNotes = (checked: boolean) => {
    if (checked) {
      toast.success('Client Notes enabled')
    } else {
      toast.error('Client Notes disabled')
    }
  }

  const handleToggleSavePayment = (checked: boolean) => {
    if (checked) {
      toast.success('Save Payment enabled')
    } else {
      toast.error('Save Payment disabled')
    }
  }

  const handleGoBack = () => {
    document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    setSelectedInvoice(null)
    setShowInvoiceCreate(false)
    setSidebarLeftToggle(false)
  }

  const handleSidebarLeftToggle = () => {
    document.querySelector('.apps-card')?.classList.add('apps-sidebar-left-toggle')
    setSidebarLeftToggle(true)
    if (sidebarLeftToggle) {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
      setSidebarLeftToggle(false)
    }
  }

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="px-3 border-bottom justify-content-between bg-body-tertiary"
        style={{ minHeight: '4.5rem' }}
      >
        <Stack direction="horizontal" gap={2}>
          <Button variant="light" className="btn-icon" onClick={handleGoBack}>
            <i className="fi fi-rr-arrow-left"></i>
          </Button>
          <h5 className="fw-bold mb-0">Create Invoice</h5>
        </Stack>
        <Button
          variant="light"
          className="btn-icon btn-md ms-auto d-none d-lg-flex"
          onClick={handleSidebarLeftToggle}
        >
          <i className="fi fi-rr-menu-burger"></i>
        </Button>
      </Stack>
      <PerfectScrollbar className="h-100">
        <div className="border-bottom">
          <div className="px-4 py-4">
            <Row className="g-4 mb-4">
              <Col md={4}>
                <Form.Label>Invoice number:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>#INV-</InputGroup.Text>
                  <InputMask
                    mask="999999"
                    maskChar={null}
                    className="form-control"
                    placeholder="Invoice number...."
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Group controlId="exampleForm.ControlInputIssueDate">
                  <Form.Label>Issue date:</Form.Label>
                  <Flatpickr
                    options={{
                      dateFormat: 'Y-m-d',
                    }}
                    placeholder="Issue date..."
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="exampleForm.ControlInputDueDate">
                  <Form.Label>Due date:</Form.Label>
                  <Flatpickr
                    options={{
                      dateFormat: 'Y-m-d',
                    }}
                    placeholder="Due date..."
                    className="form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <hr className="m-0" />
          <div className="px-4 py-4">
            <Row className="row gy-4 gx-12">
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputBillFrom">
                  <Form.Label>Bill from:</Form.Label>
                  <Form.Control type="text" placeholder="Name..." />
                  <br />
                  <Form.Control type="email" placeholder="Email..." />
                  <br />
                  <Form.Control type="tel" placeholder="Phone..." />
                  <br />
                  <Form.Control as="textarea" rows={3} placeholder="Address..." />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputBillTo">
                  <Form.Label>Bill to:</Form.Label>
                  <Form.Control type="text" placeholder="Name..." />
                  <br />
                  <Form.Control type="email" placeholder="Email..." />
                  <br />
                  <Form.Control type="tel" placeholder="Phone..." />
                  <br />
                  <Form.Control as="textarea" rows={3} placeholder="Address..." />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <hr className="m-0" />
          <div className="px-4 py-4">
            <Table bordered responsive>
              <thead>
                <tr className="single-item">
                  <th>#</th>
                  <th style={{ minWidth: '300px' }}>Product</th>
                  <th style={{ minWidth: '120px' }}>Qty</th>
                  <th style={{ minWidth: '120px' }}>Price</th>
                  <th style={{ minWidth: '120px' }}>Total</th>
                  <th style={{ width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <Form.Control
                        type="text"
                        name=""
                        placeholder="Enter product name...."
                        value={item.name}
                        onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name=""
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleInputChange(item.id, 'qty', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name=""
                        placeholder="Price"
                        value={item.unitPrice}
                        onChange={(e) => handleInputChange(item.id, 'unitPrice', e.target.value)}
                      />
                    </td>
                    <td>{calculateTotal(item)}</td>
                    <td>
                      <Button variant="" onClick={() => handleDeleteItem(item.id)}>
                        <i className="fi fi-rr-trash text-danger"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-md-flex align-items-start justify-content-between mt-4">
              <Button variant="primary" onClick={handleAddNewItem}>
                Add New Item
              </Button>
              <div className="my-4 my-md-0 w-100" style={{ maxWidth: '300px' }}>
                <Stack direction="horizontal" className="justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-medium">${subtotal.toFixed(2)}</span>
                </Stack>
                <Stack direction="horizontal" className="justify-content-between mb-2">
                  <span>
                    Discount <span className="fs-12 text-muted">(25%)</span>
                  </span>
                  <span className="fw-medium">${discount.toFixed(2)}</span>
                </Stack>
                <Stack direction="horizontal" className="justify-content-between mb-2">
                  <span>
                    Tax <span className="fs-12 text-muted">(12%)</span>
                  </span>
                  <span className="fw-medium">${tax.toFixed(2)}</span>
                </Stack>
                <hr />
                <Stack direction="horizontal" className="justify-content-between">
                  <span className="fs-14 fw-bold">Grand Total</span>
                  <span className="fs-16 fw-bold">${total.toFixed(2)}</span>
                </Stack>
              </div>
            </div>
          </div>
        </div>
        <div className="mw-100 px-4 py-12">
          <Row className="g-4">
            <Col xl={6} lg={12} md={6} className="mb-8">
              <div className="mb-4">
                <Form.Label>Select currency:</Form.Label>
                <Select options={CurrencyOptions} classNamePrefix="select" />
              </div>
              <div className="mb-4">
                <Form.Label>Accept payment:</Form.Label>
                <Select options={PaymentOptions} classNamePrefix="select" />
              </div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Invoice note:</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Invoice notes...." />
              </Form.Group>
              <div className="mt-4">
                <p className="fs-13 fw-light fst-italic text-muted mb-1">
                  Payment are secure and encrypted
                </p>
                <p className="fs-13 fw-light fst-italic text-muted mb-0">
                  Question? <Link to="/other-pages/contact-us">Concatc Us</Link>
                </p>
              </div>
            </Col>
            <Col xl={6} lg={12} md={6}>
              <div className="px-4 px-md-6 py-4 py-md-8 bg-secondary-subtle rounded-3 ms-auto">
                <div className="mb-8">
                  <Form.Check type="switch" id="check-api-late-fees" className="mb-4">
                    <Form.Check.Input onChange={(e) => handleToggleLateFees(e.target.checked)} />
                    <Form.Check.Label className="ms-2">
                      <span className="fw-semibold text-dark">Late Fees</span>
                      <br />
                      <span className="fs-13 text-muted">Late fees for extra charge</span>
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check type="switch" id="check-api-client-notes" className="mb-4">
                    <Form.Check.Input
                      onChange={(e) => handleToggleClientNotes(e.target.checked)}
                      defaultChecked
                    />
                    <Form.Check.Label className="ms-2">
                      <span className="fw-semibold text-dark">Client Notes</span>
                      <br />
                      <span className="fs-13 text-muted">Client notes for further query</span>
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check type="switch" id="check-api-save-payment">
                    <Form.Check.Input onChange={(e) => handleToggleSavePayment(e.target.checked)} />
                    <Form.Check.Label className="ms-2">
                      <span className="fw-semibold text-dark">Save Payment</span>
                      <br />
                      <span className="fs-13 text-muted">Save payment for quick payout</span>
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                <Stack direction="horizontal" gap={2} className="mb-2">
                  <Button variant="soft-success" className="w-50">
                    Save
                  </Button>
                  <Button variant="soft-danger" className="w-50">
                    Preview
                  </Button>
                </Stack>
                <Button variant="primary" size="lg" className="w-100" onClick={handleSendClick}>
                  Send Invoice
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </PerfectScrollbar>
    </>
  )
}

export default InvoiceCreateContent
