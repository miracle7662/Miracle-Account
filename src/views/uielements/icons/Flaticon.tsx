import { Row, Col } from 'react-bootstrap'
import PageBreadcrumbButton from '@/components/Common/PageBreadcrumbButton'
import { IconsFlaticon } from '@/components/UiElements/Icons'

const Flaticon = () => {
  return (
    <>
      <PageBreadcrumbButton
        title="Flaticon"
        subName="Icons"
        url={'https://www.flaticon.com/uicons/interface-icons'}
      />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col xs={12}>
          <IconsFlaticon />
        </Col>
        {/* End:: Col */}
      </Row>
    </>
  )
}

export default Flaticon
