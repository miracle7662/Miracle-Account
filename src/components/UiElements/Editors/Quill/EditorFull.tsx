import { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface EditorFullState {
  text: string
}

class EditorFull extends Component<React.PropsWithChildren<object>, EditorFullState> {
  modules = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6],
        },
      ],
      [
        {
          font: [],
        },
        {
          size: [],
        },
      ],
      ['bold', 'italic', 'underline', 'strike'],
      [
        {
          color: [],
        },
        {
          background: [],
        },
      ],
      [
        {
          script: 'super',
        },
        {
          script: 'sub',
        },
      ],
      ['blockquote', 'code-block'],
      [
        {
          list: 'ordered',
        },
        {
          list: 'bullet',
        },
        {
          indent: '-1',
        },
        {
          indent: '+1',
        },
      ],
      [
        'direction',
        {
          align: [],
        },
      ],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
    ],
  }
  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  constructor(props: React.PropsWithChildren<object>) {
    super(props)
    this.state = {
      text: '',
    }
  }

  handleChange = (text: string) => {
    this.setState({ text })
  }

  render() {
    return (
      <div className="text-editor" style={{ height: '240px' }}>
        <ReactQuill
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={this.state.text}
          onChange={this.handleChange}
          style={{ height: '200px' }}
          placeholder={'Compose an epic...'}
        />
      </div>
    )
  }
}

export default EditorFull
