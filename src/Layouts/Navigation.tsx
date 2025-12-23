import { getMenuItems } from '@/common'
import Logo from '@/components/Common/Logo'
import MenuCard from '@/components/Common/MenuCard'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import AppMenu from './Menu'

const SideBarContent = () => {
  return (
    <>
      <AppMenu menuItems={getMenuItems()} />
      <div className="clearfix" />
    </>
  )
}
const Navigation = () => {
  return (
    <>
      <aside className="leftside-menu position-fixed top-0 bottom-0 z-1040">
        <div className="navigation-header top-0 sticky-top z-1020 px-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <SimpleBar
          id="leftside-menu-container"
          data-simplebar=""
          style={{ height: 'calc(100%  - 4.5rem)' }}>
          {/* Sidemenu */}
          <SideBarContent />
          {/* Sidemenu Card */}
          <MenuCard />
        </SimpleBar>
      </aside>
    </>
  )
}

export default Navigation
