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
  const [selectedClasses, setSelectedClasses] = useState([]);
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
    setSelectedClasses(prev => {
      const isAlreadySelected = prev.some(cls => cls.id === event.id)
      if (isAlreadySelected){
        return prev.filter(cls => cls.id !== event.id)
      } else {
        return [...prev, event]
      }
    })
  };
  

  const handleBookClass = async (e) => {
    e.preventDefault();
    if (selectedClasses.length === 0) return;

    try {
      for (const selectedClass of selectedClasses){
      // Check if the class is full
      if (selectedClass.bookedSlots >= selectedClass.maxSlots) {
        alert(`Sorry, the class "${selectedClass.title}" is full.`);
        continue;
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

      // update the class bookedSlots
      await supabase
        .from('classes')
        .update({ bookedSlots: selectedClass.bookedSlots + 1 })
        .eq('id', selectedClass.id);

      }

      // store email and studio id
        localStorage.setItem("clientEmail", email)
        localStorage.setItem("clientStudioId", studioId)
        alert(`Booking Confirmed!\n\nYou have booked ${selectedClasses.length} classes.\nThank you for booking!`);


        fetchClasses(); // Refresh the classes
        setSelectedClasses([]);
        setName('');
        setEmail('');


    } catch (error) {
      console.error("Error booking classes:", error)
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
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: selectedClasses.some(cls => cls.id === event.id) ? "#4c51bf" : "#3174ad",
            },
          })}
        />
        </div>
        {
          selectedClasses.length > 0 && (
            <div>
              <h3>Selected Classes </h3>
              <ul>
                {selectedClasses.map(cls => (
                  <li key={cls.id}>
                    {cls.title} - {moment(cls.start).format("MMMM D, YYYY, h:mm A")}
                    <StyledComponents.SmallButton onClick={() => handleSelectEvent(cls)}>Remove</StyledComponents.SmallButton>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleBookClass}>
                <input 
                type='text'
                placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
                <input 
                type='email'
                placeholder='Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                /> 
                <StyledComponents.SmallButton as="button" type="submit">Book Selected Classes</StyledComponents.SmallButton>
              </form>
              </div>
          )
        }
        <Link to="/client-booking-history">View Your Booking History</Link>

        </div>
        )
      }

  
