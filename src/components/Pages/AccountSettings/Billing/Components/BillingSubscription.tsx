import { Row, Col, Card, Stack, Button, ListGroup, ProgressBar } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

// images
import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'
import avatar7 from '@/assets/images/avatars/7.png'

const avatarSources: string[] = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7]

const renderAvatars = (sources: string[]) => {
  return sources.map((src: string, index: number) => (
    <Avatar
      key={index}
      type="image"
      src={src}
      alt={`User Avatar ${index + 1}`}
      className="avatar avatar-md"
    />
  ))
}

const BillingSubscription = () => {
  return (
    <>
      <Row className="g-4">
        <Col md={3}>
          <h5 className="fw-semibold">Subscription</h5>
          <p>Manage your subscription plan.</p>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-md-flex align-items-center">
                <div>
                  <Stack direction="horizontal" className="mb-2">
                    <h5 className="mb-0">Basic plan</h5>
                    <div>
                      <Stack
                        direction="horizontal"
                        className="fs-12 px-2 ms-2 border border-success bg-success-subtle rounded-pill"
                      >
                        <span
                          className="d-block bg-success rounded-circle"
                          style={{ width: '0.25rem', height: '0.25rem' }}
                        ></span>
                        <span className="ms-1 text-success">Active</span>
                      </Stack>
                    </div>
                  </Stack>
                  <p className="mb-1">Our most popular plan for small teams.</p>
                  <p>
                    Active until <span className="fw-semibold">Dec 09, 2024</span>
                  </p>
                </div>
                <div className="ms-auto text-dark ">
                  <span className="fs-24 fw-semibold">$</span>
                  <span className="display-6 fw-bold">20</span>
                  <span>/per month</span>
                </div>
              </div>
              <div className="d-md-flex align-items-center mt-4">
                <div className="avatar-group avatar-group-md">{renderAvatars(avatarSources)}</div>
                <span className="vr mx-3 bg-secondary-subtle"></span>
                <div className="w-100">
                  <span className="d-block mb-1">7 of 10 Users</span>
                  <ProgressBar now={78} className="w-100  rounded" style={{ height: '5px' }} />
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="py-3 text-end">
              <Button variant="" className="text-danger me-2">
                Cancel
              </Button>
              <Button variant="neutral">
                Upgrade plan <i className="fi fi-rr-arrow-up-right-from-square fs-14 ms-2"></i>
              </Button>
            </Card.Footer>
          </Card>
          <ListGroup>
            <ListGroup.Item className="d-sm-flex align-items-center justify-content-between gap-4">
              <div>Payment method</div>
              <div className="d-sm-flex align-items-center gap-4">
                <div>
                  <p className="fs-12 fw-medium mb-1">Mastercard - 03/26</p>
                  <p className="mb-1">**** **** **** 9632</p>
                </div>
                <Button variant="neutral" className="mt-1 mt-sm-0">
                  Update <i className="fi fi-rr-arrow-up-right-from-square fs-14 ms-2"></i>
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-sm-flex align-items-center justify-content-between gap-4">
              <div>Billing period</div>
              <Stack direction="horizontal" gap={4}>
                <div className="d-sm-flex align-items-center gap-4">
                  <p className="fw-medium mb-1">Plan billed monthly</p>
                  <Button variant="neutral" className="mt-1 mt-sm-0">
                    Update <i className="fi fi-rr-arrow-up-right-from-square fs-14 ms-2"></i>
                  </Button>
                </div>
              </Stack>
            </ListGroup.Item>
            <ListGroup.Item className="d-sm-flex align-items-center justify-content-between gap-4">
              <div>License keys</div>
              <Stack direction="horizontal" gap={4}>
                <div className="d-sm-flex align-items-center gap-4">
                  <p className="fw-medium mb-1">Redeem a license key</p>
                  <Button variant="neutral" className="mt-1 mt-sm-0">
                    Redeem <i className="fi fi-rr-arrow-up-right-from-square fs-14 ms-2"></i>
                  </Button>
                </div>
              </Stack>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default BillingSubscription
