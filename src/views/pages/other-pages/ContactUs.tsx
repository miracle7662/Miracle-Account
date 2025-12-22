import TitleHelmet from '@/components/Common/TitleHelmet'
import { Card } from 'react-bootstrap'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import { ContactCard, ContactForm, ContactMap } from '@/components/Pages/OtherPages/Contact'

const ContactUs = () => {
  return (
    <>
      <TitleHelmet title="Contact Us" />
      <Card>
        <CommonHeader
          hintText="Get in touch"
          bigTitle="Contact US"
          leadDescription="If you'd like to know more about my work or process feel free to get in touch. Either fill out the form with your inquiry or find the department email you'd like to contact below."
        />
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <ContactCard />
        </section>
        <ContactForm />
        <ContactMap />
        <CommonFooter />
      </Card>
    </>
  )
}

export default ContactUs
