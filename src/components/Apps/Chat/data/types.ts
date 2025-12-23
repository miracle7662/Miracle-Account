export interface Badge {
  color: string
  count: string | number
}

export interface SentMessage {
  sent?: string
  datetime: string
}

export interface ReplyMessage {
  reply: string
  datetime: string
}

export interface Conversion {
  sentMessage?: SentMessage[]
  replyMessage?: ReplyMessage[]
}

export interface ChatItem {
  id: string
  image: string
  name: string
  role: string
  message: string
  time: string
  about: string
  phone: string
  email: string
  joined: string
  location: string
  website: string
  badge?: Badge[]
  conversion?: Conversion[]
}

export type Message = SentMessage | ReplyMessage
