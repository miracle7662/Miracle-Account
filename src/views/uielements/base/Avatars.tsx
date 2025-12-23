import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  AvatarDefault,
  AvatarGradient,
  AvatarGroup,
  AvatarStatus,
  AvatarShape,
  AvatarSizing,
  AvatarSoft,
  AvatarSolid,
} from '@/components/UiElements/Base/Avatars'

const Avatars = () => {
  return (
    <>
      <PageBreadcrumb title="Avatars" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Default</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarDefault />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Solid</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarSolid />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Gradient</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarGradient />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Soft</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarSoft />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Shape</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarShape />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Status</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarStatus />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Group</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarGroup />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Sizing</Card.Title>
            </Card.Header>
            <Card.Body>
              <AvatarSizing />
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
                    <code>.avatar</code>
                  </td>
                  <td>
                    Initialize user <code>avatar</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.avatar-(size)</code>
                  </td>
                  <td>
                    Use <code>(size)</code> as: <code>xs</code>, <code>sm</code>, <code>md</code>,
                    <code>lg</code>, <code>xl</code>,<code>xxl</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.bg-(color)</code>
                  </td>
                  <td>
                    Use avatar solid color <code>(colors)</code> from
                    <code>bg-colors</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.bg-(color)-subtle</code>
                  </td>
                  <td>
                    Use avatar soft color <code>(colors)</code> from
                    <code>bg-colors-subtle</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.rounded-(shape)</code>
                  </td>
                  <td>
                    Use <code>(shape)</code> as: <code>circle</code>,<code>rounded</code>,{' '}
                    <code>0</code>. Default value is
                    <code>circle</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.avatar-status (status)</code>
                  </td>
                  <td>
                    Use <code>(status)</code> as: <code>active</code>,<code>busy</code>,{' '}
                    <code>inactive</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.avatar-group .avatar-group-(size)</code>
                  </td>
                  <td>
                    Use <code>(size)</code> as: <code>xs</code>, <code>sm</code>, <code>md</code>,
                    <code>lg</code>, <code>xl</code>,<code>xxl</code>
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

export default Avatars
