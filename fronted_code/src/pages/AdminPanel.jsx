import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

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
const AdminDashboardContainer = styled(Container)`
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

const CardContent = styled.div`
  text-align: center;
`;

export const AdminPanel = () => {
  // Sample data for doctors and patients (replace with actual data)
  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', email: 'john@example.com' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics', email: 'jane@example.com' },
  ];

  const patients = [
    { id: 1, name: 'Alice Brown', age: 30, condition: 'Diabetes' },
    { id: 2, name: 'Bob Johnson', age: 45, condition: 'Hypertension' },
  ];

  return (
    <AdminDashboardContainer>
      <SectionTitle>Admin Panel</SectionTitle>

      <StyledCard>
        <CardContent>
          <h3>Doctors</h3>
          {doctors.map((doctor) => (
            <div key={doctor.id}>
              <p>
                <strong>Name:</strong> {doctor.name}
              </p>
              <p>
                <strong>Specialty:</strong> {doctor.specialty}
              </p>
              <p>
                <strong>Email:</strong> {doctor.email.replace(/(.{2})(.)(?=@)/, '$1') + doctor.email.slice(-4)} {/* Masking email */}
              </p>
              <hr />
            </div>
          ))}
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <h3>Patients</h3>
          {patients.map((patient) => (
            <div key={patient.id}>
              <p>
                <strong>Name:</strong> {patient.name}
              </p>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>Condition:</strong> {patient.condition}
              </p>
              <hr />
            </div>
          ))}
        </CardContent>
      </StyledCard>

      <Button as={Link} to="/dashboard" variant="primary">Back to Dashboard</Button>
    </AdminDashboardContainer>
  );
};

export default AdminPanel;