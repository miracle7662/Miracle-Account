import { Link } from 'react-router-dom'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'

const avatarImages = [avatar1, avatar2, avatar3]

const FaqHelp = () => {
  return (
    <>
      <div className="text-center mx-auto" style={{ maxWidth: '600px' }}>
        <div className="avatar-group avatar-group-lg mb-4 justify-content-center">
          {avatarImages.map((avatarSrc, index) => (
            <Avatar
              key={index}
              type="image"
              src={avatarSrc}
              alt={`User Avatar ${index + 1}`}
              className="avatar avatar-lg"
            />
          ))}
        </div>
        <h2 className="fw-bold text-dark mb-3">Still Have A Question?</h2>
        <p className="lead">
          There are several ways to say "not yet" and "still have questions" in an email response,
          depending on the context and tone of the message.
        </p>
        <Link to="/other-pages/contact-us" className="btn btn-primary">
          Get in touch
        </Link>
      </div>
    </>
  )
}

export default FaqHelp
