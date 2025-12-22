import { Button } from 'react-bootstrap'

const buttonsData = [
  { variant: 'primary' },
  { variant: 'secondary' },
  { variant: 'success' },
  { variant: 'warning' },
  { variant: 'danger' },
  { variant: 'info' },
]

const MiscBadge = () => {
  return (
    <>
      <div className="d-flex flex-wrap gap-8">
        {buttonsData.map(({ variant }, index) => (
          <Button
            key={index}
            variant=""
            type="button"
            className={`bg-${variant}-subtle text-${variant}`}
          >
            Notifications <span className={`ms-2 badge bg-${variant}`}>5+</span>
          </Button>
        ))}
      </div>
      <hr className="my-6" />
      <div className="d-flex flex-wrap gap-12">
        {buttonsData.map(({ variant }, index) => (
          <Button
            key={index}
            variant=""
            type="button"
            className={`bg-${variant}-subtle text-${variant} position-relative`}
          >
            Inbox
            <span
              className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-${variant}`}
            >
              99+
              <span className="visually-hidden">unread messages</span>
            </span>
          </Button>
        ))}
      </div>
      <hr className="my-6" />
      <div className="d-flex flex-wrap gap-12">
        {buttonsData.map(({ variant }, index) => (
          <Button
            key={index}
            variant=""
            type="button"
            className={`bg-${variant}-subtle text-${variant} position-relative`}
          >
            Profile
            <span
              className={`position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle bg-${variant}`}
            >
              <span className="visually-hidden">New alerts</span>
            </span>
          </Button>
        ))}
      </div>
    </>
  )
}

export default MiscBadge
