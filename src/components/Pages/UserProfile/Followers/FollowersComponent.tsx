import { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Loading from '@/components/Misc/Loading'
import { Toaster, toast } from 'react-hot-toast'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import Followers from './data/followerData'

const FollowersComponent = () => {
  const [followerData, setFollowerData] = useState(Followers)

  const toggleIsFollow = (idx: any) => {
    setFollowerData((prevData) => {
      const newData = [...prevData]
      newData[idx].isFollowing = !newData[idx].isFollowing
      return newData
    })

    if (followerData[idx].isFollowing) {
      toast.success(`Following ${followerData[idx].name}!`)
    } else {
      toast.error(`Unfollowed ${followerData[idx].name}!`)
    }
  }

  return (
    <>
      <Row className="g-3 g-md-4">
        {followerData.map(({ image, name, email, isFollowing }, idx) => (
          <Col sm={6} lg={4} xxl={3} key={idx}>
            <Card>
              <Card.Body className="text-center py-8">
                <div className="mb-4">
                  <Avatar
                    type="image"
                    src={image}
                    alt="User Avatar"
                    className="avatar avatar-xxl"
                  />
                </div>
                <div>
                  <h6 className="fw-semibold mb-1">{name}</h6>
                  <p className="fs-13 fw-light text-muted mb-3">{email}</p>
                  <Button
                    variant="soft-light"
                    className={`rounded-pill ${
                      isFollowing ? 'bg-success-subtle text-success' : ''
                    }`}
                    onClick={() => toggleIsFollow(idx)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>
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

export default FollowersComponent
