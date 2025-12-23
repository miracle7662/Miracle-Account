export interface NotificationItem {
  id: number
  title: string | TrustedHTML
  icon: string
  variant: string
  createdAt: string
}

export const notifyData: NotificationItem[] = [
  {
    id: 1,
    title:
      'Congratulate <span class="fw-semibold text-dark">Socrates Itumay</span> for work anniversaries',
    icon: 'fi fi-rr-megaphone',
    variant: 'primary',
    createdAt: 'Mar 16 12:32pm',
  },
  {
    id: 2,
    title: '<span class="fw-semibold text-dark">Althea Cabardo</span> just created a new blog post',
    icon: 'fi fi-rr-edit',
    variant: 'warning',
    createdAt: 'Mar 15 02:56pm',
  },
  {
    id: 3,
    title:
      '<span class="fw-semibold text-dark">Adrian Monino</span> added new comment on your photo',
    icon: 'fi fi-rr-heart',
    variant: 'danger',
    createdAt: 'Mar 14 10:24pm',
  },
  {
    id: 4,
    title: '<span class="fw-semibold text-dark">Kenneth Hune</span> accepted your request',
    icon: 'fi fi-rr-comment-alt-dots',
    variant: 'info',
    createdAt: 'Mar 13 04:42pm',
  },
  {
    id: 5,
    title: 'December monthly financial <strong class="text-dark">report</strong>  is generated',
    icon: 'fi fi-rr-badge-check',
    variant: 'success',
    createdAt: 'Mar 11 08:20pm',
  },
]
