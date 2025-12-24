import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Stack, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Category, Label } from '@/components/Apps/Contact/data/types'
import AddContactModal from './AddContactModal'

const ContactSidebar: React.FC<{
  categories: Category[]
  labels: Label[]
  selectedCategory: string
  handleCategoryChange: (categoryValue: string) => void
  setSidebarMiniToggle: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ categories, labels, selectedCategory, handleCategoryChange, setSidebarMiniToggle }) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false)

  const handleAddContact = (contactData: any) => {
    console.log('Add New Contact:', contactData)
  }

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="ps-4 pe-3 border-bottom"
        style={{ minHeight: '4.5rem' }}
      >
        <h4 className="fw-bold mb-0">Contact</h4>
        <Button
          variant="light"
          className="ms-auto btn-icon btn-md d-xxxl-none"
          onClick={() => setSidebarMiniToggle(false)}
        >
          <i className="fi fi-rr-cross"></i>
        </Button>
      </Stack>
      <Stack
        direction="horizontal"
        gap={3}
        className="px-4 border-bottom"
        style={{ minHeight: '4.5rem' }}
      >
        <Button className="w-100" onClick={() => setShowAddContactModal(true)}>
          <i className="fi fi-br-plus fs-10"></i>
          <span className="ms-2">Add New Contact</span>
        </Button>
      </Stack>
      <PerfectScrollbar className="h-100">
        <ul className="nav flex-column px-2 py-3">
          {categories.map((category) => (
            <li key={category.name} className="nav-item mb-1">
              <Link
                to=""
                className={`nav-link hstack rounded ${
                  selectedCategory === category.value ? 'bg-secondary-subtle' : ''
                }`}
                onClick={() => handleCategoryChange(category.value)}
                style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}
              >
                <span className="hstack gap-3">
                  <i className={`fi ${category.icon}`}></i>
                  <span className="d-block">{category.name}</span>
                </span>
                {category.badge && (
                  <span className={`badge ms-auto ${category.badgeClassName}`}>
                    {category.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="my-0" />
        <div className="px-4 pt-4 d-flex align-items-center justify-content-between">
          <label
            className="fs-11 fw-semibold text-uppercase text-muted"
            style={{ letterSpacing: '0.05rem' }}
          >
            Labels
          </label>
          <OverlayTrigger overlay={<Tooltip>Add Labels</Tooltip>}>
            <Link to="">
              <i className="fi fi-rr-add"></i>
            </Link>
          </OverlayTrigger>
        </div>
        <ul className="nav flex-column px-2 py-3">
          {labels.map((category) => (
            <li key={category.name} className="nav-item mb-1">
              <Link
                to=""
                className={`nav-link d-flex align-items-center rounded gap-3 ${
                  selectedCategory === category.value ? 'bg-secondary-subtle' : ''
                }`}
                onClick={() => handleCategoryChange(category.value)}
                style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}
              >
                <span
                  className={`d-block rounded-circle bg-gradient bg-${category.gradient}`}
                  style={{ width: '7px', height: '7px' }}
                ></span>
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </PerfectScrollbar>
      <AddContactModal
        show={showAddContactModal}
        onHide={() => setShowAddContactModal(false)}
        onAddContact={handleAddContact}
      />
    </>
  )
}

export default ContactSidebar
