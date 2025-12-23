import { Row, Col, Card } from 'react-bootstrap'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { IconsFeather } from '@/components/UiElements/Icons'

const Feather = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Feather"
        subName="Icons"
        url={'https://react-icons.github.io/react-icons/icons/fi/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <IconsFeather />
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col xs={12}>
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

export default Feather
