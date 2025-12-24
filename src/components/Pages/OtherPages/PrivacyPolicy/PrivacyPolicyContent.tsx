import { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import dataPrivacy from './data/dataPrivacy'

const PrivacyPolicyContent = () => {
  const [count, setCount] = useState(74)
  const [isYesButtonVisible, setIsYesButtonVisible] = useState(true)
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true)

  const handleButtonClick = (isYes: any) => {
    setCount((prevCount) => (isYes ? prevCount + 1 : prevCount))
    isYes ? toast.success('Thanks for your feedback!') : toast.error('We appreciate your feedback!')

    setIsYesButtonVisible(!isYes)
    setIsNoButtonVisible(isYes)
  }

  return (
    <>
      {dataPrivacy.map((item, idx) => (
        <div className="mb-12" key={idx}>
          <h5 className="mb-3">{item.title}</h5>
          <div dangerouslySetInnerHTML={{ __html: item.desc }} />
        </div>
      ))}
      <div className="mt-8 mt-md-12 mt-lg-16">
        <p>{count} out of 86 found this helpful</p>
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
    </>
  )
}

export default PrivacyPolicyContent
