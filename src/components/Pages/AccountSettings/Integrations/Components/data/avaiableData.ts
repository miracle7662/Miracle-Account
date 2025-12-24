import gitlab from '@/assets/images/brands/gitlab.png'
import pinterest from '@/assets/images/brands/pinterest.png'
import gdrive from '@/assets/images/brands/google-drive.png'
import shopify from '@/assets/images/brands/shopify.png'
import spotify from '@/assets/images/brands/spotify.png'
import whatsapp from '@/assets/images/brands/whatsapp.png'

interface avaiableType {
  image: string
  name: string
  count: string
  status: string
  desc: string
  fulldesc: string
}

const avaiableData: avaiableType[] = [
  {
    image: gitlab,
    name: 'Gitlab',
    count: '2,589,157',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem!',
  },
  {
    image: pinterest,
    name: 'Pinterest',
    count: '9,789,963',
    status: 'Unverified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
  },
  {
    image: gdrive,
    name: 'Google Drive',
    count: '2,245,325',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
  },
  {
    image: shopify,
    name: 'Shopify',
    count: '5,478,962',
    status: 'Unverified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
  },
  {
    image: spotify,
    name: 'Spotify',
    count: '6,357,954',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
  },
  {
    image: whatsapp,
    name: 'Whatsapp',
    count: '3,754,359',
    status: 'Verified',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
    fulldesc:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam. Repellendus voluptates error veritatis pariatur quia exercitationem! Repudiandae corporis quibusdam',
  },
]

export default avaiableData
