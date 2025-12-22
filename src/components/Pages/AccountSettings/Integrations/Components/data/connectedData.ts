import dropbox from '@/assets/images/brands/dropbox.png'
import facebook from '@/assets/images/brands/facebook.png'
import figma from '@/assets/images/brands/figma.png'
import github from '@/assets/images/brands/github.png'
import gmail from '@/assets/images/brands/gmail.png'
import instagram from '@/assets/images/brands/instagram.png'

interface connectedType {
  image: string
  name: string
  count: string
  status: string
  desc: string
  fulldesc: string
  isSync: boolean
}

const connectedData: connectedType[] = [
  {
    image: dropbox,
    name: 'Dropbox',
    count: '2,589,157',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem!',
    isSync: true,
  },
  {
    image: facebook,
    name: 'Facebook',
    count: '9,789,963',
    status: 'Unverified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    isSync: false,
  },
  {
    image: figma,
    name: 'Figma',
    count: '2,245,325',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    isSync: true,
  },
  {
    image: github,
    name: 'GitHub',
    count: '5,478,962',
    status: 'Unverified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    isSync: false,
  },
  {
    image: gmail,
    name: 'Gmail',
    count: '6,357,954',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    isSync: false,
  },
  {
    image: instagram,
    name: 'Instagram',
    count: '3,754,359',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    isSync: true,
  },
]

export default connectedData
