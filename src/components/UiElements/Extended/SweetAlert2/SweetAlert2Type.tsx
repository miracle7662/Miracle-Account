import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Stack } from 'react-bootstrap'

interface AlertType {
  variant: string
  text: string
  icon: SweetAlertIcon
  customClass: string
}

const SweetAlert2Type = () => {
  const alertTypes: AlertType[] = [
    {
      variant: 'success',
      text: 'Success: Good job!',
      icon: 'success',
      customClass: 'btn btn-success',
    },
    {
      variant: 'info',
      text: 'Info: About information',
      icon: 'info',
      customClass: 'btn btn-info',
    },
    {
      variant: 'warning',
      text: 'Warning: Your attention',
      icon: 'warning',
      customClass: 'btn btn-warning',
    },
    {
      variant: 'danger',
      text: 'Error: Something error',
      icon: 'error',
      customClass: 'btn btn-danger',
    },
    {
      variant: 'secondary',
      text: "Question: What's the matter?",
      icon: 'question',
      customClass: 'btn btn-secondary',
    },
  ]

  const showAlert = (text: string, icon: SweetAlertIcon, customClass: string) => {
    withReactContent(Swal).fire({
      text,
      icon,
      buttonsStyling: false,
      confirmButtonText: 'Ok, got it!',
      customClass: {
        confirmButton: customClass,
      },
    })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {alertTypes.map(({ variant, text, icon, customClass }, index) => (
          <Button key={index} variant={variant} onClick={() => showAlert(text, icon, customClass)}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default SweetAlert2Type
