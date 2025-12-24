import { Link } from 'react-router-dom'
import { Card, Col, Row, Stack, Dropdown, ProgressBar } from 'react-bootstrap'
import Loading from '@/components/Misc/Loading'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import projectsData from './data/projectsData'

const ProjectsComponent = () => {
  return (
    <>
      <Row className="g-3 g-md-4">
        {projectsData.map(
          (
            {
              color,
              badge,
              name,
              client,
              startDate,
              endDate,
              desc,
              progress,
              avatars,
              attach,
              comment,
            },
            idx,
          ) => (
            <Col sm={6} xxl={4} key={idx}>
              <Card>
                <Card.Body>
                  <Stack direction="horizontal" className="mb-6">
                    <div className="flex-grow-1 me-3">
                      <div className={`badge bg-${color}-subtle text-${color}`}>{badge}</div>
                    </div>
                    <Dropdown align={'end'} className="flex-shrink-0 ms-2">
                      <Dropdown.Toggle variant="soft-light" size="sm" className="rounded-pill">
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#!">Invite</Dropdown.Item>
                        <Dropdown.Item href="#!">Rename</Dropdown.Item>
                        <Dropdown.Item href="#!">View Details</Dropdown.Item>
                        <Dropdown.Item href="#!">Add to Favorite</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#!" className="text-danger">
                          Leave Project
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Stack>
                  <Stack direction="horizontal" className="justify-content-between mb-6">
                    <div>
                      <h5 className="fs-15 fw-bold text-truncate">
                        <Link to="#!">{name}</Link>
                      </h5>
                      <div className="text-muted text-truncate">
                        Client:{' '}
                        <Link to="#!" className="fs-11 badge bg-secondary-subtle text-muted">
                          {client}
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted text-truncate mb-1">
                        Started:{' '}
                        <span className="fs-12 fw-medium text-success">
                          {startDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-muted text-truncate">
                        Deadline:{' '}
                        <span className="fs-12 fw-medium text-danger">
                          {endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Stack>
                  <p className="text-muted">{desc}</p>
                  <div className="my-6">
                    <h5 className="fs-12">
                      Inprogress <span className="float-end">{progress}%</span>
                    </h5>
                    <ProgressBar
                      now={progress}
                      variant={`w-100 rounded bg-${color}`}
                      style={{ height: '5px' }}
                    />
                  </div>
                  <Stack direction="horizontal" className="mt-3 justify-content-between">
                    <div className="avatar-group avatar-group-sm">
                      {avatars.map((avatar, idx) => (
                        <Avatar
                          key={idx}
                          type="image"
                          src={avatar}
                          alt={`User Avatar ${idx + 1}`}
                          className="avatar avatar-sm"
                        />
                      ))}
                    </div>
                    <Stack direction="horizontal" gap={3}>
                      <Link to="#!" className="text-muted hstack">
                        <i className="fi fi-rr-paperclip-vertical fs-12 me-1"></i>
                        <span>{attach}</span>
                      </Link>
                      <Link to="#!" className="text-muted hstack">
                        <i className="fi fi-rr-comment-alt fs-12 me-1"></i>
                        <span>{comment}</span>
                      </Link>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ),
        )}
        <Col sm={12} className="text-center">
          <Loading />
        </Col>
      </Row>
    </>
  )
}

export default ProjectsComponent
