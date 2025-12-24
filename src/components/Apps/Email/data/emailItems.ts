import { v4 as uuidv4 } from 'uuid'
import avatar1 from '@/assets/images/avatars/11.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'
import avatar7 from '@/assets/images/avatars/7.png'
import avatar8 from '@/assets/images/avatars/8.png'
import avatar9 from '@/assets/images/avatars/9.png'
import avatar10 from '@/assets/images/avatars/10.png'

import { emailItem } from './types'

const emailItems: emailItem[] = [
  {
    id: uuidv4(),
    image: avatar1,
    time: '2:25 PM',
    fulldatetime: '24 FEB 2024, 2:25 PM',
    name: 'Elena Mateo',
    email: 'elena.mateo@example.com',
    subject: 'I heard you recently traveled. Tell me all about it!',
    message:
      'Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.',
    description:
      'Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies. Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies. Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies. Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.',
    attachment: true,
    inbox: true,
    sent: false,
    starred: false,
    draft: false,
    spam: false,
    trash: false,
    label: { name: 'Updates', value: 'updates', gradient: 'primary' },
  },
  {
    id: uuidv4(),
    image: avatar2,
    time: '3:15 PM',
    fulldatetime: '25 FEB 2024, 3:15 PM',
    name: 'Valentine Maton',
    email: 'valentine@example.com',
    subject: 'Just finished a great book and wanted to recommend it to you.',
    message:
      'Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.',
    description:
      'Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.',
    attachment: true,
    inbox: true,
    sent: true,
    starred: true,
    draft: true,
    spam: false,
    trash: false,
    label: { name: 'Important', value: 'important', gradient: 'success' },
  },
  {
    id: uuidv4(),
    image: avatar3,
    time: '4:30 PM',
    fulldatetime: '26 FEB 2024, 4:30 PM',
    name: 'Laura Foreman',
    email: 'foreman@example.com',
    subject: "Long time no talk. Let's plan a catch-up soon.",
    message:
      'Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.',
    description:
      'Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.',
    attachment: false,
    inbox: true,
    sent: true,
    starred: false,
    draft: false,
    spam: true,
    trash: false,
    label: { name: 'Updates', value: 'updates', gradient: 'primary' },
  },
  {
    id: uuidv4(),
    image: avatar4,
    time: '5:22 PM',
    fulldatetime: '27 FEB 2024, 5:22 PM',
    name: 'Bryan Waters',
    email: 'waters@example.com',
    subject: 'Just finished a great book and wanted to recommend it to you.',
    message:
      'Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.',
    description:
      'Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.',
    attachment: false,
    inbox: false,
    sent: false,
    starred: false,
    draft: false,
    spam: false,
    trash: false,
    label: { name: 'Personal', value: 'personal', gradient: 'warning' },
  },
  {
    id: uuidv4(),
    image: avatar5,
    time: '6:33 PM',
    fulldatetime: '28 FEB 2024, 6:33 PM',
    name: 'Malanie Hanvey',
    email: 'hanvey@example.com',
    subject: "Long time no talk. Let's plan a catch-up soon.",
    message:
      'Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.',
    description:
      'Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.',
    attachment: false,
    inbox: false,
    sent: false,
    starred: true,
    draft: false,
    spam: false,
    trash: true,
    label: { name: 'Private', value: 'private', gradient: 'danger' },
  },
  {
    id: uuidv4(),
    image: avatar6,
    time: '2:25 PM',
    fulldatetime: '24 FEB 2024, 2:25 PM',
    name: 'Erna Serpa',
    email: 'serpa@example.com',
    subject: 'I stumbled upon an interesting article today.',
    message:
      'Devoted Angular developer with expertise in building scalable and feature-rich web applications. Enjoys tackling challenging problems and implementing elegant solutions.',
    description:
      'Devoted Angular developer with expertise in building scalable and feature-rich web applications. Enjoys tackling challenging problems and implementing elegant solutions.Devoted Angular developer with expertise in building scalable and feature-rich web applications. Enjoys tackling challenging problems and implementing elegant solutions.Devoted Angular developer with expertise in building scalable and feature-rich web applications. Enjoys tackling challenging problems and implementing elegant solutions.Devoted Angular developer with expertise in building scalable and feature-rich web applications. Enjoys tackling challenging problems and implementing elegant solutions.',
    attachment: true,
    inbox: true,
    sent: false,
    starred: false,
    draft: false,
    spam: false,
    trash: false,
    label: { name: 'Updates', value: 'updates', gradient: 'primary' },
  },
  {
    id: uuidv4(),
    image: avatar7,
    time: '3:15 PM',
    fulldatetime: '25 FEB 2024, 3:15 PM',
    name: 'Timothy Boyd',
    email: 'foreman@example.com',
    subject: 'Are you free for a quick chat later? ',
    message:
      'Passionate Vue.js developer with a knack for building modular and maintainable front-end applications. Enjoys collaborating with designers to bring creative ideas to life.',
    description:
      'Passionate Vue.js developer with a knack for building modular and maintainable front-end applications. Enjoys collaborating with designers to bring creative ideas to life.Passionate Vue.js developer with a knack for building modular and maintainable front-end applications. Enjoys collaborating with designers to bring creative ideas to life.Passionate Vue.js developer with a knack for building modular and maintainable front-end applications. Enjoys collaborating with designers to bring creative ideas to life.',
    attachment: false,
    inbox: true,
    sent: true,
    starred: true,
    draft: true,
    spam: false,
    trash: false,
    label: { name: 'Important', value: 'important', gradient: 'success' },
  },
  {
    id: uuidv4(),
    image: avatar8,
    time: '4:30 PM',
    fulldatetime: '26 FEB 2024, 4:30 PM',
    name: 'Mikaela Collins',
    email: 'malanie@example.com',
    subject: "Hi Mikaela! How's the project going?",
    message:
      'Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.',
    description:
      'Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.',
    attachment: true,
    inbox: true,
    sent: true,
    starred: false,
    draft: false,
    spam: true,
    trash: false,
    label: { name: 'Updates', value: 'updates', gradient: 'primary' },
  },
  {
    id: uuidv4(),
    image: avatar9,
    time: '5:22 PM',
    fulldatetime: '27 FEB 2024, 5:22 PM',
    name: 'Emma Bold',
    email: 'alentine@example.com',
    subject: 'Remember that trip we planned?',
    message:
      'Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.',
    description:
      'Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.',
    attachment: false,
    inbox: true,
    sent: false,
    starred: false,
    draft: false,
    spam: false,
    trash: false,
    label: { name: 'Personal', value: 'personal', gradient: 'warning' },
  },
  {
    id: uuidv4(),
    image: avatar10,
    time: '6:33 PM',
    fulldatetime: '28 FEB 2024, 6:33 PM',
    name: 'Sanders Ursula',
    email: 'mateo@example.com',
    subject: "Let's catch up soon over a cup of coffee!",
    message:
      'Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.',
    description:
      'Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.',
    attachment: false,
    inbox: true,
    sent: false,
    starred: true,
    draft: false,
    spam: false,
    trash: true,
    label: { name: 'Private', value: 'private', gradient: 'danger' },
  },
]

export default emailItems
