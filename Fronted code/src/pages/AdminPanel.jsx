import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CheckCircle, XCircle, User, Mail, Phone, Award, Briefcase, Clock, Eye, Calendar, FileText, MapPin } from 'lucide-react';

// Modern healthcare color palette
const theme = {
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1e40af',
  secondary: '#10b981',
  secondaryLight: '#d1fae5',
  accent: '#8b5cf6',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  background: '#f8fafc',
  cardBg: '#ffffff',
  text: '#1e293b',
  textLight: '#64748b',
  border: '#e2e8f0',
};

// Styled Components
const AdminDashboardContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${theme.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StyledCard = styled(Card)`
  padding: 1.5rem;
  border: 1px solid ${theme.border};
  border-radius: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 2rem;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.border};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${props => 
    props.type === 'pending' ? theme.warningLight :
    props.type === 'approved' ? theme.secondaryLight :
    theme.dangerLight
  };
  color: ${props => 
    props.type === 'pending' ? theme.warning :
    props.type === 'approved' ? theme.secondary :
    theme.danger
  };
  margin-left: 0.5rem;
`;

const DoctorItem = styled.div`
  padding: 1.25rem;
  background-color: ${theme.background};
  border-radius: 12px;
  margin-bottom: 1rem;
  border-left: 4px solid ${props => 
    props.status === 'approved' ? theme.secondary :
    props.status === 'rejected' ? theme.danger :
    theme.primary
  };
`;

const DoctorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const DoctorName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DoctorDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${theme.textLight};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ApproveButton = styled(ActionButton)`
  background-color: ${theme.secondaryLight};
  color: ${theme.secondary};
  border: 1px solid ${theme.secondary};
  
  &:hover {
    background-color: ${theme.secondary};
    color: white;
  }
`;

const RejectButton = styled(ActionButton)`
  background-color: ${theme.dangerLight};
  color: ${theme.danger};
  border: 1px solid ${theme.danger};
  
  &:hover {
    background-color: ${theme.danger};
    color: white;
  }
`;

const ViewButton = styled(ActionButton)`
  background-color: ${theme.primaryLight};
  color: ${theme.primary};
  border: 1px solid ${theme.primary};
  
  &:hover {
    background-color: ${theme.primary};
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${theme.textLight};
`;

const RejectReasonModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const RejectReasonForm = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
`;

const RejectReasonTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${theme.text};
`;

const RejectReasonTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  margin-bottom: 1rem;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Doctor Detail Modal Components
const DetailModal = styled(RejectReasonModal)``;

const DetailModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

const DetailModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.text};
`;

const DetailModalBody = styled.div`
  padding: 1.5rem;
`;

const DetailModalClose = styled.button`
  background: none;
  border: none;
  color: ${theme.textLight};
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  
  &:hover {
    color: ${theme.danger};
  }
`;

const DoctorProfile = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DoctorImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DoctorProfileInfo = styled.div`
  flex: 1;
`;

const DoctorProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${theme.text};
`;

const DoctorProfileTitle = styled.div`
  font-size: 1.1rem;
  color: ${theme.primary};
  margin-bottom: 1rem;
`;

const DoctorProfileBadge = styled(Badge)`
  margin-left: 0;
  margin-right: 0.5rem;
`;

const DoctorProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: ${theme.textLight};
`;

const SectionDivider = styled.div`
  height: 1px;
  background-color: ${theme.border};
  margin: 1.5rem 0;
`;

const SectionHeading = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BiographyText = styled.p`
  line-height: 1.6;
  color: ${theme.textLight};
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.border};
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  color: ${props => props.active ? theme.primary : theme.textLight};
  border-bottom: 2px solid ${props => props.active ? theme.primary : 'transparent'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.primary};
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

