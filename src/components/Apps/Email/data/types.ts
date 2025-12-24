export interface emailItem {
  id: string
  image: string
  name: string
  email: string
  time: string
  fulldatetime: string
  subject: string
  message: string
  description: string
  attachment: boolean
  inbox: boolean
  sent: boolean
  starred: boolean
  draft: boolean
  spam: boolean
  trash: boolean
  label: Label | string
}

export interface Category {
  name: string
  value: string
  icon: string
  badge?: number
  badgeClassName?: string
}

export interface Label {
  name: string
  value: string
  gradient: string
}
