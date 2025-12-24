import { Stack, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfigs = [
  {
    label: 'Success',
    variant: 'success',
    onClick: () => {
      toast.success('Success Notification !', {
        position: toast.POSITION.TOP_CENTER,
      })
    },
  },
  {
    label: 'Error',
    variant: 'danger',
    onClick: () => {
      toast.error('Error Notification !', {
        position: toast.POSITION.TOP_LEFT,
      })
    },
  },
  {
    label: 'Warning',
    variant: 'warning',
    onClick: () => {
      toast.warn('Warning Notification !', {
        position: toast.POSITION.BOTTOM_LEFT,
      })
    },
  },
  {
    label: 'Info',
    variant: 'info',
    onClick: () => {
      toast.info('Info Notification !', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    },
  },
  {
    label: 'Custom',
    variant: 'primary',
    onClick: () => {
      toast('Custom Style Notification with css class!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar',
      })
    },
  },
]

function ToastifyStates() {
  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {toastConfigs.map((config, index) => (
          <Button key={index} variant={config.variant} onClick={config.onClick}>
            {config.label}
          </Button>
        ))}
      </Stack>

      <ToastContainer />
    </>
  )
}

export default ToastifyStates
