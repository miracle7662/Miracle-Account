import { Stack, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notificationPositions = [
  { position: toast.POSITION.TOP_LEFT, label: 'Top Left' },
  { position: toast.POSITION.TOP_CENTER, label: 'Top Center' },
  { position: toast.POSITION.TOP_RIGHT, label: 'Top Right' },
  { position: toast.POSITION.BOTTOM_LEFT, label: 'Bottom Left' },
  { position: toast.POSITION.BOTTOM_CENTER, label: 'Bottom Center' },
  { position: toast.POSITION.BOTTOM_RIGHT, label: 'Bottom Right' },
]

function ToastifyPosition() {
  const notifyPosition = (position: any) => {
    toast(`Notification ${position}!`, { position })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {notificationPositions.map(({ position, label }, index) => (
          <Button key={index} onClick={() => notifyPosition(position)}>
            {label}
          </Button>
        ))}
      </Stack>

      <ToastContainer />
    </>
  )
}

export default ToastifyPosition
