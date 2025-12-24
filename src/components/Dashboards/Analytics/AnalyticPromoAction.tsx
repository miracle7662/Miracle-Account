import BgCircleShapeStyle from '@/components/Misc/BgCircleShape'
import { Card, Button } from 'react-bootstrap'

const AnalyticPromoAction = () => {
  return (
    <Card
      className="px-4 py-24 d-flex flex-column align-items-center justify-content-center text-center"
      style={BgCircleShapeStyle}
    >
      <div
        className="mx-auto d-flex flex-column align-items-center justify-content-center"
        style={{ maxWidth: '320px' }}
      >
        <div className="text-primary mb-12">
          <i
            className="fi fi-rs-rocket-lunch"
            style={{ fontSize: '3rem', transform: 'rotate(320deg)', display: 'flex' }}
          ></i>
        </div>
        <h4 className="fw-bold mb-4">Grow faster with pro's help</h4>
        <p className="mb-8 text-muted">
          Experience top-notch features with our services and insights. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit.
        </p>
        <Button variant="primary">Get Started</Button>
      </div>
    </Card>
  )
}

export default AnalyticPromoAction
