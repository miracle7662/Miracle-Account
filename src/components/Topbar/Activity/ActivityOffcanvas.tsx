import Loading from '@/components/Misc/Loading'
import { ListGroup, Offcanvas } from 'react-bootstrap'
import dataActivity from '@/components/Pages/UserProfile/Activity/data/dataActivity'

interface NotificationOffcanvasProps {
  show: boolean
  handleClose: () => void
}

const NotificationOffcanvas = ({ show, handleClose }: NotificationOffcanvasProps) => {
  return (
    <Offcanvas
      show={show}
      placement="end"
      onHide={handleClose}
      className="activity-offcanvas"
      style={{ width: '100%', maxWidth: '768px' }}
    >
      <Offcanvas.Header
        className="d-flex align-items-center px-4 border-bottom"
        style={{ height: '4.5rem' }}
        closeButton
      >
        <Offcanvas.Title>
          <span className="fs-18 fw-semibold d-block">Recent Activity</span>
          <span className="fs-12 fw-light text-muted d-block">Last activity 42 minutes ago</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0 border-top-0 border-bottom-0">
        <ListGroup className="list-group-timeline list-group list-group-flush ms-8">
          {dataActivity.map(({ icon, content }, idx) => (
            <ListGroup.Item
              key={idx}
              className="list-timeline-item border-start border-dashed border-bottom-0 ps-8 mb-2"
            >
              <div
                className="list-timeline-icon avatar avatar-md border position-absolute bg-body-tertiary"
                style={{ left: '-1.25rem' }}
              >
                <i className={`${icon}`}></i>
              </div>
              <div
                className="list-timeline-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="list-timeline-item border-start border-dashed border-bottom-0 ps-8">
            <Loading />
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default NotificationOffcanvas
