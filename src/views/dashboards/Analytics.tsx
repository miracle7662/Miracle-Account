import { Col, Row } from 'react-bootstrap'
import PageDashBreadcrumb from '@/components/Common/PageDashBreadcrumb'
import {
  BrowserUsed,
  CampaignState,
  SalesLocation,
  StatisticsMiniCard,
  SessionDevice,
  AnalyticPromoAction,
  VisitorsOverview,
  AnalyticProgress,
} from '@/components/Dashboards/Analytics'

const Analytics = () => {
  return (
    <>
      <PageDashBreadcrumb title="Analytics" subName="Dashboards" />
      <Row className="g-3 g-md-4">
        <Col xl={12}>
          <StatisticsMiniCard />
        </Col>
        <Col xl={8}>
          <VisitorsOverview />
        </Col>
        <Col xl={4}>
          <AnalyticPromoAction />
        </Col>
        <Col xl={4}>
          <SessionDevice />
        </Col>
        <Col xl={8}>
          <CampaignState />
        </Col>
        <Col xl={4}>
          <BrowserUsed />
        </Col>
        <Col xl={4}>
          <SalesLocation />
        </Col>
        <Col xl={4}>
          <AnalyticProgress />
        </Col>
      </Row>
    </>
  )
}

export default Analytics
