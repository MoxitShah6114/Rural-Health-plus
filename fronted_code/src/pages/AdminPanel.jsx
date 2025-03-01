import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "../components/common/Container";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { CheckCircle, XCircle, User, Clipboard } from "lucide-react";
import axios from "axios";

// Modern healthcare color palette
const theme = {
  primary: "#2563eb",
  primaryLight: "#dbeafe",
  primaryDark: "#1e40af",
  secondary: "#10b981",
  accent: "#8b5cf6",
  background: "#f8fafc",
  cardBg: "#ffffff",
  text: "#1e293b",
  textLight: "#64748b",
  border: "#e2e8f0",
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

const RequestButton = styled(Button)`
  margin: 0.5rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const DoctorInfo = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.primaryLight}20;
  }
`;

export const AdminPanel = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);

  const [patients, setPatients] = useState([
    { id: 1, name: "Alice Brown", age: 30, condition: "Diabetes" },
    { id: 2, name: "Bob Johnson", age: 45, condition: "Hypertension" },
  ]);

  useEffect(() => {
    const fetchPendingDoctors = async () => {
      const response = await axios.get("http://localhost:5000/api/doctors/pending");
      console.log(await response);
      setPendingDoctors(response.data);
    };
    fetchPendingDoctors();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/doctors/${id}/approve`);
      setPendingDoctors(pendingDoctors.filter(doc => doc.id !== id));
      alert('Doctor approved successfully.');
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}/reject`);
      setPendingDoctors(pendingDoctors.filter(doc => doc.id !== id));
      alert('Doctor rejected successfully.');
    } catch (error) {
      console.error('Error rejecting doctor:', error);
    }
  };

  return (
    <AdminDashboardContainer>
      <SectionTitle>Admin Panel</SectionTitle>

      <StyledCard>
        <CardContent>
          <h3>Doctor Registration Requests</h3>
          {pendingDoctors.length > 0 ? (
            pendingDoctors.map((doctor) => (
              <DoctorInfo key={doctor.id}>
                <p>
                  <strong>Name:</strong> {doctor.name} <User size={16} />
                </p>
                <p>
                  <strong>Specialty:</strong> {doctor.specialty}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <RequestButton
                  onClick={() => handleAccept(doctor._id)}
                  variant="success"
                >
                  <CheckCircle size={16} /> Accept
                </RequestButton>
                <RequestButton
                  onClick={() => handleReject(doctor._id)}
                  variant="danger"
                >
                  <XCircle size={16} /> Reject
                </RequestButton>
              </DoctorInfo>
            ))
          ) : (
            <p>No doctor registration requests.</p>
          )}
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <h3>Patients</h3>
          {patients.map((patient) => (
            <DoctorInfo key={patient.id}>
              <p>
                <strong>Name:</strong> {patient.name}
              </p>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>Condition:</strong> {patient.condition}
              </p>
            </DoctorInfo>
          ))}
        </CardContent>
      </StyledCard>

      <Button as={Link} to="/dashboard" variant="primary">
        Back to Dashboard
      </Button>
    </AdminDashboardContainer>
  );
};

export default AdminPanel;
