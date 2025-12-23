import React from 'react'
import type { SortDirection } from '@tanstack/react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

type SorterProps = {
  sort: false | SortDirection
}

const getIcon = (sort: SortDirection): React.ReactElement => {
  if (sort === 'asc') {
    return <FaSortUp />
  } else {
    return <FaSortDown />
  }
}

const Sorter: React.FC<SorterProps> = ({ sort }) => {
  if (sort === false) {
    return <FaSort style={{ width: '12px', height: '12px' }} />
  }

  return <span className="text-primary">{getIcon(sort)}</span>
}

export default Sorter
