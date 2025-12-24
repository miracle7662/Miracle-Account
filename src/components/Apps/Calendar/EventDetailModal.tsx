import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Event } from './data/types'
import 'sweetalert2/dist/sweetalert2.css'
import EventUpdateModal from './EventUpdateModal'

interface EventDetailModalProps {
  selectedEvent: Event | null
  handleCloseModal: () => void
  handleDeleteEvent: () => void
  handleUpdateEvent: (updatedEvent: Event) => void
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  selectedEvent,
  handleCloseModal,
  handleDeleteEvent: onDeleteEvent,
  handleUpdateEvent,
}) => {
  const [events, setEvents] = useState<Event[]>([])
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDeleteEvent = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this event!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed && selectedEvent && selectedEvent.id) {
        const updatedEvents = events.filter((event) => event.id !== selectedEvent.id)
        setEvents(updatedEvents)
        onDeleteEvent()
      }
    })
  }

  const handleEditEvent = () => {
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  return (
    <>
      <Modal centered show={selectedEvent !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton className={`${selectedEvent?.classNames.join(' ') || ''}`}>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-12">
          <div className="row g-4">
            <div className="col-12">
              <div className="d-flex align-items-start gap-4">
                <div>
                  <i className="fi fi-rr-calendar-clock text-muted"></i>
                </div>
                <div>
                  <h6>Start Time</h6>
                  <p className="fs-12 text-muted" id="preview-event-start">
                    {selectedEvent?.start ? selectedEvent.start.toLocaleString() : 'No start time'}
                  </p>
                </div>
              </div>
            </div>
            {selectedEvent?.end && (
              <div className="col-12" id="preview-event-end-check">
                <div className="d-flex align-items-start gap-4">
                  <div>
                    <i className="fi fi-rr-calendar-check text-muted"></i>
                  </div>
                  <div>
                    <h6>End Time</h6>
                    <p className="fs-12 text-muted" id="preview-event-end">
                      {selectedEvent.end.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="col-12" id="preview-event-description-check">
              <div className="d-flex align-items-start gap-4">
                <div>
                  <i className="fi fi-rr-poll-h text-muted"></i>
                </div>
                <div>
                  <h6>Description</h6>
                  <p className="fs-13 text-muted mb-0">
                    {selectedEvent?.extendedProps.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="" className="btn-neutral" onClick={handleEditEvent}>
            <i className="fi fi-rr-pen-nib"></i>
            <span className="ms-2">Edit</span>
          </Button>
          <div>
            <Button variant="" className="link-danger" onClick={handleCloseModal}>
              <span className="ms-2">Cancel</span>
            </Button>
            <Button variant="" className="btn-soft-danger" onClick={handleDeleteEvent}>
              <i className="fi fi-rr-trash"></i>
              <span className="ms-2">Delete</span>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <EventUpdateModal
        show={showEditModal}
        handleCloseModal={handleCloseEditModal}
        selectedEvent={selectedEvent}
        handleUpdateEvent={handleUpdateEvent}
      />
    </>
  )
}

export default EventDetailModal
