import { Button, Card, Stack } from 'react-bootstrap'

const OverviewIntroduction = () => {
  return (
    <>
      <Card.Title className="fw-semibold mb-4">Introduction</Card.Title>
      <dl className="dl-horizontal mb-5">
        <dt>Full Name:</dt>
        <dd>Alexandra Della</dd>
        <dt>Company:</dt>
        <dd>WRAPCODERS</dd>
        <dt>Mobile Number:</dt>
        <dd>+01 (375) 5896 3214</dd>
        <dt>Email Address:</dt>
        <dd>alex.della@outlook.com</dd>
        <dt>Location:</dt>
        <dd>California, United States</dd>
        <dt>Communication:</dt>
        <dd>Email, Phone, Chatboot</dd>
        <dt className="mb-0">Website:</dt>
        <dd className="mb-0">https://wrapcoders.com</dd>
      </dl>
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button
          variant=""
          size="sm"
          className="btn-icon rounded text-white"
          style={{ background: '#3b5998' }}
        >
          <i className="fi fi-brands-facebook"></i>
        </Button>
        <Button
          variant=""
          size="sm"
          className="btn-icon rounded text-white"
          style={{ background: '#1da1f2' }}
        >
          <i className="fi fi-brands-twitter"></i>
        </Button>
        <Button
          variant=""
          size="sm"
          className="btn-icon rounded text-white"
          style={{ background: '#0e76a8' }}
        >
          <i className="fi fi-brands-linkedin"></i>
        </Button>
        <Button
          variant=""
          size="sm"
          className="btn-icon rounded text-white"
          style={{ background: '#c4302b' }}
        >
          <i className="fi fi-brands-youtube"></i>
        </Button>
        <Button
          variant=""
          size="sm"
          className="btn-icon rounded text-white"
          style={{ background: '#333333' }}
        >
          <i className="fi fi-brands-github"></i>
        </Button>
      </Stack>
    </>
  )
}

export default OverviewIntroduction
