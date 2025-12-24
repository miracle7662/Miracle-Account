import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Form, InputGroup, CloseButton, Stack } from 'react-bootstrap'
import { MENU_ITEMS, MenuItemTypes } from '@/constants/menu'

interface SearchLinkProps {
  to: string
  label: string
}

const SearchLink: React.FC<SearchLinkProps> = ({ to, label }) => (
  <Link
    to={to}
    className="fw-medium px-2 border rounded hstack gap-4 mb-2"
    style={{ paddingTop: '0.45rem', paddingBottom: '0.45rem' }}
  >
    <Stack direction="horizontal" gap={2}>
      <i className="fi fi-br-hastag fs-12 p-2 text-muted border rounded-2"></i>
      <span>{label}</span>
      <span className="fs-13 fw-light text-muted d-none d-md-block">{to}</span>
    </Stack>
    <div className="ms-auto hstack">
      <i className="fi fi-rr-angle-small-right"></i>
    </div>
  </Link>
)

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<MenuItemTypes[]>([])

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    setSearchTerm('')
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)

    const results: MenuItemTypes[] = []

    const searchInMenu = (item: MenuItemTypes) => {
      if (
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (item.isTitle || item.isTitle === undefined)
      ) {
        results.push(item)
      }

      if (item.children) {
        item.children.forEach((childItem) => searchInMenu(childItem))
      }
    }

    MENU_ITEMS.forEach((item) => searchInMenu(item))

    setSearchResults(results)
  }

  return (
    <>
      <div className="header-btn" onClick={toggleSearch}>
        <i className="fi fi-rr-search" />
      </div>
      <Modal show={searchOpen} onHide={toggleSearch} className="search-modal">
        <Modal.Header>
          <Form className="w-100">
            <InputGroup>
              <InputGroup.Text className="border-0 ps-0">
                <i className="fi fi-rr-search fs-18"></i>
              </InputGroup.Text>
              <Form.Control
                className="border-0 fw-medium shadow-none"
                placeholder="Search...."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <InputGroup.Text className="border-0 pe-0">
                <CloseButton onClick={toggleSearch} />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Modal.Header>
        <div className="p-4 overflow-x-hidden" style={{ maxHeight: '400px' }}>
          {searchResults.length === 0 ? (
            <>
              {searchTerm ? (
                <h5 className="text-muted my-4">
                  No results found for <span className="text-dark">"{searchTerm}"</span>
                </h5>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="fs-11 text-uppercase text-muted">Popular Search</p>
                    <SearchLink to="/apps/chat" label="Chats" />
                    <SearchLink to="/apps/email" label="Emails" />
                    <SearchLink to="/apps/calendar" label="Calendar" />
                    <SearchLink to="/user-profile/overview" label="User Profile" />
                    <SearchLink to="/account-settings/account" label="Account Settings" />
                  </div>
                  <div>
                    <p className="fs-11 text-uppercase text-muted">Recommended Search</p>
                    <SearchLink to="/docs/support" label="Support" />
                    <SearchLink to="/docs/changelog" label="Changelog" />
                    <SearchLink to="/docs/documentation" label="Documentation" />
                  </div>
                </>
              )}
            </>
          ) : (
            searchResults.map((parentItem) => (
              <React.Fragment key={parentItem.key}>
                {parentItem.isTitle && (
                  <h6 className="fs-11 text-muted text-uppercase mb-3 mt-4">{parentItem.label}</h6>
                )}
                {parentItem.isTitle ? null : (
                  <SearchLink to={parentItem.url || ''} label={parentItem.label} />
                )}
                {parentItem.children &&
                  parentItem.children.map((childItem) => (
                    <SearchLink
                      key={childItem.key}
                      to={childItem.url || ''}
                      label={childItem.label}
                    />
                  ))}
              </React.Fragment>
            ))
          )}
        </div>
        <Modal.Footer>
          <div className="fs-12 text-muted">
            Search by <span className="fw-bold text-primary">Window</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Search
