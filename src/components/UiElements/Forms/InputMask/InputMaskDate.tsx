import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskDate = () => {
  return (
    <>
      <InputMask mask="99-99-9999" defaultValue="21-12-2023" className="form-control" />
      <Form.Text>
        Phone format: <code>xx-xx-xxxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskDate
