import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskCurrency = () => {
  return (
    <>
      <InputMask mask="$999.999,99" maskChar={null} className="form-control" />
      <Form.Text>
        Phone format: <code>$xxx.xxx,xx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskCurrency
