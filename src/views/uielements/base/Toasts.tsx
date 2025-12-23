import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ToastAutohide,
  ToastBasic,
  ToastPlacement,
  ToastSoftColor,
  ToastSolidColor,
  ToastStacking,
} from '@/components/UiElements/Base/Toasts'
import { Link } from 'react-router-dom'

const Toasts = () => {
  return (
    <>
      <PageBreadcrumb title="Toasts" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Live</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastAutohide />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Stacking</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastStacking />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>solidColor</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastSolidColor />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>softColor</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastSoftColor />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Placement</Card.Title>
            </Card.Header>
            <Card.Body>
              <ToastPlacement />
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
                    <code>Overview</code>
                  </td>
                  <td>
                    Things to know when using the toast plugin:
                    <br />
                    <ul className="mb-0">
                      <li>
                        Toasts are opt-in for performance reasons, so
                        <strong>you must initialize them yourself</strong>.
                      </li>
                      <li>
                        Toasts will automatically hide if you do not specify
                        <code>autohide: false</code>.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Basic</code>
                  </td>
                  <td>
                    To encourage extensible and predictable toasts, we recommend a header and body.
                    Toast headers use
                    <code>display: flex</code>, allowing easy alignment of content thanks to our
                    margin and flexbox utilities.
                    <br />
                    Toasts are as flexible as you need and have very little required markup. At a
                    minimum, we require a single element to contain your “toasted” content and
                    strongly encourage a dismiss button.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Live example</code>
                  </td>
                  <td>
                    Click the button below to show a toast (positioned with our utilities in the
                    lower right corner) that has been hidden by default.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Stacking</code>
                  </td>
                  <td>
                    You can stack toasts by wrapping them in a toast container, which will
                    vertically add some spacing.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>liveStacking</code>
                  </td>
                  <td>
                    You can stack toasts by wrapping them in a toast container, which will
                    vertically add some spacing.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Custom content</code>
                  </td>
                  <td>
                    Customize your toasts by removing sub-components, tweaking them with{' '}
                    <code>utilities</code>"&gt;, or by adding your own markup. Here we've created a
                    simpler toast by removing the default <code>.toast-header</code>, adding a
                    custom hide icon from
                    <Link to="https://icons.getbootstrap.com/">Bootstrap Icons</Link>, and using
                    some <code>flexbox utilities</code> to adjust the layout.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Color schemes</code>
                  </td>
                  <td>
                    Building on the above example, you can create different toast color schemes with
                    our <code>color</code> and
                    <code>background</code> utilities. Here we've added
                    <code>.text-bg-primary</code> to the <code>.toast</code>, and then added{' '}
                    <code>.btn-close-white</code> to our close button. For a crisp edge, we remove
                    the default border with
                    <code>.border-0</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Placement</code>
                  </td>
                  <td>
                    Place toasts with custom CSS as you need them. The top right is often used for
                    notifications, as is the top middle. If you're only ever going to show one toast
                    at a time, put the positioning styles right on the <code>.toast</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/toasts/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/toasts/
                    </Link>
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

export default Toasts
