import TitleHelmet from '@/components/Common/TitleHelmet'
import ProfileCover from '@/components/Pages/UserProfile/ProfileCover'
import { Card, Col, Row } from 'react-bootstrap'

import {
  OverviewIntroduction,
  OverviewCompleation,
  OverviewSkills,
  OverviewConnection,
  OverviewAbout,
  OverviewExperiences,
  OverviewInterested,
} from '@/components/Pages/UserProfile/Overview'

const Overview = () => {
  return (
    <>
      <TitleHelmet title="Overview" />
      <ProfileCover />
      <Row className="g-3 g-md-4">
        {/* Start:: Col */}
        <Col lg={5} xxl={4}>
          <Card className="mb-3 mb-md-4">
            <Card.Body>
              <OverviewCompleation />
            </Card.Body>
          </Card>
          <Card className="mb-3 mb-md-4">
            <Card.Body>
              <OverviewIntroduction />
            </Card.Body>
          </Card>
          <Card className="mb-3 mb-md-4">
            <Card.Body>
              <OverviewSkills />
            </Card.Body>
          </Card>
          <Card className="mb-0">
            <Card.Body>
              <OverviewConnection />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
        {/* Start:: Col */}
        <Col lg={7} xxl={8}>
          <Card className="mb-3 mb-md-4">
            <Card.Body>
              <OverviewAbout />
            </Card.Body>
          </Card>
          <Card className="mb-3 mb-md-4">
            <Card.Body>
              <OverviewExperiences />
            </Card.Body>
          </Card>
          <Card className="mb-0">
            <Card.Body>
              <OverviewInterested />
            </Card.Body>
          </Card>
        </Col>
        {/* End:: Col */}
      </Row>
    </>
  )
}

export default Overview
