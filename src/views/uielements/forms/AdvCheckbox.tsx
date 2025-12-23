import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  AdvCheckboxEx1,
  AdvCheckboxEx2,
  AdvCheckboxEx3,
  AdvCheckboxEx4,
  AdvCheckboxEx5,
  AdvCheckboxEx6,
  AdvCheckboxEx7,
  AdvCheckboxEx8,
} from '@/components/UiElements/Forms/Checkboxs'

const AdvCheckbox = () => {
  return (
    <>
      <PageBreadcrumb title="Checkboxs" subName="Forms" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_1</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx1 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_2</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx2 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_3</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx3 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_4</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx4 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_5</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx5 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_6</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx6 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_7</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx7 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_8</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvCheckboxEx8 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Options</Card.Title>
            </Card.Header>
            <Table className="mb-0" responsive>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>Checkbox</code>
                  </td>
                  <td>
                    Use <code>.check-card</code> class with <code>label</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Type</code>
                  </td>
                  <td>
                    Use input <code>[type="checkbox"]</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.check-icon</code>
                  </td>
                  <td>
                    Use <code>.check-icon</code> class for custom check.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.check-card-wrapper</code>
                  </td>
                  <td>
                    Use <code>.check-card-wrapper</code> class for wrapping check card.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.check-card-content</code>
                  </td>
                  <td>
                    Use <code>.check-card-content</code> class for wrapping check title, desc,
                    price, etc.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Additional</code>
                  </td>
                  <td>
                    Use <code>addinional</code> class or components as per your requirements.
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        {/* End:: Documentation Col */}
      </Row>
    </>
  )
}

export default AdvCheckbox
