import Logo from '@/components/Common/Logo'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

interface NavLinkProps {
  to: string
  isActive: boolean
  children: React.ReactNode
}

interface NavLinks {
  [key: string]: string
}

const navLinks: NavLinks = {
  documentation: '../docs/index.html',
  changelog: '../docs/changelog.html',
  support: '../docs/support.html',
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => (
  <Nav.Item>
    <Link to={to} className={`btn rounded px-3 ${isActive ? 'btn btn-soft-primary' : ''}`}>
      {children}
    </Link>
  </Nav.Item>
)

const PublicHeader = () => {
  const location = useLocation()

  return (
    <>
      <header
        className="header-public bg-body-tertiary hstack sticky-top border-bottom"
        style={{ minHeight: '4.5rem' }}>
        <div className="container">
          <Navbar expand="lg" className="w-100 bg-body-tertiary justify-content-between">
            <Navbar.Brand>
              <Link to="/">
                <Logo />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle className="ms-auto border" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto navbar-nav mt-4 mt-md-0">
                {Object.entries(navLinks).map(([key, value]) => (
                  <NavLink key={key} to={value} isActive={location.pathname.includes(value)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </NavLink>
                ))}
                <Link
                  to="/"
                  className="btn btn-primary btn-md ms-0 ms-md-4 mt-4 mb-2 mb-md-0 mt-md-0 flex-shrink-0"
                  style={{ width: 'fit-content' }}>
                  <i className="fi fi-rr-eye"></i>
                  <span className="ms-2">Live Preview</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </>
  )
}

export default PublicHeader
