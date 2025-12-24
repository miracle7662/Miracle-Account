import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { Button, Card, Stack } from 'react-bootstrap'
import { Preloader } from '@/components/Misc/Preloader'
import {
  ChatActionFooter,
  ChatAsideHeader,
  ChatAsideSearch,
  ChatAsiderChatList,
  ChatContentDetails,
  ChatContentHeader,
  ChatUserInfoSidebar,
  InviteFriendModal,
} from '@/components/Apps/Chat'
import { ReplyMessage, SentMessage, ChatItem } from './../../components/Apps/Chat/data/types'
import chatItemsData from '@/components/Apps/Chat/data/chatItems'
import TitleHelmet from '@/components/Common/TitleHelmet'

const Chat: React.FC = () => {
  const [chatItems, setChatItems] = useState<ChatItem[]>(chatItemsData)
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [inviteEmail, setInviteEmail] = useState<string>('')
  const [containerToggle, setContainerToggle] = useState<boolean>(false)
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false)
  const [sidebarRightToggle, setSidebarRightToggle] = useState<boolean>(false)

  const handleReplyMessage = async (message: string) => {
    const currentTime = new Date().toLocaleTimeString()
    const newReplyMessage: ReplyMessage = {
      reply: message,
      datetime: currentTime,
    }

    if (selectedChat) {
      const updatedChat: ChatItem = { ...selectedChat }

      updatedChat.conversion = updatedChat.conversion || []
      updatedChat.conversion.push({ replyMessage: [newReplyMessage] })

      setSelectedChat(updatedChat)
    }

    setSearchQuery('')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (selectedChat) {
      const updatedChat: ChatItem = { ...selectedChat }
      updatedChat.conversion = updatedChat.conversion || []

      const automatedSentMessage: SentMessage = {
        sent: 'Thank you for your awesome support! ❣️❣️❣️',
        datetime: new Date().toLocaleTimeString(),
      }
      updatedChat.conversion.push({ sentMessage: [automatedSentMessage] })

      setSelectedChat(updatedChat)
    }

    const updatedChatItems = chatItems.map((chat) => {
      if (chat.id === selectedChat?.id) {
        return selectedChat
      }
      return chat
    })

    setChatItems(updatedChatItems)
  }

  const handleDeleteChat = (chatId?: string) => {
    if (chatId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this chat!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3E97FF',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)

          setTimeout(() => {
            const updatedChatItems = chatItems.filter((chat) => chat.id !== chatId)
            setChatItems(updatedChatItems)
            if (selectedChat && selectedChat.id === chatId) {
              setSelectedChat(null)
            }
            setLoading(false)
            setContainerToggle(false)
            setSidebarLeftToggle(false)
            setSidebarRightToggle(false)
            toast.success('Chat deleted successfully')
          }, 1500)
        }
      })
    }
  }

  const handleInviteClick = () => {
    setShowInviteModal(true)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991.98 && sidebarLeftToggle) {
        document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
      }
    }

    if (sidebarLeftToggle) {
      document.querySelector('.apps-card')?.classList.add('apps-sidebar-left-toggle')
    } else {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-left-toggle')
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [sidebarLeftToggle])

  useEffect(() => {
    if (containerToggle) {
      document.querySelector('.apps-card')?.classList.add('apps-container-toggle')
    } else {
      document.querySelector('.apps-card')?.classList.remove('apps-container-toggle')
    }
  }, [containerToggle])

  useEffect(() => {
    if (sidebarRightToggle) {
      document.querySelector('.apps-card')?.classList.add('apps-sidebar-right-toggle')
    } else {
      document.querySelector('.apps-card')?.classList.remove('apps-sidebar-right-toggle')
    }
  }, [sidebarRightToggle])

  return (
    <>
      <TitleHelmet title="Chats" />
      <Card
        className={`apps-card  ${selectedChat ? 'apps-container-toggle' : ''}  ${
          sidebarLeftToggle ? 'apps-sidebar-left-toggle' : ''
        } ${sidebarRightToggle ? 'apps-sidebar-right-toggle' : ''}`}
      >
        <div className="apps-sidebar apps-sidebar-left">
          <ChatAsideHeader handleInviteClick={handleInviteClick} />
          <ChatAsideSearch onSearch={setSearchQuery} />
          <ChatAsiderChatList
            chatItems={chatItems}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            setLoading={setLoading}
            searchQuery={searchQuery}
            onDeleteChat={handleDeleteChat}
            setContainerToggle={setContainerToggle}
          />
        </div>
        <div className="apps-container">
          <div className="apps-container-inner">
            {loading ? (
              <Stack className="align-items-center justify-content-center flex-grow-1 h-100 ">
                <Preloader />
              </Stack>
            ) : !selectedChat ? (
              <Stack
                className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center"
                style={{ maxWidth: '320px' }}
              >
                <i className="fi fi-rr-comment-alt-dots fs-48 mb-6"></i>
                <h4 className="fw-bold">Start new conversation</h4>
                <p className="fs-15 fw-light text-muted mb-4">
                  Pick a person or group from the left sidebar chat list and start your
                  conversation.
                </p>
                <Button variant="" className="btn-neutral" onClick={handleInviteClick}>
                  <i className="fi fi-br-plus fs-10"></i>
                  <span className="ms-2">Invite Friend</span>
                </Button>
              </Stack>
            ) : (
              <>
                <ChatContentHeader
                  selectedChat={selectedChat}
                  onDeleteChat={handleDeleteChat}
                  setSelectedChat={setSelectedChat}
                  setContainerToggle={setContainerToggle}
                  sidebarLeftToggle={sidebarLeftToggle}
                  setSidebarLeftToggle={setSidebarLeftToggle}
                  sidebarRightToggle={sidebarRightToggle}
                  setSidebarRightToggle={setSidebarRightToggle}
                />
                <ChatContentDetails selectedChat={selectedChat} />
                <ChatActionFooter onReplyMessage={handleReplyMessage} />
              </>
            )}
          </div>
          <ChatUserInfoSidebar
            selectedChat={selectedChat}
            setSidebarRightToggle={setSidebarRightToggle}
          />
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarRightToggle(false)}></div>
      </Card>
      <InviteFriendModal
        show={showInviteModal}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        handleInviteClose={() => setShowInviteModal(false)}
      />
    </>
  )
}

export default Chat
