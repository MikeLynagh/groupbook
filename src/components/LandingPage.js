import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Users, Calendar, CreditCard } from "lucide-react"

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #e6e9ff 0%, #f3e7ff 100%);
`;

const Header = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #4c51bf;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: #4a5568;
  text-decoration: none;
  &:hover {
    color: #4c51bf;
  }
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #222222;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
  @media (max-width: 480px){
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px){
    font-size: 1.75rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
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
  width: 100%;
  max-width: 1200px;
  margin-top: 3rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;



const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e9ff;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #4a5568;
`;

const HowItWorksSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  width: 100%;
`;

const VideoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 20vh;
border-radius: 8px;
padding: 2rem;
margin-bottom:3rem;
`

const VideoSection = styled.section`
border-radius: 8px;
padding: 2rem;
margin-top:3rem;
max-width: 600px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StepList = styled.ol`
  list-style-type: none;
  padding: 0;
  counter-reset: step-counter;
`;

const Step = styled.li`
  counter-increment: step-counter;
  margin-bottom: 1rem;
  padding-left: 2.5rem;
  position: relative;

  &::before {
    content: counter(step-counter);
    background-color: #4c51bf;
    color: white;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const Footer = styled.footer`
  background-color: #2d3748;
  color: white;
  text-align: center;
  padding: 1rem;
`;

const Card = styled.div`
background-color: white;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
padding:1.5rem;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`;

export default function LandingPage() {
  return (
    <PageContainer>
      <Header>
        <Logo>GroupBook</Logo>
        <Nav>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
        </Nav>
      </Header>
      <Main>
        <HeroSection>
          <Title>Manage Your Group Training or Classes with Ease!</Title>
          <Subtitle>Streamline bookings, save time, and focus on what matters most - your classes.</Subtitle>
         
         <VideoContainer>
          <VideoSection>
            <iframe
            className="w-full h-full"
            src="https://youtube.com/embed/cz1zPIz_IAM"
            title="GroupBooking Demo"
            frameBorder="0"
            allow="accelerometer;, autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
          </VideoSection>
          </VideoContainer>
          <ButtonContainer>
            <PrimaryButton to="/admin-login">Studio Owner</PrimaryButton>
            <SecondaryButton to="/client-access">Book a Class</SecondaryButton>
          </ButtonContainer>
        </HeroSection>

        <FeaturesSection id="features">
          <SectionTitle>Key Features</SectionTitle>
          <FeatureGrid>
            <Card>
              <IconWrapper>
                <Users size={24} color="#4c51bf" />
              </IconWrapper>
              <FeatureTitle>Group Management</FeatureTitle>
              <FeatureDescription>Easily organize and manage multiple participants</FeatureDescription>
            </Card>
            <Card>
              <IconWrapper>
                <Calendar size={24} color="#4c51bf" />
              </IconWrapper>
              <FeatureTitle>Quick Scheduling</FeatureTitle>
              <FeatureDescription>Schedule a class in just 90 seconds</FeatureDescription>
            </Card>
            <Card>
              <IconWrapper>
                <CreditCard size={24} color="#4c51bf" />
              </IconWrapper>
              <FeatureTitle>Real-time Availability</FeatureTitle>
              <FeatureDescription>See filled classes and available spaces instantly</FeatureDescription>
            </Card>
          </FeatureGrid>
        </FeaturesSection>

        <HowItWorksSection id="how-it-works">
          <SectionTitle>How Does GroupBook Work?</SectionTitle>
          <StepList>
            <Step>Studio owners sign up and schedule a class in 90 seconds.</Step>
            <Step>Give your studio or class members your unique access code.</Step>
            <Step>Members can easily login to see real-time class availability.</Step>
            <Step>Save time on booking multiple classes.</Step>
            <Step>No more time wasted sending individual WhatsApp messages back and forth.</Step>
          </StepList>
        </HowItWorksSection>
      </Main>
      <Footer>
        <p>© 2024 GroupBook. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
}