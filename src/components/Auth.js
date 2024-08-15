import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';
import StyledComponents from './StyledComponents';  // Make sure this path is correct

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e6e9ff 0%, #f3e7ff 100%);
  padding: 2rem;
`;

const AuthForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #121212;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #4a5568;
`;

const ToggleLink = styled.span`
  color: #4c51bf;
  cursor: pointer;
  text-decoration: underline;
`;

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data, error;
      if (isSignUp) {
        ({ data, error } = await supabase.auth.signUp({ email, password }));
      } else {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
      }
      
      if (error) throw error;

      if (isSignUp) {
        alert('Sign up successful! Please check your email to confirm your account.');
        setIsSignUp(false);
      } else {
        // Check if the user has a studio
        const { data: studioData, error: studioError } = await supabase
          .from('studios')
          .select('id')
          .eq('admin_id', data.user.id)
          .single();

        if (studioError && studioError.code !== 'PGRST116') {
          throw studioError;
        }

        if (studioData) {
          navigate('/admin-dashboard');
        } else {
          navigate('/create-studio');
        }
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleAuth}>
        <Title>{isSignUp ? 'Sign Up' : 'Sign In'}</Title>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledComponents.PrimaryButton type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </StyledComponents.PrimaryButton>
        <ToggleText>
          {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
          <ToggleLink onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </ToggleLink>
        </ToggleText>
      </AuthForm>
    </AuthContainer>
  );
}