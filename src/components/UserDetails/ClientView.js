import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { supabase } from '../../supabaseClient';
import { useParams, Link } from 'react-router-dom';
import StyledComponents from '../StyledComponents';

const localizer = momentLocalizer(moment);

export default function ClientView() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { studioId } = useParams();
  const studioName = localStorage.getItem('clientStudioName');

  useEffect(() => {
    fetchClasses();
  }, [studioId]);



  async function fetchClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('studio_id', studioId);

    if (error) {
      console.error('Error fetching classes:', error);
    } else {
      const formattedClasses = data.map(cls => ({
        ...cls,
        start: new Date(`${cls.date}T${cls.time}`),
        end: moment(`${cls.date}T${cls.time}`).add(1, 'hour').toDate(), // Assuming 1-hour classes
      }));
      setClasses(formattedClasses);
    }
  }

  const handleSelectEvent = (event) => {
    setSelectedClass(event);
  };
  

  const handleBookClass = async (e) => {
    e.preventDefault();
    if (!selectedClass) return;

    try {
      // Check if the class is full
      if (selectedClass.bookedSlots >= selectedClass.maxSlots) {
        alert('Sorry, this class is full.');
        return;
      }

      // Add booking to the bookings table
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          { 
            class_id: selectedClass.id, 
            name: name,
            email: email
          }
        ]);

      if (error) throw error;
      

      // Update the class's bookedSlots
      const { error: updateError } = await supabase
        .from('classes')
        .update({ bookedSlots: selectedClass.bookedSlots + 1 })
        .eq('id', selectedClass.id);

      if (updateError) throw updateError;

      // store email and studio id
        localStorage.setItem("clientEmail", email)
        localStorage.setItem("clientStudioId", studioId)
        alert(`Booking Confirmed!\n\nClass: ${selectedClass.title}\nDate: ${moment(selectedClass.start).format("MMMM D, YYYY")}\nTime: ${moment(selectedClass.start).format("h:mm A")}\n\nThank you for booking!`);


        fetchClasses(); // Refresh the classes
        setSelectedClass(null);
        setName('');
        setEmail('');


    } catch (error) {
      alert('Error booking class: ' + error.message);
    }
  };

  return (
    <div>
      <h2>{studioName} Classes</h2>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={classes}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          style={{ height: '100%' }}
        />
        <div>
        <Link to="/client-booking-history">View Your Booking History</Link>

        </div>

      </div>
      {selectedClass && (
        <div>
          <h3>Book Class: {selectedClass.title}</h3>
          <p>Date: {moment(selectedClass.start).format('MMMM D, YYYY')}</p>
          <p>Time: {moment(selectedClass.start).format('h:mm A')}</p>
          <p>Available Slots: {selectedClass.maxSlots - selectedClass.bookedSlots}</p>
          <form onSubmit={handleBookClass}>
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
            <StyledComponents.SmallButton as="button" type="submit">Book This Class</StyledComponents.SmallButton>
          </form>
        </div>
      )}
    </div>
  );
}

