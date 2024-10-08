import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

function generateJoinCode() {
  // Generate a random 6-character alphanumeric string
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function CreateStudio() {
  const [loading, setLoading] = useState(false)
  const [studioName, setStudioName] = useState('')
  const navigate = useNavigate()

  const handleCreateStudio = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      const joinCode = generateJoinCode()
      const { data, error } = await supabase
        .from('studios')
        .insert([
          { 
            name: studioName, 
            admin_id: user.id, 
            join_code: joinCode 
          }
        ])
        .select()

      if (error) throw error

      alert(`Studio created successfully! Your join code is: ${joinCode}`)
      navigate('/admin-dashboard')
    } catch (error) {
      console.error('Error creating studio:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Create Your Studio</h1>
      <form onSubmit={handleCreateStudio}>
        <input
          type="text"
          placeholder="Studio Name"
          value={studioName}
          onChange={(e) => setStudioName(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Studio'}
        </button>
      </form>
    </div>
  )
}