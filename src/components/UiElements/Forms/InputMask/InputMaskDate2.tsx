import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskDate2 = () => {
  return (
    <>
      <InputMask mask="99/99/9999" placeholder="Enter birthdate" className="form-control" />
      <Form.Text>
        Phone format: <code>xx/xx/xxxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskDate2
