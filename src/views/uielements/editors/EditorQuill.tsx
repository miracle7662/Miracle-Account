import { Link } from 'react-router-dom'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import { EditorFull, EditorSnow } from '@/components/UiElements/Editors/Quill'

const EditorQuill = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Quill Editor"
        subName="Editors"
        url={'https://zenoamaro.github.io/react-quill/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Snow</Card.Title>
            </Card.Header>
            <Card.Body>
              <EditorSnow />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Full Editor</Card.Title>
            </Card.Header>
            <Card.Body>
              <EditorFull />
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
                <code>npm install react-quill --save</code>
              </ListGroup.Item>
              <ListGroup.Item>
                For full documentation please visit the link:
                <Link to="https://github.com/zenoamaro/react-quill#readme" target="_blank">
                  https://github.com/zenoamaro/react-quill#readme
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

export default EditorQuill
