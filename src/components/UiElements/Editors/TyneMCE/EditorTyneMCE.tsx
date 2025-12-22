import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface AppProps {}

const EditorTyneMCE: React.FC<AppProps> = () => {
  const editorRef = useRef<any>(null)

  const handleEditorInit = (editor: any) => {
    if (editorRef.current) {
      editorRef.current = editor
    }
  }

  return (
    <>
      <Editor
        onInit={handleEditorInit}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        }}
      />
    </>
  )
}

export default EditorTyneMCE
