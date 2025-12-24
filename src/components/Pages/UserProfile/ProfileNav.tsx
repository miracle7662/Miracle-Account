import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'

const ProfileNav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = React.useState<string>(location.pathname)

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey) {
      setActiveKey(selectedKey)
      navigate(selectedKey)
    }
  }

  interface profileType {
    label: string
    to: string
    icon: string
  }

  const ProfileNavs: profileType[] = [
    {
      icon: 'fi fi-rr-circle-user',
      label: 'Overview',
      to: '/user-profile/overview',
    },
    {
      icon: 'fi fi-rr-rss',
      label: 'Activity',
      to: '/user-profile/activity',
    },
    {
      icon: 'fi fi-rr-user-check',
      label: 'Followers',
      to: '/user-profile/followers',
    },
    {
      icon: 'fi fi-rr-user-add',
      label: 'Contacts',
      to: '/user-profile/contacts',
    },
    {
      icon: 'fi fi-rr-apps-add',
      label: 'Projects',
      to: '/user-profile/projects',
    },
    {
      icon: 'fi fi-rr-picture',
      label: 'Gallery',
      to: '/user-profile/gallery',
    },
  ]

  return (
    <>
      <PerfectScrollbar>
        <Nav
          activeKey={activeKey}
          onSelect={handleSelect}
          variant="pills"
          defaultActiveKey="/user-profile/overview"
          className="d-flex flex-row flex-nowrap flex-row px-4 py-3 border-top"
        >
          {ProfileNavs.map((tab, idx) => (
            <Nav.Item key={idx}>
              <Nav.Link as={Link} to={tab.to} eventKey={tab.to} className="hstack gap-2">
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </PerfectScrollbar>
    </>
  )
}

export default ProfileNav
