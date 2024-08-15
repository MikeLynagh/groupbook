// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components//AdminPanel/Dashboard';
import StudioCalendar from './components/Calendar/StudioCalendar';
import CreateStudio from './components/AdminPanel/CreateStudio';
import LandingPage from "./components/LandingPage"

//imports for client access
import JoinCodeEntry from "./components/UserDetails/JoinCode"
import ClientView from './components/UserDetails/ClientView';
import BookingHistory from './components/UserDetails/BookingHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/admin-login" element={<Auth />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/create-studio" element={<CreateStudio />} />
        <Route path="/studio/:id" element={<StudioCalendar />} />
        <Route path="/client-access" element={<JoinCodeEntry />}/>
        <Route path="/client-view/:studioId" element={<ClientView />} />
        <Route path= "/client-booking-history" element={<BookingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;