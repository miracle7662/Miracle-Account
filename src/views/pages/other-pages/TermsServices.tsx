import TitleHelmet from '@/components/Common/TitleHelmet'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import { TermsServicesContent } from '@/components/Pages/OtherPages/TermsServices'

const TermsServices = () => {
  return (
    <>
      <TitleHelmet title="Terms of Services" />
      <Card>
        <CommonHeader
          hintText="Terms of Services"
          bigTitle="Terms of Services"
          leadDescription="Terms of service (ToS) is a type of document stating details about what a service provider is responsible for as well as user obligations that must be adhered to for continuation of the service."
        />
        <div className="mx-4 mx-md-6 mt-8 mt-md-12 mt-lg-16">
          <Link to="#!">
            <span className="text-muted">Updated:</span> 26 March, 2024
          </Link>
        </div>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <TermsServicesContent />
        </section>
        <CommonFooter />
      </Card>
    </>
  )
}

export default TermsServices
