import gmail from '@/assets/images/brands/gmail.png'
import dropbox from '@/assets/images/brands/dropbox.png'
import gDrive from '@/assets/images/brands/google-drive.png'
import figma from '@/assets/images/brands/figma.png'
import github from '@/assets/images/brands/github.png'
import gitlab from '@/assets/images/brands/gitlab.png'
import instagram from '@/assets/images/brands/instagram.png'
import pinterest from '@/assets/images/brands/pinterest.png'
import facebook from '@/assets/images/brands/facebook.png'
import shopify from '@/assets/images/brands/shopify.png'
import spotify from '@/assets/images/brands/spotify.png'
import whatsapp from '@/assets/images/brands/whatsapp.png'

interface appsData {
  name: string
  img: string
}

export const appsData: appsData[] = [
  {
    name: 'Gmail',
    img: gmail,
  },
  {
    name: 'Dropbox',
    img: dropbox,
  },
  {
    name: 'Gdrive',
    img: gDrive,
  },
  {
    name: 'Figma',
    img: figma,
  },
  {
    name: 'Github',
    img: github,
  },
  {
    name: 'Gitlab',
    img: gitlab,
  },
  {
    name: 'Instagram',
    img: instagram,
  },
  {
    name: 'Pinterest',
    img: pinterest,
  },
  {
    name: 'Facebook',
    img: facebook,
  },
  {
    name: 'Shopify',
    img: shopify,
  },
  {
    name: 'Spotify',
    img: spotify,
  },
  {
    name: 'Whatsapp',
    img: whatsapp,
  },
]
