import { v4 as uuidv4 } from 'uuid'

// Images
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

export const navItems = [
  {
    id: uuidv4(),
    key: 'alls',
    eventKey: 'alls',
    label: 'Alls',
    badgeValue: '54+',
    badgeColor: 'success-subtle',
    badgeTextColor: 'success',
  },
  {
    id: uuidv4(),
    key: 'unread',
    eventKey: 'unread',
    label: 'Unread',
    badgeValue: '33+',
    badgeColor: 'danger-subtle',
    badgeTextColor: 'danger',
  },
  {
    id: uuidv4(),
    key: 'archive',
    eventKey: 'archive',
    label: 'Archive',
    badgeValue: '20+',
    badgeColor: 'warning-subtle',
    badgeTextColor: 'warning',
  },
]

export const tabPanes = [
  {
    eventKey: 'alls',
    notifications: [
      {
        id: uuidv4(),
        avatarSrc: avatar1,
        sender: 'Laura Foreman and 25+ more',
        message: 'sent you a friend request',
        time: '12 minutes ago',
        category: 'Communication',
        actions: [
          { label: 'Accepet', variant: 'danger', onClick: () => {} },
          { label: 'Decline', variant: 'neutral', onClick: () => {} },
        ],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar2,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar3,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
        actions: [{ label: 'Reply', variant: 'dark', onClick: () => {} }],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar4,
        sender: 'Laura Brandt',
        message: 'request a payment of $200 for admin project',
        time: '12 minutes ago',
        category: 'Communication',
        actions: [
          { label: 'Pay Now', variant: 'primary', onClick: () => {} },
          { label: 'Decline', variant: 'neutral', onClick: () => {} },
        ],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar5,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar6,
        sender: 'Sanders Ursula',
        message: 'added file to WINDOW react admin project',
        time: '48 minutes ago',
        category: 'Project',
        actions: [{ label: 'Download', variant: 'success', onClick: () => {} }],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar7,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar8,
        sender: 'Foreman Laura and 25+ more',
        message: 'sent you a friend request',
        time: '12 minutes ago',
        category: 'Communication',
        actions: [
          { label: 'Accepet', variant: 'danger', onClick: () => {} },
          { label: 'Decline', variant: 'neutral', onClick: () => {} },
        ],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar9,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar10,
        sender: 'Laura Brandt',
        message: 'request a payment of $200 for admin project',
        time: '12 minutes ago',
        category: 'Communication',
        actions: [
          { label: 'Pay Now', variant: 'primary', onClick: () => {} },
          { label: 'Decline', variant: 'neutral', onClick: () => {} },
        ],
      },
    ],
  },
  {
    eventKey: 'unread',
    notifications: [
      {
        id: uuidv4(),
        avatarSrc: avatar2,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar3,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
        actions: [{ label: 'Reply', variant: 'dark', onClick: () => {} }],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar5,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar6,
        sender: 'Sanders Ursula',
        message: 'added file to WINDOW react admin project',
        time: '48 minutes ago',
        category: 'Project',
        actions: [{ label: 'Download', variant: 'success', onClick: () => {} }],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar7,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
    ],
  },
  {
    eventKey: 'archive',
    notifications: [
      {
        id: uuidv4(),
        avatarSrc: avatar3,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
        actions: [{ label: 'Reply', variant: 'dark', onClick: () => {} }],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar4,
        sender: 'Laura Brandt',
        message: 'request a payment of $200 for admin project',
        time: '12 minutes ago',
        category: 'Communication',
        actions: [
          { label: 'Pay Now', variant: 'primary', onClick: () => {} },
          { label: 'Decline', variant: 'neutral', onClick: () => {} },
        ],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar5,
        sender: 'Valentine Maton',
        message: 'mentioned you to Bootstrap admin dashboard',
        time: '34 minutes ago',
        category: 'Project',
      },
      {
        id: uuidv4(),
        avatarSrc: avatar6,
        sender: 'Sanders Ursula',
        message: 'added file to WINDOW react admin project',
        time: '48 minutes ago',
        category: 'Project',
        actions: [{ label: 'Download', variant: 'success', onClick: () => {} }],
      },
      {
        id: uuidv4(),
        avatarSrc: avatar1,
        sender: 'Laura Foreman',
        message: 'sent you a friend request',
        time: '12 minutes ago',
        category: 'Communication',
        actions: [
          { label: 'Accepet', variant: 'danger', onClick: () => {} },
          { label: 'Decline', variant: 'neutral', onClick: () => {} },
        ],
      },
    ],
  },
]
