import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  AdvRadioEx1,
  AdvRadioEx2,
  AdvRadioEx3,
  AdvRadioEx4,
  AdvRadioEx5,
  AdvRadioEx6,
  AdvRadioEx7,
  AdvRadioEx8,
} from '@/components/UiElements/Forms/Radios'

const AdvRadio = () => {
  return (
    <>
      <PageBreadcrumb title="Radios" subName="Forms" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Example_1</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvRadioEx1 />
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
              <AdvRadioEx2 />
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
              <AdvRadioEx3 />
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
              <AdvRadioEx4 />
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
              <AdvRadioEx5 />
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
              <AdvRadioEx6 />
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
              <AdvRadioEx7 />
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
              <AdvRadioEx8 />
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
                    <code>Radio</code>
                  </td>
                  <td>
                    Use <code>(.radio-card)</code> class with <code>label</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Type</code>
                  </td>
                  <td>
                    Use input <code>[type="radio"]</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.check-icon</code>
                  </td>
                  <td>
                    Use <code>.check-icon</code> class for custom radio check.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.radio-card-wrapper</code>
                  </td>
                  <td>
                    Use <code>.radio-card-wrapper</code> class for wrapping radio check card.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.radio-card-content</code>
                  </td>
                  <td>
                    Use <code>.radio-card-content</code> class for wrapping radio check title, desc,
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

export default AdvRadio
