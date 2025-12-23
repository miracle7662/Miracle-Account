import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ReactQuill from 'react-quill'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, Stack, Button } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { emailItem } from '@/components/Apps/Email/data/types'
import 'react-quill/dist/quill.snow.css'

const EmailDetails: React.FC<{
  selectedEmail: emailItem | null
}> = ({ selectedEmail }) => {
  const [editorContent, setEditorContent] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!selectedEmail) {
    return null
  }

  const handleReply = () => {
    setShowEditor(true)
  }

  const handleForward = () => {
    setShowEditor(true)
  }

  const handleSend = () => {
    console.log('Sending Email:', editorContent)
    setEditorContent('')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowEditor(false)
      toast.success('Email sent successfully')
    }, 2000)
  }

  const handleDiscard = () => {
    setEditorContent('')
    setShowEditor(false)
  }

  const { name, email, subject, fulldatetime, message, description, attachment } = selectedEmail

  return (
    <>
      <PerfectScrollbar className="px-4 py-4 h-100">
        <h2 className="fs-20 fw-semibold text-dark mb-4">{subject}</h2>
        <Card className="mb-4">
          <Card.Header className="py-3 pe-3 d-flex align-items-center justify-content-between">
            <Stack direction="horizontal" gap={3}>
              <div>
                <Avatar type="image" size="md" src={selectedEmail?.image || ''} alt="User Avatar" />
              </div>
              <div>
                <h6 className="mb-1">{name}</h6>
                <span className="fs-13 text-muted d-block">{email}</span>
              </div>
            </Stack>
            <Stack direction="horizontal" gap={2} className="ms-auto">
              <time className="fs-12 text-uppercase text-muted d-none d-sm-flex">
                {fulldatetime}
              </time>
              <Button variant="light" className="btn-icon btn-sm">
                <i className="fi fi-br-menu-dots-vertical"></i>
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <p>{message}</p>
            <p>{description}</p>
            <div>
              <span>Best Regards,</span>
              <br />
              <span className="fw-bold">{name}</span>
            </div>
            {attachment && (
              <>
                <hr className="my-4" />
                <h6 className="mb-3">
                  <i className="fi fi-rr-paperclip-vertical fs-12"></i> Attachment
                </h6>
                <div className="d-grid d-md-flex gap-2">
                  <Link
                    to=""
                    className="d-inline-flex align-items-center gap-3 px-4 py-3 rounded border"
                  >
                    <i className="fi fi-rr-file-zipper text-primary fs-32"></i>
                    <div>
                      <h6>Dashboard UiKit</h6>
                      <p className="fs-12 text-muted mb-0">34.75 MB</p>
                    </div>
                  </Link>
                  <Link
                    to=""
                    className="d-inline-flex align-items-center gap-3 px-4 py-3 rounded border"
                  >
                    <i className="fi fi-rr-file-zipper text-primary fs-32"></i>
                    <div>
                      <h6>Discussion Platform</h6>
                      <p className="fs-12 text-muted mb-0">23.48 MB</p>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
        <hr className="my-12" />
        <Stack direction="horizontal" gap={2} className="mb-4">
          <Button variant="neutral" className="rounded-pill" onClick={handleReply}>
            <i className="fi fi-rr-undo"></i>
            <span className="ms-2">Reply</span>
          </Button>
          <Button variant="neutral" className="rounded-pill" onClick={handleForward}>
            <i className="fi fi-rr-redo"></i>
            <span className="ms-2">Forward</span>
          </Button>
        </Stack>
        {showEditor && (
          <>
            <ReactQuill
              value={editorContent}
              onChange={(content) => setEditorContent(content)}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['link', 'image', 'video'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                ],
              }}
            />
            <Stack direction="horizontal" gap={2} className="mt-4">
              <Button
                variant="primary"
                onClick={handleSend}
                className="text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fi fi-rr-paper-plane me-2 fs-14"></i>
                    Send
                  </>
                )}
              </Button>
              <Button variant="" className="text-danger" onClick={handleDiscard}>
                Discard
              </Button>
            </Stack>
          </>
        )}
      </PerfectScrollbar>
    </>
  )
}

export default EmailDetails
