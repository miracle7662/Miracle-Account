import { Link } from 'react-router-dom'
import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ModalLive,
  ModalPosition,
  ModalTheme,
  ModalUsecase,
} from '@/components/UiElements/Base/Modals'

const Modals = () => {
  return (
    <>
      <PageBreadcrumb title="Modals" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Modal Live</Card.Title>
            </Card.Header>
            <Card.Body>
              <ModalLive />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Modal Theme</Card.Title>
            </Card.Header>
            <Card.Body>
              <ModalTheme />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Modal Usecase</Card.Title>
            </Card.Header>
            <Card.Body>
              <ModalUsecase />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Modal Position</Card.Title>
            </Card.Header>
            <Card.Body>
              <ModalPosition />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Documentation Col */}
        <Col sm={12}>
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
                    <code>Modal components</code>
                  </td>
                  <td>
                    Below is a <em>static</em> modal example (meaning its
                    <code>position</code> and <code>display</code> have been overridden). Included
                    are the modal header, modal body (required for <code>padding</code>), and modal
                    footer (optional). We ask that you include modal headers with dismiss actions
                    whenever possible, or provide another explicit dismiss action.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Live demo</code>
                  </td>
                  <td>
                    Toggle a working modal demo by clicking the button below. It will slide down and
                    fade in from the top of the page.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Static backdrop</code>
                  </td>
                  <td>
                    When backdrop is set to static, the modal will not close when clicking outside
                    of it. Click the button below to try it.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Scrolling long content </code>
                  </td>
                  <td>
                    When modals become too long for the user's viewport or device, they scroll
                    independent of the page itself. Try the demo below to see what we mean.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Vertically centered</code>
                  </td>
                  <td>
                    Add <code>.modal-dialog-centered</code> to
                    <code>.modal-dialog</code> to vertically center the modal.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Tooltips and popovers</code>
                  </td>
                  <td>
                    <Link to="/docs/5.3/components/tooltips/">Tooltips</Link>
                    and
                    <Link to="/docs/5.3/components/popovers/">popovers</Link>
                    can be placed within modals as needed. When modals are closed, any tooltips and
                    popovers within are also automatically dismissed.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Toggle between modals</code>
                  </td>
                  <td>
                    Toggle between multiple modals with some clever placement of the{' '}
                    <code>data-bs-target</code> and
                    <code>data-bs-toggle</code> attributes. For example, you could toggle a password
                    reset modal from within an already open sign in modal.
                    <strong>Please note multiple modals cannot be open at the same time</strong>
                    —this method simply toggles between two separate modals.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Optional sizes</code>
                  </td>
                  <td>
                    Modals have three optional sizes, available via modifier classes to be placed on
                    a <code>.modal-dialog</code>. These sizes kick in at certain breakpoints to
                    avoid horizontal scrollbars on narrower viewports. <br />
                    <br />
                    <Table className="table" responsive>
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Class</th>
                          <th>Modal max-width</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Small</td>
                          <td>
                            <code>.modal-sm</code>
                          </td>
                          <td>
                            <code>300px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>Default</td>
                          <td>
                            <span className="text-body-secondary">None</span>
                          </td>
                          <td>
                            <code>500px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>Large</td>
                          <td>
                            <code>.modal-lg</code>
                          </td>
                          <td>
                            <code>800px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>Extra large</td>
                          <td>
                            <code>.modal-xl</code>
                          </td>
                          <td>
                            <code>1140px</code>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    Our default modal without modifier class constitutes the “medium” size modal.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Fullscreen Modal</code>
                  </td>
                  <td>
                    Another override is the option to pop up a modal that covers the user viewport,
                    available via modifier classes that are placed on a <code>.modal-dialog</code>.{' '}
                    <br />
                    <br />
                    <Table className="table" responsive>
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th>Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <code>.modal-fullscreen</code>
                          </td>
                          <td>Always</td>
                        </tr>
                        <tr>
                          <td>
                            <code>.modal-fullscreen-sm-down</code>
                          </td>
                          <td>
                            <code>576px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <code>.modal-fullscreen-md-down</code>
                          </td>
                          <td>
                            <code>768px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <code>.modal-fullscreen-lg-down</code>
                          </td>
                          <td>
                            <code>992px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <code>.modal-fullscreen-xl-down</code>
                          </td>
                          <td>
                            <code>1200px</code>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <code>.modal-fullscreen-xxl-down</code>
                          </td>
                          <td>
                            <code>1400px</code>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Themes</code>
                  </td>
                  <td>
                    Use <code>modal-theme-(color)</code> by adding class with
                    <code>.modal</code> class as: theme-color name from colors mapping{' '}
                    <code>$theme-colors</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Usecase</code>
                  </td>
                  <td>See the example for best practices.</td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/modal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/modal
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

export default Modals
