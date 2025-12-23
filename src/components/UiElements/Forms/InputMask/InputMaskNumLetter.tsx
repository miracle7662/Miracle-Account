import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskNumLetter = () => {
  return (
    <>
      <InputMask mask="9999-aaaa" maskChar={null} className="form-control" />
      <Form.Text>
        Phone format: <code>xxsx.aaaa</code>
      </Form.Text>
    </>
  )
}

export default InputMaskNumLetter
