import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import EmailTemplatesLayout from '../etemplates/EmailTemplatesLayout'
import EmailTemplatesFooter from '../etemplates/EmailTemplatesFooter'
import card from '@/assets/images/etemplate/card.svg'

const EmailTemplateExpiredCard = () => {
  return (
    <>
      <EmailTemplatesLayout>
        <div className="text-center mx-auto">
          <div className="mt-4 mb-12">
            <Image src={card} fluid alt={card} />
          </div>
          <div>
            <h3 className="fw-bold mb-3">Your card expired.</h3>
            <p className="lead mb-0">
              It happens. To keep your account active, just sign in and update your payment
              information. Press the button below to get started.
            </p>
            <Button variant="primary" size="lg" className="my-16">
              Update Payment Info
            </Button>
          </div>
        </div>
        <div className="fs-15">
          <h5 className="fw-bold mb-3">ant to save money?</h5>
          <p>
            By switching to annual billing, you'll{' '}
            <span className="fw-bolder text-success">Save 30%</span> on your account. We like to
            think of it as a just reward for our loyal friends.
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

export default EmailTemplateExpiredCard
