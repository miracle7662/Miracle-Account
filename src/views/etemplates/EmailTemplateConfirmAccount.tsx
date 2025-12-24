import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import EmailTemplatesLayout from '../etemplates/EmailTemplatesLayout'
import EmailTemplatesFooter from '../etemplates/EmailTemplatesFooter'
import confirm from '@/assets/images/etemplate/confirm.svg'

const EmailTemplateConfirmAccount = () => {
  return (
    <>
      <EmailTemplatesLayout>
        <div className="text-center mx-auto">
          <div className="mt-4 mb-12">
            <Image src={confirm} fluid alt={confirm} />
          </div>
          <div>
            <h3 className="fw-bold mb-3">Confirm your account!</h3>
            <p className="lead mb-0">
              We're excited to have you get started. First, you need to confirm your account. Just
              press the button below.
            </p>
            <Button variant="primary" size="lg" className="my-16">
              Conform Account
            </Button>
          </div>
        </div>
        <div className="fs-15">
          <p>
            If that doesn't work, copy and paste the following link in your browser:
            <Link to="https://bit.ly/3xyXdr2" className="fs-16 fw-semibold text-primary">
              {' '}
              https://bit.ly/3xyXdr2
            </Link>
          </p>
          <p>If you have any questions, just reply to this email—we're always happy to help out.</p>
        </div>
        <EmailTemplatesFooter />
      </EmailTemplatesLayout>
    </>
  )
}

export default EmailTemplateConfirmAccount
