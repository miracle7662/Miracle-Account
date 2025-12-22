import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import Avatar from '../../Base/Avatars/Avatar'

const DropzoneBasic: React.FC = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: FileWithPath[]) => {
      const previews = acceptedFiles.map((file) => URL.createObjectURL(file))
      setImagePreviews(previews)
      setAcceptedFiles(acceptedFiles)
    },
  })

  const formatBytesToMB = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const handleRemoveFile = (fileIndex: number) => {
    const updatedPreviews = [...imagePreviews]
    updatedPreviews.splice(fileIndex, 1)
    setImagePreviews(updatedPreviews)

    const removedFile = acceptedFiles[fileIndex]
    const updatedFiles = acceptedFiles.filter((_, index) => index !== fileIndex)
    setAcceptedFiles(updatedFiles)

    toast.success(`File "${removedFile.name}" has been deleted`)
  }

  const files: JSX.Element[] = acceptedFiles.map((file: FileWithPath, index: number) => (
    <Stack direction="horizontal" gap={3} key={file.path} className="py-2 px-3 mb-2 border rounded">
      {imagePreviews[index] && (
        <Avatar type="image" size="md" src={imagePreviews[index]} alt="Preview" />
      )}
      <div>
        <h6 className="mb-1">{file.path}</h6>
        <span className="fs-13 text-muted">{formatBytesToMB(file.size)}</span>
      </div>
      <div className="ms-auto">
        <Button
          type="button"
          variant="soft-light"
          className="btn-icon"
          onClick={() => handleRemoveFile(index)}
        >
          <i className="fi fi-rr-trash text-danger"></i>
        </Button>
      </div>
    </Stack>
  ))

  return (
    <section>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <Button variant="neutral" className="btn-xxl btn-icon mb-4">
            <i className="fi fi-rr-upload fs-20"></i>
          </Button>
          <h5>Drop files here or click to upload.</h5>
          <p className="fs-13 text-muted mb-0">
            (This is just a demo drop zone. Selected files are not actually uploaded.)
          </p>
        </div>
      </div>
      <aside className="mt-4">{files}</aside>
    </section>
  )
}

export default DropzoneBasic
