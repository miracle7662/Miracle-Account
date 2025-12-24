import { Card } from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const AnalyticProgress = () => {
  return (
    <>
      <Card className="mb-3 mb-md-4">
        <Card.Body className="hstack gap-4">
          <CircularProgressbar
            value={62}
            text={`${62}%`}
            styles={{
              root: {
                height: '8rem',
                width: '8rem',
              },
              path: {
                stroke: '#25b865',
                strokeWidth: '0.375rem',
                strokeLinecap: 'round',
              },
              trail: {
                stroke: '#EDEFF1',
                strokeWidth: '0.15rem',
              },
              text: {
                fontSize: '1rem',
                fontWeight: 'bold',
                fill: '#25b865',
              },
            }}
          />
          <div>
            <h4>08m : 36s</h4>
            <h6>Time to resolved complaint</h6>
            <p className="fs-13 text-muted mb-0">The average time taken to resolve complaints.</p>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-3 mb-md-4">
        <Card.Body className="hstack gap-4">
          <CircularProgressbar
            value={66}
            text={`${66}%`}
            styles={{
              root: {
                height: '8rem',
                width: '8rem',
              },
              path: {
                stroke: '#e49e3d',
                strokeWidth: '0.375rem',
                strokeLinecap: 'round',
              },
              trail: {
                stroke: '#EDEFF1',
                strokeWidth: '0.15rem',
              },
              text: {
                fontSize: '1rem',
                fontWeight: 'bold',
                fill: '#e49e3d',
              },
            }}
          />
          <div>
            <h4>04m : 32s</h4>
            <h6>Average speed of answer</h6>
            <p className="fs-13 text-muted mb-0">The average time taken to resolve complaints.</p>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-0">
        <Card.Body className="hstack gap-4">
          <CircularProgressbar
            value={56}
            text={`${56}%`}
            styles={{
              root: {
                height: '8rem',
                width: '8rem',
              },
              path: {
                stroke: '#3E97FF',
                strokeWidth: '0.375rem',
                strokeLinecap: 'round',
              },
              trail: {
                stroke: '#EDEFF1',
                strokeWidth: '0.15rem',
              },
              text: {
                fontSize: '1rem',
                fontWeight: 'bold',
                fill: '#3E97FF',
              },
            }}
          />
          <div>
            <h4>05m : 22s</h4>
            <h6>Agerage time on site spent</h6>
            <p className="fs-13 text-muted mb-0">The average time taken to resolve complaints.</p>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default AnalyticProgress
