import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, Dropdown, DropdownDivider } from 'react-bootstrap'
import ActivityComponentShort from '@/components/Pages/UserProfile/Activity/ActivityComponentShort'

const RecentActivity = () => {
  return (
    <>
      <Card className="overflow-hidden">
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Recent Activity</Card.Title>
          <Dropdown className="ms-auto" drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-stats"></i>
                <span className="ms-3">All Channels</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <PerfectScrollbar style={{ maxHeight: '510px' }}>
          <ActivityComponentShort />
        </PerfectScrollbar>
      </Card>
    </>
  )
}

export default RecentActivity
