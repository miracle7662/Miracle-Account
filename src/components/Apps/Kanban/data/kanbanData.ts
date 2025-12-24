import { v4 as uuidv4 } from 'uuid'
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

export const kanbanData = {
  columns: [
    {
      id: uuidv4(),
      title: 'To Do',
      color: 'primary',
      tasks: [
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Design Landing Page',
              taskdesc: 'Create a visually appealing landing page for the website.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '25 Mar, 2024',
              avatars: [avatar1, avatar2, avatar3],
              badge: ['primary', 'danger'],
              attach: 3,
              comment: 4,
            },
          ],
        },
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Develop Prototype',
              taskdesc: 'Start developing a prototype based on the approved wireframes.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '30 Mar, 2024',
              avatars: [avatar1, avatar2, avatar3, avatar4],
              badge: ['primary', 'success'],
              attach: 4,
              comment: 5,
            },
          ],
        },
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Review Wireframes',
              taskdesc: 'Review and provide feedback on the wireframes for the new feature.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '28 Mar, 2024',
              avatars: [avatar1, avatar2, avatar3],
              badge: ['warning', 'teal'],
              attach: 4,
              comment: 5,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'In Progress',
      color: 'success',
      tasks: [
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Code Review',
              taskdesc: 'Perform a code review for the recent changes in the backend.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '21 Mar, 2024',
              avatars: [avatar4, avatar5, avatar6, avatar7, avatar8],
              badge: ['warning', 'success'],
              attach: 5,
              comment: 6,
            },
          ],
        },
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'UI Testing',
              taskdesc: 'Conduct UI testing to ensure a seamless user experience.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '20 Mar, 2024',
              avatars: [avatar9, avatar10, avatar11],
              badge: ['info', 'dark'],
              attach: 4,
              comment: 8,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Submitted',
      color: 'warning',
      tasks: [
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Release Version 1.0',
              taskdesc: 'Prepare and release version 1.0 of the software.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '27 Mar, 2024',
              avatars: [avatar11, avatar1, avatar2],
              badge: ['danger', 'warning'],
              attach: 2,
              comment: 4,
            },
          ],
        },
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Write Release Notes',
              taskdesc: 'Draft release notes highlighting the new features and improvements.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '25 Mar, 2024',
              avatars: [avatar3, avatar4, avatar5, avatar6],
              badge: ['success', 'primary'],
              attach: 5,
              comment: 4,
            },
          ],
        },
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Investigate Server Outage',
              taskdesc: 'Investigate the recent server outage and address the root cause.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '25 Mar, 2024',
              avatars: [avatar11, avatar1, avatar2],
              badge: ['info', 'danger'],
              attach: 2,
              comment: 4,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Completed',
      color: 'success',
      tasks: [
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Client Meeting',
              taskdesc: 'Schedule a client meeting to discuss project status and requirements.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '26 Mar, 2024',
              avatars: [avatar7, avatar8, avatar9, avatar10, avatar11],
              badge: ['success'],
              attach: 3,
              comment: 7,
            },
          ],
        },
        {
          id: uuidv4(),
          content: [
            {
              tasktitle: 'Awaiting Feedback',
              taskdesc: 'Awaiting client feedback on the proposed design changes.',
              desclong:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur?',
              date: '22 Mar, 2024',
              avatars: [avatar12, avatar1, avatar2],
              badge: ['primary'],
              attach: 3,
              comment: 5,
            },
          ],
        },
      ],
    },
  ],
}
