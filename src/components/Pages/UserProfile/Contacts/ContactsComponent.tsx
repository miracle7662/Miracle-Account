import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import Loading from '@/components/Misc/Loading'
import { Toaster, toast } from 'react-hot-toast'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import Contacts from './data/contactData'

const ContactsComponent = () => {
  const [contactsData, setContactsData] = useState(Contacts)

  const toggleIsFollow = (idx: any) => {
    setContactsData((prevData) => {
      const newData = [...prevData]
      newData[idx].isFavorite = !newData[idx].isFavorite
      return newData
    })

    if (contactsData[idx].isFavorite) {
      toast.success(`Starred ${contactsData[idx].name}!`)
    } else {
      toast.error(`Unstarred ${contactsData[idx].name}!`)
    }
  }

  return (
    <>
      <Row className="g-3 g-md-4">
        {contactsData.map(({ image, name, email, phone, isFavorite }, idx) => (
          <Col sm={6} lg={4} xxl={3} key={idx}>
            <Card>
              <Card.Body>
                <Stack gap={3} direction="horizontal" className="justify-content-between">
                  <Stack gap={3} direction="horizontal">
                    <Avatar
                      type="image"
                      src={image}
                      alt="User Avatar"
                      className="avatar avatar-xl"
                    />
                    <div>
                      <h6 className="fw-semibold mb-1">{name}</h6>
                      <p className="text-muted mb-1">{email}</p>
                      <p className="fs-13 text-muted mb-0">{phone}</p>
                    </div>
                  </Stack>
                  <Link
                    to="#!"
                    className={`${isFavorite ? 'text-warning' : ''}`}
                    onClick={() => toggleIsFollow(idx)}
                  >
                    {isFavorite ? (
                      <i className="fi fi-rr-star text-warning"></i>
                    ) : (
                      <i className="fi fi-rr-star"></i>
                    )}
                  </Link>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col sm={12} className="text-center">
          <Loading />
        </Col>
      </Row>
      <Toaster position="top-center" />
    </>
  )
}

export default ContactsComponent
