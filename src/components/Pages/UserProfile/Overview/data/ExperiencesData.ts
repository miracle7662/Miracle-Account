import shopifyLogo from '@/assets/images/brands/shopify.png'
import figmaLogo from '@/assets/images/brands/figma.png'

interface experiencesType {
  image: string
  title: string
  time: string
  duration: string
  description: string
}

const Experiences: experiencesType[] = [
  {
    image: shopifyLogo,
    title: 'Shopify Developer',
    time: 'June 2022 - Present',
    duration: '2 Years',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit voluptate voluptas illo totam ducimus! Assumenda, numquam rerum laboriosam nostrum odit harum porro, autem neque est nihil eaque et. Odio, eos?',
  },
  {
    image: figmaLogo,
    title: 'UI/UX Designer',
    time: 'June 2020 - Present',
    duration: '4 Years',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit voluptate voluptas illo totam ducimus! Assumenda, numquam rerum laboriosam nostrum odit harum porro, autem neque est nihil eaque et. Odio, eos?',
  },
]

export default Experiences
