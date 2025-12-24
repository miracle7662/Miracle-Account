import { Card, Dropdown, Pagination, Badge, Table, DropdownDivider, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CampaignState = () => {
  const campaigns = [
    {
      id: 1,
      name: '[US] Google Display Network',
      desc: 'Maximizing well-planned advertising.',
      status: 'In Progress',
      state: 'primary',
      progress: [1, 1, 1, 0, 0],
    },
    {
      id: 2,
      name: '[UK] Shopping campaign',
      desc: 'Optimizing campaign for better results.',
      status: 'Upcoming',
      state: 'warning',
      progress: [1, 1, 1, 0, 0],
    },
    {
      id: 3,
      name: '[FR] Dynamic Search Ads',
      desc: 'Enhancing brand through strategic ads.',
      status: 'Completed',
      state: 'success',
      progress: [1, 1, 1, 1, 1],
    },
    {
      id: 4,
      name: '[AU] Spring Sale 2024',
      desc: 'Boosting sales with targeted campaigns.',
      status: 'Rejected',
      state: 'danger',
      progress: [1, 1, 1, 0, 0],
    },
    {
      id: 5,
      name: '[GB] Black Friday 2024',
      desc: 'When running several campaigns.',
      status: 'Updating',
      state: 'info',
      progress: [1, 1, 1, 0, 0],
    },
  ]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Campaign State</Card.Title>
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
              <span className="ms-3">All Campaigns</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Table responsive className="mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-end">Status</th>
            <th>State</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>
                <div className="d-flex gap-3">
                  <div className="avatar avatar-md">
                    <i className={`fi fi-rr-${campaign.id}`}></i>
                  </div>
                  <div>
                    <Link to="" className="mb-2 d-block">
                      <span>{campaign.name}</span>
                    </Link>
                    <p className="fs-13 text-muted mb-0">{campaign.desc}</p>
                  </div>
                </div>
              </td>
              <td className="text-end">
                <Badge className={`bg-${campaign.state}-subtle text-${campaign.state}`}>
                  {campaign.status}
                </Badge>
              </td>
              <td>
                <div className="d-flex gap-1">
                  {campaign.progress.map((p, index) => (
                    <div
                      key={index}
                      className={`bg-${p ? campaign.state : 'secondary'} rounded-pill opacity-${
                        p ? 75 : 25
                      }`}
                      style={{ width: '1.5rem', height: '0.25rem' }}
                    ></div>
                  ))}
                </div>
              </td>
              <td className="text-end">
                <Button variant="light" className="btn-icon btn-md">
                  <i className="fi fi-rr-arrow-small-right"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Card.Footer>
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

export default CampaignState
