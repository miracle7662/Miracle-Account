import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card, Table } from 'react-bootstrap'

import {
  ProgressbarAnimationReactMove,
  ProgressbarAnimationReturning,
  ProgressbarAnimationSpeed,
  ProgressbarBasic,
  ProgressbarFilled,
  ProgressbarLinecap,
} from '@/components/UiElements/Charts/Progressbar'

const Progressbar = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="ProgressBar"
        subName="Charts"
        url={'https://www.kevinqi.com/react-circular-progressbar/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col md={6} lg={4} xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <ProgressbarBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col md={6} lg={4} xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Linecap</Card.Title>
            </Card.Header>
            <Card.Body>
              <ProgressbarLinecap />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col md={6} lg={4} xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Filled</Card.Title>
            </Card.Header>
            <Card.Body>
              <ProgressbarFilled />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col md={6} lg={4} xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Animation Speed</Card.Title>
            </Card.Header>
            <Card.Body>
              <ProgressbarAnimationSpeed />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col md={6} lg={4} xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Animation Returning</Card.Title>
            </Card.Header>
            <Card.Body>
              <ProgressbarAnimationReturning />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col md={6} lg={4} xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title>Animation React Move</Card.Title>
            </Card.Header>
            <Card.Body>
              <ProgressbarAnimationReactMove />
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
                  <th>Option</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>value</td>
                  <td>Number</td>
                  <td>Indeterminate</td>
                  <td>Current value</td>
                </tr>
                <tr>
                  <td>min</td>
                  <td>Number</td>
                  <td>0</td>
                  <td>Minimum value</td>
                </tr>
                <tr>
                  <td>max</td>
                  <td>Number</td>
                  <td>1</td>
                  <td>Maximum value</td>
                </tr>
                <tr>
                  <td>startAngle</td>
                  <td>Number</td>
                  <td>0</td>
                  <td>
                    Starting angle in degrees. Angle of 0 points straight up. Direction depends on{' '}
                    <code>anticlockwise</code>.
                  </td>
                </tr>
                <tr>
                  <td>anticlockwise</td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Whether to rotate anti-clockwise (true) or clockwise (false)</td>
                </tr>
                <tr>
                  <td>unconstrained</td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>
                    Whether the value should be constrained between <code>min</code> and{' '}
                    <code>max</code>. If false, values over <code>max</code> will be truncated to{' '}
                    <code>max</code> and values under <code>min</code> will be set to{' '}
                    <code>min</code>.
                  </td>
                </tr>
                <tr>
                  <td>indeterminateText</td>
                  <td>String</td>
                  <td>'?'</td>
                  <td>Text to display as the value when it is indeterminate</td>
                </tr>
                <tr>
                  <td>textFormat</td>
                  <td>String or Function</td>
                  <td>'horizontal'</td>
                  <td>
                    Text layout for value, min, max. <br />
                    You can pass either one of the possible keywords: <br />
                    <code>horizontal</code> - <samp>value/max</samp> <br />
                    <code>vertical</code> - value is shown over max <br />
                    <code>percent</code> - <samp>value%</samp> <br />
                    <code>value</code> - only value is shown <br />
                    <code>valueOnCircle</code> - the value is painted on top of the filled region on
                    the circle <br />
                    <code>none</code> - no text is shown. <br />
                    Alternatively you can provide your own function, which will be called each time
                    progress is updated with value and max as arguments, and is expected to return a
                    string of HTML to insert in the center of the progress circle.{' '}
                    <strong>
                      Attention! The string returned from your function will be inserted as HTML. Do
                      not pass any dynamic content such as variables coming from elsewhere to avoid
                      XSS vulnerability.
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>animation</td>
                  <td>String or Function</td>
                  <td>'easeInOutCubic'</td>
                  <td>
                    Animation easing function. Can be a string keyword (see the table below for
                    available easings) or <code>'none'</code>.
                    <br />
                    Alternatively, you can pass your own function with the signature <br />
                    <code>function(time, startAngle, angleDiff, duration)</code>
                    .<br />
                    The function will be called on each animation frame with the current time
                    (milliseconds since animation start), starting angle, difference in angle (i.e.
                    endAngle - startAngle) and animation duration as arguments, and must return the
                    current angle.
                  </td>
                </tr>
                <tr>
                  <td>animationDuration</td>
                  <td>Number</td>
                  <td>600</td>
                  <td>Animation duration in milliseconds</td>
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

export default Progressbar
