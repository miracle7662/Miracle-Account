import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'

const avatarImgData = [
  { src: avatar4, alt: 'User Avatar', size: 'sm', status: 'busy' },
  { src: avatar1, alt: 'User Avatar', size: 'md', status: 'online' },
  { src: avatar2, alt: 'User Avatar', size: 'lg', status: 'offline' },
  { src: avatar3, alt: 'User Avatar', size: 'xl', status: 'inactive' },
  { src: avatar5, alt: 'User Avatar', size: 'xxl', status: 'invisible' },
  { src: avatar6, alt: 'User Avatar', size: 'xxxl', status: 'always' },
]

export { avatarImgData }

const avatarTextData = [
  { text: 'A', colorSolid: 'primary', colorSoft: 'primary', shape: '0' },
  { text: 'B', colorSolid: 'secondary', colorSoft: 'secondary', shape: '1' },
  { text: 'C', colorSolid: 'success', colorSoft: 'success', shape: '2' },
  { text: 'D', colorSolid: 'danger', colorSoft: 'danger', shape: '3' },
  { text: 'E', colorSolid: 'warning', colorSoft: 'warning', shape: '4' },
  { text: 'F', colorSolid: 'info', colorSoft: 'info', shape: '5' },
]

export { avatarTextData }
