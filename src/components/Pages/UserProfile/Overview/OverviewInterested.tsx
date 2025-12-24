import { Link } from 'react-router-dom'

import MoviesData from './data/interested/MoviesData'
import MusicsData from './data/interested/MusicsData'
import BooksData from './data/interested/BooksData'
import GamesData from './data/interested/GamesData'
import HobbiesData from './data/interested/HobbiesData'
import EpisodesData from './data/interested/EpisodesData'

const OverviewInterested = () => {
  return (
    <>
      <h5 className="fw-semibold mb-5">Interested</h5>
      <div className="d-flex flex-wrap gap-1">
        <div className="text-muted me-3">Movies: </div>
        {MoviesData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </div>
      <hr style={{ borderStyle: 'dashed' }} />
      <div className="d-flex flex-wrap gap-1">
        <div className="text-muted me-3">Musics: </div>
        {MusicsData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </div>
      <hr style={{ borderStyle: 'dashed' }} />
      <div className="d-flex flex-wrap gap-1">
        <div className="text-muted me-3">Books: </div>
        {BooksData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </div>
      <hr style={{ borderStyle: 'dashed' }} />
      <div className="d-flex flex-wrap gap-1">
        <div className="text-muted me-3">Games: </div>
        {GamesData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </div>
      <hr style={{ borderStyle: 'dashed' }} />
      <div className="d-flex flex-wrap gap-1">
        <div className="text-muted me-3">Hobbies: </div>
        {HobbiesData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </div>
      <hr style={{ borderStyle: 'dashed' }} />
      <div className="d-flex flex-wrap gap-1">
        <div className="text-muted me-3">Episodes : </div>
        {EpisodesData.map(({ name }, idx) => (
          <Link key={idx} to="#!" className="py-1 px-2 border border-dashed rounded-pill fs-12">
            {name}
          </Link>
        ))}
      </div>
    </>
  )
}

export default OverviewInterested
