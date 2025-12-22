import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

interface OfficeProps {}

interface Location {
  city: string
  address: string
}

const locations: Location[] = [
  {
    city: 'Melbourne',
    address: '100 Flinders street <br /> Melbourne VIC 300, AU',
  },
  { city: 'Sydney', address: '944 Locust View Drive <br /> Novato, CA 94947' },
  { city: 'London', address: '2812 Southern Avenue <br /> Osceola, IA 50213' },
  {
    city: 'New York',
    address: '4299 Reppert Coal Road <br /> Detroit, MI 48219',
  },
  {
    city: 'Dhaka',
    address: '1678 Coal Road <br /> Brookside (Lycoming), PA 17963',
  },
  {
    city: 'Stockholm',
    address: '2630 Franklee Lane <br /> Philadelphia, PA 19108',
  },
]

const AboutOffice: React.FC<OfficeProps> = () => {
  const column1 = locations.slice(0, 3)
  const column2 = locations.slice(3, 6)

  const renderAddress = (address: string) => <div dangerouslySetInnerHTML={{ __html: address }} />

  return (
    <>
      <div className="pt-8 pt-md-12 pt-lg-16 px-4 px-md-6 bg-secondary-subtle rounded-3">
        <Row>
          <Col lg={6} className="mb-12">
            <p className="fs-12 fw-semibold mb-3 text-uppercase">Our Locations</p>
            <div className="h1 text-dark fw-bold mb-3 text-uppercase">Visit our office</div>
            <p className="lead">Find us at the locations.</p>
            <Link to="/other-pages/contact-us" className="icon-link icon-link-hover link-primary">
              <span>Contact Us</span>
              <i className="fi fi-rr-arrow-small-right bi"></i>
            </Link>
          </Col>
          <Col sm={6} lg={3}>
            {column1.map(({ city, address }, idx) => (
              <div key={idx} className="mb-6">
                <h5>{city}</h5>
                {renderAddress(address)}
              </div>
            ))}
          </Col>
          <Col sm={6} lg={3}>
            {column2.map(({ city, address }, idx) => (
              <div key={idx} className="mb-6">
                <h5>{city}</h5>
                {renderAddress(address)}
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default AboutOffice
