import { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import dataTerms from './data/dataTerms'

const TermsServicesContent = () => {
  const [count, setCount] = useState(86)
  const [isYesButtonVisible, setIsYesButtonVisible] = useState(true)
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true)

  const handleButtonClick = (isYes: any) => {
    setCount((prevCount) => (isYes ? prevCount + 1 : prevCount))
    isYes ? toast.success('Thanks for your feedback!') : toast.error('We appreciate your feedback!')

    setIsYesButtonVisible(!isYes)
    setIsNoButtonVisible(isYes)
  }

  const handleAccept = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to accept this terms of services',
      icon: 'success',
      confirmButtonColor: '#25b865',
      confirmButtonText: 'Yes, accept it!',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success('Accepted successfully!')
      }
    })
  }

  const handleDecline = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to decline this terms of services',
      icon: 'error',
      confirmButtonColor: '#d33d33',
      confirmButtonText: 'Yes, decline it!',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.error('Declined successfully!')
      }
    })
  }

  return (
    <>
      {dataTerms.map((item, idx) => (
        <div className="mb-12" key={idx}>
          <h5 className="mb-3">{item.title}</h5>
          <div dangerouslySetInnerHTML={{ __html: item.desc }} />
        </div>
      ))}
      <div className="my-8 my-md-12 my-lg-16">
        <p>{count} out of 97 found this helpful</p>
        <h4 className="mb-4">Was this article helpful?</h4>
        <Stack gap={2} direction="horizontal">
          {isYesButtonVisible && (
            <Button
              variant=""
              className="btn btn-md btn-soft-success rounded-pill"
              onClick={() => handleButtonClick(true)}
            >
              <i className="fi fi-rr-social-network"></i>
              <span className="ms-2">Yes!</span>
            </Button>
          )}
          {isNoButtonVisible && (
            <Button
              variant=""
              className="btn btn-md btn-soft-danger rounded-pill"
              onClick={() => handleButtonClick(false)}
            >
              <i className="fi fi-rr-hand"></i>
              <span className="ms-2">No!</span>
            </Button>
          )}
        </Stack>
      </div>
      <hr />
      <Stack
        gap={1}
        direction="horizontal"
        className="mt-8 mt-md-12 mt-lg-16 justify-content-center"
      >
        <Button
          variant=""
          className="btn btn-outline-danger rounded-pill"
          style={{ width: '120px' }}
          onClick={handleDecline}
        >
          Decline
        </Button>
        <Button
          variant=""
          className="btn btn-success rounded-pill"
          style={{ width: '120px' }}
          onClick={handleAccept}
        >
          Accept
        </Button>
      </Stack>
    </>
  )
}

export default TermsServicesContent
