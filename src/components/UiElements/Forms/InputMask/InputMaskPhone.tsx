import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskPhones = () => {
  return (
    <>
      <InputMask mask="+49 99 999 99" maskChar={null} className="form-control" />
      <Form.Text>
        Phone format: <code>(xxx) xxx-xxxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskPhones
