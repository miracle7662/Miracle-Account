import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import { KanbanColumnEditModal, KanbanTask } from '@/components/Apps/Kanban'
import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Button, Dropdown, DropdownDivider, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { kanbanData } from './data/kanbanData'
import { Column, Task } from './data/types'

const KanbanColumn: React.FC<
  Column & {
    onDelete: () => void
    onEmptyTasks: () => void
    addTaskToColumn: (newTasks: Task[]) => void
  }
> = ({ id, title, tasks, onDelete, onEmptyTasks, addTaskToColumn }) => {
  const taskCount = tasks.length
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newColumnName, setNewColumnName] = useState(title)
  const defaultBorderColor =
    kanbanData.columns.find((col) => col.title === title)?.color || 'primary'
  const [selectedBorderColor, setSelectedBorderColor] = useState(defaultBorderColor)

  const openEditModal = () => {
    setIsEditModalOpen(true)
  }

  const handleEditSave = () => {
    setIsEditModalOpen(false)
  }

  const handleTitleChange = (newTitle: string) => {
    setNewColumnName(newTitle)
  }

  const handleColorChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setSelectedBorderColor(selectedOption.value)
    }
  }

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the column "${title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete()
        toast.success(`Column "${title}" deleted successfully`)
      }
    })
  }

  const handleEmptyTasks = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete all tasks in the column "${title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete all tasks!',
    }).then((result) => {
      if (result.isConfirmed) {
        onEmptyTasks()
        toast.success(`All tasks in column "${title}" deleted successfully`)
      }
    })
  }

  const handleAddTask = () => {
    const newTask: Task[] = [
      {
        id: uuidv4(),
        content: [
          {
            tasktitle: 'Client Meeting',
            taskdesc: 'Schedule a client meeting to discuss project status and requirements.',
            desclong:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta corporis accusamus enim totam iste ratione at sit reprehenderit! Omnis ad asperiores et placeat aliquam laboriosam repellat facilis quibusdam consequatur',
            date: '26 Mar, 2024',
            avatars: [avatar1, avatar2, avatar3, avatar4, avatar5],
            badge: ['warning', 'danger'],
            attach: 2,
            comment: 3,
          },
        ],
      },
    ]

    addTaskToColumn(newTask)

    toast.success(`New task added to "${title}" column`)
  }

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    onEmptyTasks()
    addTaskToColumn(updatedTasks)
  }

  return (
    <>
      <div style={{ minWidth: '300px', maxWidth: '300px' }}>
        <div className="border border-top-0 rounded mb-3">
          <Stack
            direction="horizontal"
            className={`ps-3 pe-2 py-2 gap-3 gap-md-4 bg-body-tertiary rounded border-top border-3 border-${selectedBorderColor}`}>
            <h6 className="mb-0">
              {newColumnName} ({taskCount})
            </h6>
            <Dropdown className="ms-auto">
              <Dropdown.Toggle variant="light" className="btn-icon btn-md arrow-none">
                <i className="fi fi-bs-menu-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={openEditModal}>
                  <i className="fi fi-rr-edit"></i>
                  <span className="ms-3">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteClick}>
                  <i className="fi fi-rr-trash"></i>
                  <span className="ms-3">Delete</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleEmptyTasks}>
                  <i className="fi fi-rr-delete"></i>
                  <span className="ms-3">Empty</span>
                </Dropdown.Item>
                <DropdownDivider />
                <Dropdown.Item onClick={handleAddTask}>
                  <i className="fi fi-rr-plus"></i>
                  <span className="ms-3">Add Task</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        </div>
        <Droppable droppableId={id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="TaskList">
              {tasks.map((task, index) => (
                <KanbanTask
                  key={task.id}
                  id={task.id}
                  content={task.content}
                  index={index}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          variant=""
          className="btn-md bg-body-tertiary border w-100 mb-4"
          onClick={handleAddTask}>
          <i className="fi fi-rr-plus fs-12"></i>
          <span className="ms-3">Add Task</span>
        </Button>
      </div>
      {isEditModalOpen && (
        <KanbanColumnEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          columnName={newColumnName}
          onColumnNameChange={handleTitleChange}
          onSave={handleEditSave}
          handleClose={() => setIsEditModalOpen(false)}
          handleSave={() => {}}
          handleTitleChange={handleTitleChange}
          handleColorChange={handleColorChange}
          editingColumn={{
            id,
            title: newColumnName,
            color: selectedBorderColor,
          }}
          selectedColor={{
            value: selectedBorderColor,
            label: selectedBorderColor.toLowerCase(),
          }}
        />
      )}
    </>
  )
}

export default KanbanColumn
