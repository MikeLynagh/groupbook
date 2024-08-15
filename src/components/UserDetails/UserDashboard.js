// src/components/UserDetails/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function Dashboard() {
  const [userBookings, setUserBookings] = useState([]);
  const [studios, setStudios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUserBookings();
    fetchStudios();
  }, []);

  async function fetchUserBookings() {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          classes (
            *,
            studios (name)
          )
        `)
        .eq('user_id', user.id);

      if (error) console.error('Error fetching bookings:', error);
      else setUserBookings(data);
    }
  }

  async function fetchStudios() {
    const { data, error } = await supabase
      .from('studios')
      .select('*');

    if (error) console.error('Error fetching studios:', error);
    else setStudios(data);
  }

  const filteredStudios = studios.filter(studio =>
    studio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your Bookings</h2>
      {userBookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {userBookings.map(booking => (
            <li key={booking.id}>
              {booking.classes.name} at {booking.classes.studios.name} - 
              {new Date(booking.classes.start_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
      
      <h2>Find a Studio</h2>
      <input
        type="text"
        placeholder="Search studios..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredStudios.length === 0 ? (
        <p>No studios found.</p>
      ) : (
        <ul>
          {filteredStudios.map(studio => (
            <li key={studio.id}>
              <Link to={`/studio/${studio.id}`}>{studio.name}</Link>
            </li>
          ))}
        </ul>
      )}
      
      <Link to="/create-studio">Create a New Studio</Link>
      <br />
      <Link to="/my-bookings">View All My Bookings</Link>
    </div>
  );
}

export default Dashboard;