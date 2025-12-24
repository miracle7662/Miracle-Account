import { Link } from 'react-router-dom'
import ErrorLayout from './ErrorLayout'

export interface CommonCardProps {
  error: string
  errorTitle: string
  errorMessage: string
}

const CommingSoon: React.FC<CommonCardProps> = ({ error, errorTitle, errorMessage }) => {
  return (
    <>
      <ErrorLayout>
        <h2 className="fw-bolder mb-4 text-primary" style={{ fontSize: '5rem' }}>
          {error}
        </h2>
        <div className="mb-8">
          <h3 className="fw-bold mb-3">{errorTitle}</h3>
          <p className="fs-16 lead">{errorMessage}</p>
        </div>
        <Link to="/" className="btn btn-primary w-100" style={{ maxWidth: '200px' }}>
          Back to Home
        </Link>
      </ErrorLayout>
    </>
  )
}

export default CommingSoon
