import PageBreadcrumb from '@/components/Common/PageBreadcrumb'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  AdvSwitchDefault,
  AdvSwitchSizing,
  AdvSwitchStacked,
  AdvSwitchThemes,
  AdvSwitchWithIcon,
  AdvSwitchWithText,
} from '@/components/UiElements/Forms/Switchs'

const AdvSwitch = () => {
  return (
    <>
      <PageBreadcrumb title="Switchs" subName="Forms" />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title>Default</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvSwitchDefault />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title>withText</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvSwitchWithText />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title>withIcon</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvSwitchWithIcon />
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
              <AdvSwitchSizing />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <Card.Title>Stacked</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvSwitchStacked />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title>Themes</Card.Title>
            </Card.Header>
            <Card.Body>
              <AdvSwitchThemes />
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
                    <code>switch</code>
                  </td>
                  <td>
                    Initialize <code>.switch</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>withText</code>
                  </td>
                  <td>
                    Use <code>withText</code> as: <code>switch</code>{' '}
                    <code>
                      &lt;span className="switch-on"&gt;on&lt;/span&gt;&lt;/code&gt; &lt;code&gt;
                      &lt;span className="switch-off"&gt;off&lt;/span&gt;
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>withIcon</code>
                  </td>
                  <td>
                    Use <code>withText</code> as: <code>switch</code>{' '}
                    <code>
                      &lt;span className="switch-on"&gt;&lt;i&gt;&lt; className="bi
                      bi-check"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/code&gt; &lt;code&gt; &lt;span
                      className="switch-off"&gt;&lt;i&gt;&lt; className="bi
                      bi-x"&gt;&lt;/i&gt;&lt;/span&gt;
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.switch-size</code>
                  </td>
                  <td>
                    Use <code>size</code> as: <code>sm</code>, <code>lg</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.switch-stacked-radio</code>
                  </td>
                  <td>
                    Use <code>stacked - radio</code> as: <code>switches-stacked-radio</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.switch-theme</code>
                  </td>
                  <td>
                    Use <code>theme</code> as: <code>colors</code> from mapping theme color mapping{' '}
                    <code>$theme-colors</code>
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

export default AdvSwitch
