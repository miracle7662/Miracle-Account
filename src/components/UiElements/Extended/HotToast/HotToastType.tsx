import { Button, Stack } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

const notificationTypes = [
  {
    label: 'Success',
    action: () => toast.success('Successfully toasted!'),
    variant: 'success',
  },
  {
    label: 'Error',
    action: () => toast.error("This didn't work."),
    variant: 'danger',
  },
  {
    label: 'Emoji',
    action: () => toast('Good Job!', { icon: '👏' }),
    variant: 'warning',
  },
  {
    label: 'Dark',
    action: () =>
      toast('Hello Darkness!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }),
    variant: 'dark',
  },
  {
    label: 'Content',
    action: () =>
      toast((t) => (
        <span>
          Custom and <b>bold</b>
          <Button size="sm" className="btn-soft-danger ms-2" onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </Button>
        </span>
      )),
    variant: 'primary',
  },
  {
    label: 'Themed',
    action: () =>
      toast.success('Look at my styles.', {
        style: {
          border: '1px solid #3E97FF',
          padding: '16px',
          color: '#3E97FF',
        },
        iconTheme: {
          primary: '#3E97FF',
          secondary: '#FFFAEE',
        },
      }),
    variant: 'info',
  },
]

const HotToastType = () => {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {notificationTypes.map(({ label, action, variant }, index) => (
          <Button key={index} variant={variant} onClick={action}>
            {label}
          </Button>
        ))}
      </Stack>
      <Toaster />
    </>
  )
}

export default HotToastType
