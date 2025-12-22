import usFlag from '@/assets/images/flags/1x1/us.svg'
import deFlag from '@/assets/images/flags/1x1/de.svg'
import inFlag from '@/assets/images/flags/1x1/in.svg'
import frFlag from '@/assets/images/flags/1x1/fr.svg'
import ruFlag from '@/assets/images/flags/1x1/ru.svg'

interface langData {
  name: string
  flag: string
}

export const langData: langData[] = [
  {
    name: 'English',
    flag: usFlag,
  },
  {
    name: 'German',
    flag: deFlag,
  },
  {
    name: 'Hindi',
    flag: inFlag,
  },
  {
    name: 'Freanch',
    flag: frFlag,
  },
  {
    name: 'Russian',
    flag: ruFlag,
  },
]
