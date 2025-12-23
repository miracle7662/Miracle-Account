import { Stack, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

const CustomToast = () => {
  return (
    <div className="ms-3">
      <h6>Update Successfully</h6>
      <p className="fs-12 text-muted mb-0">
        Success!!! Your profile has been successfully updated.
      </p>
    </div>
  )
}

function ToastifyCustom() {
  const messageToast = () => {
    toast.success(<CustomToast />, {
      position: 'top-right',
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    })
  }

  const noIcon = () => {
    toast.success(<CustomToast />, {
      position: 'top-right',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: false,
    })
  }

  const darkVersion = () => {
    toast.dark('This note is for the dark version toast', {
      position: 'top-right',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1}>
        <Button variant="success" onClick={() => messageToast()}>
          Message With Title
        </Button>
        <Button variant="primary" onClick={() => noIcon()}>
          No Icon Version
        </Button>
        <Button variant="dark" onClick={() => darkVersion()}>
          Dark Version
        </Button>
      </Stack>
    </>
  )
}

export default ToastifyCustom
