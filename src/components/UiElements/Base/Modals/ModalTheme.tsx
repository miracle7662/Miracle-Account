import { useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'

const ModalTheme = () => {
  const [modals, setModals] = useState([
    {
      show: false,
      handleClose: () => setModalState('Primary', false),
      handleShow: () => setModalState('Primary', true),
    },
    {
      show: false,
      handleClose: () => setModalState('Secondary', false),
      handleShow: () => setModalState('Secondary', true),
    },
    {
      show: false,
      handleClose: () => setModalState('Success', false),
      handleShow: () => setModalState('Success', true),
    },
    {
      show: false,
      handleClose: () => setModalState('Info', false),
      handleShow: () => setModalState('Info', true),
    },
    {
      show: false,
      handleClose: () => setModalState('Warning', false),
      handleShow: () => setModalState('Warning', true),
    },
    {
      show: false,
      handleClose: () => setModalState('Danger', false),
      handleShow: () => setModalState('Danger', true),
    },
  ])

  const setModalState = (key: any, value: any) => {
    setModals((prevModals) =>
      prevModals.map((modal, index) => {
        if (index === colors.indexOf(key)) {
          return { ...modal, show: value }
        }
        return modal
      }),
    )
  }

  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {colors.map((variant, idx) => (
          <Button
            key={idx}
            variant=""
            onClick={modals[idx].handleShow}
            className={`d-inline-block btn-${variant.toLowerCase()}`}
          >
            {variant}
          </Button>
        ))}
      </Stack>
      {colors.map((variant, idx) => (
        <Modal
          key={idx}
          show={modals[idx].show}
          onHide={modals[idx].handleClose}
          className={`modal-theme-${variant.toLowerCase()}`}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`${variant} Modal`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis et, necessitatibus
            cupiditate nemo corrupti possimus nesciunt ipsa numquam ea earum velit laboriosam eos
            omnis officia nam similique neque fuga pariatur. Vitae similique porro adipisci sunt?
            Sequi, qui dolorem veritatis nobis soluta deserunt illum iure. Asperiores neque eveniet
            veritatis voluptatem reprehenderit eius repellendus beatae cum ullam, fugit, vero rerum
            quis consequatur ratione, a facere voluptatum minus doloribus autem molestias.
            Temporibus deserunt ipsam unde neque impedit enim, fugiat ullam. Quo recusandae cumque
            nobis, placeat, modi voluptates nemo dicta ullam voluptate laudantium aliquid
            necessitatibus sit, aliquam deserunt atque dolorum molestiae? Tempora, nostrum nam?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="btn bg-white text-black"
              onClick={modals[idx].handleClose}
            >
              Close
            </Button>
            <Button variant="" className="btn bg-white text-black">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ))}
    </>
  )
}

export default ModalTheme
