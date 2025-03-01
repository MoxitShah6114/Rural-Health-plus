import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ChevronDown } from 'lucide-react';

// Modern healthcare color palette
const theme = {
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1e40af',
  secondary: '#10b981',
  accent: '#8b5cf6',
  background: '#f8fafc',
  cardBg: '#ffffff',
  text: '#1e293b',
  textLight: '#64748b',
  border: '#e2e8f0',
};

// Styled Components
const DashboardContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${theme.primary};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const StyledCard = styled(Card)`
  padding: 1.5rem;
  border: 1px solid ${theme.border};
  border-radius: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StyledButton = styled(Button)`
  background-color: ${theme.primary};
  color: white;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.primaryDark};
  }
`;

const CardContent = styled.div`
  text-align: center;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 1rem 0;
`;

const DropdownButton = styled(StyledButton)`
  width: 100%;
  text-align: left;
`;

const DropdownMenu = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  background-color: ${theme.cardBg};
  border: 1px solid ${theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${theme.text};
  text-decoration: none;
  
  &:hover {
    background-color: ${theme.primaryLight};
    color: white;
  }
`;

const VideoSection = () => (
  <StyledCard>
    <CardContent>
      <SectionTitle>Education Videos</SectionTitle>
      <p>Watch videos on various health topics to stay informed.</p>
      <StyledButton as={Link} to="/education-videos">Explore Videos</StyledButton>
    </CardContent>
  </StyledCard>
);

const TelemedicineSection = () => (
  <StyledCard>
    <CardContent>
      <SectionTitle>Telemedicine</SectionTitle>
      <p>Consult with healthcare professionals from your home.</p>
      <StyledButton as={Link} to="/telemedicine">Start Consultation</StyledButton>
    </CardContent>
  </StyledCard>
);

const SymptomsSection = () => (
  <StyledCard>
    <CardContent>
      <SectionTitle>Symptom Checker</SectionTitle>
      <p>Get AI-powered preliminary diagnosis based on your symptoms.</p>
      <StyledButton as={Link} to="/symptom-checker">Check Symptoms</StyledButton>
    </CardContent>
  </StyledCard>
);

const MedicineSection = () => (
  <StyledCard>
    <CardContent>
      <SectionTitle>Medicine Information</SectionTitle>
      <p>Learn about your medications and manage prescriptions.</p>
      <StyledButton as={Link} to="/medicine-info">View Medicines</StyledButton>
    </CardContent>
  </StyledCard>
);

export const PatientDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <DashboardContainer>
      <VideoSection />
      <TelemedicineSection />
      <SymptomsSection />
      <MedicineSection />

      {/* Dropdown for additional services */}
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          Additional Services <ChevronDown />
        </DropdownButton>
        <DropdownMenu open={dropdownOpen}>
          <DropdownItem to="/nutrition">Nutrition Advice</DropdownItem>
          <DropdownItem to="/mental-health">Mental Health Support</DropdownItem>
          <DropdownItem to="/wellness-check">Wellness Check</DropdownItem>
        </DropdownMenu>
      </DropdownContainer>
    </DashboardContainer>
  );
};

export default PatientDashboard;
