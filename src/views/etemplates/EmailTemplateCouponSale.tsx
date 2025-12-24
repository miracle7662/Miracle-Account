import { Button, Image } from 'react-bootstrap'
import EmailTemplatesLayout from '../etemplates/EmailTemplatesLayout'
import EmailTemplatesFooter from '../etemplates/EmailTemplatesFooter'
import coupon from '@/assets/images/etemplate/coupon.svg'

const EmailTemplateCouponSale = () => {
  return (
    <>
      <EmailTemplatesLayout>
        <div className="text-center mx-auto">
          <div className="mt-4 mb-12">
            <Image src={coupon} fluid alt={coupon} />
          </div>
          <div className="my-16">
            <h3 className="fw-bold mb-3">Coupon Sales</h3>
            <p className="lead mb-0">
              Lots of people make mistakes while creating paragraphs. Some writers just put
              whitespace in their text in random places.
            </p>
          </div>
        </div>
        <div className="p-12 bg-black rounded-5 text-center">
          <div className="display-1 fw-bolder">
            <span className="text-white">25%</span> OFF
          </div>
          <Button variant="primary" size="lg" className="mt-12">
            Claim your coupon →
          </Button>
        </div>
        <EmailTemplatesFooter />
      </EmailTemplatesLayout>
    </>
  )
}

export default EmailTemplateCouponSale
