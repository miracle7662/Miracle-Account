import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card } from 'react-bootstrap'

import { IconsFontAwesome } from '@/components/UiElements/Icons'

const FontAwesome = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="FontAwesome"
        subName="Icons"
        url={'https://react-icons.github.io/react-icons/icons/fa6/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col sm={12}>
          <IconsFontAwesome />
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

export default FontAwesome
