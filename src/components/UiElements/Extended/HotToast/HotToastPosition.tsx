import { Button, Stack } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

const notificationPositions = [
  { position: 'top-left', label: 'top-left' },
  { position: 'top-center', label: 'top-center' },
  { position: 'top-right', label: 'top-right' },
  { position: 'bottom-left', label: 'bottom-left' },
  { position: 'bottom-center', label: 'bottom-center' },
  { position: 'bottom-right', label: 'bottom-right' },
]

const HotToastType = () => {
  const notifyPosition = (position: any) => {
    toast.success(`Position set to ${position}.`, { position })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {notificationPositions.map(({ position, label }, index) => (
          <Button key={index} variant="primary" onClick={() => notifyPosition(position)}>
            {label}
          </Button>
        ))}
      </Stack>
      <Toaster reverseOrder={false} />
    </>
  )
}

export default HotToastType
