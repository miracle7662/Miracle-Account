import PageDashBreadcrumb from '@/components/Common/PageDashBreadcrumb'
import { Col, Row } from 'react-bootstrap'
import {
  CrmMiniCard,
  LeadOverview,
  ProjectStatisticChart,
} from '@/components/Dashboards/CRM'

const CRM = () => {
  return (
    <>
      <PageDashBreadcrumb title="Miracle Accounting Software" subName="Dashboards" />
      <Row className="g-3 g-md-4">
        <Col xl={12}>
          <CrmMiniCard />
        </Col>
        <Col xl={8}>
          <ProjectStatisticChart />
        </Col>
        <Col xl={4}>
          <LeadOverview />
        </Col>
        
      </Row>
    </>
  )
}

export default CRM
