import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { Row, Col, Card } from 'react-bootstrap'
import {
  NoUiSliderBasic,
  NoUiSliderKeyboard,
  NoUiSliderNonlinear,
  NoUiSliderPips,
  NoUiSliderSkipping,
} from '@/components/UiElements/Forms/NoUiSlider'

const NoUiSlider = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="NoUiSlider"
        subName="Forms"
        url={'https://mmarkelov.github.io/react-nouislider/'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Basic</Card.Title>
            </Card.Header>
            <Card.Body>
              <NoUiSliderBasic />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Non Linear</Card.Title>
            </Card.Header>
            <Card.Body>
              <NoUiSliderNonlinear />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Keyboard Support</Card.Title>
            </Card.Header>
            <Card.Body>
              <NoUiSliderKeyboard />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Clicking Pips</Card.Title>
            </Card.Header>
            <Card.Body className="pb-16">
              <NoUiSliderPips />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title>Skipping</Card.Title>
            </Card.Header>
            <Card.Body>
              <NoUiSliderSkipping />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
      </Row>
    </>
  )
}

export default NoUiSlider
