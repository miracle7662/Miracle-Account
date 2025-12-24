import { Button, Image, Stack } from 'react-bootstrap'
import tools from '@/assets/images/general/tools.svg'
import ErrorLayout from './ErrorLayout'
import TitleHelmet from '@/components/Common/TitleHelmet'

const UnderMaintenance = () => {
  return (
    <>
      <TitleHelmet title="Under Maintenance" />
      <ErrorLayout>
        <Image src={tools} alt="Logo" fluid style={{ widows: '150px', height: '150px' }} />
        <div className="mb-8 mt-16">
          <h3 className="fw-bold mb-3">Under Maintenance!</h3>
          <p className="fs-16 lead">
            Hang on! We are under maintenance! We apologize for any inconvenience caused.
          </p>
        </div>
        <Stack gap={1} direction="horizontal" className="justify-content-center">
          <Stack gap={1} direction="horizontal" className="justify-content-center">
            <Button variant="" className="btn-icon btn-md">
              <i className="fi fi-brands-facebook"></i>
            </Button>
            <Button variant="" className="btn-icon btn-md">
              <i className="fi fi-brands-twitter"></i>
            </Button>
            <Button variant="" className="btn-icon btn-md">
              <i className="fi fi-brands-instagram"></i>
            </Button>
            <Button variant="" className="btn-icon btn-md">
              <i className="fi fi-brands-linkedin"></i>
            </Button>
            <Button variant="" className="btn-icon btn-md">
              <i className="fi fi-brands-twitter-alt"></i>
            </Button>
          </Stack>
        </Stack>
      </ErrorLayout>
    </>
  )
}

export default UnderMaintenance
