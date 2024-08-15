import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PrimaryButton = styled.button`
  background-color: #4c51bf;
  color: white;
  padding: ${props => props.small ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  border-radius: 9999px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: ${props => props.small ? '0.875rem' : '1rem'};

  &:hover {
    background-color: #434190;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const PrimaryButtonLink = styled(Link)`
  display: inline-block;
  background-color: #4c51bf;
  color: white;
  padding: ${props => props.small ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  border-radius: 9999px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: ${props => props.small ? '0.875rem' : '1rem'};

  &:hover {
    background-color: #434190;
  }
`;

const StyledComponents = {
    PrimaryButton,
    PrimaryButtonLink,
}

export default StyledComponents

// Add other reusable styled components here