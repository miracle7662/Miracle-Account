import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskPhone2 = () => {
  return (
    <>
      <InputMask mask="+7 (999) 999-99-99" className="form-control" />
      <Form.Text>
        Phone format: <code>(xxx) xxx-xxxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskPhone2
