import TitleHelmet from '@/components/Common/TitleHelmet'
import { Card } from 'react-bootstrap'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import { FaqItems, FaqHelp } from '@/components/Pages/OtherPages/FAQs'
import { ContactCard } from '@/components/Pages/OtherPages/Contact'

const FAQs = () => {
  return (
    <>
      <TitleHelmet title="FAQs" />
      <Card>
        <CommonHeader
          hintText="FAQ's"
          bigTitle="FAQ's"
          leadDescription="Frequently asked questions. Here are the most frequently asked questions you may check before getting started"
        />
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <FaqItems />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <ContactCard />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <FaqHelp />
        </section>
        <CommonFooter />
      </Card>
    </>
  )
}

export default FAQs
