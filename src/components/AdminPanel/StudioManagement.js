import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import StyledComponents from '../StyledComponents'

export default function StudioManagement({ studio, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [studioName, setStudioName] = useState(studio.name)

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('studios')
        .update({ name: studioName })
        .eq('id', studio.id)

      if (error) throw error

      setEditing(false)
      alert('Studio details updated successfully!')
      onUpdate()
    } catch (error) {
      console.error('Error updating studio details:', error)
      alert('Error updating studio details: ' + error.message)
    }
  }

  return (
    <div>
      <h2>Studio Management</h2>
      {editing ? (
        <div>
          <input
            type="text"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
          />
          <StyledComponents.SmallButton onClick={handleUpdate}>Save</StyledComponents.SmallButton>
          <StyledComponents.SmallButton onClick={() => setEditing(false)}>Cancel</StyledComponents.SmallButton>
        </div>
      ) : (
        <div>
          <p>Studio Name: {studio.name}</p>
          <p>Join Code: {studio.join_code}</p>
          <StyledComponents.SmallButton onClick={() => setEditing(true)}>Edit</StyledComponents.SmallButton>
        </div>
      )}
    </div>
  )
}