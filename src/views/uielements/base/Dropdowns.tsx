import { Link } from 'react-router-dom'
import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  DropdownBasic,
  DropdownMenuSizing,
  DropdownSplit,
  DropdownTheme,
  DropdownThemeSoft,
  DropdownWithIcon,
} from '@/components/UiElements/Base/Dropdowns'

const Dropdowns = () => {
  return (
    <>
      <PageBreadcrumb title="Dropdowns" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropdownBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Split</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropdownSplit />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>withIcon & Close</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropdownWithIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>menuSizing</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropdownMenuSizing />
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
              <DropdownTheme />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>ThemeSoft</Card.Title>
            </Card.Header>
            <Card.Body>
              <DropdownThemeSoft />
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
                    <code>Dropdown</code>
                  </td>
                  <td>
                    Wrap the dropdown's toggle (your button or link) and the dropdown menu within{' '}
                    <code>.dropdown</code>, or another element that declares{' '}
                    <code>position: relative;</code>. Ideally, you should use a{' '}
                    <code>&lt;button&gt;</code>
                    element as the dropdown trigger, but the plugin will work with{' '}
                    <code>&lt;a&gt;</code> elements as well. The examples shown here use semantic{' '}
                    <code>&lt;ul&gt;</code> elements where appropriate, but custom markup is
                    supported.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Split button</code>
                  </td>
                  <td>
                    Similarly, create split button dropdowns with virtually the same markup as
                    single button dropdowns, but with the addition of{' '}
                    <code>.dropdown-toggle-split</code> for proper spacing around the dropdown
                    caret.
                    <br />
                    We use this extra class to reduce the horizontal
                    <code>padding</code> on either side of the caret by 25% and remove the{' '}
                    <code>margin-left</code> that's added for regular button dropdowns. Those extra
                    changes keep the caret centered in the split button and provide a more
                    appropriately sized hit area next to the main button.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Sizing</code>
                  </td>
                  <td>
                    Button dropdowns work with buttons of all sizes, including default and split
                    dropdown buttons.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Dark dropdowns</code>
                  </td>
                  <td>
                    Opt into darker dropdowns to match a dark navbar or custom style by adding{' '}
                    <code>.dropdown-menu-dark</code> onto an existing <code>.dropdown-menu</code>.
                    No changes are required to the dropdown items.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Centered</code>
                  </td>
                  <td>
                    Make the dropdown menu centered below the toggle with
                    <code>.dropdown-center</code> on the parent element.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Dropup</code>
                  </td>
                  <td>
                    Trigger dropdown menus above elements by adding
                    <code>.dropup</code> to the parent element.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Dropup centered</code>
                  </td>
                  <td>
                    Make the dropup menu centered above the toggle with
                    <code>.dropup-center</code> on the parent element.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Dropend</code>
                  </td>
                  <td>
                    Trigger dropdown menus at the right of the elements by adding{' '}
                    <code>.dropend</code> to the parent element.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Dropstart</code>
                  </td>
                  <td>
                    Trigger dropdown menus at the left of the elements by adding
                    <code>.dropstart</code> to the parent element.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Menu alignment</code>
                  </td>
                  <td>
                    By default, a dropdown menu is automatically positioned 100% from the top and
                    along the left side of its parent. You can change this with the directional{' '}
                    <code>.drop*</code>
                    classes, but you can also control them with additional modifier classes. <br />
                    Add <code>.dropdown-menu-end</code> to a<code>.dropdown-menu</code> to right
                    align the dropdown menu. Directions are mirrored when using Bootstrap in RTL,
                    meaning <code>.dropdown-menu-end</code> will appear on the left side.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Responsive alignment</code>
                  </td>
                  <td>
                    If you want to use responsive alignment, disable dynamic positioning by adding
                    the
                    <code>data-bs-display="static"</code> attribute and use the responsive variation
                    classes. <br />
                    To align <strong>right</strong> the dropdown menu with the given breakpoint or
                    larger, add
                    <code>.dropdown-menu(-sm -md -lg -xl -xxl)-end</code>.
                    <br />
                    To align <strong>left</strong> the dropdown menu with the given breakpoint or
                    larger, add
                    <code>.dropdown-menu-end</code> and
                    <code>.dropdown-menu(-sm -md -lg -xl -xxl)-start</code>.
                    <br />
                    Note that you don't need to add a<code>data-bs-display="static"</code> attribute
                    to dropdown buttons in navbars, since Popper isn't used in navbars.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Alignment options</code>
                  </td>
                  <td>
                    Taking most of the options shown above, here's a small kitchen sink demo of
                    various dropdown alignment options in one place.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Forms</code>
                  </td>
                  <td>
                    Put a form within a dropdown menu, or make it into a dropdown menu, and use
                    <a href="/docs/5.3/utilities/spacing/">margin or padding utilities</a>
                    to give it the negative space you require.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Dropdown options</code>
                  </td>
                  <td>
                    Use <code>data-bs-offset</code> or
                    <code>data-bs-reference</code> to change the location of the dropdown.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Auto close behavior </code>
                  </td>
                  <td>
                    By default, the dropdown menu is closed when clicking inside or outside the
                    dropdown menu. You can use the
                    <code>autoClose</code> option to change this behavior of the dropdown.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>withIcon</code>
                  </td>
                  <td>
                    Use <code>(icon)</code> with <code>(dropdown-item)</code> as per your
                    requiremnts.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>menuSizing</code>
                  </td>
                  <td>
                    Use <code>(menuSizing)</code> with
                    <code>(dropdown-menu)</code> as: <code>.dropdown-sm</code>,
                    <code>.dropdown-md</code>, <code>.dropdown-lg</code>,<code>.dropdown-xl</code>,{' '}
                    <code>.dropdown-xxl</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Theme</code>
                  </td>
                  <td>
                    Use <code>(Theme)</code> with <code>(.dropdown)</code> as like:{' '}
                    <code>.dropdown-primary</code>,<code>.dropdown-secondary</code>,
                    <code>.dropdown-success</code>, <code>.dropdown-info</code>,
                    <code>.dropdown-warning</code>,<code>.dropdown-danger</code>, etc. Can use any
                    <code>($thems-colors)</code> mapping colors.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>ThemeSoft</code>
                  </td>
                  <td>
                    Use <code>(ThemeSoft)</code> with <code>(.dropdown)</code>
                    as like: <code>.dropdown-soft-primary</code>,
                    <code>.dropdown-soft-secondary</code>,<code>.dropdown-soft-success</code>,
                    <code>.dropdown-soft-info</code>,<code>.dropdown-soft-warning</code>,
                    <code>.dropdown-soft-danger</code>, etc. Can use any
                    <code>($thems-colors)</code> mapping colors.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/dropdowns"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/dropdowns
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

export default Dropdowns
