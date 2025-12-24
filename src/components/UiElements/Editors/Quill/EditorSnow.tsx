import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditorSnow = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <div style={{ height: '240px' }}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ height: '200px' }}
          placeholder={'Compose an epic...'}
        />
      </div>
    </>
  )
}

export default EditorSnow
