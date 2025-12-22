import { Link } from 'react-router-dom'
import { Table, Image } from 'react-bootstrap'

import { tableData } from './data'

function TableGap() {
  const tableGapStyle = {
    borderSpacing: '0 0.75rem',
    borderCollapse: 'separate' as const,
  }

  return (
    <Table responsive className="mb-0" style={tableGapStyle}>
      <thead>
        <tr>
          <th className="border-top border-start">#ID</th>
          <th className="border-top">Sale Rep.</th>
          <th className="border-top">Status</th>
          <th className="border-top">Date & Time</th>
          <th className="text-end border-top border-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(tableData || []).map((data, idx) => {
          return (
            <tr key={idx}>
              <td className="border-top border-start">
                <Link to="#!">#{data.id}</Link>
              </td>
              <td className="border-top">
                <Link to="#!" className="d-flex gap-3 align-items-center">
                  <div className="avatar avatar-sm flex-grow-0">
                    <Image src={data.avatar} alt="" className="img-fluid" />
                  </div>
                  <div className="flex-shrink-0">
                    <div>{data.name}</div>
                    <div className="fs-13 fw-normal text-muted">{data.email}</div>
                  </div>
                </Link>
              </td>
              <td className="border-top">
                <span dangerouslySetInnerHTML={{ __html: data.status }} />
              </td>
              <td className="border-top">{data.dob}</td>
              <td className="text-end border-top border-end">
                <Link to="#" className="btn btn-icon">
                  <i className="fi fi-bs-menu-dots-vertical fs-14" />
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default TableGap
