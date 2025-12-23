import Select from 'react-select'
import { colourOptions } from './data'

const SelectMultiple = () => {
  return (
    <>
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        options={colourOptions}
        classNamePrefix="select"
      />
    </>
  )
}

export default SelectMultiple
