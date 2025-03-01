import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Star, Calendar } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { doctors } from '../data/mockData';

const Title = styled.h1`
  margin: 2rem 0;
  color: var(--text);
  font-size: 2.5rem;
`;

const AppointmentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DoctorCard = styled(Card)`
  height: fit-content;
`;

const DoctorImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const DoctorName = styled.h3`
  color: var(--text);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const DoctorSpecialization = styled.p`
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  margin-bottom: 1rem;
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const TimeSlot = styled.button`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background-color: ${props =>
    props.selected ? 'var(--primary)' : 'var(--background)'};
  color: ${props => (props.selected ? 'white' : 'var(--text)')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
  }
`;

const slots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

export const BookAppointment = () => {
  const { doctorId } = useParams();
  const [selectedSlot, setSelectedSlot] = useState('');

  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return <Container>Doctor not found</Container>;
  }

  return (
    <Container>
      <Title>Book Appointment</Title>
      <AppointmentContainer>
        <DoctorCard>
          <DoctorImage src={doctor.image} alt={doctor.name} />
          <DoctorName>{doctor.name}</DoctorName>
          <DoctorSpecialization>{doctor.specialization}</DoctorSpecialization>
          <Rating>
            <Star size={16} />
            {doctor.rating}
          </Rating>
          <p>{doctor.bio}</p>
        </DoctorCard>

        <Card>
          <h3>Select Time Slot</h3>
          <p>Available on: {doctor.availability.join(', ')}</p>
          <TimeSlots>
            {slots.map((slot) => (
              <TimeSlot
                key={slot}
                selected={selectedSlot === slot}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </TimeSlot>
            ))}
          </TimeSlots>
          <Button
            variant="primary"
            fullWidth
            style={{ marginTop: '2rem' }}
            disabled={!selectedSlot}
          >
            Confirm Booking
          </Button>
        </Card>
      </AppointmentContainer>
    </Container>
  );
};
