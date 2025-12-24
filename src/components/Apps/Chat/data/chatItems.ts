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

import { ChatItem } from './types'

const chatItems: ChatItem[] = [
  {
    id: uuidv4(),
    image: avatar1,
    time: '2:05 PM',
    name: 'Elena Mateo',
    role: 'Frontend Developer',
    message: 'Hi Frank! How are you doing? I heard you recently traveled. Tell me all about it!',
    about:
      'Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.',
    phone: '+1(375)-987-9632',
    email: 'mateo@example.com',
    joined: '3 Feb 2024',
    location: 'California, United States',
    website: 'https://wrapcoders.com',
    badge: [
      {
        count: '2',
        color: 'success',
      },
    ],
    conversion: [
      {
        sentMessage: [
          {
            sent: 'Hello',
            datetime: '10:25 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Hi there!',
            datetime: '10:30 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'How are you?',
            datetime: '10:32 PM',
          },
        ],
        replyMessage: [
          {
            reply: "I'm good, thanks!",
            datetime: '10:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Sure, what do you need help with?',
            datetime: '10:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: "I'm stuck on the marketing strategy. Any tips?",
            datetime: '10:45 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar2,
    time: '3:15 PM',
    name: 'Bryan Waters',
    role: 'UI/UX Designer',
    message:
      "Hey there! Just finished a great book and wanted to recommend it to you. It's a must-read!",
    about:
      'Dedicated affiliate marketer specializing in driving online sales and revenue. Enjoys building strategic partnerships and exploring new opportunities in the affiliate marketing space.',
    phone: '+1(432)-109-8765',
    email: 'ursula@example.com',
    joined: '12 Feb 2024',
    location: 'Texas, United States',
    website: 'https://affiliateexp.com',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'Hi Bryan!',
            datetime: '06:22 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Hello! Thanks for the recommendation.',
            datetime: '06:26 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: "What's the title?",
            datetime: '06:34 PM',
          },
        ],
        replyMessage: [
          {
            reply: "It's called 'The Adventure Begins.'",
            datetime: '06:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'We should check it out together!',
            datetime: '06:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sure! Let's plan it for the weekend.",
            datetime: '06:42 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Send me the link!',
            datetime: '06:45 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Here's the link: [Article Link]",
            datetime: '06:48 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar3,
    time: '4:30 PM',
    name: 'Malanie Hanvey',
    role: 'Backend Developer',
    message: "Hi! Long time no talk. Let's plan a catch-up soon. I miss our coffee chats!",
    about:
      'Fullstack developer with a passion for building end-to-end web applications. Enjoys working with both front-end and back-end technologies to deliver seamless user experiences.',
    phone: '+1(567)-890-1234',
    email: 'emma@example.com',
    joined: '11 Feb 2024',
    location: 'California, United States',
    website: 'https://fullstackm.com',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'Hey Malanie!',
            datetime: '08:30 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Hi! Absolutely, I'd love to catch up.",
            datetime: '08:32 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar4,
    time: '5:45 PM',
    name: 'Valentine Maton',
    role: 'React Developer',
    message: "Good day! I hope you're having a fantastic week. Any exciting plans ahead?",
    about:
      'Digital marketer with a focus on data-driven strategies and campaign optimization. Excels in creating effective online marketing campaigns to drive brand awareness and engagement.',
    phone: '+1(210)-987-6543',
    email: 'collins@example.com',
    joined: '10 Feb 2024',
    location: 'New York, United States',
    website: 'https://digitalmar.com',
    badge: [
      {
        count: '5',
        color: 'warning',
      },
    ],
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar5,
    time: '6:20 PM',
    name: 'Laura Foreman',
    role: 'Vue Developer',
    message: "Hello! Did you try that new restaurant downtown? I heard it's amazing!",
    about:
      'Skilled WordPress developer passionate about creating custom and responsive websites. Enjoys exploring new WordPress plugins and themes to enhance website functionality.',
    phone: '+1(345)-678-9012',
    email: 'boyd@example.com',
    joined: '9 Feb 2024',
    location: 'Illinois, United States',
    website: 'https://wordpressw.com',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar6,
    time: '7:05 PM',
    name: 'Erna Serpa',
    role: 'Angular Developer',
    message:
      'Hi friend! I stumbled upon an interesting article today. Let me know if you want the link!',
    about:
      'Devoted Angular developer with expertise in building scalable and feature-rich web applications. Enjoys tackling challenging problems and implementing elegant solutions.',
    phone: '+1(876)-543-2109',
    email: 'serpa@example.com',
    joined: '8 Feb 2024',
    location: 'Georgia, United States',
    website: 'https://angularpro.com',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar7,
    time: '8:30 PM',
    name: 'Timothy Boyd',
    role: 'WordPress Developer',
    message: 'Hey Tim! Are you free for a quick chat later? I have some exciting news to share!',
    about:
      'Passionate Vue.js developer with a knack for building modular and maintainable front-end applications. Enjoys collaborating with designers to bring creative ideas to life.',
    phone: '+1(987)-654-3210',
    email: 'foreman@example.com',
    joined: '7 Feb 2024',
    location: 'California, United States',
    website: 'https://vueartist.com',
    badge: [
      {
        count: '4',
        color: 'danger',
      },
    ],
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar8,
    time: '9:15 PM',
    name: 'Mikaela Collins',
    role: 'Digital Marketer',
    message: "Hi Mikaela! How's the project going? Need any help or advice?",
    about:
      'Backend developer passionate about building scalable and efficient server-side applications. Enjoys optimizing code for performance and solving intricate backend problems.',
    phone: '+1(789)-456-1230',
    email: 'malanie@example.com',
    joined: '5 Feb 2024',
    location: 'Texas, United States',
    website: 'https://backendexpert.com',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar9,
    time: '10:00 PM',
    name: 'Emma Bold',
    role: 'Fullstack Developer',
    message: "Hey Emma! Remember that trip we planned? Let's start organizing it. I'm so excited!",
    about:
      'Enthusiastic React developer with a focus on creating dynamic and interactive user interfaces. Loves exploring new React features and building responsive web applications.',
    phone: '+1(234)-567-8901',
    email: 'valentine@example.com',
    joined: '6 Feb 2024',
    location: 'Florida, United States',
    website: 'https://reactguru.io',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    image: avatar10,
    time: '11:25 PM',
    name: 'Sanders Ursula',
    role: 'Affiliate Marketer',
    message:
      "Hello Ursula! I hope your day is going well. Let's catch up soon over a cup of coffee!",
    about:
      'Passionate frontend developer with a love for creating beautiful and responsive user interfaces. Always eager to learn and explore the latest web technologies.',
    phone: '+1(375)-987-9632',
    email: 'mateo@example.com',
    joined: '3 Feb 2024',
    location: 'California, United States',
    website: 'https://wrapcoders.com',
    conversion: [
      {
        sentMessage: [
          {
            sent: 'How about this weekend?',
            datetime: '08:35 PM',
          },
        ],
        replyMessage: [
          {
            reply: "Sounds good! Let's meet at our favorite cafe.",
            datetime: '08:36 PM',
          },
        ],
      },
      {
        sentMessage: [
          {
            sent: 'Any exciting plans?',
            datetime: '08:40 PM',
          },
        ],
        replyMessage: [
          {
            reply: 'Not much, just some coding and relaxation.',
            datetime: '08:55 PM',
          },
        ],
      },
    ],
  },
]

export default chatItems
