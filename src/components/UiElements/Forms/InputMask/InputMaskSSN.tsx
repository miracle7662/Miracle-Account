import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskSSN = () => {
  return (
    <>
      <InputMask mask="999-99-9999" maskChar={null} className="form-control" />
      <Form.Text>
        Phone format: <code>xxx-xx-xxxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskSSN
