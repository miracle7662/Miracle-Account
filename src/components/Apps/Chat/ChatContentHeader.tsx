import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { OverlayTrigger, Tooltip, Stack, Dropdown, DropdownDivider, Button } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import { ChatItem } from './data/types'

interface ChatContentHeaderProps {
  selectedChat: ChatItem | null
  onDeleteChat: (chatId?: string) => void
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatItem | null>>
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
  sidebarLeftToggle: boolean
  setSidebarLeftToggle: React.Dispatch<React.SetStateAction<boolean>>
  sidebarRightToggle: boolean
  setSidebarRightToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatContentHeader: React.FC<ChatContentHeaderProps> = ({
  selectedChat,
  onDeleteChat,
  setSelectedChat,
  setContainerToggle,
  sidebarLeftToggle,
  setSidebarLeftToggle,
  sidebarRightToggle,
  setSidebarRightToggle,
}) => {
  const [isStarred, setIsStarred] = useState<boolean>(false)
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true)
  const [isArchive, setIsArchive] = useState<boolean>(false)

  const handleStarClick = () => {
    setIsStarred(!isStarred)
    toast[isStarred ? 'error' : 'success'](
      isStarred ? 'Removed from favorites' : 'Added to favorites',
    )
  }

  const handleArchiveClick = () => {
    setIsArchive(!isArchive)
    toast[isArchive ? 'error' : 'success'](isArchive ? 'Removed from archive' : 'Added to archive')
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
    const message = isSoundOn ? 'Sound turned off' : 'Sound turned on'
    const type = isSoundOn ? 'success' : 'error'

    toast(message, {
      icon: type === 'success' ? '🔕' : '🔔',
    })
  }

  const handleSidebarRightToggle = () => {
    document.querySelector('.apps-card')?.classList.add('apps-sidebar-right-toggle')
    setSidebarRightToggle(true)
    setSidebarLeftToggle(false)
    if (sidebarRightToggle) {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-right-toggle')
      setSidebarRightToggle(false)
    }
  }

  const handleGoBack = () => {
    document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    document.querySelector('.apps-card')?.classList.add('apps-sidebar-left-toggle')
    setSelectedChat(null)
    setContainerToggle(false)
    setSidebarLeftToggle(false)
    setSidebarRightToggle(false)
  }

  const handleSidebarLeftToggle = () => {
    document.querySelector('.apps-card')?.classList.add('apps-sidebar-left-toggle')
    setSidebarLeftToggle(true)
    if (sidebarLeftToggle) {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
      setSidebarLeftToggle(false)
    }
  }

  return (
    <>
      <Stack
        direction="horizontal"
        className="ps-2 ps-md-3 pe-2 pe-md-3 border-bottom justify-content-between"
        style={{ minHeight: '4.5rem' }}
      >
        <Stack direction="horizontal" gap={2}>
          <Button variant="light" className="btn-icon" onClick={handleGoBack}>
            <i className="fi fi-rr-arrow-left"></i>
          </Button>
          <Stack
            direction="horizontal"
            gap={3}
            onClick={handleSidebarRightToggle}
            style={{ cursor: 'pointer' }}
          >
            <Avatar type="image" size="md" src={selectedChat?.image || ''} alt="User Avatar" />
            <div className="mt-2">
              <h6 className="mb-1">{selectedChat?.name || 'User'}</h6>
              <span className="fs-13 text-muted">{selectedChat?.role || 'No message'}</span>
            </div>
          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={1}>
          <Button
            variant="light"
            className="btn-icon btn-md d-none d-lg-flex"
            onClick={handleSidebarLeftToggle}
          >
            <i className="fi fi-rr-menu-burger"></i>
          </Button>
          <div className="d-none d-sm-flex align-item-center gap-1">
            <OverlayTrigger overlay={<Tooltip>Comming Soon!</Tooltip>}>
              <Button variant="light" className="btn-icon">
                <i className="fi fi-rr-phone-call"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Comming Soon!</Tooltip>}>
              <Button variant="light" className="btn-icon">
                <i className="fi fi-rr-video-plus fs-16"></i>
              </Button>
            </OverlayTrigger>
            <Button variant="light" className="btn-icon" onClick={handleSidebarRightToggle}>
              <i className="fi fi-rr-info"></i>
            </Button>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="light" className="btn-icon arrow-none">
              <i className="fi fi-bs-menu-dots-vertical fs-14"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleSound}>
                {isSoundOn ? (
                  <i className="fi fi-rr-volume"></i>
                ) : (
                  <i className="fi fi-rr-volume-slash"></i>
                )}
                <span className="ms-3 ">{isSoundOn ? 'Mute' : 'Unmute'}</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleStarClick}>
                <i className={`fi fi-rr-star ${isStarred ? 'text-warning' : ''}`}></i>
                <span className="ms-3 ">{isStarred ? 'Unstarred' : 'Starred'}</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleArchiveClick}>
                <i className={`fi fi-rr-add-folder ${isArchive ? 'text-success' : ''}`}></i>
                <span className="ms-3 ">{isArchive ? 'Unarchive' : 'Archived'}</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item
                className="text-danger"
                onClick={(e) => {
                  e.stopPropagation()
                  if (selectedChat?.id) {
                    onDeleteChat(selectedChat.id)
                  }
                }}
              >
                <i className="fi fi-rr-trash"></i>
                <span className="ms-3 ">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </>
  )
}

export default ChatContentHeader
