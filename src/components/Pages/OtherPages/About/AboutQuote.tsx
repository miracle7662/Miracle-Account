import { Link } from 'react-router-dom'
import { Stack } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import avatar from '@/assets/images/avatars/1.png'

const AboutQuote = () => {
  return (
    <>
      <div className="py-8 py-md-16 py-lg-24 bg-secondary-subtle rounded-3 border">
        <div className="px-4 w-100 mx-auto text-center" style={{ maxWidth: '768px' }}>
          <div className="mx-auto text-primary mb-4">
            <i className="fi fi-rr-quote-right fs-2"></i>
          </div>
          <p className="fs-12 fw-semibold text-primary mb-3 text-uppercase">From Our Team</p>
          <h3 className="text-dark lh-base mb-4">
            Untitled truely values work-life balance. We work hard and deliver, but at the end of
            the day you can switch off and plan better events while saving money.
          </h3>
          <Stack>
            <div>
              <Avatar
                type="image"
                src={avatar}
                alt="User Avatar"
                className="avatar avatar-md justify-content-center"
              />
            </div>
            <Link to="#!">Alexandra Della</Link>
            <span className="text-muted">CEO, Founder</span>
          </Stack>
        </div>
      </div>
    </>
  )
}

export default AboutQuote
