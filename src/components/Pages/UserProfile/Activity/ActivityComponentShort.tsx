import { Card, ListGroup } from 'react-bootstrap'
import Loading from '@/components/Misc/Loading'
import dataActivityShort from './data/dataActivityShort'

const ActivityComponentShort = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <ListGroup className="list-group-timeline list-group list-group-flush ms-3">
            {dataActivityShort.map(({ icon, content }, idx) => (
              <ListGroup.Item
                key={idx}
                className="list-timeline-item border-start border-dashed border-bottom-0 ps-8 mb-2"
              >
                <div
                  className="list-timeline-icon avatar avatar-md border position-absolute bg-body-tertiary"
                  style={{ left: '-1.25rem' }}
                >
                  <i className={`${icon}`}></i>
                </div>
                <div
                  className="list-timeline-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="list-timeline-item border-start border-dashed border-bottom-0 ps-8">
              <Loading />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )
}

export default ActivityComponentShort
