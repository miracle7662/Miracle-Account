import { Link } from 'react-router-dom'
import { Row, Col, Card, Image } from 'react-bootstrap'
import EmailTemplatesLayout from '../etemplates/EmailTemplatesLayout'
import EmailTemplatesFooter from '../etemplates/EmailTemplatesFooter'
import update from '@/assets/images/etemplate/update.svg'

import img1 from '@/assets/images/gallery/1.png'
import img2 from '@/assets/images/gallery/2.png'
import img3 from '@/assets/images/gallery/3.png'
import img4 from '@/assets/images/gallery/4.png'

const updateData = [
  {
    image: img1,
    title: 'Elegant Dashboard Design',
    description:
      'Discover the sleek and intuitive dashboard design that simplifies navigation and enhances user experience.',
  },
  {
    image: img2,
    title: 'Productivity Boosting Tools',
    description:
      'Explore a suite of productivity tools designed to streamline workflows and optimize task management.',
  },
  {
    image: img3,
    title: 'Seamless Collaboration Platform',
    description:
      'Unlock seamless collaboration with a platform that fosters teamwork and facilitates communication across teams.',
  },
  {
    image: img4,
    title: 'Innovative Data Visualization',
    description:
      'Experience innovative data visualization techniques that transform complex information into actionable insights.',
  },
]

const EmailTemplateLatestUpdate = () => {
  return (
    <>
      <EmailTemplatesLayout>
        <div className="text-center mx-auto">
          <div className="mt-4 mb-12">
            <Image src={update} fluid alt={update} />
          </div>
          <div className="my-16">
            <h3 className="fw-bold mb-3">Latest Updates</h3>
            <p className="lead mb-0">
              Lots of people make mistakes while creating paragraphs. Some writers just put
              whitespace in their text in random places.
            </p>
          </div>
        </div>
        <Row className="g-4">
          {updateData.map(({ image, title, description }, index) => (
            <Col sm={6} key={index}>
              <Card>
                <Card.Img variant="top" src={image} className="bg-secondary-subtle" />
                <Card.Body>
                  <h6 className="fw-bold text-truncate mb-3">{title}</h6>
                  <p className="fs-13 text-muted">{description}</p>
                  <Link to="#!" className="text-primary">
                    Learn more...
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <EmailTemplatesFooter />
      </EmailTemplatesLayout>
    </>
  )
}

export default EmailTemplateLatestUpdate
