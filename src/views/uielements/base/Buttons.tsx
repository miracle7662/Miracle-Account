import { Link } from 'react-router-dom'
import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ButtonBrandsWithIcon,
  ButtonDefatult,
  ButtonGradient,
  ButtonIconSizing,
  ButtonIconSolid,
  ButtonOutline,
  ButtonSoft,
  ButtonSoftline,
  ButtonSofttext,
  ButtonSolidtext,
  ButtonWithIcon,
  ButtonWithIconSoft,
  ButtonIconBrands,
  ButtonSizing,
} from '@/components/UiElements/Base/Buttons'

const Buttons = () => {
  return (
    <>
      <PageBreadcrumb title="Buttons" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Variant</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonDefatult />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Outline</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonOutline />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Soft</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonSoft />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Softline</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonSoftline />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Solidtext</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonSolidtext />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Softtext</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonSofttext />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Gradient</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonGradient />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>IconSolid</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonWithIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>withIconSoft</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonWithIconSoft />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>withIcon</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonIconSolid />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>iconSizing</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonIconSizing />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>iconBrands</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonIconBrands />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>socialBrands</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonBrandsWithIcon />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title>Sizings</Card.Title>
            </Card.Header>
            <Card.Body>
              <ButtonSizing />
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
                    <code>Buttons</code>
                  </td>
                  <td>
                    Bootstrap has a base <code>.btn</code> class that sets up basic styles such as
                    padding and content alignment. By default, <code>.btn</code> controls have a
                    transparent border and background color, and lack any explicit focus and hover
                    styles.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Variants</code>
                  </td>
                  <td>
                    Bootstrap includes several button variants, each serving its own semantic
                    purpose, with a few extras thrown in for more control.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Outline</code>
                  </td>
                  <td>
                    In need of a button, but not the hefty background colors they bring? Replace the
                    default modifier classes with the <code>.btn-outline-*</code> ones to remove all
                    background images and colors on any button.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Sizes</code>
                  </td>
                  <td>
                    Fancy larger or smaller buttons? Add <code>.btn-lg</code> or{' '}
                    <code>.btn-sm</code> for additional sizes.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Group</code>
                  </td>
                  <td>
                    Wrap a series of buttons with <code>.btn</code> in <code>.btn-group</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>Documentations</code>
                  </td>
                  <td>
                    Please visit:{' '}
                    <Link
                      to="https://react-bootstrap.netlify.app/docs/components/buttons"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://react-bootstrap.netlify.app/docs/components/buttons
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

export default Buttons