// Static mock data for doctors
const MOCK_DOCTORS = [
  {
    _id: '1',
    fullName: 'Dr. John Smith',
    email: 'john.smith@example.com',
    mobile: '+1 (555) 123-4567',
    licenseNumber: 'MED12345',
    specialty: 'Cardiology',
    department: 'Cardiology',
    experience: 10,
    status: 'pending',
    biography: 'Dr. Smith is a board-certified cardiologist with over 10 years of experience in treating heart conditions. He specializes in interventional cardiology and has performed over 500 cardiac procedures.',
    education: 'MD from Harvard Medical School',
    address: '123 Medical Center Dr, New York, NY',
    registrationDate: '2023-10-15',
    profileImage: 'https://randomuser.me/api/portraits/men/42.jpg'
  },
  {
    _id: '2',
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    mobile: '+1 (555) 987-6543',
    licenseNumber: 'MED67890',
    specialty: 'Pediatrics',
    department: 'Pediatrics',
    experience: 8,
    status: 'pending',
    biography: 'Dr. Johnson is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She has a special interest in childhood development and preventative care.',
    education: 'MD from Johns Hopkins University',
    address: '456 Children\'s Hospital Ave, Chicago, IL',
    registrationDate: '2023-10-18',
    profileImage: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    _id: '3',
    fullName: 'Dr. Michael Chen',
    email: 'michael.chen@example.com',
    mobile: '+1 (555) 234-5678',
    licenseNumber: 'MED24680',
    specialty: 'Neurology',
    department: 'Neurology',
    experience: 12,
    status: 'pending',
    biography: 'Dr. Chen is a neurologist with expertise in treating conditions of the brain, spinal cord, and nervous system. He has conducted extensive research on stroke prevention and treatment.',
    education: 'MD from Stanford University',
    address: '789 Neuroscience Blvd, San Francisco, CA',
    registrationDate: '2023-10-20',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    _id: '4',
    fullName: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    mobile: '+1 (555) 345-6789',
    licenseNumber: 'MED13579',
    specialty: 'Dermatology',
    department: 'Dermatology',
    experience: 6,
    status: 'pending',
    biography: 'Dr. Rodriguez specializes in medical and cosmetic dermatology. She is skilled in treating various skin conditions and has a particular interest in skin cancer prevention and treatment.',
    education: 'MD from University of California, Los Angeles',
    address: '101 Skin Health Center, Los Angeles, CA',
    registrationDate: '2023-10-22',
    profileImage: 'https://randomuser.me/api/portraits/women/24.jpg'
  },
  {
    _id: '5',
    fullName: 'Dr. Robert Williams',
    email: 'robert.williams@example.com',
    mobile: '+1 (555) 456-7890',
    licenseNumber: 'MED97531',
    specialty: 'Orthopedic Surgery',
    department: 'Orthopedics',
    experience: 15,
    status: 'pending',
    biography: 'Dr. Williams is an orthopedic surgeon specializing in sports medicine and joint replacement. He has worked with professional athletes and has performed over 1,000 joint replacement surgeries.',
    education: 'MD from University of Pennsylvania',
    address: '202 Orthopedic Way, Philadelphia, PA',
    registrationDate: '2023-10-25',
    profileImage: 'https://randomuser.me/api/portraits/men/62.jpg'
  }
];

