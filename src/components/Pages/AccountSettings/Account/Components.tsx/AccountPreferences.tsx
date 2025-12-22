import Select from 'react-select'
import { Col, Row, Form, Stack, ListGroup } from 'react-bootstrap'

const TimezoneOptions = [
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'British Time (BT)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
  { value: 'Africa/Cairo', label: 'Eastern European Time (EET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)' },
  { value: 'Pacific/Auckland', label: 'New Zealand Standard Time (NZST)' },
]

const LanguageOptions = [
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' },
]

const AccountPreferences = () => {
  return (
    <>
      <div className="mb-6 mb-md-12">
        <h5 className="fw-semibold">Account Preferences</h5>
        <p>Your personalized preference displayed in your account</p>
      </div>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Public Profile</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <ListGroup className="mb-8">
            <ListGroup.Item>
              <Stack direction="horizontal" gap={4}>
                <div>
                  <div className="fw-semibold text-dark mb-1">Make contact info public</div>
                  <span className="text-muted d-block">
                    Means that anyone viwing your profile will able to see.
                  </span>
                </div>
                <div className="ms-auto">
                  <Form.Check type="switch" defaultChecked />
                </div>
              </Stack>
            </ListGroup.Item>
            <ListGroup.Item>
              <Stack direction="horizontal" gap={4}>
                <div>
                  <div className="fw-semibold text-dark mb-1">Make data syncronize always</div>
                  <span className="text-muted d-block">
                    Means that your data syncronizing always on.
                  </span>
                </div>
                <div className="ms-auto">
                  <Form.Check type="switch" />
                </div>
              </Stack>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="g-md-4 mb-6 mb-md-8">
        <Col md={3}>
          <Form.Label className="fw-medium">Timezone</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Select
            options={TimezoneOptions}
            defaultValue={TimezoneOptions.find((option) => option.value === 'Asia/Tokyo')}
            classNamePrefix="select"
          />
        </Col>
      </Row>
      <Row className="g-md-4 mb-4">
        <Col md={3}>
          <Form.Label className="fw-medium">Language</Form.Label>
        </Col>
        <Col md={9} xl={8} xxl={6}>
          <Select
            options={LanguageOptions}
            defaultValue={LanguageOptions.find((option) => option.value === 'en')}
            classNamePrefix="select"
          />
        </Col>
      </Row>
    </>
  )
}

export default AccountPreferences
