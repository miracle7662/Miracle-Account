import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface AppProps {}

const EditorTyneMCEFull: React.FC<AppProps> = () => {
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
          height: '500',
          toolbar: [
            'styleselect fontselect fontsizeselect',
            'typography | fontfamily fontsize | blocks',
            'undo redo | cut copy paste | bold italic underline strikethrough | link image | alignleft aligncenter alignright alignjustify',
            'bullist numlist | outdent indent | blockquote subscript superscript | advlist | autolink | lists charmap |  preview |  code',
          ],
          plugins: 'advlist autolink link image lists charmap preview code',
          menubar: 'file edit view insert format tools table tc help',
          valid_styles: {
            '*': 'font-size,font-family,color,text-decoration,text-align',
          },
          content_style: 'body { font-family:Inter,sans-serif; font-size:13px; color: #495057;}',
          toolbar_sticky: !0,
          toolbar_sticky_offset: 80,
          autosave_ask_before_unload: !0,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: !1,
          autosave_retention: '2m',
        }}
      />
    </>
  )
}

export default EditorTyneMCEFull
