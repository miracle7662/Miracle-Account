import { KanbanColumn } from '@/components/Apps/Kanban'
import { kanbanData } from '@/components/Apps/Kanban/data/kanbanData'
import { Column, ColumnsContent, Task } from '@/components/Apps/Kanban/data/types'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Button, Card, Stack } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v4 as uuidv4 } from 'uuid'

// images
import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import TitleHelmet from '@/components/Common/TitleHelmet'

const Kanban: React.FC = () => {
  const [data, setData] = useState<ColumnsContent[]>(kanbanData.columns)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const newData = [...data]
    const sourceColumn = newData.find((column) => column.id === source.droppableId)
    const destinationColumn = newData.find((column) => column.id === destination.droppableId)
    const taskToMove = sourceColumn?.tasks.find((task) => task.id === draggableId)

    if (sourceColumn && destinationColumn && taskToMove) {
      sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== draggableId)
      destinationColumn.tasks.splice(destination.index, 0, taskToMove)

      setData(newData)
    }
  }

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: 'New Board',
      tasks: [],
      color: '#3E97FF',
    }
    setData((prevData) => [...prevData, newColumn])
    toast.success(`${newColumn.title} added successfully`)
  }

  const deleteColumn = (columnId: any) => {
    const newData = data.filter((column) => column.id !== columnId)
    setData(newData)
  }

  const emptyColumnTasks = (columnId: any) => {
    const updatedTasks: Task[] = []

    setData((prevData) => {
      return prevData.map((column) => {
        if (column.id === columnId) {
          return { ...column, tasks: updatedTasks }
        } else {
          return column
        }
      })
    })
  }

  const addTaskToColumn = (columnId: any, newTasks: Task[]) => {
    setData((prevData) => {
      return prevData.map((column) => {
        if (column.id === columnId) {
          return { ...column, tasks: [...column.tasks, ...newTasks] }
        } else {
          return column
        }
      })
    })
  }

  return (
    <>
      <TitleHelmet title="Kanban" />
      <Card>
        <Card.Header
          className="d-flex align-items-center justify-content-between"
          style={{ height: '5rem' }}>
          <h4 className="fw-bold mb-0">Kanban Board</h4>
          <Stack direction="horizontal" gap={2}>
            <div className="avatar-group avatar-group-md d-none d-md-flex">
              <Avatar type="image" src={avatar1} alt="User Avatar" className="avatar avatar-md" />
              <Avatar type="image" src={avatar2} alt="User Avatar" className="avatar avatar-md" />
              <Avatar type="image" src={avatar3} alt="User Avatar" className="avatar avatar-md" />
              <Avatar type="image" src={avatar4} alt="User Avatar" className="avatar avatar-md" />
              <Avatar type="image" src={avatar5} alt="User Avatar" className="avatar avatar-md" />
            </div>
            <Button variant="neutral" className="btn-icon btn-md rounded d-none d-md-flex">
              <i className="fi fi-rr-settings"></i>
            </Button>
            <Button variant="primary" onClick={handleAddColumn}>
              <i className="fi fi-rr-plus"></i>
              <span className="ms-3">Add Board</span>
            </Button>
          </Stack>
        </Card.Header>
        <DragDropContext onDragEnd={onDragEnd}>
          <PerfectScrollbar className="apps-scrollable-content">
            <Card.Body className="d-flex align-items-start gap-3 gap-md-4">
              {data.map((column) => (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  color={column.color}
                  tasks={column.tasks}
                  onDelete={() => deleteColumn(column.id)}
                  onEmptyTasks={() => emptyColumnTasks(column.id)}
                  addTaskToColumn={(newTask) => addTaskToColumn(column.id, newTask)}
                />
              ))}
            </Card.Body>
          </PerfectScrollbar>
        </DragDropContext>
      </Card>
    </>
  )
}

export default Kanban
