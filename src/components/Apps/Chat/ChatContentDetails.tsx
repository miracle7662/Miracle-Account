import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import avatar from '@/assets/images/avatars/1.png'

import { ChatItem } from './data/types'

interface ChatContentDetailsProps {
  selectedChat: ChatItem | null
}

const ChatContentDetails: React.FC<ChatContentDetailsProps> = ({ selectedChat }) => {
  if (!selectedChat) {
    return null
  }

  return (
    <PerfectScrollbar className="px-4 py-4 h-100">
      {selectedChat.conversion?.map((conversion, idx) => (
        <div key={idx} className="w-100">
          {conversion.replyMessage && (
            <div
              className="d-flex align-items-start flex-row-reverse gap-3 mb-12 ms-auto"
              style={{ maxWidth: '400px' }}
            >
              <Avatar type="image" size="md" src={avatar} className="flex-shrink-0" />
              <div className="w-100 d-flex flex-column align-items-end justify-content-end">
                <p className="px-2 py-2 mb-2 rounded bg-primary text-white">
                  {conversion.replyMessage[0]?.reply}
                </p>
                <div className="fs-12 text-muted">{conversion.replyMessage[0]?.datetime}</div>
              </div>
            </div>
          )}
          {conversion.sentMessage && (
            <div className="d-flex align-items-start gap-3 mb-12" style={{ maxWidth: '400px' }}>
              <Avatar type="image" size="md" src={selectedChat.image} className="flex-shrink-0" />
              <div className="w-100 d-flex flex-column align-items-start justify-content-start">
                <p className="px-2 py-2 mb-2 rounded bg-body-secondary text-dark">
                  {conversion.sentMessage[0]?.sent || 'No message content'}
                </p>
                <div className="fs-12 text-muted">{conversion.sentMessage[0]?.datetime}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </PerfectScrollbar>
  )
}

export default ChatContentDetails
