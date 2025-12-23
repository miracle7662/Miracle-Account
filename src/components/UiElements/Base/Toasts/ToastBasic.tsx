import { Image, Toast } from 'react-bootstrap'

import bell from '@/assets/images/general/bell.svg'

const ToastBasic = () => {
  return (
    <>
      <Toast>
        <Toast.Header>
          <Image src={bell} className="rounded me-3" />
          <h6 className="text-dark mb-0 me-auto">Toast Notification</h6>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>
    </>
  )
}

export default ToastBasic
