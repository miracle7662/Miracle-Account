import { Link } from 'react-router-dom'
import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  NavTabBasic,
  NavTabDropdown,
  NavTabLineIcon,
  NavTabPills,
  NavTabRichContent,
  NavTabTheme,
  NavTabUnderline,
  NavTabWithIcon,
} from '@/components/UiElements/Base/NavTabs'

const NavTabs = () => {
  return (
    <>
      <PageBreadcrumb title="NavTabs" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Pills</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabPills />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Underline</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabUnderline />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Dropdowns</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabDropdown />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>withIcon</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabWithIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>lineWithIcon</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabLineIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Theme</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabTheme />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>richContent</Card.Title>
            </Card.Header>
            <Card.Body>
              <NavTabRichContent />
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
                    <code>Base nav</code>
                  </td>
                  <td>
                    Navigation available in Bootstrap share general markup and styles, from the base{' '}
                    <code>.nav</code> class to the active and disabled states. Swap modifier classes
                    to switch between each style.
                    <br />
                    The base <code>.nav</code> component is built with flexbox and provide a strong
                    foundation for building all types of navigation components. It includes some
                    style overrides (for working with lists), some link padding for larger hit
                    areas, and basic disabled styling.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Tabs</code>
                  </td>
                  <td>
                    Takes the basic nav from above and adds the <code>.nav-tabs</code> class to
                    generate a tabbed interface. Use them to create tabbable regions with our{' '}
                    <Link to="#javascript-behavior">tab JavaScript plugin</Link>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Pills</code>
                  </td>
                  <td>
                    Take that same HTML, but use <code>.nav-pills</code> instead:
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Underline </code>
                  </td>
                  <td>
                    Take that same HTML, but use <code>.nav-underline</code> instead:
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Fill and justify</code>
                  </td>
                  <td>
                    Force your <code>.nav</code>'s contents to extend the full available width one
                    of two modifier classes. To proportionately fill all available space with your{' '}
                    <code>.nav-item</code>s, use <code>.nav-fill</code>. Notice that all horizontal
                    space is occupied, but not every nav item has the same width.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Tabs with dropdowns</code>
                  </td>
                  <td>
                    Add dropdown menus with a little extra HTML and the{' '}
                    <Link to="/docs/5.3/components/dropdowns/#usage">
                      dropdowns JavaScript plugin
                    </Link>
                    .
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>JavaScript behavior</code>
                  </td>
                  <td>
                    Use the tab JavaScript plugin—include it individually or through the compiled{' '}
                    <code>bootstrap.js</code> file—to extend our navigational tabs and pills to
                    create tabbable panes of local content.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Vertical</code>
                  </td>
                  <td>
                    And with vertical pills. Ideally, for vertical tabs, you should also add{' '}
                    <code>aria-orientation="vertical"</code> to the tab list container.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>withIcon</code>
                  </td>
                  <td>Use icon tabs</td>
                </tr>
                <tr>
                  <td>
                    <code>Line</code>
                  </td>
                  <td>
                    Use <code>line</code> tabs as adding class <code>.nav-line-tabs</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Themes</code>
                  </td>
                  <td>
                    Use <code>themes</code> tabs as adding class{' '}
                    <code>.nav-theme-tabs-(colors)</code>. Colors can be use mapping color from{' '}
                    <code>($theme-colors)</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>richContent</code>
                  </td>
                  <td>
                    Use <code>richContent</code> tabs as adding class{' '}
                    <code>.nav-rich-content-tabs</code> and then add class{' '}
                    <code>.nav-rich-content-(colors)</code>. Colors can be use mapping color from{' '}
                    <code>($theme-colors)</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:{' '}
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/tabs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/tabs
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

export default NavTabs
