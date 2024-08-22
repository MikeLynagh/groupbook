import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import moment from 'moment';
import { Link } from 'react-router-dom';
import StyledComponents from '../StyledComponents';


export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studioId = localStorage.getItem("clientStudioId")

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError(null);
    const email = localStorage.getItem("clientEmail")

    if (!email) {
      console.log("No email found in localStorage");
      setLoading(false);
      setError("No email found. Please book a class first.");
      return;
    }

    try {
      console.log("Fetching bookings for email:", email);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          classes:class_id (
            title,
            date,
            time,
            studios:studio_id (name)
          )
        `)
        .eq('email', email)
        .order('createdAt', { ascending: false });

      if (error) throw error;

      console.log("Fetched bookings:", data);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError("Error fetching bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function cancelBooking(bookingId) {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;

      alert('Booking cancelled successfully');
      fetchBookings(); // Refresh the bookings list
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Error cancelling booking. Please try again.');
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>You haven't booked any classes yet.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              {booking.classes.title} at {booking.classes.studios.name} - 
              {moment(`${booking.classes.date}T${booking.classes.time}`).format('MMMM D, YYYY, h:mm A')}
              <StyledComponents.SmallButton as="button" onClick={() => cancelBooking(booking.id)}>Cancel</StyledComponents.SmallButton>
            </li>
          ))}
        </ul>
      )}
      <Link to={`/client-view/${studioId}`}>Back to Calendar</Link>
    </div>
  );
}