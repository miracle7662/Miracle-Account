import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Image } from 'react-bootstrap'
import profileBanner from '@/assets/images/general/banner.png'
import profileImg from '@/assets/images/avatars/1.png'
import ProfileNav from './ProfileNav'

const Cover = () => {
  const navigate = useNavigate()

  return (
    <>
      <Card className="mb-3 mb-md-4">
        <Card.Img variant="top" src={profileBanner} alt="profile banner" />
        <Card.Body>
          <div className="w-100 d-flex gap-3 mt-n18 mt-sm-n20 mt-md-n24">
            <Image
              src={profileImg}
              alt="profile image"
              thumbnail
              rounded
              className="profile-avatar"
            />
            <div className="w-100 d-flex align-items-end gap-4">
              <div>
                <h5 className="fs-16 fw-sembold">
                  <span>Alexndra Della</span>
                  <i className="fi fi-rr-badge-check fs-12 text-success ms-2"></i>
                </h5>
                <span>California, United States</span>
              </div>
              <div className="d-none d-md-flex align-items-end justify-content-center justify-content-md-end gap-1 mb-md-2 ms-md-auto">
                <Button
                  className="btn btn-md btn-primary"
                  onClick={() => {
                    navigate('/account-settings/account')
                  }}
                >
                  Edit Profile
                </Button>
                <Link to="#!" className="btn btn-md btn-success">
                  Message
                </Link>
              </div>
            </div>
          </div>
        </Card.Body>
        <ProfileNav />
      </Card>
    </>
  )
}

export default Cover