export const AdminPanel = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [rejectedDoctors, setRejectedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For rejection modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // For detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Tabs for the detail view
  const [currentView, setCurrentView] = useState('pending');

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      const pending = MOCK_DOCTORS.filter(doc => doc.status === 'pending');
      const approved = MOCK_DOCTORS.filter(doc => doc.status === 'approved');
      const rejected = MOCK_DOCTORS.filter(doc => doc.status === 'rejected');
      
      setPendingDoctors(pending);
      setApprovedDoctors(approved);
      setRejectedDoctors(rejected);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (doctorId) => {
    setActionLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Find the doctor to approve
      const doctorToApprove = pendingDoctors.find(doc => doc._id === doctorId);
      
      if (doctorToApprove) {
        // Update doctor status
        const updatedDoctor = { ...doctorToApprove, status: 'approved' };
        
        // Remove from pending and add to approved
        setPendingDoctors(prev => prev.filter(doc => doc._id !== doctorId));
        setApprovedDoctors(prev => [...prev, updatedDoctor]);
        
        alert(`Doctor ${doctorToApprove.fullName} has been approved.`);
      }
      
      setActionLoading(false);
    }, 800);
  };

  const openRejectModal = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!selectedDoctorId) return;
    
    setActionLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Find the doctor to reject
      const doctorToReject = pendingDoctors.find(doc => doc._id === selectedDoctorId);
      
      if (doctorToReject) {
        // Update doctor status
        const updatedDoctor = { 
          ...doctorToReject, 
          status: 'rejected',
          rejectionReason: rejectReason || 'Application rejected by admin.'
        };
        
        // Remove from pending and add to rejected
        setPendingDoctors(prev => prev.filter(doc => doc._id !== selectedDoctorId));
        setRejectedDoctors(prev => [...prev, updatedDoctor]);
        
        setShowRejectModal(false);
        alert(`Doctor ${doctorToReject.fullName} has been rejected.`);
      }
      
      setActionLoading(false);
    }, 800);
  };

  const openDetailModal = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('profile');
    setShowDetailModal(true);
  };

  const renderDoctorList = (doctors, status) => {
    if (doctors.length === 0) {
      return <EmptyState>No {status} doctor registration requests.</EmptyState>;
    }
    
    return doctors.map(doctor => (
      <DoctorItem key={doctor._id} status={doctor.status}>
        <DoctorHeader>
          <DoctorInfo>
            <DoctorName>
              <User size={16} /> {doctor.fullName}
              <Badge type={doctor.status}>{doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}</Badge>
            </DoctorName>
          </DoctorInfo>
        </DoctorHeader>

        <DoctorDetails>
          <DetailItem>
            <Mail size={16} /> {doctor.email}
          </DetailItem>
          <DetailItem>
            <Phone size={16} /> {doctor.mobile}
          </DetailItem>
          <DetailItem>
            <Award size={16} /> License: {doctor.licenseNumber}
          </DetailItem>
          <DetailItem>
            <Briefcase size={16} /> Specialty: {doctor.specialty}
          </DetailItem>
          <DetailItem>
            <Clock size={16} /> Experience: {doctor.experience} years
          </DetailItem>
        </DoctorDetails>

        <ActionButtons>
          <ViewButton 
            onClick={() => openDetailModal(doctor)}
          >
            <Eye size={16} />
            View Details
          </ViewButton>
          
          {doctor.status === 'pending' && (
            <>
              <ApproveButton 
                onClick={() => handleApprove(doctor._id)}
                disabled={actionLoading}
              >
                {actionLoading ? <LoadingSpinner /> : <CheckCircle size={16} />}
                Approve
              </ApproveButton>
              <RejectButton 
                onClick={() => openRejectModal(doctor._id)}
                disabled={actionLoading}
              >
                {actionLoading ? <LoadingSpinner /> : <XCircle size={16} />}
                Reject
              </RejectButton>
            </>
          )}
        </ActionButtons>
      </DoctorItem>
    ));
  };

  return (
    <AdminDashboardContainer>
      <SectionTitle>Admin Panel</SectionTitle>
      
      {/* View Selector */}
      <TabContainer>
        <Tab 
          active={currentView === 'pending'} 
          onClick={() => setCurrentView('pending')}
        >
          Pending Requests ({pendingDoctors.length})
        </Tab>
        <Tab 
          active={currentView === 'approved'} 
          onClick={() => setCurrentView('approved')}
        >
          Approved Doctors ({approvedDoctors.length})
        </Tab>
        <Tab 
          active={currentView === 'rejected'} 
          onClick={() => setCurrentView('rejected')}
        >
          Rejected Applications ({rejectedDoctors.length})
        </Tab>
      </TabContainer>

      {/* Pending Doctors Section */}
      {currentView === 'pending' && (
        <StyledCard>
          <CardHeader>
            <CardTitle>
              <User size={20} /> Doctor Registration Requests
              <Badge type="pending">{pendingDoctors.length} Pending</Badge>
            </CardTitle>
          </CardHeader>

          {loading ? (
            <EmptyState>Loading doctor requests...</EmptyState>
          ) : error ? (
            <EmptyState>{error}</EmptyState>
          ) : (
            renderDoctorList(pendingDoctors, 'pending')
          )}
        </StyledCard>
      )}
      
      {/* Approved Doctors Section */}
      {currentView === 'approved' && (
        <StyledCard>
          <CardHeader>
            <CardTitle>
              <CheckCircle size={20} /> Approved Doctors
              <Badge type="approved">{approvedDoctors.length} Approved</Badge>
            </CardTitle>
          </CardHeader>

          {loading ? (
            <EmptyState>Loading approved doctors...</EmptyState>
          ) : (
            renderDoctorList(approvedDoctors, 'approved')
          )}
        </StyledCard>
      )}
      
      {/* Rejected Doctors Section */}
      {currentView === 'rejected' && (
        <StyledCard>
          <CardHeader>
            <CardTitle>
              <XCircle size={20} /> Rejected Applications
              <Badge type="rejected">{rejectedDoctors.length} Rejected</Badge>
            </CardTitle>
          </CardHeader>

          {loading ? (
            <EmptyState>Loading rejected applications...</EmptyState>
          ) : (
            renderDoctorList(rejectedDoctors, 'rejected')
          )}
        </StyledCard>
      )}

      {/* Back Button */}
      <Button as={Link} to="/dashboard" variant="primary">Back to Dashboard</Button>

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <RejectReasonModal onClick={() => setShowRejectModal(false)}>
          <RejectReasonForm onClick={e => e.stopPropagation()}>
            <RejectReasonTitle>Reason for Rejection</RejectReasonTitle>
            <RejectReasonTextarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejecting this doctor's application..."
            />
            <ModalButtons>
              <Button 
                variant="secondary" 
                onClick={() => setShowRejectModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? <LoadingSpinner /> : 'Confirm Rejection'}
              </Button>
            </ModalButtons>
          </RejectReasonForm>
        </RejectReasonModal>
      )}
      
      {/* Doctor Detail Modal */}
      {showDetailModal && selectedDoctor && (
        <DetailModal onClick={() => setShowDetailModal(false)}>
          <DetailModalContent onClick={e => e.stopPropagation()}>
            <DetailModalHeader>
              <DetailModalTitle>Doctor Details</DetailModalTitle>
              <DetailModalClose onClick={() => setShowDetailModal(false)}>&times;</DetailModalClose>
            </DetailModalHeader>
            
            <DetailModalBody>
              <DoctorProfile>
                <DoctorImage>
                  {selectedDoctor.profileImage ? (
                    <img src={selectedDoctor.profileImage} alt={selectedDoctor.fullName} />
                  ) : (
                    <User size={60} color={theme.primary} />
                  )}
                </DoctorImage>
                
                <DoctorProfileInfo>
                  <DoctorProfileName>{selectedDoctor.fullName}</DoctorProfileName>
                  <DoctorProfileTitle>{selectedDoctor.specialty}</DoctorProfileTitle>
                  
                  <DoctorProfileBadge type={selectedDoctor.status}>
                    {selectedDoctor.status.charAt(0).toUpperCase() + selectedDoctor.status.slice(1)}
                  </DoctorProfileBadge>
                  
                  <SectionDivider />
                  
                  <DoctorProfileDetail>
                    <Mail size={16} /> {selectedDoctor.email}
                  </DoctorProfileDetail>
                  
                  <DoctorProfileDetail>
                    <Phone size={16} /> {selectedDoctor.mobile}
                  </DoctorProfileDetail>
                  
                  <DoctorProfileDetail>
                    <Award size={16} /> License: {selectedDoctor.licenseNumber}
                  </DoctorProfileDetail>
                  
                  <DoctorProfileDetail>
                    <MapPin size={16} /> {selectedDoctor.address || 'Address not provided'}
                  </DoctorProfileDetail>
                  
                  <DoctorProfileDetail>
                    <Calendar size={16} /> Registered on: {selectedDoctor.registrationDate || 'Unknown date'}
                  </DoctorProfileDetail>
                </DoctorProfileInfo>
              </DoctorProfile>
              
              <TabContainer>
                <Tab 
                  active={activeTab === 'profile'} 
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </Tab>
                <Tab 
                  active={activeTab === 'qualifications'} 
                  onClick={() => setActiveTab('qualifications')}
                >
                  Qualifications
                </Tab>
                {selectedDoctor.status === 'rejected' && (
                  <Tab 
                    active={activeTab === 'rejection'} 
                    onClick={() => setActiveTab('rejection')}
                  >
                    Rejection Details
                  </Tab>
                )}
              </TabContainer>
              
              <TabContent active={activeTab === 'profile'}>
                <SectionHeading>
                  <FileText size={18} /> Biography
                </SectionHeading>
                <BiographyText>
                  {selectedDoctor.biography || 'No biography provided.'}
                </BiographyText>
                
                <SectionDivider />
                
                <SectionHeading>
                  <Briefcase size={18} /> Professional Information
                </SectionHeading>
                
                <DoctorDetails>
                  <DetailItem>
                    <Briefcase size={16} /> Department: {selectedDoctor.department}
                  </DetailItem>
                  <DetailItem>
                    <Briefcase size={16} /> Specialty: {selectedDoctor.specialty}
                  </DetailItem>
                  <DetailItem>
                    <Clock size={16} /> Experience: {selectedDoctor.experience} years
                  </DetailItem>
                </DoctorDetails>
              </TabContent>
              
              <TabContent active={activeTab === 'qualifications'}>
                <SectionHeading>
                  <Award size={18} /> Education
                </SectionHeading>
                <BiographyText>
                  {selectedDoctor.education || 'No education details provided.'}
                </BiographyText>
                
                <SectionDivider />
                
                <SectionHeading>
                  <Award size={18} /> License Information
                </SectionHeading>
                
                <DoctorDetails>
                  <DetailItem>
                    <Award size={16} /> License Number: {selectedDoctor.licenseNumber}
                  </DetailItem>
                  <DetailItem>
                    <Calendar size={16} /> Issue Date: {selectedDoctor.licenseIssueDate || 'Not provided'}
                  </DetailItem>
                  <DetailItem>
                    <Calendar size={16} /> Expiry Date: {selectedDoctor.licenseExpiryDate || 'Not provided'}
                  </DetailItem>
                </DoctorDetails>
              </TabContent>
              {selectedDoctor.status === 'rejected' && (
                <TabContent active={activeTab === 'rejection'}>
                  <SectionHeading>
                    <XCircle size={18} /> Rejection Reason
                  </SectionHeading>
                  <BiographyText>
                    {selectedDoctor.rejectionReason || 'No specific reason provided.'}
                  </BiographyText>
                  
                  <SectionDivider />
                  
                  <SectionHeading>
                    <Calendar size={18} /> Rejection Date
                  </SectionHeading>
                  <BiographyText>
                    {selectedDoctor.rejectionDate || 'Date not recorded'}
                  </BiographyText>
                </TabContent>
              )}
              
              {/* Action buttons at the bottom of the modal */}
              <SectionDivider />
              
              <ActionButtons>
                {selectedDoctor.status === 'pending' && (
                  <>
                    <ApproveButton 
                      onClick={() => {
                        handleApprove(selectedDoctor._id);
                        setShowDetailModal(false);
                      }}
                      disabled={actionLoading}
                    >
                      {actionLoading ? <LoadingSpinner /> : <CheckCircle size={16} />}
                      Approve Doctor
                    </ApproveButton>
                    <RejectButton 
                      onClick={() => {
                        setShowDetailModal(false);
                        openRejectModal(selectedDoctor._id);
                      }}
                      disabled={actionLoading}
                    >
                      {actionLoading ? <LoadingSpinner /> : <XCircle size={16} />}
                      Reject Application
                    </RejectButton>
                  </>
                )}
                
                {selectedDoctor.status === 'rejected' && (
                  <ApproveButton 
                    onClick={() => {
                      handleApprove(selectedDoctor._id);
                      setShowDetailModal(false);
                    }}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <LoadingSpinner /> : <CheckCircle size={16} />}
                    Reconsider & Approve
                  </ApproveButton>
                )}
                
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </Button>
              </ActionButtons>
            </DetailModalBody>
          </DetailModalContent>
        </DetailModal>
      )}
    </AdminDashboardContainer>
  );
};

export default AdminPanel;
