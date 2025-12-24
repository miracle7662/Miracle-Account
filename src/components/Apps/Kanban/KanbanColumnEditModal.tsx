import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Button, Form, Modal } from 'react-bootstrap'
import { colorOptions } from './data/colorOptions'
import { ColumnEditModalProps } from './data/types'

const KanbanColumnEditModal: React.FC<ColumnEditModalProps> = ({
  isOpen,
  onClose,
  handleSave,
  handleTitleChange,
  handleColorChange,
  editingColumn,
  selectedColor,
  columnName,
  onColumnNameChange,
}) => {
  const [newTitle, setNewTitle] = useState<string>('')
  const [newColor, setNewColor] = useState<{
    value: string
    label: string
  } | null>(null)

  useEffect(() => {
    setNewTitle(editingColumn?.title || '')
    setNewColor(selectedColor || colorOptions[0])
  }, [isOpen, editingColumn, selectedColor])

  const handleCancel = () => {
    setNewTitle(editingColumn?.title || '')
    setNewColor(selectedColor)
    onClose()
  }

  const handleSaveChanges = () => {
    handleTitleChange(newTitle)
    handleColorChange(newColor)
    handleSave()
    onClose()
  }

  return (
    <>
      <Modal show={isOpen} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>{`Edit ${columnName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4" controlId="editBoardTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editBoardColor">
            <Form.Label>Color</Form.Label>
            <Select
              options={colorOptions}
              value={newColor}
              onChange={(selectedOption) =>
                setNewColor(selectedOption as { value: string; label: string } | null)
              }
              classNamePrefix="select"
              className="text-capitalize"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="text-danger" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default KanbanColumnEditModal
