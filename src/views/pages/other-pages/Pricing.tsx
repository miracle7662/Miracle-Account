import TitleHelmet from '@/components/Common/TitleHelmet'
import { Card } from 'react-bootstrap'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import { PricingTable } from '@/components/Pages/OtherPages/Pricing'
import { FaqHelp, FaqItems } from '@/components/Pages/OtherPages/FAQs'

const Pricing = () => {
  return (
    <>
      <TitleHelmet title="Pricing" />
      <Card>
        <CommonHeader
          hintText="Pricing Plan"
          bigTitle="Pricing Plan"
          leadDescription="Compare our plans and find yours. Simple, trasnparent pricing that grow with you. Try any plan free for 30 days."
        />
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <PricingTable />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <FaqItems />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <FaqHelp />
        </section>
        <CommonFooter />
      </Card>
    </>
  )
}

export default Pricing
