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

export const SmallButton = styled.button`
background-color: white;
color: #4c51bf;
padding: 0.25rem 0.5rem;
border-radius:4px;
font-weight: bold;
text-align:center;
transition: all 0.3s ease;
border- 2px solid #4c51bf;
cursor: pointer;
font-size: 0.75rem;

&:hover {
  background-color: #f0f0f0;
}

&:disabled {
  color: #a0aec0;
  border-color: #a0aec0;
  cursor: not-allowed;
}
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: none;
    justify-content: center;
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
    SmallButton,
    ButtonContainer,
}

export default StyledComponents

// Add other reusable styled components here