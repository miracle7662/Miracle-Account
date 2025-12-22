import { Image, ToastContainer, Toast } from 'react-bootstrap'

import bell from '@/assets/images/general/bell.svg'

const ToastStacking = () => {
  return (
    <>
      <ToastContainer className="position-static">
        <Toast>
          <Toast.Header>
            <Image src={bell} className="rounded me-3" />
            <h6 className="text-dark mb-0 me-auto">Toast Notification</h6>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>See? Just like this.</Toast.Body>
        </Toast>
        <Toast>
          <Toast.Header>
            <Image src={bell} className="rounded me-3" />
            <h6 className="text-dark mb-0 me-auto">Toast Notification</h6>
            <small className="text-muted">2 seconds ago</small>
          </Toast.Header>
          <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default ToastStacking
