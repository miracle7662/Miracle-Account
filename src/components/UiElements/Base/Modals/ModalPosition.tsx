import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Stack } from 'react-bootstrap'

interface Modals {
  showTopStart: boolean
  showTopEnd: boolean
  showBottomEnd: boolean
  showBottomStart: boolean
}

const ModalPosition = () => {
  const [modals, setModals] = useState<Modals>({
    showTopStart: false,
    showTopEnd: false,
    showBottomEnd: false,
    showBottomStart: false,
  })

  const handleClose = (modal: keyof Modals) => setModals({ ...modals, [modal]: false })
  const handleShow = (modal: keyof Modals) => setModals({ ...modals, [modal]: true })

  const modalData = [
    {
      key: 'showTopStart',
      position: 'top-start',
      buttonText: 'Top Start',
    },
    {
      key: 'showTopEnd',
      position: 'top-end',
      buttonText: 'Top End',
    },
    {
      key: 'showBottomEnd',
      position: 'bottom-end',
      buttonText: 'Bottom End',
    },
    {
      key: 'showBottomStart',
      position: 'bottom-start',
      buttonText: 'Bottom Start',
    },
    {
      key: 'showTopCenter',
      position: 'center',
      buttonText: 'Top Center',
    },
  ]

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {modalData.map((modal) => (
          <React.Fragment key={modal.key}>
            <Button variant="primary" onClick={() => handleShow(modal.key as keyof Modals)}>
              {modal.buttonText}
            </Button>
            <Modal
              show={modals[modal.key as keyof Modals]}
              onHide={() => handleClose(modal.key as keyof Modals)}
              className={`modal-dialog-${modal.position}`}
            >
              <Modal.Body className="text-center mx-auto py-12 p-md-12">
                <div
                  className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{ width: '5rem', height: '5rem' }}
                >
                  <i className="fi fi-rr-badge-check fs-2"></i>
                </div>
                <h3 className="mb-3 text-success">Congratulations!</h3>
                <p className="lead mx-md-5">
                  You've successfully bought
                  <strong className="text-dark"> 0.365 BTC</strong>
                </p>
                <span className="text-muted">
                  Learn when you receive bitcoin in your wallet.
                  <Link to="#!" className="link-button">
                    {' '}
                    Click here
                  </Link>
                </span>
              </Modal.Body>
            </Modal>
          </React.Fragment>
        ))}
      </Stack>
    </>
  )
}

export default ModalPosition
