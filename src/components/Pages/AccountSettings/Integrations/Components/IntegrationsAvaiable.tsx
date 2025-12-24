import { useState } from 'react'
import { Button, Card, Col, Image, Modal, Row, Spinner, Stack } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import avaiableData from './data/avaiableData'

interface Integration {
  image: string
  name: string
  count: string
  status: string
  desc: string
  fulldesc: string
}

const IntegrationsAvaiable: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleInstallNow = (integration: Integration) => {
    setSelectedIntegration(integration)
    setShowModal(true)
  }

  const handleInstallModal = () => {
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      setShowModal(false)
      toast.success('Install successfully!')
    }, 2000)
  }

  return (
    <>
      <div className="d-md-flex align-items-center justify-content-between gap-4 mb-6">
        <div>
          <h5 className="fw-semibold">Available</h5>
          <p className="mb-0">Display content from your connected accounts on your site</p>
        </div>
        <Link to="#!" className="icon-link icon-link-hover link-primary mt-3 mt-md-0">
          <span>All Available</span>
          <i className="fi fi-rr-arrow-small-right bi"></i>
        </Link>
      </div>
      <Row className="g-3 g-md-4">
        {avaiableData.map((item, idx) => (
          <Col md={6} xl={4} key={idx}>
            <Card>
              <Card.Body>
                <Stack gap={3} direction="horizontal" className="mb-4">
                  <Stack gap={3} direction="horizontal">
                    <div
                      className="p-2 border rounded bg-secondary-subtle"
                      style={{ width: '3rem', height: '3rem' }}>
                      <Image src={item.image} alt="" className="img-fluid" />
                    </div>
                    <div>
                      <h6 className="fs-14 fw-semibold">{item.name}</h6>
                      <p className="mb-0 text-truncate">{item.count} Installed</p>
                    </div>
                  </Stack>
                  <div className="ms-auto">
                    <span
                      className={`fs-12 px-2 ms-2 border rounded-pill hstack ${
                        item.status === 'Verified'
                          ? 'border-success text-success'
                          : 'border-danger text-danger'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                </Stack>
                <p className="mb-0">{item.desc}</p>
              </Card.Body>
              <Card.Footer className="px-4 py-3 border-top">
                <Button variant="neutral" onClick={() => handleInstallNow(item)}>
                  <i className="fi fi-rr-plus fs-12 me-2"></i>
                  <span>Install Now</span>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <Stack gap={3} direction="horizontal" className="mb-6">
            <div
              className="p-2 border rounded bg-secondary-subtle"
              style={{ width: '3rem', height: '3rem' }}>
              <Image src={selectedIntegration?.image} alt="" className="img-fluid" />
            </div>
            <div>
              <h6 className="fs-14 fw-semibold">{selectedIntegration?.name}</h6>
              <p className="mb-0">{selectedIntegration?.count} Installed</p>
            </div>
          </Stack>
          <p className="mb-0">{selectedIntegration?.fulldesc}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => setShowModal(false)} className="text-danger">
            Close
          </Button>
          <Button
            variant="success"
            className="text-white"
            onClick={handleInstallModal}
            disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">{'Installing...'}</span>
              </>
            ) : (
              'Install Now'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default IntegrationsAvaiable
