import { Link } from 'react-router-dom'
import { Button, Card, Image, Pagination, Stack } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

// Avatar Images
import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'

// Product Images
import product1 from '@/assets/images/gallery/1.png'
import product2 from '@/assets/images/gallery/2.png'
import product3 from '@/assets/images/gallery/3.png'
import product4 from '@/assets/images/gallery/4.png'
import product5 from '@/assets/images/gallery/5.png'

const orders = [
  {
    id: 1,
    invoice: '#896574',
    customer: {
      name: 'Archie Tones',
      email: 'archie@example.com',
      image: avatar1,
    },
    coupon: 'SU56HD246K',
    product: { name: 'Edifier headphone', image: product1 },
    paymentMethod: 'fi fi-brands-visa',
    status: { text: 'Completed', color: 'success' },
  },
  {
    id: 2,
    invoice: '#478523',
    customer: {
      name: 'Holmes Cherry',
      email: 'holmes@example.com',
      image: avatar2,
    },
    coupon: 'SU56HD246K',
    product: { name: 'Apple watch ultra', image: product2 },
    paymentMethod: 'fi fi-brands-stripe',
    status: { text: 'Rejected', color: 'danger' },
  },
  {
    id: 3,
    invoice: '#568745',
    customer: {
      name: 'Malanie Hanvey',
      email: 'malanie@example.com',
      image: avatar3,
    },
    coupon: 'SU56HD246K',
    product: { name: 'Google Pixel Buds', image: product3 },
    paymentMethod: 'fi fi-brands-cc-amazon-pay',
    status: { text: 'Completed', color: 'success' },
  },
  {
    id: 4,
    invoice: '#674523',
    customer: {
      name: 'Kenneth Hune',
      email: 'kenneth@example.com',
      image: avatar4,
    },
    coupon: 'SU56HD246K',
    product: { name: 'iPhone 15 pro max', image: product4 },
    paymentMethod: 'fi fi-brands-apple-pay',
    status: { text: 'Pending', color: 'warning' },
  },
  {
    id: 5,
    invoice: '#558746',
    customer: {
      name: 'Valentine Maton',
      email: 'valentine@example.com',
      image: avatar5,
    },
    coupon: 'SU56HD246K',
    product: { name: 'Canon camera kit', image: product5 },
    paymentMethod: 'fi fi-brands-stripe',
    status: { text: 'Completed', color: 'success' },
  },
]

const RecentOrderList = () => {
  return (
    <>
      <Card>
        <Card.Header className="hstack py-3">
          <Card.Title>Recent Orders</Card.Title>
          <Button variant="" className="ms-auto btn-neutral">
            <i className="fi fi-rr-stats"></i>
            <span className="ms-2">Order Report</span>
          </Button>
        </Card.Header>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Coupon</th>
                <th>Product</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to="">{order.invoice}</Link>
                  </td>
                  <td>
                    <div className="hstack">
                      <Avatar
                        size="md"
                        type="image"
                        src={order.customer.image}
                        alt={order.customer.name}
                      />
                      <Link to="" className="ms-3">
                        {order.customer.name}
                        <span className="fs-13 fw-normal text-muted d-block">
                          {order.customer.email}
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span className="badge text-success border border-success border-opacity-25">
                      {order.coupon}
                    </span>
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      <div
                        className="rounded bg-body-secondary flex-shrink-0"
                        style={{ width: 'max-content' }}
                      >
                        <Image
                          src={order.product.image}
                          fluid
                          rounded
                          className="rounded"
                          style={{ height: '2.5rem' }}
                        />
                      </div>
                      <Link to="" className="d-block">
                        {order.product.name}
                        <span className="fs-13 fw-normal text-muted d-block">
                          Invoice: {order.invoice}
                        </span>
                      </Link>
                    </Stack>
                  </td>
                  <td>
                    <i className={`fs-1 ${order.paymentMethod}`}></i>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${order.status.color}-subtle text-${order.status.color}`}
                    >
                      {order.status.text}
                    </span>
                  </td>
                  <td className="text-end">
                    <Button variant="light" className="btn-icon btn-md">
                      <i className="fi fi-bs-menu-dots-vertical"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card.Footer className="border-top-0">
          <Pagination className="mb-0">
            <Pagination.Prev />
            {[...Array(4)].map((_, index) => (
              <Pagination.Item key={index}>{index + 1}</Pagination.Item>
            ))}
            <Pagination.Next />
          </Pagination>
        </Card.Footer>
      </Card>
    </>
  )
}

export default RecentOrderList
