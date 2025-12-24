import { Button, Stack } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SweetAlert2Basic = () => {
  const sweetAlertData = [
    {
      label: 'Basic',
      onClick: () => showSwalBasic(),
    },
    {
      label: 'withTitle',
      onClick: () => showSwalWithTitle(),
    },
    {
      label: 'withFooter',
      onClick: () => showSwalWithFooter(),
    },
    {
      label: 'withHTML',
      onClick: () => showSwalWithHTML(),
    },
    {
      label: 'Actions',
      onClick: () => showSwalWithActions(),
    },
  ]

  const showSwalBasic = () => {
    withReactContent(Swal).fire({
      title: 'Any fool can use a computer',
    })
  }

  const showSwalWithTitle = () => {
    withReactContent(Swal).fire({
      icon: 'question',
      title: 'The Internet?',
      text: 'That thing is still around?',
    })
  }

  const showSwalWithFooter = () => {
    withReactContent(Swal).fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>',
    })
  }

  const showSwalWithHTML = () => {
    withReactContent(Swal).fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html: 'You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fi fi-rr-social-network me-2"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fi fi-rr-hand"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
    })
  }

  const showSwalWithActions = () => {
    withReactContent(Swal)
      .fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: "Don't save",
      })
      .then(function (t) {
        t.isConfirmed
          ? Swal.fire('Saved!', '', 'success')
          : t.isDenied && Swal.fire('Changes are not saved', '', 'info')
      })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {sweetAlertData.map((item, index) => (
          <Button key={index} variant="primary" onClick={item.onClick}>
            {item.label}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default SweetAlert2Basic
