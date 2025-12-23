import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'

interface followersType {
  name: string
  image: string
  connection: string
  isFollowing: boolean
}

const Followers: followersType[] = [
  {
    image: avatar1,
    name: 'Alexandra Della',
    connection: '94 Connections',
    isFollowing: true,
  },
  {
    image: avatar2,
    name: 'Anderson Thomas',
    connection: '85 Connections',
    isFollowing: false,
  },
  {
    image: avatar3,
    name: 'Holland Scott',
    connection: '75 Connections',
    isFollowing: true,
  },
  {
    image: avatar4,
    name: 'Nancy Elliot',
    connection: '56 Connections',
    isFollowing: false,
  },
  {
    image: avatar5,
    name: 'Marianne Audrey',
    connection: '26 Connections',
    isFollowing: true,
  },
]

export default Followers
