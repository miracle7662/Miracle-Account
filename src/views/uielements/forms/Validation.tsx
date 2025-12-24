import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ValidationNativeHTML5,
  ValidationServerRendered,
  ValidationTooltips,
} from '@/components/UiElements/Forms/Validation'

const Validation = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Validations"
        subName="Forms"
        url={'https://react-bootstrap.netlify.app/docs/forms/validation'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Native HTML5</Card.Title>
            </Card.Header>
            <Card.Body>
              <ValidationNativeHTML5 />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Server Rendered</Card.Title>
            </Card.Header>
            <Card.Body>
              <ValidationServerRendered />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Validation Tooltips</Card.Title>
            </Card.Header>
            <Card.Body>
              <ValidationTooltips />
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
                  <th>Name</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-monospace">type </td>
                  <td className="font-monospace">
                    <div>
                      <code>'valid'</code>
                      <span> | </span>
                      <code>'invalid'</code>
                    </div>
                  </td>
                  <td>
                    <code>'valid'</code>
                  </td>
                  <td>
                    <span>Specify whether the feedback is for valid or invalid fields</span>
                  </td>
                </tr>
                <tr>
                  <td className="font-monospace">tooltip </td>
                  <td className="font-monospace">
                    <div>bool</div>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>
                    <span>Display feedback as a tooltip.</span>
                  </td>
                </tr>
                <tr>
                  <td className="font-monospace">as </td>
                  <td className="font-monospace">
                    <div>elementType</div>
                  </td>
                  <td>
                    <code>'div'</code>
                  </td>
                  <td>
                    <span>You can use a custom element type for this component.</span>
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

export default Validation
