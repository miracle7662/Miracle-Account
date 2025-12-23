import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Badge, Card, Image, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TaskDetailsModal from './TaskDetailsModal'

type TaskProps = {
  id: string
  content: {
    tasktitle: string
    taskdesc: string
    desclong: string
    date: string
    badge?: string[]
    avatars?: string[]
    attach: number
    comment: number
  }[]
  index: number
  onDelete: () => void
}

const KanbanTask: React.FC<TaskProps> = ({ id, content, index, onDelete }) => {
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)

  const openTaskDetailsModal = () => {
    setIsTaskDetailsModalOpen(true)
  }

  const closeTaskDetailsModal = () => {
    setIsTaskDetailsModalOpen(false)
  }

  return (
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <Card
            key={id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-3"
            onClick={openTaskDetailsModal}>
            <Card.Body>
              <h6 className="mb-3">{content[0]?.tasktitle}</h6>
              <p className="fw-light">{content[0]?.taskdesc}</p>
              <Stack direction="horizontal" gap={3} className="my-4">
                <Stack direction="horizontal" gap={1}>
                  {content[0]?.badge &&
                    content[0]?.badge.map((badge, index) => (
                      <Badge
                        key={index}
                        bg=""
                        className={`bg-${badge.toLowerCase()}-subtle text-${badge.toLowerCase()}`}>
                        {badge}
                      </Badge>
                    ))}
                </Stack>
                <span className="fs-11 text-muted hstack ms-auto">
                  <i className="fi fi-rr-calendar fs-12 me-1"></i>
                  <span>{content[0]?.date}</span>
                </span>
              </Stack>
              <Stack direction="horizontal" className="justify-content-between">
                <div className="avatar-group avatar-group-sm">
                  {content[0]?.avatars &&
                    content[0]?.avatars.map((avatar, index) => (
                      <div key={index} className="avatar avatar-sm">
                        <Image src={avatar} alt={`Avatar ${index + 1}`} />
                      </div>
                    ))}
                </div>
                <Stack direction="horizontal" gap={3}>
                  <Link to="#!" className="text-muted hstack">
                    <i className="fi fi-rr-paperclip-vertical fs-12 me-1"></i>
                    <span>{content[0]?.attach}</span>
                  </Link>
                  <Link to="#!" className="text-muted hstack">
                    <i className="fi fi-rr-comment-alt fs-12 me-1"></i>
                    <span>{content[0]?.comment}</span>
                  </Link>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        )}
      </Draggable>
      <TaskDetailsModal
        isOpen={isTaskDetailsModalOpen}
        onClose={closeTaskDetailsModal}
        taskDetails={content[0]}
        onDelete={onDelete}
      />
    </>
  )
}

export default KanbanTask
