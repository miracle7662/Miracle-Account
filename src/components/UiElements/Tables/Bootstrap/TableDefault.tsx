import { Link } from 'react-router-dom'
import { Table, Image } from 'react-bootstrap'

import { tableData } from './data'

function TableDefault() {
  return (
    <Table responsive className="mb-0">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Sale Rep.</th>
          <th>Status</th>
          <th>Date & Time</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(tableData || []).map((data, idx) => {
          return (
            <tr key={idx}>
              <td>
                <Link to="#!">#{data.id}</Link>
              </td>
              <td>
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
              <td>
                <span dangerouslySetInnerHTML={{ __html: data.status }} />
              </td>
              <td>{data.dob}</td>
              <td className="text-end">
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

export default TableDefault
