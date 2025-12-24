import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'
import avatar7 from '@/assets/images/avatars/7.png'
import avatar8 from '@/assets/images/avatars/8.png'
import avatar9 from '@/assets/images/avatars/9.png'
import avatar10 from '@/assets/images/avatars/10.png'
import avatar11 from '@/assets/images/avatars/11.png'
import avatar12 from '@/assets/images/avatars/12.png'

interface projectsType {
  badge: string
  color: string
  name: string
  startDate: Date
  endDate: Date
  client: string
  desc: string
  progress: number
  attach: number
  comment: number
  avatars: string[]
}

const Projects: projectsType[] = [
  {
    badge: 'Mobile App',
    color: 'primary',
    name: 'React Admin Dashboard',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    client: 'Mark Stocks',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sapiente repudiandae illo dolores consectetur quo?',
    progress: 78,
    attach: 5,
    comment: 8,
    avatars: [avatar1, avatar2, avatar3, avatar4],
  },
  {
    badge: 'Web Design',
    color: 'warning',
    name: 'React Admin Dashboard',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    client: 'Laura Foreman',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sapiente repudiandae illo dolores consectetur quo?',
    progress: 62,
    attach: 5,
    comment: 6,
    avatars: [avatar5, avatar6, avatar7],
  },
  {
    badge: 'Admin Template',
    color: 'success',
    name: 'React Admin Dashboard',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    client: 'Kenneth Hune',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sapiente repudiandae illo dolores consectetur quo?',
    progress: 86,
    attach: 4,
    comment: 6,
    avatars: [avatar8, avatar9, avatar10, avatar11, avatar12],
  },
  {
    badge: 'Logo Design',
    color: 'danger',
    name: 'React Admin Dashboard',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    client: 'Timothy Boyd',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sapiente repudiandae illo dolores consectetur quo?',
    progress: 55,
    attach: 3,
    comment: 4,
    avatars: [avatar2, avatar3, avatar4],
  },
  {
    badge: 'React Admin',
    color: 'info',
    name: 'React Admin Dashboard',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    client: 'Althea Cabardo',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sapiente repudiandae illo dolores consectetur quo?',
    progress: 80,
    attach: 6,
    comment: 9,
    avatars: [avatar8, avatar9, avatar10, avatar11, avatar12],
  },
  {
    badge: 'Figma Dashboard',
    color: 'dark',
    name: 'React Admin Dashboard',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-25'),
    client: 'Adrian Monino',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sapiente repudiandae illo dolores consectetur quo?',
    progress: 60,
    attach: 4,
    comment: 5,
    avatars: [avatar2, avatar3, avatar4],
  },
]

export default Projects
