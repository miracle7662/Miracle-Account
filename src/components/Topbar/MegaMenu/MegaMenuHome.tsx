import { Link } from 'react-router-dom'
import { Col, Dropdown, Row, Image, Stack } from 'react-bootstrap'
import logoCircle from '@/assets/images/general/logo-circle.png'
import megaHomeItems from './data/megaMenuHome/megaHomeItems'

interface MegaMenuHomeProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MegaMenuHome: React.FC<MegaMenuHomeProps> = ({ isOpen, setIsOpen }) => {
  const megaMenuItemsClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Dropdown
        show={isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="megumenu-dropdown megamenu-xxl"
      >
        <Dropdown.Toggle
          variant=""
          className={`btn-megumenu arrow-none ${isOpen ? 'show' : ''}`}
          id="mega-menu-home"
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          Home
        </Dropdown.Toggle>
        <Dropdown.Menu className="px-2 py-4 megumenu-wrapper">
          <div
            className="d-flex align-items-center gap-4 mx-n4 mt-n4 px-4 py-3 mb-4 border-bottom d-lg-none"
            style={{ height: '3.5rem' }}
            onClick={megaMenuItemsClose}
          >
            <i className="fi fi-rr-arrow-left"></i>
            <span className="text-dark">Back</span>
          </div>
          <Row className="g-12">
            <Col lg={12} xl={8}>
              <Row className="g-6">
                {megaHomeItems.map(({ to, color, icon, title, description }, idx) => (
                  <Col lg={6} key={idx}>
                    <Link to={to} className="megumenu-item">
                      <div className="d-flex gap-4">
                        <div
                          className={`d-flex flex-shrink-0 align-items-center justify-content-center rounded  bg-${color}-subtle text-${color}`}
                          style={{ width: '3.5rem', height: '3.5rem' }}
                        >
                          <i className={`fi ${icon} fs-3`}></i>
                        </div>
                        <div className="d-flex flex-column">
                          <h6 dangerouslySetInnerHTML={{ __html: title }} />
                          <span className="fs-13 fw-normal text-muted text-truncate-2-line">
                            {description}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xl={4} className="d-none d-xl-flex">
              <Stack gap={2}>
                <div
                  className="d-flex align-items-center justify-content-center border bg-secondary-subtle p-4 rounded-bottom-0 rounded-3"
                  style={{ minWidth: '250px' }}
                >
                  <Image src={logoCircle} fluid style={{ height: '250px' }} />
                </div>
                <div
                  className="px-4 py-3 border border-top-0 rounded-top rounded-3"
                  style={{ borderStyle: 'dashed' }}
                >
                  Freequently asks questios?{' '}
                  <Link to="/other-pages/contact-us" className="text-primary">
                    Contact
                  </Link>
                </div>
              </Stack>
            </Col>
          </Row>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default MegaMenuHome
