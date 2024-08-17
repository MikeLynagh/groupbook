import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import StyledComponents from '../StyledComponents';

export default function JoinCodeEntry() {
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState(" ")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('studios')
        .select('id, name')
        .eq('join_code', joinCode)

      if (error) throw error;

      if (data && data.length === 1) {
        localStorage.setItem('clientStudioId', data[0].id);
        localStorage.setItem('clientStudioName', data[0].name);
        navigate(`/client-view/${data[0].id}`);
      } else if (data && data.length > 1){
        setError("Multiple studios found with this code. Please contact support.")
      } else {
        setError('Invalid join code. Please try again.');
      }
    } catch (error) {
      console.error("Error", error)
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Enter Studio Join Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Enter join code"
          required
        />
        <StyledComponents.SmallButton type="submit">Enter Studio</StyledComponents.SmallButton>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
}