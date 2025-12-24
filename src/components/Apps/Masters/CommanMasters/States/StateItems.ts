import { stateItem } from './types'

const stateItems: stateItem[] = [
  {
    id: '1',
    name: 'California',
    all: true,
    starred: false,
    western: true,
    eastern: false,
    label: { name: 'Coastal', value: 'coastal', gradient: 'success' },
  },
  {
    id: '2',
    name: 'New York',
    all: true,
    starred: true,
    western: false,
    eastern: true,
    label: { name: 'Coastal', value: 'coastal', gradient: 'success' },
  },
  {
    id: '3',
    name: 'Texas',
    all: true,
    starred: false,
    western: true,
    eastern: false,
    label: { name: 'Inland', value: 'inland', gradient: 'warning' },
  },
  {
    id: '4',
    name: 'Florida',
    all: true,
    starred: false,
    western: false,
    eastern: true,
    label: { name: 'Coastal', value: 'coastal', gradient: 'success' },
  },
  {
    id: '5',
    name: 'Arizona',
    all: true,
    starred: false,
    western: true,
    eastern: false,
    label: { name: 'Border', value: 'border', gradient: 'danger' },
  },
]

export default stateItems