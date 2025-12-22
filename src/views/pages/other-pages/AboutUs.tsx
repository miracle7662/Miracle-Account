import TitleHelmet from '@/components/Common/TitleHelmet'
import { Card } from 'react-bootstrap'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import {
  AboutBrands,
  AboutCompany,
  AboutCount,
  AboutTeam,
  AboutQuote,
  AboutOffice,
} from '@/components/Pages/OtherPages/About'

const AboutUs = () => {
  return (
    <>
      <TitleHelmet title="About Us" />
      <Card>
        <CommonHeader
          hintText="ABOUT US"
          bigTitle="ABOUT US"
          leadDescription="We're here to bring financial stability, improve the economy. Leave money issue with us and focus on your business & make something awesome."
        />
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <AboutCompany />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <AboutBrands />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <AboutCount />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <AboutQuote />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <AboutTeam />
        </section>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <AboutOffice />
        </section>
        <CommonFooter />
      </Card>
    </>
  )
}

export default AboutUs
