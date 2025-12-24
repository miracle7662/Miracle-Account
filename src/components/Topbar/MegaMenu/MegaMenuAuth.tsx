import BgCircleShapeStyle from '@/components/Misc/BgCircleShape'
import { Button, Col, Dropdown, Row } from 'react-bootstrap'
import 'react-circular-progressbar/dist/styles.css'
import { Link } from 'react-router-dom'
import {
  authItemsClassic,
  authItemsCorporate,
  authItemsCreative,
  authItemsModern,
} from './data/magaMenuAuths/authPageItems'

interface MegaMenuAuthProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MegaMenuAuth: React.FC<MegaMenuAuthProps> = ({ isOpen, setIsOpen }) => {
  const megaMenuItemsClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Dropdown
        show={isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="megumenu-dropdown megamenu-full"
      >
        <Dropdown.Toggle
          variant=""
          className={`btn-megumenu arrow-none ${isOpen ? 'show' : ''}`}
          id="mega-menu-auths"
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          Auths
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
          <Row className="g-0">
            <Col lg={12} xxl={9}>
              <Row className="g-4">
                <Col lg={3}>
                  <h5 className="fw-semibold mb-3">Classic</h5>
                  {authItemsClassic.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      <span>{title}</span>
                    </Link>
                  ))}
                </Col>
                <Col lg={3}>
                  <h5 className="fw-semibold mb-3">Creative</h5>
                  {authItemsCreative.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      <span>{title}</span>
                    </Link>
                  ))}
                </Col>
                <Col lg={3}>
                  <h5 className="fw-semibold mb-3">Corporate</h5>
                  {authItemsCorporate.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      <span>{title}</span>
                    </Link>
                  ))}
                </Col>
                <Col lg={3}>
                  <h5 className="fw-semibold mb-3">Modern</h5>
                  {authItemsModern.map(({ title, to }, idx) => (
                    <Link to={to} key={idx} className="megumenu-item">
                      {title}
                    </Link>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col
              xxl={3}
              className="px-4 py-8 py-lg-12 d-none d-xxl-flex flex-column align-items-center justify-content-center bg-secondary-subtle rounded-3 text-center border border-secondary border-opacity-10"
              style={BgCircleShapeStyle}
            >
              <div
                className="mx-auto d-flex flex-column align-items-center justify-content-center"
                style={{ maxWidth: '320px' }}
              >
                <div className="text-primary mb-12">
                  <i
                    className="fi fi-rs-rocket-lunch"
                    style={{ fontSize: '3rem', transform: 'rotate(320deg)', display: 'flex' }}
                  ></i>
                </div>
                <h5 className="fw-bold mb-4 text-truncate">Grow faster with pro's help</h5>
                <p className="fs-13 mb-8 text-muted text-truncate-3-line">
                  Experience top-notch features with our services and insights. Lorem ipsum dolor
                  sit, amet consectetur adipisicing elit.
                </p>
                <Button variant="primary">Get Started</Button>
              </div>
            </Col>
          </Row>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default MegaMenuAuth
