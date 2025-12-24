import { ListGroup, Stack } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Loading from '@/components/Misc/Loading'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { ChatItem } from './data/types'

interface ChatAsiderChatListProps {
  chatItems: ChatItem[]
  selectedChat: ChatItem | null
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatItem | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  searchQuery: string
  onDeleteChat: (chatId: string) => void
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatAsiderChatList: React.FC<ChatAsiderChatListProps> = ({
  chatItems,
  selectedChat,
  setSelectedChat,
  setLoading,
  searchQuery,
  onDeleteChat,
  setContainerToggle,
}) => {
  const handleChatItemClick = (index: number) => {
    setSelectedChat(chatItems[index])
    setContainerToggle(true)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const filteredChatItems = chatItems.filter(
    ({ name, message }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <PerfectScrollbar className="h-100 d-flex flex-column">
        <ListGroup variant="flush" className="flex-grow-1">
          {filteredChatItems.length === 0 ? (
            <ListGroup.Item className="py-4 text-center">No items found</ListGroup.Item>
          ) : (
            filteredChatItems.map(({ image, name, message, time, badge, id }, idx) => (
              <ListGroup.Item
                className={`py-4 ${selectedChat === chatItems[idx] ? 'bg-secondary-subtle' : ''}`}
                key={id}
                onClick={() => handleChatItemClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <Stack direction="horizontal" gap={3} className="align-items-start">
                  <Stack direction="horizontal" gap={3}>
                    <Avatar type="image" size="md" src={image} alt="User Avatar" />
                    <div style={{ maxWidth: '160px' }}>
                      <h6 className="fs-14">{name}</h6>
                      <p className="fw-light text-truncate mb-0">{message}</p>
                    </div>
                  </Stack>
                  <Stack className="ms-auto align-items-end">
                    <time className="fs-11 text-uppercase mb-1">{time}</time>
                    {badge && (
                      <span className={`badge bg-${badge[0].color}-subtle text-${badge[0].color}`}>
                        {badge[0].count}
                      </span>
                    )}
                  </Stack>
                </Stack>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
        <div className="m-4">
          <Loading className="w-100" />
        </div>
      </PerfectScrollbar>
    </>
  )
}

export default ChatAsiderChatList
