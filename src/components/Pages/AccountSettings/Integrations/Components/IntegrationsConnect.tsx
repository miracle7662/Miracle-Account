import { useState } from 'react'
import { Button, Card, Col, FormCheck, Image, Modal, Row, Spinner, Stack } from 'react-bootstrap'
import { Toaster, toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

import connectedData from './data/connectedData'

interface IntegrationType {
  image: string
  name: string
  count: string
  status: string
  fulldesc: string
  isSync: boolean
}

const IntegrationsConnect: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [syncStates, setSyncStates] = useState<{ [key: string]: boolean }>(
    connectedData.reduce(
      (acc, integration) => {
        acc[integration.name] = integration.isSync
        return acc
      },
      {} as { [key: string]: boolean },
    ),
  )

  const handleToggleSwitch = (name: string) => {
    setSyncStates((prevSyncStates) => ({
      ...prevSyncStates,
      [name]: !prevSyncStates[name],
    }))

    const toastMessage = syncStates[name] ? `${name} Sync is OFF` : `${name} Sync is ON`
    toast.success(toastMessage)
  }

  const handleViewIntegration = (integration: IntegrationType) => {
    setSelectedIntegration(integration)
    setShowModal(true)
  }

  const handleUninstallModal = () => {
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      setShowModal(false)
      toast.success('Uninstall successfully')
    }, 2000)
  }

  return (
    <>
      <div className="d-md-flex align-items-center justify-content-between gap-4 mb-6">
        <div>
          <h5 className="fw-semibold">Connected</h5>
          <p className="mb-0">Display content from your connected accounts on your site</p>
        </div>
        <Link to="#!" className="icon-link icon-link-hover link-primary mt-3 mt-md-0">
          <span>All Connected</span>
          <i className="fi fi-rr-arrow-small-right bi"></i>
        </Link>
      </div>
      <Row className="g-3 g-md-4">
        {connectedData.map((item, idx) => (
          <Col md={6} xl={4} key={idx}>
            <Card>
              <Card.Body>
                <Stack direction="horizontal" className="mb-4">
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
                    <FormCheck
                      type="switch"
                      id={`syncSwitch-${idx}`}
                      checked={syncStates[item.name]}
                      onChange={() => handleToggleSwitch(item.name)}
                    />
                  </div>
                </Stack>
                <p className="mb-0">{item.desc}</p>
              </Card.Body>
              <Card.Footer className="px-4 py-3 border-top">
                <Button variant="neutral" onClick={() => handleViewIntegration(item)}>
                  View Integration{' '}
                  <i className="fi fi-rr-arrow-up-right-from-square fs-14 ms-2"></i>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          {selectedIntegration && (
            <>
              <Stack direction="horizontal" className="mb-4">
                <Stack gap={3} direction="horizontal">
                  <div
                    className="p-2 border rounded bg-secondary-subtle"
                    style={{ width: '3rem', height: '3rem' }}>
                    <Image src={selectedIntegration.image} alt="" className="img-fluid" />
                  </div>
                  <div>
                    <h6 className="fs-14 fw-semibold">{selectedIntegration.name}</h6>
                    <p className="mb-0">{selectedIntegration.count} Installed</p>
                  </div>
                </Stack>
                <div className="ms-auto">
                  <span
                    className={`fs-12 px-2 ms-2 border rounded-pill hstack ${
                      selectedIntegration.status === 'Verified'
                        ? 'border-success text-success'
                        : 'border-danger text-danger'
                    }`}>
                    {selectedIntegration.status}
                  </span>
                </div>
              </Stack>
              <p>
                <span className="fw-semibold text-dark">Description: </span>{' '}
                {selectedIntegration.fulldesc}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => setShowModal(false)} className="text-danger">
            Close
          </Button>
          <Button
            variant="danger"
            className="text-white"
            onClick={handleUninstallModal}
            disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">{'Uninstalling...'}</span>
              </>
            ) : (
              'Uninstall'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster position="top-center" />
    </>
  )
}

export default IntegrationsConnect
