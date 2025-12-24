import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Button, Card, Dropdown, DropdownDivider, ListGroup, Stack } from 'react-bootstrap'

interface MeetingItemProps {
  date: number
  month: string
  title: string
  time: string
  joinButtonVariant: string
  joinButtonText: string
  badgeDate: string
  badgeColor: string
  badgeText: string
}

const MeetingItem: React.FC<MeetingItemProps> = ({
  date,
  month,
  title,
  time,
  joinButtonVariant,
  joinButtonText,
  badgeDate,
  badgeColor,
  badgeText,
}) => {
  const [loading, setLoading] = useState(false)
  const [joined, setJoined] = useState(false)

  const handleJoinClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setJoined(true)
      toast.success('Meeting joined successfully!')
    }, 2000)
  }

  return (
    <ListGroup.Item className="py-5">
      <div className="d-flex gap-4">
        <div
          className={`p-2 rounded-2 bg-${badgeColor}-subtle text-${badgeColor} text-center flex-shrink-0`}
          style={{ width: '4rem', height: '4rem' }}
        >
          <span className="d-block fw-bold fs-18">{date}</span>
          <span className="d-block fw-semibold fs-14">{month}</span>
        </div>
        <div className="w-100">
          <Stack direction="horizontal" gap={2}>
            <div className="py-1">
              <h6>
                <Link to="#!">{title} </Link>
              </h6>

              <div className="fs-13 text-muted mb-2">{time}</div>
            </div>
            <Button
              variant={joinButtonVariant}
              className="btn-xs ms-auto text-white"
              onClick={handleJoinClick}
              disabled={loading || joined}
            >
              {loading ? (
                <span>Joining...</span>
              ) : joined ? (
                <span>Joined</span>
              ) : (
                <>
                  <i className="fi fi-rr-plus fs-10"></i>
                  <span className="ms-1">{joinButtonText}</span>
                </>
              )}
            </Button>
          </Stack>
          <div className="d-flex gap-2">
            <span className="p-2 hstack gap-2 badge text-body-secondary border rounded-pill">
              <i className="fi fi-rr-calendar fs-12"></i>
              <span>{badgeDate}</span>
            </span>
            <span className="p-2 hstack gap-2 badge text-body-secondary border rounded-pill">
              <span
                className={`rounded-circle d-inline-block bg-${badgeColor}`}
                style={{ width: '0.5rem', height: '0.5rem' }}
              ></span>
              <span>{badgeText}</span>
            </span>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  )
}

const NewMeeting = () => {
  const meetings: MeetingItemProps[] = [
    {
      date: 22,
      month: 'FEB',
      title: 'Standup team meeting',
      time: '4:30 to 7:00pm - 2h 30min',
      joinButtonVariant: 'danger',
      joinButtonText: 'Join',
      badgeDate: '22 Feb 2024',
      badgeColor: 'danger',
      badgeText: 'Urgent',
    },
    {
      date: 24,
      month: 'FEB',
      title: 'Standup team meeting',
      time: '4:30 to 7:00pm - 2h 30min',
      joinButtonVariant: 'success',
      joinButtonText: 'Join',
      badgeDate: '24 Feb 2024',
      badgeColor: 'success',
      badgeText: 'Normal',
    },
    {
      date: 25,
      month: 'FEB',
      title: 'Standup team meeting',
      time: '4:30 to 7:00pm - 2h 30min',
      joinButtonVariant: 'warning',
      joinButtonText: 'Join',
      badgeDate: '25 Feb 2024',
      badgeColor: 'warning',
      badgeText: 'Normal',
    },
  ]

  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>New Meeting</Card.Title>
          <Dropdown className="ms-auto" drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-stats"></i>
                <span className="ms-3">All Channels</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body className="p-0">
          <ListGroup variant="flush">
            {meetings.map((meeting, index) => (
              <MeetingItem key={index} {...meeting} />
            ))}
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-center">
          <Link to="" className="ms-auto icon-link icon-link-hover link-primary">
            <span>View Details</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Card.Footer>
      </Card>
    </>
  )
}

export default NewMeeting
