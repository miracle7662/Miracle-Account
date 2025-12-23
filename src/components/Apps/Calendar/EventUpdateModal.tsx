import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import { colorOption } from './data/colorOption'
import { Event } from './data/types'
import 'flatpickr/dist/themes/airbnb.css'

interface EventUpdateModalProps {
  show: boolean
  handleCloseModal: () => void
  selectedEvent: Event | null
  handleUpdateEvent: (updatedEvent: Event) => void
}

const EventUpdateModal: React.FC<EventUpdateModalProps> = ({
  show,
  handleCloseModal,
  selectedEvent,
  handleUpdateEvent,
}) => {
  const [selectedColorLabel, setSelectedColorLabel] = useState<string | undefined>('')
  const [formData, setFormData] = useState({
    title: '',
    startTime: new Date() as Date | null,
    endTime: null as Date | null,
    description: '',
    color: '',
  })

  const handleUpdate = () => {
    if (selectedEvent) {
      const selectedColorValue = formData.color
      const colorClassName = `fc-event-${selectedColorValue}-subtle`

      const updatedEvent: Event = {
        ...selectedEvent,
        id: selectedEvent.id.toString(),
        title: formData.title,
        start: formData.startTime ? new Date(formData.startTime) : null,
        end: formData.endTime ? new Date(formData.endTime) : null,
        classNames: [colorClassName],
        description: formData.description,
      }

      handleUpdateEvent(updatedEvent)
      handleCloseModal()
    }
  }

  useEffect(() => {
    if (selectedEvent) {
      const defaultColor = colorOption[0].value
      const selectedColorValue =
        selectedEvent.classNames[0]?.replace('fc-event-', '').replace('-subtle', '') || defaultColor

      setFormData({
        title: selectedEvent.title || '',
        startTime: selectedEvent.start || new Date(),
        endTime: selectedEvent.end || null,
        description: selectedEvent.extendedProps?.description || '',
        color: selectedColorValue,
      })

      const selectedOption = colorOption.find((option) => option.value === selectedColorValue)
      setSelectedColorLabel(selectedOption?.label)
    }
  }, [selectedEvent])

  return (
    <Modal centered show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formStartTime">
            <Form.Label>Start Time</Form.Label>
            <Flatpickr
              className="form-control"
              data-enable-time
              value={formData.startTime || undefined}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  startTime: date && date.length > 0 ? date[0] : null,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEndTime">
            <Form.Label>End Time</Form.Label>
            <Flatpickr
              data-enable-time
              className="form-control"
              value={formData.endTime || undefined}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  endTime: date && date.length > 0 ? date[0] : null,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Select
              classNamePrefix="select"
              options={colorOption}
              value={{ value: formData.color, label: selectedColorLabel }}
              onChange={(selectedOption) => {
                setFormData({
                  ...formData,
                  color: selectedOption?.value || '',
                })
                setSelectedColorLabel(selectedOption?.label)
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" className="link-danger" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EventUpdateModal
