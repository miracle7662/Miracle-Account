import TitleHelmet from '@/components/Common/TitleHelmet'
import { Card } from 'react-bootstrap'

const StarterPage = () => {
  return (
    <>
      <TitleHelmet title="Starter Page" />
      <Card className="flex-grow-1">
        <Card.Body className="d-flex align-items-center justify-content-center">
          <div className="display-4 opacity-25">Starter Page</div>
        </Card.Body>
      </Card>
    </>
  )
}

export default StarterPage
