import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

import { EditorTyneMCE, EditorTyneMCEFull } from '@/components/UiElements/Editors/TyneMCE'

const EditorTinyMCE = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="TinyMCE"
        subName="Editors"
        url={'https://www.tiny.cloud/docs/integrations/react/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <EditorTyneMCE />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Full Featured</Card.Title>
            </Card.Header>
            <Card.Body>
              <EditorTyneMCEFull />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col xs={12}>
          <Card className="border-0">
            <ListGroup>
              <ListGroup.Item>
                <h5 className="mb-0">Uses Instruction</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                Quill is delivered primarily via npm.
                <code>npm install --save @tinymce/tinymce-react</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://www.tiny.cloud/docs/integrations/react/" target="_blank">
                  https://www.tiny.cloud/docs/integrations/react/
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* End:: Documentation Col */}
      </Row>
    </>
  )
}

export default EditorTinyMCE
