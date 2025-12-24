import { useState } from 'react'
import { Button, Image, ToastContainer, Toast } from 'react-bootstrap'

import bell from '@/assets/images/general/bell.svg'

const ToastAutohide = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => setShow(true)}>Show Live Toast</Button>

      <ToastContainer className="p-3 position-fixed" position="top-end" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <Image src={bell} className="rounded me-3" />
            <h6 className="text-dark mb-0 me-auto">Toast Notification</h6>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default ToastAutohide
