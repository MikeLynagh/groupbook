import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import StudioManagement from './StudioManagement'
import ClassManagement from './ClassManagement'
import StudioCalendar from '../Calendar/StudioCalendar'
import StyledComponents from '../StyledComponents'
import styled from "styled-components";

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [studio, setStudio] = useState(null)
  const [view, setView] = useState('calendar') // 'calendar', 'management', or 'classes'
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getStudio()
  }, [])

  async function getStudio() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      console.log("Current user:", user)

      let { data, error } = await supabase
        .from('studios')
        .select('*')
        .eq('admin_id', user.id)
        .single()

      if (error){
        console.error("Error fetching studios: ", error)
        if (error.code === "PGRST116"){
          console.log("No studio found for this user")
          navigate("/create-studio")
          return
        }
        throw error
      }

      console.log("Fetched studio data: ", data)


      if (data) {
        setStudio(data)
        fetchBookings(data.id)
      } else {
        console.log("No studio data, redirecting to create studio page ")
        navigate("/create-studio")
      }
    } catch (error) {
      console.error('Error fetching studio:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchBookings(studioId){
    try {
      console.log('Fetching bookings for studio ID:', studioId);
      // Fetch bookings along with class details
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          classes (
            id,
            title,
            date,
            time
          )
        `)
        .eq("classes.studio_id", studioId);
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      console.log('Fetched bookings:', data);
      setBookings(data)
    } catch (error){
      console.error('Error fetching bookings:', error);
      alert('Error fetching bookings. Please check the console for more details.');
    }
  }

  async function cancelBooking(bookingId){
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId)
  
      if (error) throw error 
  
      // Refresh the bookings list
      if (studio && studio.id) {
        await fetchBookings(studio.id)
      } else {
        console.error("Studio information is missing")
      }
      
      alert("Booking cancelled successfully")
    } catch (error) {
      console.error("Error cancelling booking: ", error)
      alert("Error cancelling booking. Please try again")
    }
  }









  const handleLogout = async () => {
    try{
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        navigate("/admin")
    } catch (error){
      console.error("Error logging out: ", error)
      alert("Error logging out: " + error.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!studio) {
    return <CreateStudio onStudioCreated={getStudio} />
  }

  return (
    <div>
      <h1>Studio Dashboard</h1>
      <nav>
        {/* <StyledComponents.PrimaryButton>Button</StyledComponents.PrimaryButton> */}
        <StyledComponents.ButtonContainer>

        <StyledComponents.PrimaryButton onClick={() => setView('calendar')}>Calendar View</StyledComponents.PrimaryButton>
        <StyledComponents.PrimaryButton onClick={() => setView('management')}>Studio Management</StyledComponents.PrimaryButton>
        <StyledComponents.PrimaryButton onClick={() => setView('classes')}>Class Management</StyledComponents.PrimaryButton>
        <StyledComponents.PrimaryButton onClick={() => setView("bookings")}>View Bookings</StyledComponents.PrimaryButton>
        <StyledComponents.SmallButton onClick={handleLogout} style={{ float: "right"}}>Logout</StyledComponents.SmallButton>
        </StyledComponents.ButtonContainer>
      </nav>
      {view === 'calendar' && <StudioCalendar studioId={studio.id} />}
      {view === 'management' && <StudioManagement studio={studio} onUpdate={getStudio} />}
      {view === 'classes' && <ClassManagement studioId={studio.id} />}
      {view === "bookings" && (
  <div>
    <h2>All Class Bookings</h2>
    {bookings.length === 0  ? (
      <p>There are no bookings.</p>
    ) : (
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            {booking.name} ({booking.email}) - 
            {booking.classes ? (
              <>
                {booking.classes.title} on 
                {new Date(`${booking.classes.date}T${booking.classes.time}`).toLocaleString()}
              </>
            ) : (
              <span>Class details not available</span>
            )}
            <StyledComponents.SmallButton onClick={() => cancelBooking(booking.id)}>Cancel</StyledComponents.SmallButton>
          </li>
        ))}
      </ul>
    )}
  </div>
)}
    </div>
  )
}

function CreateStudio({ onStudioCreated }) {
  const [studioName, setStudioName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreateStudio(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      const { data, error } = await supabase
        .from('studios')
        .insert([
          { name: studioName, admin_id: user.id, join_code: generateJoinCode() }
        ])

      if (error) throw error

      alert('Studio created successfully!')
      onStudioCreated()
    } catch (error) {
      console.error('Error creating studio:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  function generateJoinCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  return (
    <div>
      <h2>Create a New Studio</h2>
      <form onSubmit={handleCreateStudio}>
        <input
          type="text"
          placeholder="Studio Name"
          value={studioName}
          onChange={(e) => setStudioName(e.target.value)}
          required
        />
        <StyledComponents.SmallButton type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Studio'}
        </StyledComponents.SmallButton>
      </form>
    </div>
  )
}