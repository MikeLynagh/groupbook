import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ClassManagement({ studioId }) {
  const [classes, setClasses] = useState([])
  const [newClass, setNewClass] = useState({
    title: '',
    date: '',
    time: '',
    maxSlots: 12,
    bookedSlots: 0
  })

  useEffect(() => {
    fetchClasses()
  }, [studioId])

  async function fetchClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('studio_id', studioId)
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (error) console.error('Error fetching classes:', error)
    else setClasses(data)
  }

  async function addClass() {
    const { data, error } = await supabase
      .from('classes')
      .insert([{ ...newClass, studio_id: studioId }])

    if (error) {
      console.error('Error adding class:', error)
      alert('Failed to add class. Please try again.')
    } else {
      fetchClasses()
      setNewClass({
        title: '',
        date: '',
        time: '',
        maxSlots: 12,
        bookedSlots: 0
      })
      alert('Class added successfully!')
    }
  }

  async function deleteClass(id) {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting class:', error)
      alert('Failed to delete class. Please try again.')
    } else {
      fetchClasses()
      alert('Class deleted successfully!')
    }
  }

  return (
    <div>
      <h2>Class Management</h2>
      <div>
        <input
          type="text"
          placeholder="Class Title"
          value={newClass.title}
          onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
        />
        <input
          type="date"
          value={newClass.date}
          onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
        />
        <input
          type="time"
          value={newClass.time}
          onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Slots"
          value={newClass.maxSlots}
          onChange={(e) => setNewClass({ ...newClass, maxSlots: parseInt(e.target.value) })}
        />
        <button onClick={addClass}>Add Class</button>
      </div>

      <h3>Upcoming Classes</h3>
      <ul>
        {classes.map(cls => (
          <li key={cls.id}>
            {cls.title} - {cls.date} at {cls.time}
            (Slots: {cls.bookedSlots}/{cls.maxSlots})
            <button onClick={() => deleteClass(cls.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}