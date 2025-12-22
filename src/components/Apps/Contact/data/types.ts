export interface contactItem {
  id: string
  image: string
  time: string
  name: string
  role: string
  message: string
  about: string
  phone: string
  email: string
  joined: string
  location: string
  website: string
  alls: boolean
  starred: boolean
  archive: boolean
  others: boolean
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
