import { ListGroup, Offcanvas, Tab, Nav, Badge, Button, Stack, Dropdown } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import Loading from '@/components/Misc/Loading'
import { navItems, tabPanes } from './data/notifications'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface NotificationOffcanvasProps {
  show: boolean
  handleClose: () => void
  toggleSound: () => void
  isSoundOn: boolean
}

const NotificationOffcanvas = ({
  show,
  handleClose,
  toggleSound,
  isSoundOn,
}: NotificationOffcanvasProps) => {
  return (
    <Offcanvas
      placement="end"
      show={show}
      onHide={handleClose}
      style={{ width: '100%', maxWidth: '460px' }}
    >
      <Offcanvas.Header
        className="d-flex align-items-center px-4 border-bottom"
        style={{ height: '4.5rem' }}
        closeButton
      >
        <Offcanvas.Title>Notifications</Offcanvas.Title>
        <div className="ms-auto hstack gap-1">
          <Button variant="light" onClick={toggleSound} className="btn-icon">
            {isSoundOn ? (
              <i className="fi fi-rr-volume"></i>
            ) : (
              <i className="fi fi-rr-volume-slash text-danger"></i>
            )}
          </Button>
          <Dropdown id="dropdown-contact-actions">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-contact-options"
              className="btn-icon arrow-none"
            >
              <i className="fi fi-rr-settings"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-md">
              <Dropdown.Item>
                <i className="fi fi-rr-eye"></i>
                <span className="ms-3">Mark all as read</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-settings"></i>
                <span className="ms-3">Notification settings</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-envelope-open-text"></i>
                <span className="ms-3">Open as notifications</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="fi fi-rr-triangle-warning"></i>
                <span className="ms-3">Report Spam</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-ban"></i>
                <span className="ms-3">Block Contact</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-anchor"></i>
                <span className="ms-3">Report Phishing</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger">
                <i className="fi fi-rr-trash"></i>
                <span className="ms-3">Delete Notifications</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0 overflow-hidden">
        <Tab.Container defaultActiveKey="alls">
          <Nav variant="tabs" className="nav-line-tabs my-3">
            {navItems.map(({ key, eventKey, label, badgeColor, badgeTextColor, badgeValue }) => (
              <Nav.Item key={key}>
                <Nav.Link eventKey={eventKey}>
                  <span className="me-1">{label}</span>
                  <Badge bg={badgeColor} className={`text-${badgeTextColor}`}>
                    {badgeValue}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <PerfectScrollbar
            className="d-flex flex-column position-relative"
            style={{ maxHeight: 'calc(100vh - 9rem)' }}
          >
            <Tab.Content className="flex-grow-1">
              {tabPanes.map(({ eventKey, notifications }) => (
                <Tab.Pane key={eventKey} eventKey={eventKey}>
                  <ListGroup variant="flush">
                    {notifications.map(
                      ({ avatarSrc, sender, message, time, category, actions }, index) => (
                        <ListGroup.Item key={index} className="p-4">
                          <Stack direction="horizontal" gap={3} className="w-100 align-items-start">
                            <div className="flex-grow-1">
                              <Avatar type="image" src={avatarSrc} alt="User Avatar" size="md" />
                            </div>
                            <div className="w-100">
                              <Stack
                                direction="horizontal"
                                className="w-100 align-items-start mb-2"
                              >
                                <div className="me-4">
                                  <span className="fw-semibold text-dark">{sender}</span> {message}
                                </div>
                                <div className="btn btn-icon btn-md ms-auto text-end flex-shrink-0">
                                  <i className="fi fi-br-menu-dots-vertical"></i>
                                </div>
                              </Stack>
                              <Stack direction="horizontal" gap={2} className="text-muted mb-3">
                                <small className="text-lowercase">{time}</small>
                                <span
                                  className="d-inline-block bg-dark bg-opacity-25 rounded-circle"
                                  style={{ width: '0.25rem', height: '0.25rem' }}
                                ></span>
                                <small className="text-lowercase">{category}</small>
                              </Stack>
                              {actions && (
                                <Stack direction="horizontal" gap={2} className="text-muted">
                                  {actions.map(({ variant, label, onClick }, actionIndex) => (
                                    <div
                                      key={actionIndex}
                                      className={`btn btn-sm py-1 btn-${variant}`}
                                      onClick={onClick}
                                    >
                                      {label}
                                    </div>
                                  ))}
                                </Stack>
                              )}
                            </div>
                          </Stack>
                        </ListGroup.Item>
                      ),
                    )}
                  </ListGroup>
                </Tab.Pane>
              ))}
            </Tab.Content>
            <div className="m-4">
              <Loading className="w-100" />
            </div>
          </PerfectScrollbar>
        </Tab.Container>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default NotificationOffcanvas
