import Loading from '@/components/Misc/Loading'
import { Col, Row } from 'react-bootstrap'
import { GalleryOne, GalleryThree, GalleryTwo } from '.'

const AllsGallery = () => {
  return (
    <>
      <Row className="g-3 g-md-4">
        <Col lg={4}>
          <GalleryOne />
        </Col>
        <Col lg={4}>
          <GalleryTwo />
        </Col>
        <Col lg={4}>
          <GalleryThree />
        </Col>
        <Col lg={4}>
          <GalleryTwo />
        </Col>
        <Col lg={4}>
          <GalleryThree />
        </Col>
        <Col lg={4}>
          <GalleryOne />
        </Col>
        <Col lg={4}>
          <GalleryThree />
        </Col>
        <Col lg={4}>
          <GalleryTwo />
        </Col>
        <Col lg={4}>
          <GalleryThree />
        </Col>
        <Col sm={12} className="text-center">
          <Loading />
        </Col>
      </Row>
    </>
  )
}

export default AllsGallery
