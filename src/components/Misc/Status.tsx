import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

interface StatusProps {
  status: string
  changeStatus: (newStatus: string) => void
}

const Status: React.FC<StatusProps> = ({ status, changeStatus }) => {
  const statusOptions = [
    { label: 'Busy', color: 'warning' },
    { label: 'Online', color: 'success' },
    { label: 'Offline', color: 'secondary' },
    { label: 'Inactive', color: 'danger' },
    { label: 'Invisible', color: 'black' },
    { label: 'Always', color: 'info' },
  ]

  const handleStatusChange = (newStatus: string) => {
    changeStatus(newStatus)

    const statusColor = statusOptions.find((opt) => opt.label === newStatus)?.color || 'primary'

    toast(
      (t) => (
        <span>
          <span
            className={`d-inline-block me-2 bg-${statusColor} rounded-circle`}
            style={{ width: '12px', height: '12px' }}
          ></span>
          <span>{`Status changed to ${newStatus}`}</span>
        </span>
      ),
      {
        duration: 1000,
      },
    )
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle split variant="" size="sm" className="px-0">
          <span
            className={`me-1 bg-${statusOptions.find((opt) => opt.label === status)
              ?.color} rounded-circle`}
            style={{ width: '6px', height: '6px' }}
          ></span>
          <span className="fs-12 text-muted me-1">{status}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ width: '100%', maxWidth: '12rem' }}>
          {statusOptions.map((option) => (
            <Dropdown.Item key={option.label} onClick={() => handleStatusChange(option.label)}>
              <span
                className={`d-inline-block bg-${option.color} rounded-circle me-2`}
                style={{ width: '6px', height: '6px' }}
              ></span>{' '}
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default Status
