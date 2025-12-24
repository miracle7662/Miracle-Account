import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'

interface dataRecord {
  id: number
  avatar: string
  name: string
  email: string
  status: string
  dob: string
}

const tableData: dataRecord[] = [
  {
    id: 741258,
    avatar: avatar1,
    name: 'Archie Tones',
    email: 'rchie.ones@email.com',
    status: '<span class="badge bg-success-subtle text-success">Completed</span>',
    dob: '15/06/2023, 12:15PM',
  },
  {
    id: 289654,
    avatar: avatar2,
    name: 'Holmes Cherry',
    email: 'olmes.herry@email.com',
    status: '<span class="badge bg-warning-subtle text-warning">Pending</span>',
    dob: '20/06/2023, 12:15PM',
  },
  {
    id: 258963,
    avatar: avatar3,
    name: 'Kenneth Hune',
    email: 'enneth.une@email.com',
    status: '<span class="badge bg-info-subtle text-info">Scheduled</span>',
    dob: '18/06/2023, 12:15PM',
  },
  {
    id: 654478,
    avatar: avatar4,
    name: 'Malanie Hanvey',
    email: 'alanie.anvey@email.com',
    status: '<span class="badge bg-danger-subtle text-danger">Cancelled</span>',
    dob: '22/06/2023, 12:15PM',
  },
  {
    id: 963587,
    avatar: avatar5,
    name: 'Valentine Maton',
    email: 'alanie.anvey@email.com',
    status: '<span class="badge bg-success-subtle text-success">Completed</span>',
    dob: '25/06/2023, 12:15PM',
  },
]

export { tableData }
