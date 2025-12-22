import { Button, Image } from 'react-bootstrap'
import EmailTemplatesLayout from '../etemplates/EmailTemplatesLayout'
import EmailTemplatesFooter from '../etemplates/EmailTemplatesFooter'
import welcome from '@/assets/images/etemplate/welcome.svg'

const EmailTemplateWelcomeMessage = () => {
  return (
    <>
      <EmailTemplatesLayout>
        <div className="text-center mx-auto">
          <div className="mt-4 mb-12">
            <Image src={welcome} fluid alt={welcome} />
          </div>
          <div>
            <h3 className="fw-bold mb-3">Welcome, Alexandra Della</h3>
            <p className="lead mb-0">
              Lots of people make mistakes while creating paragraphs. Some writers just put
              whitespace in their text in random places.
            </p>
            <Button variant="primary" size="lg" className="my-16">
              Let's Get Stared
            </Button>
          </div>
        </div>
        <div className="fs-15">
          <h5 className="fw-bold mb-3">Your account is now acive.</h5>
          <p>
            If you have any questions, just reply to this email—we're always happy to help out.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </p>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
        <EmailTemplatesFooter />
      </EmailTemplatesLayout>
    </>
  )
}

export default EmailTemplateWelcomeMessage
