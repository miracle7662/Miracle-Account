import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button, Card, Stack } from 'react-bootstrap'
import { events } from '@/components/Apps/Calendar/data/events'
import { Event, EventType } from '@/components/Apps/Calendar/data/types'
import { AddEventModal, EventDetailModal, EventUpdateModal } from '@/components/Apps/Calendar'
import TitleHelmet from '@/components/Common/TitleHelmet'

function renderEventContent(eventInfo: any) {
  return (
    <>
      <span className="fc-daygrid-event-dot"></span>
      <strong>{eventInfo.timeText}</strong>
      <span className="ms-1">{eventInfo.event.title}</span>
    </>
  )
}

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [calendarEvents, setCalendarEvents] = useState<EventType[]>(events)
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [showUpdateEventModal, setShowUpdateEventModal] = useState(false)

  const handleEventClick = (eventClickInfo: any) => {
    setSelectedEvent(eventClickInfo.event)
  }

  const handleCloseModals = () => {
    setSelectedEvent(null)
    setShowAddEventModal(false)
    setShowUpdateEventModal(false)
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = calendarEvents.filter((event) => event.id !== selectedEvent.id)
      setCalendarEvents(updatedEvents)
      handleCloseModals()
      toast.success('Event deleted successfully!')
    }
  }

  const handleUpdateEvent = (updatedEvent: Event) => {
    const updatedEvents = calendarEvents.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event,
    )
    setCalendarEvents(updatedEvents as EventType[])
    handleCloseModals()
    toast.success('Event updated successfully!')
  }

  const handleAddEvent = (newEvent: Event) => {
    const updatedNewEvent = {
      ...newEvent,
      id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
    }

    setCalendarEvents([...calendarEvents, updatedNewEvent] as EventType[])
    handleCloseModals()
    toast.success('Event added successfully!')
  }

  return (
    <>
      <TitleHelmet title="Calendar" />
      <Card>
        <Card.Header
          className="d-flex align-items-center justify-content-between"
          style={{ height: '5rem' }}
        >
          <h4 className="fw-bold mb-0">Calendar</h4>
          <Stack direction="horizontal" gap={2}>
            <Button variant="neutral" className="btn-icon btn-md rounded d-none d-md-flex">
              <i className="fi fi-rr-settings"></i>
            </Button>
            <Button variant="primary" className="btn-md" onClick={() => setShowAddEventModal(true)}>
              <i className="fi fi-br-plus"></i>
              <span className="ms-2">Add Event</span>
            </Button>
          </Stack>
        </Card.Header>
        <PerfectScrollbar className="apps-scrollable-content">
          <FullCalendar
            events={calendarEvents}
            weekends={true}
            selectable={true}
            aspectRatio={3}
            editable={true}
            droppable={true}
            nowIndicator={true}
            displayEventTime={true}
            themeSystem="bootstrap5"
            initialView="dayGridMonth"
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next title',
              right: 'today dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            views={{
              dayGridMonth: {
                dayMaxEventRows: 3,
              },
            }}
          />
        </PerfectScrollbar>
      </Card>
      <EventDetailModal
        selectedEvent={selectedEvent}
        handleCloseModal={handleCloseModals}
        handleDeleteEvent={handleDeleteEvent}
        handleUpdateEvent={handleUpdateEvent}
      />
      <AddEventModal
        showModal={showAddEventModal}
        handleCloseModal={() => setShowAddEventModal(false)}
        handleAddEvent={handleAddEvent}
        events={calendarEvents}
        setEvents={setCalendarEvents}
        showUpdateEventModal={showUpdateEventModal}
        setShowUpdateEventModal={setShowUpdateEventModal}
        selectedEventForEdit={selectedEvent}
      />
      <EventUpdateModal
        show={showUpdateEventModal}
        handleCloseModal={() => setShowUpdateEventModal(false)}
        selectedEvent={selectedEvent}
        handleUpdateEvent={handleUpdateEvent}
      />
      <Toaster position="top-center" />
    </>
  )
}

export default Calendar
