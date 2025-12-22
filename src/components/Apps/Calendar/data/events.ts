import { EventType } from './types'

const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()

const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)
const y_dd = String(yesterday.getDate()).padStart(2, '0')
const y_mm = String(yesterday.getMonth() + 1).padStart(2, '0')
const y_yyyy = yesterday.getFullYear()

const YM = yyyy + '-' + mm
const YESTERDAY = y_yyyy + '-' + y_mm + '-' + y_dd
const TODAY = yyyy + '-' + mm + '-' + dd

export const events: EventType[] = [
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Company standup meeting',
    start: YM + '-03T13:30:00',
    className: 'fc-event-danger-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Web design presentation',
    start: YM + '-14T13:30:00',
    end: YM + '-14',
    className: 'fc-event-success-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Standup sesign presentation',
    start: YM + '-05',
    end: YM + '-06',
    className: 'fc-event-primary-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Company start concept',
    start: YM + '-02',
    end: YM + '-04',
    className: 'fc-event-primary-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Meeting with USA client',
    start: YM + '-12',
    end: YM + '-10',
    className: 'fc-event-warning-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Admin Design Review',
    start: YM + '-07T16:00:00',
    className: 'fc-event-danger-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Visit online course',
    start: YM + '-16T16:00:00',
    end: YM + '-14',
    className: 'fc-event-info-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Meeting with designer',
    start: TODAY,
    end: TODAY + '-01',
    className: 'fc-event-primary-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Weekly strategy planning',
    start: TODAY + 'T10:00:00',
    className: 'fc-event-success-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Flash sale starting Tomorrow',
    start: TODAY + 'T14:30:00',
    className: 'fc-event-warning-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Monthly sales report',
    start: TODAY + 'T17:30:00',
    className: 'fc-event-success-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Favorites product scale',
    start: YESTERDAY + 'T05:00:00',
    className: 'fc-event-danger-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Meeting with printing designer',
    start: YESTERDAY + 'T07:00:00',
    className: 'fc-event-primary-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
  {
    id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    title: 'Visit online course',
    start: YM + '-31T16:00:00',
    end: YM + '-30',
    className: 'fc-event-success-subtle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa, fuga eius, repellendus velit nesciunt consequatur nulla corrupti delectus quia animi ipsam quibusdam sapiente tempora ipsa error quisquam. Ipsam, dolores!',
  },
]
