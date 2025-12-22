import { useState } from 'react'
import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

const InputMaskIP = () => {
  const [state, setState] = useState({
    value: '',
    mask: '999.999.999.999',
  })

  const onChange = (event: any) => {
    const value = event.target.value
    const newState = {
      mask: '999.999.999.999',
      value: value,
    }

    if (/^3[47]/.test(value)) {
      newState.mask = '999.999.999.999'
    }

    setState(newState)
  }

  return (
    <>
      <InputMask {...state} onChange={onChange} className="form-control" />
      <Form.Text>
        Credit Card format: <code>xxx.xxx.xxx.xxx</code>
      </Form.Text>
    </>
  )
}

export default InputMaskIP
