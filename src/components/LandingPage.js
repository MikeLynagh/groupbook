import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e6e9ff 0%, #f3e7ff 100%);
`;

const Header = styled.header`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #222222;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #222222;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

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

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #4c51bf;
  color: white;

  &:hover {
    background-color: #434190;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #4c51bf;
  border: 2px solid #4c51bf;

  &:hover {
    background-color: #f7fafc;
  }
`;

const FeaturesSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
  max-width: 600px;
  width: 100%;
`;

const FeaturesList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #4a5568;
`;

const Footer = styled.footer`
  background-color: #222222;
  color: white;
  text-align: center;
  padding: 1rem;
`;

export default function LandingPage() {
  return (
    <PageContainer>
      <Header>
        <Title>GroupBook</Title>
        <Subtitle>Manage your group training or classes with ease!</Subtitle>
      </Header>

      <Main>
        <ButtonContainer>
          <PrimaryButton to="/admin-login">Studio Owner</PrimaryButton>
          <SecondaryButton to="/client-access">Book a class</SecondaryButton>
        </ButtonContainer>

        <FeaturesSection>
          <h2>How Does GroupBook Work?</h2>
          <FeaturesList>
            <ul>
            <li>Studio owners can sign up and schedule a class in 90 seconds.</li>
            <li>Give your studio or class members your unique access code.</li>
            <li><br></br></li>
            <li>They can easily login to see in real-time which classes are filled and how many spaces are left.</li>
            <li></li>
            <li><br></br></li>
            <li>Save time on booking multiple classes.</li>
            <li>No more time wasted sending individual whatsapp messages over and back.</li> 
            </ul>

          </FeaturesList>
        </FeaturesSection>
      </Main>

      <Footer>
        <p>© 2024 GroupBook. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
}