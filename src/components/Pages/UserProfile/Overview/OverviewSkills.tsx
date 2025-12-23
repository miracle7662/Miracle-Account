import { Link } from 'react-router-dom'
import { Card, Stack } from 'react-bootstrap'

import SkillsData from './data/SkillsData'

const OverviewSkills = () => {
  return (
    <>
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <Card.Title className="fw-semibold">Skills</Card.Title>
        <Link to="#!">
          <i className="fi fi-rr-plus"></i>
        </Link>
      </Stack>
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        {SkillsData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </Stack>
    </>
  )
}

export default OverviewSkills
