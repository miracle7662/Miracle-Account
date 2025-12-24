import { useState } from 'react'
import { DateRangePicker, Range } from 'react-date-range'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CustomDateRange extends Range {
  key: string
  autoFocus?: boolean
}

const DateRangeMultiple = () => {
  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), 1),
      endDate: undefined,
      key: 'selection1',
    } as CustomDateRange,
    selection2: {
      startDate: addDays(new Date(), 4),
      endDate: addDays(new Date(), 8),
      key: 'selection2',
    } as CustomDateRange,
    selection3: {
      startDate: addDays(new Date(), 8),
      endDate: addDays(new Date(), 10),
      key: 'selection3',
      autoFocus: false,
    } as CustomDateRange,
  })

  const ranges: CustomDateRange[] = Object.values(state)

  return (
    <>
      <DateRangePicker
        onChange={(item) =>
          setState({
            ...state,
            ...item,
          })
        }
        ranges={ranges}
      />
    </>
  )
}

export default DateRangeMultiple
