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

interface contactsType {
  name: string
  image: string
  email: string
  phone: string
  isFavorite: boolean
}

const Contacts: contactsType[] = [
  {
    image: avatar1,
    name: 'Alexandra Della',
    email: 'della@outlook.com',
    phone: '(587)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar2,
    name: 'Anderson Thomas',
    email: 'thomas@yahoo.com',
    phone: '(456)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar3,
    name: 'Holland Scott',
    email: 'scott@gmail.com',
    phone: '(247)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar4,
    name: 'Nancy Elliot',
    email: 'elliot@yahoo.com',
    phone: '(856)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar5,
    name: 'Marianne Audrey',
    email: 'audrey@live.com',
    phone: '(632)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar6,
    name: 'Henry Leach',
    email: 'leach@live.com',
    phone: '(958)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar7,
    name: 'Frances Arnold',
    email: 'arnold@email.com',
    phone: '(856)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar8,
    name: 'Nolan Etienne',
    email: 'etienne@email.com',
    phone: '(557)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar9,
    name: 'Maxim Werner',
    email: 'werner@gmail.com',
    phone: '(547)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar10,
    name: 'Mildred Chavez',
    email: 'chavez@email.com',
    phone: '(966)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar11,
    name: 'Logan Saunders',
    email: 'saunders@live.com',
    phone: '(366)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar12,
    name: 'Phillip Burke',
    email: 'burke@live.com',
    phone: '(589)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar7,
    name: 'Frances Arnold',
    email: 'arnold@email.com',
    phone: '(856)-987-9632',
    isFavorite: false,
  },
  {
    image: avatar8,
    name: 'Nolan Etienne',
    email: 'etienne@email.com',
    phone: '(557)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar9,
    name: 'Maxim Werner',
    email: 'werner@gmail.com',
    phone: '(547)-987-9632',
    isFavorite: true,
  },
  {
    image: avatar10,
    name: 'Mildred Chavez',
    email: 'chavez@email.com',
    phone: '(966)-987-9632',
    isFavorite: false,
  },
]

export default Contacts
