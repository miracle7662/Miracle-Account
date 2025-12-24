import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { langData } from './data/langData'

const Languages = () => {
  const lang = langData[0] || {}
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  return (
    <>
      <Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
        <Dropdown.Toggle
          className="arrow-none header-btn"
          as="a"
          role="button"
          onClick={toggleDropDown}
        >
          <img
            src={lang.flag}
            alt="flag"
            width={20}
            height={20}
            className="img-fluid rounded-circle"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          {langData.map(({ flag, name }, idx) => (
            <Link to="#" className="dropdown-item" key={idx + '-lang'}>
              <img
                src={flag}
                alt={name}
                width={20}
                height={20}
                className="img-fluid rounded-circle me-3"
              />
              <span className="align-middle">{name}</span>
            </Link>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default Languages
