import { Link } from 'react-router-dom'
import { Carousel, Col, Dropdown, Image, Row } from 'react-bootstrap'
import carouselData from './data/megaManuPage/carouselData'
import {
  userProfileItems,
  accountSettingsItems,
  otherPagesItems,
} from './data/megaManuPage/userProfileItems'

interface MegaMenuPagesProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MegaMenuPages: React.FC<MegaMenuPagesProps> = ({ isOpen, setIsOpen }) => {
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
          id="mega-menu-pages"
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          Pages
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
          <Row className="g-4">
            <Col lg={12} xl={8}>
              <Row className="g-4">
                <Col lg={4}>
                  <h5 className="fw-semibold mb-3">Profile</h5>
                  {userProfileItems.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      <span className="d-flex align-items-center gap-3">
                        <span
                          className="d-flex bg-secondary bg-opacity-50 rounded-circle"
                          style={{ width: '0.25rem', height: '0.25rem' }}
                        ></span>
                        <span>{title}</span>
                      </span>
                    </Link>
                  ))}
                </Col>
                <Col lg={4}>
                  <h5 className="fw-semibold mb-3">Settings</h5>
                  {accountSettingsItems.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      <span className="d-flex align-items-center gap-3">
                        <span
                          className="d-flex bg-secondary bg-opacity-50 rounded-circle"
                          style={{ width: '0.25rem', height: '0.25rem' }}
                        ></span>
                        <span>{title}</span>
                      </span>
                    </Link>
                  ))}
                </Col>
                <Col lg={4}>
                  <h5 className="fw-semibold mb-3">Others</h5>
                  {otherPagesItems.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      <span className="d-flex align-items-center gap-3">
                        <span
                          className="d-flex bg-secondary bg-opacity-50 rounded-circle"
                          style={{ width: '0.25rem', height: '0.25rem' }}
                        ></span>
                        <span>{title}</span>
                      </span>
                    </Link>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col xl={4} className="d-none d-xl-flex">
              <Carousel indicators={false}>
                {carouselData.map(({ image }, index) => (
                  <Carousel.Item key={index} className="rounded-3 mt-3">
                    <div className="w-100 h-100 mx-auto text-center">
                      <Image src={image} rounded fluid className="rounded-3" />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default MegaMenuPages
