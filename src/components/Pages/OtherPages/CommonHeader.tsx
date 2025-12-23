import { Card, Badge } from 'react-bootstrap'

interface CommonHeaderProps {
  hintText: string
  bigTitle: string
  leadDescription: string
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ hintText, bigTitle, leadDescription }) => {
  return (
    <>
      <Card.Header className="py-12 py-md-16 py-lg-24 py-xl-32 bg-secondary-subtle position-relative">
        <div className="w-100 mx-auto text-center" style={{ maxWidth: '600px' }}>
          <Badge
            bg=""
            className="fs-13 fw-semibold bg-primary-subtle text-primary px-3 mb-4 text-uppercase rounded-pill"
          >
            {hintText}
          </Badge>
          <div className="display-4 text-dark fw-bold mb-4 text-uppercase">{bigTitle}</div>
          <p className="lead mb-0">{leadDescription}</p>
          <div
            className="mx-auto border border-2 border-primary rounded-pill mt-6"
            style={{ width: '3rem' }}
          ></div>
        </div>
      </Card.Header>
    </>
  )
}

export default CommonHeader
