import { Row, Col, Table, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface billingRecord {
  reference: string
  product: string
  status: string
  date: string
  amount: string
}

const active = 2
const items: any[] = []
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  )
}

const billingData: billingRecord[] = [
  {
    reference: '#741258',
    product: 'Bootstrap Admin Dashboard',
    status: '<span class="badge bg-success-subtle text-success">Paid</span>',
    date: '01/06/2023',
    amount: '$59.00',
  },
  {
    reference: '#258963',
    product: 'Dashboard & Webapps Template',
    status: '<span class="badge bg-warning-subtle text-warning">Pending</span>',
    date: '02/07/2023',
    amount: '$99.00',
  },
  {
    reference: '#644789',
    product: 'Window Admin Dashboard',
    status: '<span class="badge bg-success-subtle text-success">Paid</span>',
    date: '03/07/2023',
    amount: '$29.00',
  },
  {
    reference: '#854789',
    product: 'React Admin Dashboard',
    status: '<span class="badge bg-danger-subtle text-danger">Reject</span>',
    date: '04/08/2023',
    amount: '$49.00',
  },
  {
    reference: '#357895',
    product: 'React Typescript Dashboard',
    status: '<span class="badge bg-success-subtle text-success">Paid</span>',
    date: '04/09/2023',
    amount: '$39.00',
  },
]

const BillingHistory = () => {
  return (
    <>
      <Row className="g-4 mb-4">
        <Col md={3}>
          <h5 className="fw-semibold">Billing History</h5>
          <p>View your previos billing history.</p>
        </Col>
        <Col md={9}>
          <Table size="lg" borderless responsive>
            <thead>
              <tr>
                <th>Reference</th>
                <th>product</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(billingData || []).map(({ reference, product, date, status, amount }, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <Link to="#!" className="fw-semibold text-primary">
                        INV-{reference}
                      </Link>
                    </td>
                    <td>
                      <Link to="#!" className="fw-medium">
                        {product}
                      </Link>
                    </td>
                    <td>
                      <span dangerouslySetInnerHTML={{ __html: status }} />
                    </td>
                    <td className="text-end">{date}</td>
                    <td className="text-end fs-15 fw-semibold">{amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Pagination className="mt-3">{items}</Pagination>
        </Col>
      </Row>
    </>
  )
}

export default BillingHistory
