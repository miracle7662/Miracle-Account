import { useState } from 'react'
import { Form, Image, ToastContainer, Toast } from 'react-bootstrap'

import bell from '@/assets/images/general/bell.svg'

type ToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

const ToastPlacement = () => {
  const [position, setPosition] = useState<ToastPosition>('top-start')

  return (
    <>
      <div className="mb-3">
        <label htmlFor="selectToastPlacement">Toast position</label>
        <Form.Select
          id="selectToastPlacement"
          className="mt-2"
          onChange={(e) => setPosition(e.currentTarget.value as ToastPosition)}
        >
          {[
            'top-start',
            'top-center',
            'top-end',
            'middle-start',
            'middle-center',
            'middle-end',
            'bottom-start',
            'bottom-center',
            'bottom-end',
          ].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Form.Select>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-body-secondary position-relative"
        style={{ minHeight: '350px' }}
      >
        <ToastContainer className="p-3" position={position} style={{ zIndex: 1 }}>
          <Toast>
            <Toast.Header closeButton={false}>
              <Image src={bell} className="rounded me-3" />
              <h6 className="text-dark mb-0 me-auto">Toast Notification</h6>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  )
}

export default ToastPlacement
