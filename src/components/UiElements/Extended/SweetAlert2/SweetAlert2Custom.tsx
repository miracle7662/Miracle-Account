import { Button, Stack } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import avatar from '@/assets/images/avatars/1.png'

const SweetAlert2Custom = () => {
  const swalConfigs = [
    {
      label: 'Join Community',
      onClick: () => showSwalJoinCommunity(),
    },
    {
      label: 'Email Verification',
      onClick: () => showSwalEmailVerification(),
    },
    {
      label: 'Notification Message',
      onClick: () => showSwalNotificationMessage(),
    },
  ]

  const showSwalJoinCommunity = () => {
    withReactContent(Swal).fire({
      title: '<h4>Join Community</h4>',
      html: '<div class="mt-3 mb-4 text-start px-md-16"><input type="email" class="form-control" id="input-email" placeholder="Enter Email Address"></div>',
      imageHeight: 40,
      footer:
        '<p class="text-muted mb-0">Already have an account ? <a href="javascript:void(0);" class="fw-semibold text-decoration-underline"> Login </a> </p>',
      confirmButtonText:
        '<a href="javascript:void(0);" class="text-white d-inline-block text-center" style="width: 120px; line-height: 1.2;"> Register <i class="fi fi-rr-arrow-small-right ms-1 align-bottom"></i></a>',
      buttonsStyling: true,
      showCloseButton: true,
    })
  }

  const showSwalEmailVerification = () => {
    withReactContent(Swal).fire({
      html: '<div class="mt-3"><div class="avatar avatar-xxl bg-primary text-white mx-auto"><i class="fi fi-rr-envelope-dot fs-3"></i></div><div class="mt-4 pt-2 "><h4 class="fw-semibold">Email Verification</h4><p class="text-muted mb-0 mt-3">We have sent you verification email <span class="fw-medium">example@abc.com</span>, <br/> Please check it.</p></div></div>',
      showCancelButton: false,
      confirmButtonText:
        '<a href="javascript:void(0);" class="text-white d-inline-block text-center" style="width: 120px; line-height: 1.2;"> Verify <i class="fi fi-rr-arrow-small-right ms-2 align-bottom"></i></a>',
      buttonsStyling: true,
      footer:
        '<p class="text-muted mb-0">Didn\'t receive an email ? <a href="javascript:void(0);" class="fw-semibold text-decoration-underline">Resend</a></p>',
      showCloseButton: true,
    })
  }

  const showSwalNotificationMessage = () => {
    withReactContent(Swal).fire({
      html: `<div class="mt-3">
                    <div class="avatar avatar-xxl mx-auto">
                        <img src="${avatar}" class="rounded-circle img-thumbnail" alt="thumbnail">
                    </div>
                    <div class="mt-4 pt-2">
                        <h4 class="fw-semibold">Alexandra Della</h4>
                        <p class="text-muted mb-0">You have <span class="badge bg-danger-subtle text-danger">25+</span> Notifications</p>
                    </div>
                </div>`,
      showCancelButton: false,
      confirmButtonText:
        '<a href="javascript:void(0);" class="text-white d-inline-block text-center" style="width: 150px; line-height: 1.2;"> <i class="fi fi-rr-bell me-2 align-bottom"></i> All Notifications</a>',
      buttonsStyling: true,
      showCloseButton: true,
    })
  }

  return (
    <>
      <Stack direction="horizontal" gap={1} className="flex-wrap">
        {swalConfigs.map((config, index) => (
          <Button
            key={index}
            variant={index === 0 ? 'primary' : index === 1 ? 'success' : 'danger'}
            onClick={config.onClick}
          >
            {config.label}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default SweetAlert2Custom
