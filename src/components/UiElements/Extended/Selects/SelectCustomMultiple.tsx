import React from 'react'
import Select from 'react-select'
import { CustomSelectOption, CustomMultiValue } from './Components/CustomMultipleComponent'
import { CustomImageOptions } from './data'

const SelectCustomMultiple: React.FC = () => {
  return (
    <Select
      isMulti
      isSearchable
      options={CustomImageOptions}
      components={{
        Option: CustomSelectOption,
        MultiValue: CustomMultiValue,
      }}
      classNamePrefix="select"
    />
  )
}

export default SelectCustomMultiple
