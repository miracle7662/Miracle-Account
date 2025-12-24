import { Link } from 'react-router-dom'
import { Card, Col, Dropdown, DropdownDivider, Row } from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

const BillingStats = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  return (
    <>
      <Card>
        <Card.Header className="py-1 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Billing Stats</Card.Title>
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
        <Card.Body>
          <div className="text-center">
            <CircularProgressbar
              value={60}
              text={`${60}%`}
              styles={{
                root: {
                  height: '12.75rem',
                  width: '12.75rem',
                },
                path: {
                  stroke: themeColor,
                  strokeWidth: '0.375rem',
                  strokeLinecap: 'round',
                },
                trail: {
                  stroke: '#EDEFF1',
                  strokeWidth: '0.15rem',
                },
                text: {
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fill: themeColor,
                },
              }}
            />
          </div>
        </Card.Body>
        <Row className="g-0 border-top">
          <Col xl={6} className="p-4 text-center border-bottom border-end">
            <div className="fs-18 fw-bold text-dark">5h : 33m</div>
            <div className="fs-13 text-muted">Billable Hours</div>
          </Col>
          <Col xl={6} className="p-4 text-center border-bottom">
            <div className="fs-18 fw-bold text-dark">6h : 14m</div>
            <div className="fs-13 text-muted">Unbillable Hours</div>
          </Col>
          <Col xl={6} className="p-4 text-center border-end">
            <div className="fs-18 fw-bold text-dark">15 / 30</div>
            <div className="fs-13 text-muted">Tasks Completed</div>
          </Col>
          <Col xl={6} className="p-4 text-center">
            <div className="fs-18 fw-bold text-dark">16 / 25</div>
            <div className="fs-13 text-muted">Projects Done</div>
          </Col>
        </Row>
        <Card.Footer className="text-center">
          <Link to="" className="ms-auto icon-link icon-link-hover link-primary">
            <span>View Details</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Footer>
      </Card>
    </>
  )
}

export default BillingStats
