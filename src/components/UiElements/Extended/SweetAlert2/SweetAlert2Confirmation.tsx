import { Button, Stack } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SweetAlert2Confirmation = () => {
  const swalConfigs = [
    {
      label: 'Alert',
      onClick: () => showSwalAlert(),
    },
    {
      label: 'Confirm',
      onClick: () => showSwalConfirm(),
    },
    {
      label: 'Mixin',
      onClick: () => showSwalMixin(),
    },
  ]

  const showSwalAlert = () => {
    withReactContent(Swal)
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#25b865',
        cancelButtonColor: '#d13b4c',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(function (t) {
        t.isConfirmed && Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      })
  }

  const showSwalConfirm = () => {
    withReactContent(Swal).fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(function (t) {
      t.isConfirmed
        ? Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        : t.dismiss === Swal.DismissReason.cancel &&
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error')
    })
  }

  const showSwalMixin = () => {
    withReactContent(Swal).fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      icon: 'success',
      title: 'Signed in successfully',
      timerProgressBar: true,
      didOpen: function didOpen(t) {
        t.addEventListener('mouseenter', Swal.stopTimer)
        t.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {swalConfigs.map((config, index) => (
          <Button key={index} variant="primary" onClick={config.onClick}>
            {config.label}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default SweetAlert2Confirmation
