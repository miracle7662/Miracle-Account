import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import ExperiencesData from './data/ExperiencesData'

const OverviewExperiences = () => {
  return (
    <>
      <h5 className="fw-semibold mb-5">Experiences</h5>
      {ExperiencesData.map(({ image, title, time, duration, description }, idx) => (
        <div key={idx} className="border p-3 mb-3 rounded d-sm-flex align-items-start">
          <div
            className="rounded flex-shrink-0 mb-3 mb-sm-0"
            style={{ width: '3rem', height: '3rem' }}
          >
            <Image src={image} className="img-fluid rounded" alt="" />
          </div>
          <div className="ms-sm-4">
            <h6>{title}</h6>
            <div className="hstack gap-2 fs-12 my-2">
              <span>{time}</span>
              <span
                className="bg-dark bg-opacity-25 rounded-circle"
                style={{ width: '4px', height: '4px' }}
              ></span>
              <span>{duration}</span>
            </div>
            <p>{description}</p>
            <Link to="#!" className="icon-link icon-link-hover">
              <span>View Details</span>
              <i className="fi fi-rr-arrow-right bi"></i>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default OverviewExperiences
