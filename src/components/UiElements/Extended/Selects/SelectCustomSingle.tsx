import React from 'react'
import Select from 'react-select'
import { CustomSelectOption, CustomControl } from './Components/CustomSingleComponent'
import { CustomImageOptions } from './data'

const SelectCustomSingle: React.FC = () => {
  return (
    <Select
      isSearchable
      options={CustomImageOptions}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl,
      }}
      classNamePrefix="select"
    />
  )
}

export default SelectCustomSingle
