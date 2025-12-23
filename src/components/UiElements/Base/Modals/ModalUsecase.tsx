import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Stack } from 'react-bootstrap'

type ModalKey =
  | 'showUsecaseSuccess'
  | 'showUsecaseDanger'
  | 'showUsecaseWarning'
  | 'showUsecaseInfo'

const ModalUsecase = () => {
  const [modals, setModals] = useState({
    showUsecaseSuccess: false,
    showUsecaseDanger: false,
    showUsecaseWarning: false,
    showUsecaseInfo: false,
  })

  const handleClose = (modal: ModalKey) => setModals({ ...modals, [modal]: false })
  const handleShow = (modal: ModalKey) => setModals({ ...modals, [modal]: true })

  const usecaseModals = [
    {
      variant: 'success',
      title: 'Congratulations!',
      icon: 'fi-rr-badge-check',
      body: (
        <>
          <p className="lead">
            You've successfully bought <strong>0.365 BTC</strong> for <strong>$350 USD</strong>.
          </p>
          <p>
            Learn when you receive bitcoin in your wallet.
            <Link to="#"> Click here</Link>
          </p>
        </>
      ),
      buttonText: 'OK',
      onClick: () => handleClose('showUsecaseSuccess'),
    },
    {
      variant: 'danger',
      title: 'Unable to Process!',
      icon: 'fi-rr-circle-xmark',
      body: (
        <>
          <p className="lead">
            We are sorry, we were unable to process your payment. Please try again later.
          </p>
          <p>
            If you need help, please contact us at <Link to="#">support@themeswift.com</Link>.
          </p>
        </>
      ),
      buttonText: 'Return',
      onClick: () => handleClose('showUsecaseDanger'),
    },
    {
      variant: 'warning',
      title: 'Reset your Password!',
      icon: 'fi-rr-triangle-warning',
      body: (
        <>
          <p className="lead">Enter your email and a reset link will be sent to you.</p>
          <form>
            <input
              type="email"
              className="form-control"
              placeholder="Email for password reset link"
              required
            />
          </form>
        </>
      ),
      buttonText: 'Reset Now',
      onClick: () => handleClose('showUsecaseWarning'),
    },
    {
      variant: 'info',
      title: 'Incorrect Information!',
      icon: 'fi-rr-info',
      body: (
        <>
          <p className="lead">
            In this example, you can see a form where you can request some additional information
            from the customer when they land on the app page.
          </p>
        </>
      ),
      buttonText: 'Continue',
      onClick: () => handleClose('showUsecaseInfo'),
    },
  ]

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {usecaseModals.map((modal, index) => (
          <React.Fragment key={index}>
            <Button
              variant={modal.variant}
              onClick={() =>
                handleShow(
                  `showUsecase${
                    modal.variant.charAt(0).toUpperCase() + modal.variant.slice(1)
                  }` as ModalKey,
                )
              }
            >
              Usecase {modal.variant.charAt(0).toUpperCase() + modal.variant.slice(1)}
            </Button>
            <Modal
              show={
                modals[
                  `showUsecase${
                    modal.variant.charAt(0).toUpperCase() + modal.variant.slice(1)
                  }` as ModalKey
                ]
              }
              onHide={() =>
                handleClose(
                  `showUsecase${
                    modal.variant.charAt(0).toUpperCase() + modal.variant.slice(1)
                  }` as ModalKey,
                )
              }
              centered
            >
              <Modal.Body className="modal-body text-center mx-auto py-4 px-4 py-md-16 px-md-16">
                <div
                  className={`bg-${modal.variant}-subtle text-${modal.variant} rounded-circle d-flex align-items-center justify-content-center mx-auto mb-5`}
                  style={{ width: '5rem', height: '5rem' }}
                >
                  <i className={`fi ${modal.icon} fs-2`}></i>
                </div>
                <h3 className={`mb-3 text-${modal.variant}`}>{modal.title}</h3>
                {modal.body}
                <div className="mt-4 mb-6">
                  <Link
                    to="#!"
                    className={`btn btn-${modal.variant}`}
                    style={{ width: '200px' }}
                    onClick={modal.onClick}
                  >
                    {modal.buttonText}
                  </Link>
                </div>
                <p className="fs-13 pt-4">
                  Earn up to $5 USD for each friend you refer!
                  <Link to="#"> Invite friends</Link>
                </p>
                <div className="btn-group gap-2">
                  <Link to="#!" className="btn rounded-circle btn-icon btn-md text-facebook">
                    <i className="fi fi-brands-facebook"></i>
                  </Link>
                  <Link to="#!" className="btn rounded-circle btn-icon btn-md text-twitter">
                    <i className="fi fi-brands-twitter"></i>
                  </Link>
                  <Link to="#!" className="btn rounded-circle btn-icon btn-md text-instagram">
                    <i className="fi fi-brands-instagram"></i>
                  </Link>
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>
        ))}
      </Stack>
    </>
  )
}

export default ModalUsecase
