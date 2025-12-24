import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'
import { findAllParent, findMenuItem } from '@/common'
import { MenuItemTypes } from '../constants/menu'

interface SubMenus {
  item: MenuItemTypes
  linkClassName?: string
  subMenuClassNames?: string
  activeMenuItems?: Array<string>
  toggleMenu?: (item: any, status: boolean) => void
  className?: string
}

const scrollTo = (element: any, to: any, duration: any) => {
  const start = element.scrollTop
  const change = to - start
  let currentTime = 0
  const increment = 20

  const easeInOutQuad = (t: any, b: any, c: any, d: any) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const animateScroll = () => {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }

  animateScroll()
}

const MenuItemWithChildren = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}: SubMenus) => {
  const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key))

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key))
  }, [activeMenuItems, item])

  const toggleMenuItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    const status = !open
    setOpen(status)
    if (toggleMenu) toggleMenu(item, status)
  }

  return (
    <li className={`nav-item ${open ? 'active' : ''}`}>
      <Link
        to="#"
        className={`nav-link ${linkClassName} ${activeMenuItems!.includes(item.key) ? 'open' : ''}`}
        aria-expanded={open}
        data-menu-key={item.key}
        onClick={toggleMenuItem}
        title={item.label}
      >
        {item.icon && <i className={item.icon} style={{ color: 'red' }} />}
        <span className="menu-arrow" />
        <span> {item.label}</span>
      </Link>
      <Collapse in={open}>
        <div>
          <ul className={`nav-sub-menu ${subMenuClassNames}`}>
            {(item.children || []).map((child, idx) => {
              return (
                <React.Fragment key={idx}>
                  {child.children ? (
                    <MenuItemWithChildren
                      item={child}
                      linkClassName={activeMenuItems!.includes(child.key) ? 'active' : ''}
                      activeMenuItems={activeMenuItems}
                      subMenuClassNames="sub-menu"
                      toggleMenu={toggleMenu}
                    />
                  ) : (
                    <MenuItem
                      item={child}
                      className={activeMenuItems!.includes(child.key) ? 'active' : ''}
                      linkClassName={activeMenuItems!.includes(child.key) ? 'active' : ''}
                    />
                  )}


                </React.Fragment>
              )
            })}
          </ul>
        </div>
      </Collapse>
    </li>
  )
}

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
  return (
    <li className={`nav-item ${className}`}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  )
}

const MenuItemLink = ({ item, className }: SubMenus) => {
  return (
    <Link
      to={item.url!}
      target={item.target}
      className={`nav-link-ref ${className}`}
      data-menu-key={item.key}
      title={item.label}
    >
      {item.icon && <i className={item.icon} style={{ color: 'red' }} />}
      <span> {item.label}</span>
    </Link>
  )
}

interface AppMenuProps {
  menuItems: MenuItemTypes[]
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const location = useLocation()
  const menuRef = useRef(null)
  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([])

  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show) {
      setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)])
    }
  }

  const activeMenu = useCallback(() => {
    const div = document.getElementById('main-menu')
    let matchingMenuItem: HTMLElement | null = null

    if (div) {
      const items: any = div.getElementsByClassName('nav-link-ref')
      for (let i = 0; i < items.length; ++i) {
        let trimmedURL = location?.pathname?.replaceAll(process.env.PUBLIC_URL ?? '', '')
        const url = items[i].pathname
        if (trimmedURL === process.env.PUBLIC_URL + '/') {
          trimmedURL += 'ecommerce'
        }
        if (trimmedURL === url?.replaceAll(process.env.PUBLIC_URL, '')) {
          matchingMenuItem = items[i]
          break
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key')
        const activeMt = findMenuItem(menuItems, mid as any)
        if (activeMt) {
          setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)])
        }

        setTimeout(function () {
          const activatedItem = matchingMenuItem!
          if (activatedItem != null) {
            const simplebarContent = document.querySelector(
              '#leftside-menu-container .simplebar-content-wrapper',
            )
            const offset = activatedItem!.offsetTop - 300
            if (simplebarContent && offset > 100) {
              scrollTo(simplebarContent, offset, 600)
            }
          }
        }, 200)
      }
    }
  }, [location, menuItems])

  useEffect(() => {
    activeMenu()
  }, [activeMenu, location])

  return (
    <>
      <ul className="side-nav" ref={menuRef} id="main-menu">
        {(menuItems || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item.isTitle ? (
                <li className="nav-title">{item.label}</li>
              ) : (
                <>
                  {item.children ? (
                    <MenuItemWithChildren
                      item={item}
                      toggleMenu={toggleMenu}
                      subMenuClassNames=""
                      activeMenuItems={activeMenuItems}
                      linkClassName="nav-link"
                    />
                  ) : (
                    <MenuItem
                      item={item}
                      linkClassName="nav-link"
                      className={activeMenuItems.includes(item.key) ? 'active' : ''}
                      />
                    )}
                  </>
                )}
              </React.Fragment>
            )
          })}
        </ul>
      </>
    )
  }

export default AppMenu
