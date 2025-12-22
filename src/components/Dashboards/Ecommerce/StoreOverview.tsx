import { Card, Col, Dropdown, DropdownDivider, Row, Stack } from 'react-bootstrap'

const storeData = [
  {
    title: 'Store Sales',
    icon: 'fi-rr-shopping-cart',
    color: 'warning',
    amount: '$89,585',
  },
  {
    title: 'Store Orders',
    icon: 'fi-rr-shopping-cart-add',
    color: 'danger',
    amount: '$42,455',
  },
  {
    title: 'Store Earnings',
    icon: 'fi-rr-sack-dollar',
    color: 'success',
    amount: '$38,625',
  },
]

const StoreOverview = () => {
  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Store Overview</Card.Title>
          <Dropdown className="ms-auto" drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-stats"></i>
                <span className="ms-3">Full Reports</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 g-md-4">
            {storeData.map(({ icon, color, amount, title }, index) => (
              <Col key={index} xs={12}>
                <Card.Body className="border rounded-3 p-3">
                  <Stack direction="horizontal" className="pd-5">
                    <div
                      className={`d-flex align-items-center justify-content-center rounded bg-${color}-subtle text-${color}`}
                      style={{ width: '3.5rem', height: '3.5rem' }}>
                      <i className={`fi ${icon} fs-2`}></i>
                    </div>
                    <div className="ms-auto text-end">
                      <h4 className="fs-18 fw-bold">{amount}</h4>
                      <span className="fs-13 text-muted">{title}</span>
                    </div>
                  </Stack>
                </Card.Body>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default StoreOverview
