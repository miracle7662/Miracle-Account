import { Col, Image, Row, Toast } from 'react-bootstrap'

import bell from '@/assets/images/general/bell.svg'

const ToastSoftColor = () => {
  const colors = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger']

  return (
    <>
      <Row className="g-4">
        {colors.map((variant) => (
          <Col lg={4}>
            <Toast key={variant} className="align-items-center border-0">
              <Toast.Header
                className={`rounded-3 bg-${variant.toLowerCase()}-subtle`}
                closeVariant="white"
              >
                <Image src={bell} className="rounded me-3" />
                <h6 className={`mb-0 me-auto text-${variant.toLowerCase()}`}>Toast Notification</h6>
              </Toast.Header>
            </Toast>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ToastSoftColor
