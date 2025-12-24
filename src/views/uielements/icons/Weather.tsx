import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card } from 'react-bootstrap'

import { IconsWeather } from '@/components/UiElements/Icons'

const Weather = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Weather"
        subName="Icons"
        url={'https://react-icons.github.io/react-icons/icons/wi/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col sm={12}>
          <IconsWeather />
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title>Installation</Card.Title>
            </Card.Header>
            <Card.Body>
              <code>npm install react-icons --save</code>
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Documentation Col */}
      </Row>
    </>
  )
}

export default Weather
