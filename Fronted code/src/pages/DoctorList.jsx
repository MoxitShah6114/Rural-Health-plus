import React from 'react';
import { useParams, Link } from 'react-router-dom';
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

const DoctorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const DoctorCard = styled(Card)`
  display: flex;
  flex-direction: column;
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

const DoctorMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
`;

const Experience = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Availability = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
`;

export const DoctorList = () => {
  const { department } = useParams();
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.department === department
  );

  return (
    <Container>
      <Title>Available Doctors</Title>
      <DoctorsGrid>
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id}>
            <DoctorImage src={doctor.image} alt={doctor.name} />
            <DoctorName>{doctor.name}</DoctorName>
            <DoctorSpecialization>{doctor.specialization}</DoctorSpecialization>
            <DoctorMeta>
              <Rating>
                <Star size={16} />
                {doctor.rating}
              </Rating>
              <Experience>{doctor.experience} years exp.</Experience>
            </DoctorMeta>
            <Availability>
              <Calendar size={16} />
              <p>Available: {doctor.availability.join(', ')}</p>
            </Availability>
            <Button
              as={Link}
              to={`/book-appointment/${doctor.id}`}
              variant="primary"
              fullWidth
            >
              Book Appointment
            </Button>
          </DoctorCard>
        ))}
      </DoctorsGrid>
    </Container>
  );
};
