export interface stateItem {
    id: string
    name: string
    all: boolean
    starred: boolean
    western: boolean
    eastern: boolean
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