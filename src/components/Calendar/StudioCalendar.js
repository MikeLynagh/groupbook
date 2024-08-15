import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { supabase } from '../../supabaseClient'

const localizer = momentLocalizer(moment)

export default function StudioCalendar({ studioId }) {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)

  useEffect(() => {
    fetchClasses()
  }, [studioId])

  async function fetchClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('studio_id', studioId)
    if (error) {
      console.error('Error fetching classes:', error)
    } else {
      const formattedClasses = data.map(cls => ({
        ...cls,
        start: new Date(`${cls.date}T${cls.time}`),
        end: moment(`${cls.date}T${cls.time}`).add(1, 'hour').toDate(), // Assuming 1-hour classes
      }))
      setClasses(formattedClasses)
    }
  }

  const handleSelectEvent = (event) => {
    setSelectedClass(event)
  }

  async function fetchBookings(classId) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('class_id', classId)
    
    if (error) {
      console.error('Error fetching bookings:', error)
      return []
    }
    return data
  }

  return (
    <div>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={classes}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          style={{ height: '100%' }}
        />
      </div>
      {selectedClass && (
        <div>
          <h3>Class Details</h3>
          <p>Title: {selectedClass.title}</p>
          <p>Date: {moment(selectedClass.start).format('MMMM D, YYYY')}</p>
          <p>Time: {moment(selectedClass.start).format('h:mm A')}</p>
          <p>Available Slots: {selectedClass.maxSlots - selectedClass.bookedSlots}</p>

        </div>
      )}
    </div>
  )
}