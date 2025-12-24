import { useState } from 'react'
import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskCard = () => {
  const [state, setState] = useState({
    value: '',
    mask: '9999-9999-9999-9999',
  })

  const onChange = (event: any) => {
    const value = event.target.value
    const newState = {
      mask: '9999-9999-9999-9999',
      value: value,
    }

    if (/^3[47]/.test(value)) {
      newState.mask = '9999-999999-99999'
    }

    setState(newState)
  }

  return (
    <>
      <InputMask {...state} onChange={onChange} className="form-control" />
      <Form.Text>
        Credit Card format: <code>xxxx-xxxx-xxxx-xxxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskCard
