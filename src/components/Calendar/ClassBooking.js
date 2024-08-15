// src/components/ClassBooking.js
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function ClassBooking({ classId, maxCapacity, currentBookings, onBookingComplete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentBookings >= maxCapacity) {
      alert('Sorry, this class is full.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          { class_id: classId, name, email }
        ]);

      if (error) throw error;

      alert('Booking successful!');
      setName('');
      setEmail('');
      onBookingComplete();
    } catch (error) {
      alert('Error booking class: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Book Class</button>
      <p>Available spots: {maxCapacity - currentBookings}</p>
    </form>
  );
}

export default ClassBooking;