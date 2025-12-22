import React, { useState } from 'react'
import { Badge, Button, Form, Image, Modal, Spinner, Stack } from 'react-bootstrap'
import toast from 'react-hot-toast'

type TaskDetailsModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  taskDetails: {
    tasktitle: string
    taskdesc: string
    desclong: string
    date: string
    badge?: string[]
    avatars?: string[]
    attach: number
    comment: number
  }
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  taskDetails,
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { tasktitle, taskdesc, desclong, badge, avatars, date, attach, comment } = taskDetails

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    if (!isChecked) {
      toast.success('Task marked as complete')
    }
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete()
      setIsDeleting(false)
      onClose()
      toast.success('Task Delete successfully')
    }, 1500)
  }

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="hstack gap-3">
          {tasktitle}
          {badge && (
            <Stack direction="horizontal" gap={1}>
              {badge.map((badge, index) => (
                <Badge
                  key={index}
                  bg=""
                  className={`bg-${badge.toLowerCase()}-subtle text-${badge.toLowerCase()}`}>
                  {badge.toUpperCase()}
                </Badge>
              ))}
            </Stack>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {taskdesc} {desclong}
        </p>
        <Stack direction="horizontal" className="my-4">
          <span className="me-2">Assigned:</span>
          {avatars && (
            <div className="avatar-group avatar-group-sm">
              {avatars.map((avatar, index) => (
                <div key={index} className="avatar avatar-sm">
                  <Image src={avatar} alt={`Avatar ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </Stack>
        <Stack direction="horizontal" className="my-4">
          <span className="me-2">Due Date:</span>
          <span className="fs-12 text-danger hstack">
            <i className="fi fi-rr-calendar fs-12 me-1"></i>
            <span>{date}</span>
          </span>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <span className="text-muted hstack">
            <i className="fi fi-rr-paperclip-vertical fs-12 me-1"></i>
            <span>{attach} Attachments</span>
          </span>
          <span className="text-muted hstack">
            <i className="fi fi-rr-comment-alt fs-12 me-1"></i>
            <span>{comment} Comments</span>
          </span>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Form.Check type="checkbox" id="make-as-complete-check" className="me-auto">
          <Form.Check.Input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <Form.Check.Label>Make as complete</Form.Check.Label>
        </Form.Check>
        <Button variant="" onClick={onClose} className="text-danger">
          Close
        </Button>
        <Button
          variant="danger"
          className="text-white"
          onClick={handleDelete}
          disabled={isDeleting}>
          {isDeleting ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">{'Deleting...'}</span>
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskDetailsModal
