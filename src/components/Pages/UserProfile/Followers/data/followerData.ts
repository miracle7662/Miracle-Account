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

interface followersType {
  name: string
  image: string
  email: string
  isFollowing: boolean
}

const Followers: followersType[] = [
  {
    image: avatar1,
    name: 'Alexandra Della',
    email: 'alex.della@outlook.com',
    isFollowing: true,
  },
  {
    image: avatar2,
    name: 'Anderson Thomas',
    email: 'anderson.thomas@yahoo.com',
    isFollowing: false,
  },
  {
    image: avatar3,
    name: 'Holland Scott',
    email: 'holland.scott@gmail.com',
    isFollowing: true,
  },
  {
    image: avatar4,
    name: 'Nancy Elliot',
    email: 'nancy.elliot@yahoo.com',
    isFollowing: false,
  },
  {
    image: avatar5,
    name: 'Marianne Audrey',
    email: 'marianne.audrey@live.com',
    isFollowing: false,
  },
  {
    image: avatar6,
    name: 'Henry Leach',
    email: 'henry.leach@live.com',
    isFollowing: true,
  },
  {
    image: avatar7,
    name: 'Frances Arnold',
    email: 'frances.arnold@email.com',
    isFollowing: false,
  },
  {
    image: avatar8,
    name: 'Nolan Etienne',
    email: 'nolan.etienne@email.com',
    isFollowing: true,
  },
  {
    image: avatar9,
    name: 'Maxim Werner',
    email: 'maxim.werner@gmail.com',
    isFollowing: true,
  },
  {
    image: avatar10,
    name: 'Mildred Chavez',
    email: 'mildred.chavez@email.com',
    isFollowing: false,
  },
  {
    image: avatar11,
    name: 'Logan Saunders',
    email: 'logan.saunders@live.com',
    isFollowing: true,
  },
  {
    image: avatar12,
    name: 'Phillip Burke',
    email: 'phillip.burke@live.com',
    isFollowing: false,
  },
]

export default Followers
