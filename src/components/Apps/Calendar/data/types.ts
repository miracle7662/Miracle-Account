export type Event = {
  id: string | number
  title: string
  start: Date | null
  end?: Date | undefined | null
  classNames: string[]
  description: string
  extendedProps: {
    description: string
  }
}

export interface EventType {
  id: string
  title: string
  start: string
  end?: string
  className: string
  description: string
}

export interface EventData {
  id: string
  title: string
  start: Date
  end?: Date
  description: string
  classNames: string[]
}
