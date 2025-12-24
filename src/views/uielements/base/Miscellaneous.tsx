import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card } from 'react-bootstrap'

import {
  MiscAlert,
  MiscBadge,
  MiscTooltip,
  MiscPopover,
} from '@/components/UiElements/Base/Miscellaneous'

const Miscellaneous = () => {
  return (
    <>
      <PageBreadcrumb title="Miscellaneous" subName="Base UI" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Alert</Card.Title>
            </Card.Header>
            <Card.Body>
              <MiscAlert />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Badge</Card.Title>
            </Card.Header>
            <Card.Body>
              <MiscBadge />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Tooltip</Card.Title>
            </Card.Header>
            <Card.Body>
              <MiscTooltip />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Popover</Card.Title>
            </Card.Header>
            <Card.Body>
              <MiscPopover />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
      </Row>
    </>
  )
}

export default Miscellaneous
