import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import EmailTemplatesLayout from '../etemplates/EmailTemplatesLayout'
import EmailTemplatesFooter from '../etemplates/EmailTemplatesFooter'
import reset from '@/assets/images/etemplate/reset.svg'

const EmailTemplateResetPassword = () => {
  return (
    <>
      <EmailTemplatesLayout>
        <div className="text-center mx-auto">
          <div className="mt-4 mb-12">
            <Image src={reset} fluid alt={reset} />
          </div>
          <div>
            <h3 className="fw-bold mb-3">Reset your password</h3>
            <p className="lead mb-0">
              Resetting your password is easy. Just press the button below and follow the
              instructions. We'll have you up and running in no time.
            </p>
            <Button variant="primary" size="lg" className="my-16">
              Reset Password
            </Button>
          </div>
        </div>
        <div className="fs-15">
          <h5 className="fw-bold mb-3">Want a more secure account?</h5>
          <p>
            We support two-factor authentication to help keep your information private.
            <Link to="#!" className="text-primary">
              {' '}
              learn more...
            </Link>
          </p>
        </div>
        <EmailTemplatesFooter />
      </EmailTemplatesLayout>
    </>
  )
}

export default EmailTemplateResetPassword
