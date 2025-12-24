import TitleHelmet from '@/components/Common/TitleHelmet'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import { PrivacyPolicyContent } from '@/components/Pages/OtherPages/PrivacyPolicy'

const PrivacyPolicy = () => {
  return (
    <>
      <TitleHelmet title="Privacy & Policy" />
      <Card>
        <CommonHeader
          hintText="ABOUT THIS POLICY"
          bigTitle="Privacy & Policy"
          leadDescription="A privacy policy is a statement or legal document that discloses some or all of the ways a party gathers, uses, discloses, and manages a customer or client's data."
        />
        <div className="mx-4 mx-md-6 mt-8 mt-md-12 mt-lg-16">
          <Link to="#!">
            <span className="text-muted">Updated:</span> 26 March, 2024
          </Link>
        </div>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <PrivacyPolicyContent />
        </section>
        <CommonFooter />
      </Card>
    </>
  )
}

export default PrivacyPolicy
