import { Col, Dropdown, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import fullAvatar from '@/assets/images/general/full-avatar.png'
import BgCircleShapeStyle from '@/components/Misc/BgCircleShape'
import megaAppsItems from './data/magaMenuApps/megaAppsItems'

interface MegaMenuAppsProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MegaMenuApps: React.FC<MegaMenuAppsProps> = ({ isOpen, setIsOpen }) => {
  const megaMenuItemsClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Dropdown
        show={isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="megumenu-dropdown megamenu-xl"
      >
        <Dropdown.Toggle
          variant=""
          className={`btn-megumenu arrow-none ${isOpen ? 'show' : ''}`}
          id="mega-menu-apps"
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          Apps
        </Dropdown.Toggle>
        <Dropdown.Menu className="megumenu-wrapper">
          <div
            className="d-flex align-items-center gap-4 mx-n4 mt-n4 px-4 py-3 mb-4 border-bottom d-lg-none"
            style={{ height: '3.5rem' }}
            onClick={megaMenuItemsClose}
          >
            <i className="fi fi-rr-arrow-left"></i>
            <span className="text-dark">Back</span>
          </div>
          <div className="d-flex">
            <div className="mb-4">
              <h5 className="fw-semibold">Applications</h5>
              <span className="fs-13 text-muted">Available web appplications.</span>
            </div>
            <div className="ms-auto">
              <Link to="" className="ms-auto icon-link icon-link-hover link-primary">
                <span>Explore Apps</span>
                <i className="fi fi-rr-arrow-small-right bi"></i>
              </Link>
            </div>
          </div>
          <Row className="g-12">
            <Col lg={8}>
              <Row className="g-4">
                {megaAppsItems.map(({ to, title, desc, icon }, idx) => (
                  <Col lg={6} key={idx}>
                    <Link to={to} className="megumenu-item">
                      <div className="d-flex gap-4">
                        <div
                          className="d-flex flex-shrink-0 align-items-center justify-content-center rounded bg-secondary-subtle text-dark"
                          style={{ width: '3rem', height: '3rem' }}
                        >
                          <i className={`fi ${icon} fs-4 text-primary`}></i>
                        </div>
                        <div className="d-flex flex-column">
                          <h6 dangerouslySetInnerHTML={{ __html: title }} />
                          <span className="fs-13 fw-normal text-muted text-truncate-2-line">
                            {desc}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={4}>
              <div
                className="p-4 d-flex align-items-center justify-content-center bg-secondary-subtle rounded-3"
                style={BgCircleShapeStyle}
              >
                <Image src={fullAvatar} fluid style={{ maxHeight: '260px' }} />
              </div>
            </Col>
          </Row>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default MegaMenuApps
