import { Link } from 'react-router-dom'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { Card, Dropdown, DropdownDivider, Table, Button, Pagination } from 'react-bootstrap'

// Avatar Images
import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'

const LatestLeads = () => {
  const leads = [
    {
      avatar: avatar1,
      name: 'Archie Cantones',
      email: 'arcie.tones@gmail.com',
      proposal: 'Sent',
      date: '11/06/2023 10:53',
      status: 'Completed',
      color: 'success',
    },
    {
      avatar: avatar2,
      name: 'Holmes Cherryman',
      email: 'golms.chan@gmail.com',
      proposal: 'New',
      date: '11/06/2023 10:53',
      status: 'In Progress',
      color: 'warning',
    },
    {
      avatar: avatar3,
      name: 'Malanie Hanvey',
      email: 'lanie.nveyn@gmail.com',
      proposal: 'Sent',
      date: '11/06/2023 10:53',
      status: 'Completed',
      color: 'success',
    },
    {
      avatar: avatar4,
      name: 'Kenneth Hune',
      email: 'nneth.une@gmail.com',
      proposal: 'Rejected',
      date: '11/06/2023 10:53',
      status: 'Not Interested',
      color: 'danger',
    },
    {
      avatar: avatar5,
      name: 'Valentine Maton',
      email: 'alenine.aton@gmail.com',
      proposal: 'Sent',
      date: '11/06/2023 10:53',
      status: 'Completed',
      color: 'success',
    },
  ]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Latest Leads</Card.Title>
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
      <Table responsive className="mb-0">
        <thead>
          <tr className="border-b">
            <th scope="row">Users</th>
            <th>Proposal</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(({ avatar, name, email, proposal, date, status, color }, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <Avatar type="image" size="md" src={avatar} alt={name} />
                  <Link to="#!">
                    <h6 className="mb-1">{name}</h6>
                    <span className="fs-13 d-block fw-normal text-muted">{email}</span>
                  </Link>
                </div>
              </td>
              <td>
                <span className={`badge bg-${color}-subtle text-${color}`}>{proposal}</span>
              </td>
              <td>{date}</td>
              <td>
                <span className={`badge bg-${color}-subtle text-${color}`}>{status}</span>
              </td>
              <td className="text-end">
                <Button variant="light" className="btn-icon btn-md">
                  <i className="fi fi-bs-menu-dots-vertical"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Card.Footer className="border-top-0">
        <Pagination className="mb-0">
          <Pagination.Prev />
          {[...Array(4)].map((_, index) => (
            <Pagination.Item key={index}>{index + 1}</Pagination.Item>
          ))}
          <Pagination.Next />
        </Pagination>
      </Card.Footer>
    </Card>
  )
}

export default LatestLeads
