import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import {
  flaticonRegularData,
  flaticonSolidData,
  flaticonStraightData,
  flaticonBoldData,
  flaticonBrandData,
} from './data/flaticonData'

const IconsFlaticon = () => {
  return (
    <>
      <style>
        {`
          .icon-holder i {
            color: red;
          }
        `}
      </style>
      <Card className="mb-3 mb-md-4">
        <Card.Header className="d-flex align-item-center justify-content-between">
          <Card.Title>Regular</Card.Title>
          <Link
            to="https://www.flaticon.com/icon-fonts-most-downloaded?weight=regular&type=uicon"
            target="_blank"
            className="ms-auto icon-link icon-link-hover link-primary"
          >
            <span>All Regular Icons</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 g-md-4">
            {flaticonRegularData.map(({ iconClass, label }) => (
              <Col key={label} xs={6} sm={4} md={3} lg={2}>
                <div className="icon-holder">
                  <i className={iconClass}></i>
                  <span className="label">{label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-3 mb-md-4">
        <Card.Header className="d-flex align-item-center justify-content-between">
          <Card.Title>Solid</Card.Title>
          <Link
            to="https://www.flaticon.com/icon-fonts-most-downloaded?weight=solid&type=uicon"
            target="_blank"
            className="ms-auto icon-link icon-link-hover link-primary"
          >
            <span>All Solid Icons</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 g-md-4">
            {flaticonSolidData.map(({ iconClass, label }) => (
              <Col key={label} xs={6} sm={4} md={3} lg={2}>
                <div className="icon-holder">
                  <i className={iconClass}></i>
                  <span className="label">{label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-3 mb-md-4">
        <Card.Header className="d-flex align-item-center justify-content-between">
          <Card.Title>Straight</Card.Title>
          <Link
            to="https://www.flaticon.com/icon-fonts-most-downloaded?corner=straight&type=uicon"
            target="_blank"
            className="ms-auto icon-link icon-link-hover link-primary"
          >
            <span>All Straight Icons</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 g-md-4">
            {flaticonStraightData.map(({ iconClass, label }) => (
              <Col key={label} xs={6} sm={4} md={3} lg={2}>
                <div className="icon-holder">
                  <i className={iconClass}></i>
                  <span className="label">{label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-3 mb-md-4">
        <Card.Header className="d-flex align-item-center justify-content-between">
          <Card.Title>Bold</Card.Title>
          <Link
            to="https://www.flaticon.com/icon-fonts-most-downloaded?weight=bold&type=uicon"
            target="_blank"
            className="ms-auto icon-link icon-link-hover link-primary"
          >
            <span>All Bold Icons</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 g-md-4">
            {flaticonBoldData.map(({ iconClass, label }) => (
              <Col key={label} xs={6} sm={4} md={3} lg={2}>
                <div className="icon-holder">
                  <i className={iconClass}></i>
                  <span className="label">{label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="d-flex align-item-center justify-content-between">
          <Card.Title>Brand</Card.Title>
          <Link
            to="https://www.flaticon.com/icon-fonts-most-downloaded?brands=1&type=uicon"
            target="_blank"
            className="ms-auto icon-link icon-link-hover link-primary"
          >
            <span>All Brand Icons</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 g-md-4">
            {flaticonBrandData.map(({ iconClass, label }) => (
              <Col key={label} xs={6} sm={4} md={3} lg={2}>
                <div className="icon-holder">
                  <i className={iconClass}></i>
                  <span className="label">{label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default IconsFlaticon