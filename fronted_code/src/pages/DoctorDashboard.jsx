// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, LogOut, Bell, Search, CheckCircle, XCircle, 
//   MessageCircle, Calendar, Clock, User, Settings, 
//   FileText, Users, Home, Activity, MoreHorizontal, 
//   Filter, ChevronRight, ChevronDown, AlertCircle
// } from 'lucide-react';

// // Modern health-themed color palette
// const theme = {
//   primary: '#2563eb',
//   primaryLight: '#dbeafe',
//   primaryDark: '#1d4ed8',
//   secondary: '#10b981',
//   secondaryLight: '#d1fae5',
//   accent: '#8b5cf6',
//   accentLight: '#f3e8ff',
//   warning: '#f59e0b',
//   warningLight: '#fef3c7',
//   danger: '#ef4444',
//   dangerLight: '#fee2e2',
//   success: '#10b981',
//   successLight: '#d1fae5',
//   background: '#f8fafc',
//   cardBg: '#ffffff',
//   text: '#1e293b',
//   textLight: '#64748b',
//   textMuted: '#94a3b8',
//   border: '#e2e8f0',
//   borderDark: '#cbd5e1',
//   shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
// };

// // Mock data
// const mockDoctor = {
//   name: 'Dr. Sarah Johnson',
//   specialty: 'Cardiologist',
//   image: 'https://randomuser.me/api/portraits/women/44.jpg'
// };

// const mockAppointments = [
//   {
//     id: 1,
//     patientName: 'John Smith',
//     patientImage: 'https://randomuser.me/api/portraits/men/1.jpg',
//     date: '2025-03-01',
//     time: '10:00 AM',
//     type: 'Checkup',
//     status: 'confirmed'
//   },
//   {
//     id: 2,
//     patientName: 'Sarah Williams',
//     patientImage: 'https://randomuser.me/api/portraits/women/2.jpg',
//     date: '2025-03-01',
//     time: '11:30 AM',
//     type: 'Consultation',
//     status: 'pending'
//   },
//   {
//     id: 3,
//     patientName: 'Michael Brown',
//     patientImage: 'https://randomuser.me/api/portraits/men/3.jpg',
//     date: '2025-03-02',
//     time: '09:15 AM',
//     type: 'Follow-up',
//     status: 'cancelled'
//   },
//   {
//     id: 4,
//     patientName: 'Emily Davis',
//     patientImage: 'https://randomuser.me/api/portraits/women/4.jpg',
//     date: '2025-03-02',
//     time: '02:00 PM',
//     type: 'Consultation',
//     status: 'pending'
//   }
// ];

// // Main container
// const DashboardContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   background-color: ${theme.background};
// `;

// // Sidebar
// const Sidebar = styled.div`
//   width: 280px;
//   background-color: ${theme.cardBg};
//   border-right: 1px solid ${theme.border};
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   top: 0;
//   left: ${props => props.isOpen ? '0' : '-280px'};
//   bottom: 0;
//   height: 100%;
//   z-index: 50;
//   box-shadow: ${props => props.isOpen ? '0 0 15px rgba(0, 0, 0, 0.1)' : 'none'};
//   transition: all 0.3s ease;
// `;

// const SidebarHeader = styled.div`
//   padding: 2rem 1.5rem;
//   border-bottom: 1px solid ${theme.border};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
// `;

// const ProfileImage = styled.div`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   overflow: hidden;
//   margin-bottom: 1rem;
//   border: 4px solid ${theme.primaryLight};
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const DoctorName = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: ${theme.text};
//   margin-bottom: 0.25rem;
// `;

// const DoctorSpecialty = styled.p`
//   font-size: 0.9rem;
//   color: ${theme.textLight};
//   margin-bottom: 0.5rem;
// `;

// const DoctorStatus = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   padding: 0.25rem 0.75rem;
//   background-color: ${theme.successLight};
//   color: ${theme.success};
//   border-radius: 9999px;
//   font-size: 0.8rem;
//   font-weight: 500;
// `;

// const SidebarMenu = styled.nav`
//   padding: 1.5rem;
//   flex-grow: 1;
// `;

// const SidebarMenuItem = styled.a`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   padding: 0.75rem 1rem;
//   color: ${props => (props.active ? theme.primary : theme.text)};
//   font-weight: ${props => (props.active ? '600' : '500')};
//   border-radius: 8px;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   margin-bottom: 0.5rem;
//   background-color: ${props => props.active ? theme.primaryLight : 'transparent'};
  
//   &:hover {
//     background-color: ${props => props.active ? theme.primaryLight : theme.background};
//     color: ${theme.primary};
//   }
  
//   svg {
//     color: ${props => props.active ? theme.primary : theme.textLight};
//   }
// `;

// const SidebarFooter = styled.div`
//   padding: 1.5rem;
//   border-top: 1px solid ${theme.border};
// `;

// const LogoutButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.75rem;
//   width: 100%;
//   padding: 0.75rem 1rem;
//   color: ${theme.danger};
//   font-weight: 500;
//   background-color: ${theme.dangerLight};
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: ${theme.danger}20;
//   }
  
//   svg {
//     color: ${theme.danger};
//   }
// `;

// // Main Content
// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 1.5rem;
//   margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
//   transition: margin-left 0.3s ease;
//   width: ${props => props.sidebarOpen ? 'calc(100% - 280px)' : '100%'};
// `;

// const TopBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
// `;

// const MenuToggle = styled.button`
//   background: none;
//   border: none;
//   width: 40px;
//   height: 40px;
//   border-radius: 8px;
//   background-color: ${theme.cardBg};
//   box-shadow: ${theme.shadow};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: ${theme.primaryLight};
//     color: ${theme.primary};
//     transform: translateY(-2px);
//   }
// `;

// const PageTitle = styled.h1`
//   font-size: 1.75rem;
//   font-weight: 700;
//   color: ${theme.text};
//   margin-left: 1rem;
// `;

// const TopBarActions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const NotificationButton = styled.button`
//   position: relative;
//   background: none;
//   border: none;
//   width: 40px;
//   height: 40px;
//   border-radius: 8px;
//   background-color: ${theme.cardBg};
//   box-shadow: ${theme.shadow};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: ${theme.primaryLight};
//     color: ${theme.primary};
//     transform: translateY(-2px);
//   }
// `;

// const NotificationBadge = styled.span`
//   position: absolute;
//   top: -5px;
//   right: -5px;
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${theme.danger};
//   color: white;
//   font-size: 0.75rem;
//   font-weight: 600;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px solid white;
// `;

// const SearchBar = styled.div`
//   position: relative;
//   width: 300px;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem 0.75rem 2.5rem;
//   border: 1px solid ${theme.border};
//   border-radius: 8px;
//   background-color: ${theme.cardBg};
//   color: ${theme.text};
  
//   &:focus {
//     outline: none;
//     border-color: ${theme.primary};
//     box-shadow: 0 0 0 3px ${theme.primaryLight};
//   }
  
//   &::placeholder {
//     color: ${theme.textMuted};
//   }
// `;

// const SearchIconWrapper = styled.div`
//   position: absolute;
//   left: 0.75rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: ${theme.textLight};
// `;

// // Dashboard Content
// const DashboardGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1.5rem;
  
//   @media (min-width: 1024px) {
//     grid-template-columns: 3fr 1fr;
//   }
// `;

// // Stats Cards
// const StatsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
//   margin-bottom: 1.5rem;
// `;

// const StatCard = styled.div`
//   background-color: ${theme.cardBg};
//   padding: 1.25rem;
//   border-radius: 12px;
//   box-shadow: ${theme.shadow};
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//   }
// `;

// const StatIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 0.75rem;
//   background-color: ${props => props.bg || theme.primaryLight};
//   color: ${props => props.color || theme.primary};
// `;

// const StatValue = styled.div`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: ${theme.text};
//   margin-bottom: 0.25rem;
// `;

// const StatLabel = styled.div`
//   font-size: 0.875rem;
//   color: ${theme.textLight};
// `;

// // Appointments Section
// const AppointmentsSection = styled.div`
//   background-color: ${theme.cardBg};
//   border-radius: 12px;
//   box-shadow: ${theme.shadow};
//   overflow: hidden;
// `;

// const SectionHeader = styled.div`
//   padding: 1.25rem 1.5rem;
//   border-bottom: 1px solid ${theme.border};
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: ${theme.text};
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
// `;

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 0.75rem;
//   background-color: ${props => props.active ? theme.primaryLight : theme.background};
//   border: 1px solid ${props => props.active ? theme.primary : theme.border};
//   border-radius: 8px;
//   color: ${props => props.active ? theme.primary : theme.text};
//   font-size: 0.875rem;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     border-color: ${theme.primary};
//     color: ${theme.primary};
//   }
  
//   svg {
//     color: ${props => props.active ? theme.primary : theme.textLight};
//   }
// `;

// const AppointmentsList = styled.div`
//   padding: 0.5rem;
//   max-height: calc(100vh - 250px);
//   overflow-y: auto;
// `;

// const AppointmentCard = styled.div`
//   padding: 1.25rem;
//   border-radius: 8px;
//   background-color: ${props => props.status === 'confirmed' ? theme.successLight + '30' : props.status === 'cancelled' ? theme.dangerLight + '30' : theme.background};
//   margin-bottom: 1rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-left: 4px solid ${props => {
//     switch(props.status) {
//       case 'confirmed': return theme.success;
//       case 'cancelled': return theme.danger;
//       case 'pending': return theme.warning;
//       default: return theme.border;
//     }
//   }};
  
//   @media (max-width: 640px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1rem;
//   }
// `;

// const AppointmentInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
  
//   @media (max-width: 640px) {
//     width: 100%;
//   }
// `;

// const PatientAvatar = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background-color: ${theme.primaryLight};
//   color: ${theme.primary};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 600;
//   font-size: 1.25rem;
//   flex-shrink: 0;
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     border-radius: 50%;
//   }
// `;

// const PatientDetails = styled.div``;

// const PatientName = styled.h3`
//   font-size: 1rem;
//   font-weight: 600;
//   color: ${theme.text};
//   margin-bottom: 0.25rem;
// `;

// const AppointmentTime = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: ${theme.textLight};
//   font-size: 0.875rem;
// `;

// const AppointmentType = styled.span`
//   display: inline-block;
//   padding: 0.25rem 0.5rem;
//   background-color: ${theme.primaryLight};
//   color: ${theme.primary};
//   border-radius: 4px;
//   font-size: 0.75rem;
//   font-weight: 500;
//   margin-left: 0.5rem;
// `;

// const AppointmentActions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
  
//   @media (max-width: 640px) {
//     width: 100%;
//     justify-content: flex-end;
//   }
// `;

// const ActionButton = styled.button`
//   padding: 0.5rem;
//   border-radius: 8px;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   background-color: ${props => {
//     switch(props.variant) {
//       case 'accept': return theme.successLight;
//       case 'reject': return theme.dangerLight;
//       case 'message': return theme.primaryLight;
//       default: return theme.background;
//     }
//   }};
//   color: ${props => {
//     switch(props.variant) {
//       case 'accept': return theme.success;
//       case 'reject': return theme.danger;
//       case 'message': return theme.primary;
//       default: return theme.textLight;
//     }
//   }};
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   }
  
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//     transform: none;
//     box-shadow: none;
//   }
// `;

// const StatusBadge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 4px;
//   font-size: 0.75rem;
//   font-weight: 500;
//   background-color: ${props => {
//     switch(props.status) {
//       case 'confirmed': return theme.successLight;
//       case 'cancelled': return theme.dangerLight;
//       case 'pending': return theme.warningLight;
//       default: return theme.background;
//     }
//   }};
//   color: ${props => {
//     switch(props.status) {
//       case 'confirmed': return theme.success;
//       case 'cancelled': return theme.danger;
//       case 'pending': return theme.warning;
//       default: return theme.textLight;
//     }
//   }};
// `;

// // Upcoming Appointments
// const UpcomingSection = styled.div`
//   background-color: ${theme.cardBg};
//   border-radius: 12px;
//   box-shadow: ${theme.shadow};
//   overflow: hidden;
//   height: fit-content;
// `;

// const UpcomingList = styled.div`
//   padding: 1rem;
// `;

// const DateHeader = styled.div`
//   padding: 0.5rem 1rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: ${theme.textLight};
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
  
//   &:not(:first-child) {
//     margin-top: 1rem;
//   }
// `;

// const UpcomingCard = styled.div`
//   padding: 1rem;
//   border-radius: 8px;
//   background-color: ${theme.background};
//   margin-bottom: 0.75rem;
//   border-left: 3px solid ${theme.primary};
//   transition: all 0.2s ease;
  
//   &:hover {
//     transform: translateX(3px);
//     background-color: ${theme.primaryLight}20;
//   }
// `;

// const UpcomingTime = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: ${theme.primary};
//   font-size: 0.875rem;
//   font-weight: 500;
//   margin-bottom: 0.5rem;
// `;

// const UpcomingPatient = styled.div`
//   font-weight: 600;
//   margin-bottom: 0.25rem;
// `;

// const UpcomingType = styled.div`
//   font-size: 0.875rem;
//   color: ${theme.textLight};
// `;

// const ViewAllLink = styled.a`
//   display: block;
//   text-align: center;
//   padding: 0.75rem;
//   color: ${theme.primary};
//   font-weight: 500;
//   border-top: 1px solid ${theme.border};
//   cursor: pointer;
//   transition: background-color 0.2s ease;
  
//   &:hover {
//     background-color: ${theme.primaryLight};
//   }
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 40;
//   display: ${props => props.isOpen ? 'block' : 'none'};
// `;

// const EmptyState = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 3rem;
//   text-align: center;
//   color: ${theme.textLight};
// `;

// const EmptyStateText = styled.p`
//   margin-top: 1rem;
//   font-size: 1rem;
// `;

// export const DoctorDashboard = () => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [appointments, setAppointments] = useState(mockAppointments);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Doctor info
//   const doctor = mockDoctor;
  
//   // Stats calculation
//   const totalAppointments = appointments.length;
//   const confirmedAppointments = appointments.filter(app => app.status === 'confirmed').length;
//   const pendingAppointments = appointments.filter(app => app.status === 'pending').length;
//   const cancelledAppointments = appointments.filter(app => app.status === 'cancelled').length;
  
//   // Filter appointments based on status and search query
//   const filteredAppointments = appointments.filter(appointment => {
//     const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
//     const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });
  
//   // Group upcoming appointments by date
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(tomorrow.getDate() + 1);
  
//   const upcomingAppointments = appointments
//     .filter(app => app.status === 'confirmed')
//     .filter(app => new Date(app.date) >= today)
//     .sort((a, b) => new Date(a.date) - new Date(b.date));
  
//   const groupedAppointments = upcomingAppointments.reduce((acc, appointment) => {
//     const dateKey = appointment.date;
//     if (!acc[dateKey]) {
//       acc[dateKey] = [];
//     }
//     acc[dateKey].push(appointment);
//     return acc;
//   }, {});
  
//   // Handle appointment actions
//   const handleAccept = (id) => {
//     setAppointments(appointments.map(app => 
//       app.id === id ? { ...app, status: 'confirmed' } : app
//     ));
//   };
  
//   const handleReject = (id) => {
//     setAppointments(appointments.map(app => 
//       app.id === id ? { ...app, status: 'cancelled' } : app
//     ));
//   };
  
//   // Handle logout
//   const handleLogout = () => {
//     // Clear auth data
//     localStorage.removeItem('doctorToken');
//     localStorage.removeItem('doctorInfo');
//     // Redirect to login page
//     navigate('/doctor-login');
//   };
  
//   // Toggle sidebar
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
  
//   // Close sidebar when clicking overlay
//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   // Format date for display
//   const formatDateForDisplay = (dateString) => {
//     const date = new Date(dateString);
//     if (date.toDateString() === today.toDateString()) {
//       return 'Today';
//     } else if (date.toDateString() === tomorrow.toDateString()) {
//       return 'Tomorrow';
//     } else {
//       return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
//     }
//   };

//   return (
//     <DashboardContainer>
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen}>
//         <SidebarHeader>
//           <ProfileImage>
//             <img src={doctor.image} alt={doctor.name} />
//           </ProfileImage>
//           <DoctorName>{doctor.name}</DoctorName>
//           <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
//           <DoctorStatus>
//             <CheckCircle size={14} /> Online
//           </DoctorStatus>
//         </SidebarHeader>
        
//         <SidebarMenu>
//           <SidebarMenuItem 
//             active={activeTab === 'dashboard'} 
//             onClick={() => setActiveTab('dashboard')}
//           >
//             <Home size={20} /> Dashboard
//           </SidebarMenuItem>
//           <SidebarMenuItem 
//             active={activeTab === 'appointments'} 
//             onClick={() => setActiveTab('appointments')}
//           >
//             <Calendar size={20} /> Appointments
//           </SidebarMenuItem>
//           <SidebarMenuItem 
//             active={activeTab === 'patients'} 
//             onClick={() => setActiveTab('patients')}
//           >
//             <Users size={20} /> My Patients
//           </SidebarMenuItem>
//           <SidebarMenuItem 
//             active={activeTab === 'medical-records'} 
//             onClick={() => setActiveTab('medical-records')}
//           >
//             <FileText size={20} /> Medical Records
//           </SidebarMenuItem>
//           <SidebarMenuItem 
//             active={activeTab === 'settings'} 
//             onClick={() => setActiveTab('settings')}
//           >
//             <Settings size={20} /> Settings
//           </SidebarMenuItem>
//         </SidebarMenu>
        
//         <SidebarFooter>
//           <LogoutButton onClick={handleLogout}>
//             <LogOut size={20} /> Sign Out
//           </LogoutButton>
//         </SidebarFooter>
//       </Sidebar>
      
//       {/* Overlay for mobile */}
//       <Overlay isOpen={sidebarOpen} onClick={closeSidebar} />
      
//       {/* Main Content */}
//       <MainContent sidebarOpen={sidebarOpen}>
//         <TopBar>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <MenuToggle onClick={toggleSidebar}>
//               {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </MenuToggle>
//             <PageTitle>Doctor Dashboard</PageTitle>
//           </div>
          
//           <TopBarActions>
//             <SearchBar>
//               <SearchIconWrapper>
//                 <Search size={18} />
//               </SearchIconWrapper>
//               <SearchInput 
//                 type="text" 
//                 placeholder="Search patients..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </SearchBar>
            
//             <NotificationButton>
//               <Bell size={20} />
//               <NotificationBadge>3</NotificationBadge>
//             </NotificationButton>
//           </TopBarActions>
//         </TopBar>
        
//         {/* Stats Cards */}
//         <StatsContainer>
//           <StatCard>
//             <StatIcon bg={theme.primaryLight} color={theme.primary}>
//               <Calendar size={20} />
//             </StatIcon>
//             <StatValue>{totalAppointments}</StatValue>
//             <StatLabel>Total Appointments</StatLabel>
//           </StatCard>
          
//           <StatCard>
//             <StatIcon bg={theme.successLight} color={theme.success}>
//               <CheckCircle size={20} />
//             </StatIcon>
//             <StatValue>{confirmedAppointments}</StatValue>
//             <StatLabel>Confirmed</StatLabel>
//           </StatCard>
          
//           <StatCard>
//             <StatIcon bg={theme.warningLight} color={theme.warning}>
//               <Clock size={20} />
//             </StatIcon>
//             <StatValue>{pendingAppointments}</StatValue>
//             <StatLabel>Pending</StatLabel>
//           </StatCard>
          
//           <StatCard>
//             <StatIcon bg={theme.dangerLight} color={theme.danger}>
//               <XCircle size={20} />
//             </StatIcon>
//             <StatValue>{cancelledAppointments}</StatValue>
//             <StatLabel>Cancelled</StatLabel>
//           </StatCard>
//         </StatsContainer>
        
//         {/* Main Dashboard Grid */}
//         <DashboardGrid>
//           {/* Appointments Section */}
//           <AppointmentsSection>
//             <SectionHeader>
//               <SectionTitle>Appointment Requests</SectionTitle>
//               <FilterContainer>
//                 <FilterButton 
//                   active={statusFilter === 'all'} 
//                   onClick={() => setStatusFilter('all')}
//                 >
//                   <Filter size={16} /> All
//                 </FilterButton>
//                 <FilterButton 
//                   active={statusFilter === 'pending'} 
//                   onClick={() => setStatusFilter('pending')}
//                 >
//                   Pending <ChevronDown size={16} />
//                 </FilterButton>
//               </FilterContainer>
//             </SectionHeader>
            
//             <AppointmentsList>
//               {filteredAppointments.length === 0 ? (
//                 <EmptyState>
//                   <Calendar size={40} color={theme.textMuted} />
//                   <EmptyStateText>No appointments found</EmptyStateText>
//                 </EmptyState>
//               ) : (
//                 filteredAppointments.map(appointment => (
//                   <AppointmentCard key={appointment.id} status={appointment.status}>
//                     <AppointmentInfo>
//                       <PatientAvatar>
//                         {appointment.patientImage ? (
//                           <img src={appointment.patientImage} alt={appointment.patientName} />
//                         ) : (
//                           appointment.patientName.charAt(0)
//                         )}
//                         </PatientAvatar>
//                         <PatientDetails>
//                           <PatientName>
//                             {appointment.patientName}
//                             <AppointmentType>{appointment.type}</AppointmentType>
//                           </PatientName>
//                           <AppointmentTime>
//                             <Calendar size={14} /> {appointment.date}
//                             <Clock size={14} style={{ marginLeft: '8px' }} /> {appointment.time}
//                             <StatusBadge status={appointment.status}>
//                               {appointment.status === 'confirmed' && <CheckCircle size={12} />}
//                               {appointment.status === 'cancelled' && <XCircle size={12} />}
//                               {appointment.status === 'pending' && <Clock size={12} />}
//                               {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                             </StatusBadge>
//                           </AppointmentTime>
//                         </PatientDetails>
//                       </AppointmentInfo>
                      
//                       <AppointmentActions>
//                         <ActionButton 
//                           variant="message"
//                           title="Message Patient"
//                         >
//                           <MessageCircle size={18} />
//                         </ActionButton>
                        
//                         {appointment.status === 'pending' && (
//                           <>
//                             <ActionButton 
//                               variant="accept" 
//                               onClick={() => handleAccept(appointment.id)}
//                               title="Accept Appointment"
//                             >
//                               <CheckCircle size={18} />
//                             </ActionButton>
//                             <ActionButton 
//                               variant="reject" 
//                               onClick={() => handleReject(appointment.id)}
//                               title="Reject Appointment"
//                             >
//                               <XCircle size={18} />
//                             </ActionButton>
//                           </>
//                         )}
                        
//                         <ActionButton title="More Options">
//                           <MoreHorizontal size={18} />
//                         </ActionButton>
//                       </AppointmentActions>
//                     </AppointmentCard>
//                   ))
//                 )}
//               </AppointmentsList>
//             </AppointmentsSection>
            
//             {/* Upcoming Appointments Section */}
//             <UpcomingSection>
//               <SectionHeader>
//                 <SectionTitle>Upcoming Appointments</SectionTitle>
//               </SectionHeader>
              
//               <UpcomingList>
//                 {Object.keys(groupedAppointments).length === 0 ? (
//                   <EmptyState>
//                     <Calendar size={30} color={theme.textMuted} />
//                     <EmptyStateText>No upcoming appointments</EmptyStateText>
//                   </EmptyState>
//                 ) : (
//                   Object.entries(groupedAppointments).map(([date, appointments]) => (
//                     <div key={date}>
//                       <DateHeader>
//                         <Calendar size={14} />
//                         {formatDateForDisplay(date)}
//                       </DateHeader>
                      
//                       {appointments.map(appointment => (
//                         <UpcomingCard key={appointment.id}>
//                           <UpcomingTime>
//                             <Clock size={14} /> {appointment.time}
//                           </UpcomingTime>
//                           <UpcomingPatient>{appointment.patientName}</UpcomingPatient>
//                           <UpcomingType>{appointment.type} Appointment</UpcomingType>
//                         </UpcomingCard>
//                       ))}
//                     </div>
//                   ))
//                 )}
//               </UpcomingList>
              
//               <ViewAllLink>
//                 View All Appointments <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
//               </ViewAllLink>
//             </UpcomingSection>
//           </DashboardGrid>
//         </MainContent>
//       </DashboardContainer>
//     );
//   };
  
//   export default DoctorDashboard;
//   const handleLogout = () => {
//     // Clear auth data
//     localStorage.removeItem('doctorToken');
//     localStorage.removeItem('doctorInfo');
//     // Redirect to login page
//     navigate('/doctor-login');
//   };


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Settings,
  FileText,
  Users,
  Home,
  Activity,
  MoreHorizontal,
  Filter,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Pill,
  Clipboard,
  Plus,
  Save,
  Calendar as CalendarIcon,
  Heart,
  Thermometer,
  Video,
  Link as LinkIcon,
  Copy,
  ExternalLink,
} from "lucide-react";
import axios from "axios";

// Modern health-themed color palette
const theme = {
  primary: "#2563eb",
  primaryLight: "#dbeafe",
  primaryDark: "#1d4ed8",
  secondary: "#10b981",
  secondaryLight: "#d1fae5",
  accent: "#8b5cf6",
  accentLight: "#f3e8ff",
  warning: "#f59e0b",
  warningLight: "#fef3c7",
  danger: "#ef4444",
  dangerLight: "#fee2e2",
  success: "#10b981",
  successLight: "#d1fae5",
  background: "#f8fafc",
  cardBg: "#ffffff",
  text: "#1e293b",
  textLight: "#64748b",
  textMuted: "#94a3b8",
  border: "#e2e8f0",
  borderDark: "#cbd5e1",
  shadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
};

// Mock data
const mockDoctor = {
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
};

const mockAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientEmail: "john@gmail.com",
    patientImage: "https://randomuser.me/api/portraits/men/1.jpg",
    patientPhone: "+1 (555) 123-4567",
    date: "2025-03-01",
    time: "10:00 AM",
    type: "Checkup",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "Sarah Williams",
    patientEmail: "john@gmail.com",
    patientPhone: "+1 (555) 987-6543",
    patientImage: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2025-03-01",
    time: "11:30 AM",
    type: "Consultation",
    status: "pending",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    patientEmail: "john@gmail.com",
    patientPhone: "+1 (555) 234-5678",
    patientImage: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2025-03-02",
    time: "09:15 AM",
    type: "Follow-up",
    status: "cancelled",
  },
  {
    id: 4,
    patientName: "Emily Davis",
    patientImage: "https://randomuser.me/api/portraits/women/4.jpg",
    patientEmail: "john@gmail.com",
    date: "2025-03-02",
    time: "02:00 PM",
    type: "Consultation",
    status: "pending",
  },
];

// Main container
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${theme.background};
`;

// Sidebar
const Sidebar = styled.div`
  width: 280px;
  background-color: ${theme.cardBg};
  border-right: 1px solid ${theme.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-280px")};
  bottom: 0;
  height: 100%;
  z-index: 50;
  box-shadow: ${(props) =>
    props.isOpen ? "0 0 15px rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.3s ease;
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid ${theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 4px solid ${theme.primaryLight};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DoctorName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.25rem;
`;

const DoctorSpecialty = styled.p`
  font-size: 0.9rem;
  color: ${theme.textLight};
  margin-bottom: 0.5rem;
`;

const DoctorStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: ${theme.successLight};
  color: ${theme.success};
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const SidebarMenu = styled.nav`
  padding: 1.5rem;
  flex-grow: 1;
`;

const SidebarMenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${(props) => (props.active ? theme.primary : theme.text)};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  background-color: ${(props) =>
    props.active ? theme.primaryLight : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.active ? theme.primaryLight : theme.background};
    color: ${theme.primary};
  }

  svg {
    color: ${(props) => (props.active ? theme.primary : theme.textLight)};
  }
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${theme.border};
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  color: ${theme.danger};
  font-weight: 500;
  background-color: ${theme.dangerLight};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.danger}20;
  }

  svg {
    color: ${theme.danger};
  }
`;

// Main Content
const MainContent = styled.div`
  flex-grow: 1;
  padding: 1.5rem;
  margin-left: ${(props) => (props.sidebarOpen ? "280px" : "0")};
  transition: margin-left 0.3s ease;
  width: ${(props) => (props.sidebarOpen ? "calc(100% - 280px)" : "100%")};
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${theme.cardBg};
  box-shadow: ${theme.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.primaryLight};
    color: ${theme.primary};
    transform: translateY(-2px);
  }
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.text};
  margin-left: 1rem;
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${theme.cardBg};
  box-shadow: ${theme.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.primaryLight};
    color: ${theme.primary};
    transform: translateY(-2px);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.danger};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  background-color: ${theme.cardBg};
  color: ${theme.text};

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }

  &::placeholder {
    color: ${theme.textMuted};
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.textLight};
`;

// Dashboard Content
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 1fr;
  }
`;

// Stats Cards
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background-color: ${theme.cardBg};
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: ${theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  background-color: ${(props) => props.bg || theme.primaryLight};
  color: ${(props) => props.color || theme.primary};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.text};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.textLight};
`;

// Appointments Section
const AppointmentsSection = styled.div`
  background-color: ${theme.cardBg};
  border-radius: 12px;
  box-shadow: ${theme.shadow};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.text};
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) =>
    props.active ? theme.primaryLight : theme.background};
  border: 1px solid ${(props) => (props.active ? theme.primary : theme.border)};
  border-radius: 8px;
  color: ${(props) => (props.active ? theme.primary : theme.text)};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.primary};
    color: ${theme.primary};
  }

  svg {
    color: ${(props) => (props.active ? theme.primary : theme.textLight)};
  }
`;

const AppointmentsList = styled.div`
  padding: 0.5rem;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
`;

const AppointmentCard = styled.div`
  padding: 1.25rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.status === "confirmed"
      ? theme.successLight + "30"
      : props.status === "cancelled"
      ? theme.dangerLight + "30"
      : theme.background};
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid
    ${(props) => {
      switch (props.status) {
        case "confirmed":
          return theme.success;
        case "cancelled":
          return theme.danger;
        case "pending":
          return theme.warning;
        default:
          return theme.border;
      }
    }};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const AppointmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const PatientAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.primaryLight};
  color: ${theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const PatientDetails = styled.div``;

const PatientName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.25rem;
`;

const AppointmentTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.textLight};
  font-size: 0.875rem;
`;

const AppointmentType = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${theme.primaryLight};
  color: ${theme.primary};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const AppointmentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => {
    switch (props.variant) {
      case "accept":
        return theme.successLight;
      case "reject":
        return theme.dangerLight;
      case "message":
        return theme.primaryLight;
      default:
        return theme.background;
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "accept":
        return theme.success;
      case "reject":
        return theme.danger;
      case "message":
        return theme.primary;
      default:
        return theme.textLight;
    }
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case "confirmed":
        return theme.successLight;
      case "cancelled":
        return theme.dangerLight;
      case "pending":
        return theme.warningLight;
      default:
        return theme.background;
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "confirmed":
        return theme.success;
      case "cancelled":
        return theme.danger;
      case "pending":
        return theme.warning;
      default:
        return theme.textLight;
    }
  }};
`;

// Upcoming Appointments
const UpcomingSection = styled.div`
  background-color: ${theme.cardBg};
  border-radius: 12px;
  box-shadow: ${theme.shadow};
  overflow: hidden;
  height: fit-content;
`;

const UpcomingList = styled.div`
  padding: 1rem;
`;

const DateHeader = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.textLight};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

const UpcomingCard = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: ${theme.background};
  margin-bottom: 0.75rem;
  border-left: 3px solid ${theme.primary};
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(3px);
    background-color: ${theme.primaryLight}20;
  }
`;

const UpcomingTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.primary};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const UpcomingPatient = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const UpcomingType = styled.div`
  font-size: 0.875rem;
  color: ${theme.textLight};
`;

const ViewAllLink = styled.a`
  display: block;
  text-align: center;
  padding: 0.75rem;
  color: ${theme.primary};
  font-weight: 500;
  border-top: 1px solid ${theme.border};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.primaryLight};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: ${theme.textLight};
`;

const EmptyStateText = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
`;

// -----------------------------------------------

// Add this to your PatientInfoHeader in the modal
const MeetingCard = styled.div`
  background-color: ${theme.accentLight};
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MeetingCardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeetingCardTitle = styled.div`
  font-weight: 600;
  color: ${theme.accent};
  margin-bottom: 0.25rem;
`;

const MeetingCardTime = styled.div`
  font-size: 0.875rem;
  color: ${theme.textLight};
`;

// Modal Components
const ModalOverlay = styled.div`
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

const ModalContainer = styled.div`
  background-color: ${theme.cardBg};
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${theme.cardBg};
  z-index: 10;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.textLight};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.dangerLight};
    color: ${theme.danger};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const PatientInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PatientAvatarLarge = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 2rem;
  flex-shrink: 0;
  border: 4px solid ${theme.primaryLight};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const PatientInfoMain = styled.div`
  flex-grow: 1;
`;

const PatientNameLarge = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.text};
  margin-bottom: 0.5rem;
`;

const PatientBasicInfo = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const PatientInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${theme.background};
  border-radius: 6px;
  font-size: 0.875rem;
  color: ${theme.textLight};
`;

const TabsContainer = styled.div`
  border-bottom: 1px solid ${theme.border};
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.border};
    border-radius: 4px;
  }
`;

const Tab = styled.button`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? theme.primary : "transparent")};
  color: ${(props) => (props.active ? theme.primary : theme.textLight)};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${theme.primary};
  }
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const MedicineSection = styled.div``;

const MedicineList = styled.div`
  margin-bottom: 1.5rem;
`;

const MedicineItem = styled.div`
  padding: 1rem;
  background-color: ${theme.background};
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-left: 3px solid ${theme.primary};
`;

const MedicineDetails = styled.div``;

const MedicineName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const MedicineDosage = styled.div`
  font-size: 0.875rem;
  color: ${theme.textLight};
  margin-bottom: 0.25rem;
`;

const MedicineInstructions = styled.div`
  font-size: 0.875rem;
  color: ${theme.text};
`;

const MedicineActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MedicineForm = styled.div`
  background-color: ${theme.background};
  padding: 1.5rem;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${theme.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  background-color: ${theme.cardBg};
  color: ${theme.text};

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  background-color: ${theme.cardBg};
  color: ${theme.text};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.primaryDark};
    transform: translateY(-2px);
  }
`;

const InfoCard = styled.div`
  background-color: ${theme.background};
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const InfoCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.textLight};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-weight: 500;
`;

// Mock data for patient details
const mockPatientDetails = {
  id: 101,
  fullName: "John Smith",
  age: 42,
  gender: "Male",
  phone: "+1 (555) 123-4567",
  email: "john.smith@example.com",
  address: "123 Main St, Anytown, CA 94567",
  bloodType: "O+",
  height: "5'11\"",
  weight: "180 lbs",
  allergies: ["Penicillin", "Peanuts"],
  chronicConditions: ["Hypertension", "Type 2 Diabetes"],
  emergencyContact: {
    name: "Mary Smith",
    relation: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  vitalSigns: {
    bloodPressure: "128/85",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    respiratoryRate: "16 bpm",
    oxygenSaturation: "98%",
  },
  medications: [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      instructions: "Take in the morning with food",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      instructions: "Take with meals",
    },
  ],
  visits: [
    {
      date: "2025-02-15",
      reason: "Annual physical",
      diagnosis: "Hypertension, well-controlled",
      notes: "Patient reports feeling well. Continue current medications.",
    },
    {
      date: "2024-11-03",
      reason: "Follow-up",
      diagnosis: "Upper respiratory infection",
      notes: "Symptoms improved. No antibiotic needed.",
    },
  ],
};

// New styled components for meeting functionality
const MeetingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) =>
    props.active ? theme.accent : theme.accentLight};
  border: none;
  border-radius: 8px;
  color: ${(props) => (props.active ? "white" : theme.accent)};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.accent};
    color: white;
    transform: translateY(-2px);
  }

  svg {
    color: inherit;
  }
`;

const MeetingPopup = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background-color: ${theme.cardBg};
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  z-index: 30;
  overflow: hidden;
`;

const MeetingPopupHeader = styled.div`
  padding: 1rem;
  background-color: ${theme.accent};
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MeetingPopupBody = styled.div`
  padding: 1rem;
`;

const MeetingLink = styled.div`
  padding: 0.75rem;
  background-color: ${theme.background};
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  word-break: break-all;
`;

const MeetingLinkText = styled.div`
  flex-grow: 1;
  margin-right: 0.5rem;
  color: ${theme.textLight};
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    background-color: ${theme.primaryLight};
  }
`;

const JoinMeetingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${theme.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.primary};
    transform: translateY(-2px);
  }
`;

const MeetingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: ${theme.textLight};
`;

const MeetingButtonWrapper = styled.div`
  position: relative;
`;

export const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState(mockAppointments);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [meetinLink, setMeetingLink] = useState("");

  // Patient modal state
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activePatientTab, setActivePatientTab] = useState("overview");

  // New medicine form state
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    frequency: "",
    instructions: "",
  });

  // Function to open patient modal
  const openPatientModal = (patientName) => {
    // In a real app, you would fetch the patient details based on the patient ID
    // For now, we'll use our mock data
    setSelectedPatient({
      ...mockPatientDetails,
      fullName: patientName, // Use the actual patient name from the appointment
    });
    setPatientModalOpen(true);
  };

  // Handle medicine form changes
  const handleMedicineFormChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle medicine form submission
  const handleMedicineSubmit = (e) => {
    e.preventDefault();

    // Add the new medicine to the patient's medications
    const newMedication = {
      id: Date.now(), // Generate a unique ID
      ...newMedicine,
    };

    setSelectedPatient((prev) => ({
      ...prev,
      medications: [...prev.medications, newMedication],
    }));

    // Reset the form
    setNewMedicine({
      name: "",
      dosage: "",
      frequency: "",
      instructions: "",
    });
  };

  // Doctor info
  const doctor = mockDoctor;

  // Stats calculation
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(
    (app) => app.status === "confirmed"
  ).length;
  const pendingAppointments = appointments.filter(
    (app) => app.status === "pending"
  ).length;
  const cancelledAppointments = appointments.filter(
    (app) => app.status === "cancelled"
  ).length;

  // Filter appointments based on status and search query
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const matchesSearch = appointment.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Group upcoming appointments by date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const upcomingAppointments = appointments
    .filter((app) => app.status === "confirmed")
    .filter((app) => new Date(app.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const groupedAppointments = upcomingAppointments.reduce(
    (acc, appointment) => {
      const dateKey = appointment.date;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(appointment);
      return acc;
    },
    {}
  );

  // Handle appointment actions
  const handleAccept = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "confirmed" } : app
      )
    );

    // In a real app, you would send a confirmation email to the patient
    // For now, we'll just show an alert
    alert("Appointment confirmed. Confirmation email sent to the patient.");

    // Schedule a meeting with the patient
    const patientDetails = appointments.find((app) => app.id === id);
    console.log(patientDetails);
    handleScheduleMeeting(patientDetails);
  };

  const handleReject = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "cancelled" } : app
      )
    );
  };

  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorInfo");
    // Redirect to login page
    navigate("/doctor-login");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking overlay
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleScheduleMeeting = async (patientDetails) => {
    const { patientName, patientEmail, date, time, patientPhone } =
      patientDetails;

    try {
      const response = await axios.post(
        "http://localhost:5000/meeting/create-meeting",
        {
          patientEmail: patientEmail,
          patientPhone: patientPhone,
          patientName: patientName,
          date,
          time,
        }
      );
      console.log(await response);
      if (response.status === 200) {
        alert("Meeting scheduled successfully.");
        const data = await response.data;
        setMeetingLink(data.meetingLink);
      } else {
        alert("Failed to schedule meeting. Please try again.");
      }
    } catch (err) {
      console.log("Error scheduling meeting: ", err);
    }
  };

  return (
    <DashboardContainer>
      {/* Patient Details Modal */}
      {patientModalOpen && selectedPatient && (
        <ModalOverlay onClick={() => setPatientModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Patient Details</ModalTitle>
              <CloseButton onClick={() => setPatientModalOpen(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <PatientInfoHeader>
                <PatientAvatarLarge>
                  {/* Use patient image if available, otherwise show initials */}
                  {selectedPatient.image ? (
                    <img
                      src={selectedPatient.image}
                      alt={selectedPatient.fullName}
                    />
                  ) : (
                    selectedPatient.fullName.charAt(0)
                  )}
                </PatientAvatarLarge>

                <PatientInfoMain>
                  <PatientNameLarge>
                    {selectedPatient.fullName}
                  </PatientNameLarge>

                  <PatientBasicInfo>
                    <PatientInfoItem>
                      <User size={14} /> {selectedPatient.age} years,{" "}
                      {selectedPatient.gender}
                    </PatientInfoItem>
                    <PatientInfoItem>
                      <Heart size={14} /> Blood Type:{" "}
                      {selectedPatient.bloodType}
                    </PatientInfoItem>
                  </PatientBasicInfo>

                  <PatientBasicInfo>
                    <PatientInfoItem>
                      <AlertCircle size={14} />
                      Allergies: {selectedPatient.allergies.join(", ")}
                    </PatientInfoItem>
                  </PatientBasicInfo>
                  {/* Add this component */}
                  <UpcomingMeeting patient={selectedPatient} />
                </PatientInfoMain>
              </PatientInfoHeader>

              <TabsContainer>
                <Tab
                  active={activePatientTab === "overview"}
                  onClick={() => setActivePatientTab("overview")}
                >
                  <User size={16} /> Overview
                </Tab>
                <Tab
                  active={activePatientTab === "vitals"}
                  onClick={() => setActivePatientTab("vitals")}
                >
                  <Activity size={16} /> Vital Signs
                </Tab>
                <Tab
                  active={activePatientTab === "medications"}
                  onClick={() => setActivePatientTab("medications")}
                >
                  <Pill size={16} /> Medications
                </Tab>
                <Tab
                  active={activePatientTab === "history"}
                  onClick={() => setActivePatientTab("history")}
                >
                  <FileText size={16} /> Medical History
                </Tab>
              </TabsContainer>

              {/* Overview Tab */}
              <TabContent active={activePatientTab === "overview"}>
                <InfoCard>
                  <InfoCardTitle>
                    <User size={18} /> Personal Information
                  </InfoCardTitle>
                  <InfoGrid>
                    <InfoItem>
                      <InfoLabel>Phone</InfoLabel>
                      <InfoValue>{selectedPatient.phone}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Email</InfoLabel>
                      <InfoValue>{selectedPatient.email}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Address</InfoLabel>
                      <InfoValue>{selectedPatient.address}</InfoValue>
                    </InfoItem>
                  </InfoGrid>
                </InfoCard>

                <InfoCard>
                  <InfoCardTitle>
                    <AlertCircle size={18} /> Emergency Contact
                  </InfoCardTitle>
                  <InfoGrid>
                    <InfoItem>
                      <InfoLabel>Name</InfoLabel>
                      <InfoValue>
                        {selectedPatient.emergencyContact.name}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Relation</InfoLabel>
                      <InfoValue>
                        {selectedPatient.emergencyContact.relation}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Phone</InfoLabel>
                      <InfoValue>
                        {selectedPatient.emergencyContact.phone}
                      </InfoValue>
                    </InfoItem>
                  </InfoGrid>
                </InfoCard>

                <InfoCard>
                  <InfoCardTitle>
                    <Activity size={18} /> Chronic Conditions
                  </InfoCardTitle>
                  <div>
                    {selectedPatient.chronicConditions.map(
                      (condition, index) => (
                        <PatientInfoItem
                          key={index}
                          style={{ marginBottom: "0.5rem" }}
                        >
                          {condition}
                        </PatientInfoItem>
                      )
                    )}
                  </div>
                </InfoCard>
              </TabContent>

              {/* Vital Signs Tab */}
              <TabContent active={activePatientTab === "vitals"}>
                <InfoCard>
                  <InfoCardTitle>
                    <Thermometer size={18} /> Latest Vital Signs
                  </InfoCardTitle>
                  <InfoGrid>
                    <InfoItem>
                      <InfoLabel>Blood Pressure</InfoLabel>
                      <InfoValue>
                        {selectedPatient.vitalSigns.bloodPressure}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Heart Rate</InfoLabel>
                      <InfoValue>
                        {selectedPatient.vitalSigns.heartRate}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Temperature</InfoLabel>
                      <InfoValue>
                        {selectedPatient.vitalSigns.temperature}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Respiratory Rate</InfoLabel>
                      <InfoValue>
                        {selectedPatient.vitalSigns.respiratoryRate}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Oxygen Saturation</InfoLabel>
                      <InfoValue>
                        {selectedPatient.vitalSigns.oxygenSaturation}
                      </InfoValue>
                    </InfoItem>
                  </InfoGrid>
                </InfoCard>
              </TabContent>

              {/* Medications Tab */}
              <TabContent active={activePatientTab === "medications"}>
                <MedicineSection>
                  <InfoCardTitle>
                    <Pill size={18} /> Current Medications
                  </InfoCardTitle>

                  <MedicineList>
                    {selectedPatient.medications.length === 0 ? (
                      <EmptyState>
                        <Pill size={30} color={theme.textMuted} />
                        <EmptyStateText>
                          No medications prescribed
                        </EmptyStateText>
                      </EmptyState>
                    ) : (
                      selectedPatient.medications.map((medication) => (
                        <MedicineItem key={medication.id}>
                          <MedicineDetails>
                            <MedicineName>
                              {medication.name} - {medication.dosage}
                            </MedicineName>
                            <MedicineDosage>
                              Frequency: {medication.frequency}
                            </MedicineDosage>
                            <MedicineInstructions>
                              {medication.instructions}
                            </MedicineInstructions>
                          </MedicineDetails>
                        </MedicineItem>
                      ))
                    )}
                  </MedicineList>

                  <InfoCardTitle>
                    <Plus size={18} /> Prescribe New Medication
                  </InfoCardTitle>

                  <MedicineForm>
                    <form onSubmit={handleMedicineSubmit}>
                      <FormRow>
                        <FormGroup>
                          <FormLabel>Medication Name</FormLabel>
                          <FormInput
                            type="text"
                            name="name"
                            value={newMedicine.name}
                            onChange={handleMedicineFormChange}
                            placeholder="e.g., Amoxicillin"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel>Dosage</FormLabel>
                          <FormInput
                            type="text"
                            name="dosage"
                            value={newMedicine.dosage}
                            onChange={handleMedicineFormChange}
                            placeholder="e.g., 500mg"
                            required
                          />
                        </FormGroup>
                      </FormRow>

                      <FormGroup>
                        <FormLabel>Frequency</FormLabel>
                        <FormInput
                          type="text"
                          name="frequency"
                          value={newMedicine.frequency}
                          onChange={handleMedicineFormChange}
                          placeholder="e.g., Twice daily"
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Instructions</FormLabel>
                        <FormTextarea
                          name="instructions"
                          value={newMedicine.instructions}
                          onChange={handleMedicineFormChange}
                          placeholder="e.g., Take with food, avoid alcohol"
                          required
                        />
                      </FormGroup>

                      <SubmitButton type="submit">
                        <Save size={18} /> Save Prescription
                      </SubmitButton>
                    </form>
                  </MedicineForm>
                </MedicineSection>
              </TabContent>

              {/* Medical History Tab */}
              <TabContent active={activePatientTab === "history"}>
                <InfoCardTitle>
                  <CalendarIcon size={18} /> Visit History
                </InfoCardTitle>

                {selectedPatient.visits.map((visit, index) => (
                  <InfoCard key={index}>
                    <InfoGrid>
                      <InfoItem>
                        <InfoLabel>Date</InfoLabel>
                        <InfoValue>{visit.date}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Reason</InfoLabel>
                        <InfoValue>{visit.reason}</InfoValue>
                      </InfoItem>
                    </InfoGrid>
                    <div style={{ marginTop: "1rem" }}>
                      <InfoLabel>Diagnosis</InfoLabel>
                      <InfoValue style={{ marginTop: "0.25rem" }}>
                        {visit.diagnosis}
                      </InfoValue>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <InfoLabel>Notes</InfoLabel>
                      <InfoValue style={{ marginTop: "0.25rem" }}>
                        {visit.notes}
                      </InfoValue>
                    </div>
                  </InfoCard>
                ))}
              </TabContent>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <ProfileImage>
            <img src={doctor.image} alt={doctor.name} />
          </ProfileImage>
          <DoctorName>{doctor.name}</DoctorName>
          <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
          <DoctorStatus>
            <CheckCircle size={14} /> Online
          </DoctorStatus>
        </SidebarHeader>

        <SidebarMenu>
          <SidebarMenuItem
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home size={20} /> Dashboard
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeTab === "appointments"}
            onClick={() => setActiveTab("appointments")}
          >
            <Calendar size={20} /> Appointments
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeTab === "patients"}
            onClick={() => setActiveTab("patients")}
          >
            <Users size={20} /> My Patients
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeTab === "medical-records"}
            onClick={() => setActiveTab("medical-records")}
          >
            <FileText size={20} /> Medical Records
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} /> Settings
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>
            <LogOut size={20} /> Sign Out
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      {/* Overlay for mobile */}
      <Overlay isOpen={sidebarOpen} onClick={closeSidebar} />

      {/* Main Content */}
      <MainContent sidebarOpen={sidebarOpen}>
        <TopBar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MenuToggle onClick={toggleSidebar}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </MenuToggle>
            <PageTitle>Doctor Dashboard</PageTitle>
          </div>

          <TopBarActions>
            <SearchBar>
              <SearchIconWrapper>
                <Search size={18} />
              </SearchIconWrapper>
              <SearchInput
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>

            <NotificationButton>
              <Bell size={20} />
              <NotificationBadge>3</NotificationBadge>
            </NotificationButton>
          </TopBarActions>
        </TopBar>

        {/* Stats Cards */}
        <StatsContainer>
          <StatCard>
            <StatIcon bg={theme.primaryLight} color={theme.primary}>
              <Calendar size={20} />
            </StatIcon>
            <StatValue>{totalAppointments}</StatValue>
            <StatLabel>Total Appointments</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon bg={theme.successLight} color={theme.success}>
              <CheckCircle size={20} />
            </StatIcon>
            <StatValue>{confirmedAppointments}</StatValue>
            <StatLabel>Confirmed</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon bg={theme.warningLight} color={theme.warning}>
              <Clock size={20} />
            </StatIcon>
            <StatValue>{pendingAppointments}</StatValue>
            <StatLabel>Pending</StatLabel>
          </StatCard>

          <StatCard>
            <StatIcon bg={theme.dangerLight} color={theme.danger}>
              <XCircle size={20} />
            </StatIcon>
            <StatValue>{cancelledAppointments}</StatValue>
            <StatLabel>Cancelled</StatLabel>
          </StatCard>
        </StatsContainer>

        {/* Main Dashboard Grid */}
        <DashboardGrid>
          {/* Appointments Section */}
          <AppointmentsSection>
            <SectionHeader>
              <SectionTitle>Appointment Requests</SectionTitle>
              <FilterContainer>
                <FilterButton
                  active={statusFilter === "all"}
                  onClick={() => setStatusFilter("all")}
                >
                  <Filter size={16} /> All
                </FilterButton>
                <FilterButton
                  active={statusFilter === "pending"}
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending <ChevronDown size={16} />
                </FilterButton>
              </FilterContainer>
            </SectionHeader>

            <AppointmentsList>
              {filteredAppointments.length === 0 ? (
                <EmptyState>
                  <Calendar size={40} color={theme.textMuted} />
                  <EmptyStateText>No appointments found</EmptyStateText>
                </EmptyState>
              ) : (
                filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    status={appointment.status}
                  >
                    <AppointmentInfo>
                      <PatientAvatar
                        onClick={() =>
                          openPatientModal(appointment.patientName)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {appointment.patientImage ? (
                          <img
                            src={appointment.patientImage}
                            alt={appointment.patientName}
                          />
                        ) : (
                          appointment.patientName.charAt(0)
                        )}
                      </PatientAvatar>
                      <PatientDetails
                        onClick={() =>
                          openPatientModal(appointment.patientName)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <PatientName>
                          {appointment.patientName}
                          <AppointmentType>{appointment.type}</AppointmentType>
                        </PatientName>
                        <AppointmentTime>
                          <Calendar size={14} /> {appointment.date}
                          <Clock size={14} style={{ marginLeft: "8px" }} />{" "}
                          {appointment.time}
                          <StatusBadge status={appointment.status}>
                            {appointment.status === "confirmed" && (
                              <CheckCircle size={12} />
                            )}
                            {appointment.status === "cancelled" && (
                              <XCircle size={12} />
                            )}
                            {appointment.status === "pending" && (
                              <Clock size={12} />
                            )}
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </StatusBadge>
                        </AppointmentTime>
                      </PatientDetails>
                    </AppointmentInfo>

                    <AppointmentActions>
                      <ActionButton variant="message" title="Message Patient">
                        <MessageCircle size={18} />
                      </ActionButton>

                      {/* Add the meeting button here */}
                      <AppointmentMeetingButton appointment={appointment} meetinglinks={meetinLink} />

                      {appointment.status === "pending" && (
                        <>
                          <ActionButton
                            variant="accept"
                            onClick={() => handleAccept(appointment.id)}
                            title="Accept Appointment"
                          >
                            <CheckCircle size={18} />
                          </ActionButton>
                          <ActionButton
                            variant="reject"
                            onClick={() => handleReject(appointment.id)}
                            title="Reject Appointment"
                          >
                            <XCircle size={18} />
                          </ActionButton>
                        </>
                      )}

                      <ActionButton title="More Options">
                        <MoreHorizontal size={18} />
                      </ActionButton>
                    </AppointmentActions>

                    
                  </AppointmentCard>
                ))
              )}
            </AppointmentsList>
          </AppointmentsSection>
          {/* Upcoming Appointments Section */}
          <UpcomingSection>
            <SectionHeader>
              <SectionTitle>Upcoming Appointments</SectionTitle>
            </SectionHeader>

            <UpcomingList>
              {Object.keys(groupedAppointments).length === 0 ? (
                <EmptyState>
                  <Calendar size={30} color={theme.textMuted} />
                  <EmptyStateText>No upcoming appointments</EmptyStateText>
                </EmptyState>
              ) : (
                Object.entries(groupedAppointments).map(
                  ([date, appointments]) => (
                    <div key={date}>
                      <DateHeader>
                        <Calendar size={14} />
                        {formatDateForDisplay(date)}
                      </DateHeader>

                      {appointments.map((appointment) => (
                        <UpcomingCard key={appointment.id}>
                          <UpcomingTime>
                            <Clock size={14} /> {appointment.time}
                          </UpcomingTime>
                          <UpcomingPatient>
                            {appointment.patientName}
                          </UpcomingPatient>
                          <UpcomingType>
                            {appointment.type} Appointment
                          </UpcomingType>
                        </UpcomingCard>
                      ))}
                    </div>
                  )
                )
              )}
            </UpcomingList>

            <ViewAllLink>
              View All Appointments{" "}
              <ChevronRight size={14} style={{ verticalAlign: "middle" }} />
            </ViewAllLink>
          </UpcomingSection>
        </DashboardGrid>
      </MainContent>
    </DashboardContainer>
  );
};

export default DoctorDashboard;

const AppointmentMeetingButton = ({ appointment,meetingLink }) => {
  const [showMeetingPopup, setShowMeetingPopup] = useState(false);

  // Function to copy meeting link to clipboard
  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    alert("Meeting link copied to clipboard!");
  };

  // Function to join meeting
  const joinMeeting = () => {
    window.open(meetingLink, "_blank");
  };

  // Check if appointment is today
  const isToday = () => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === today.toDateString();
  };

  // Calculate time difference
  const getTimeDifference = () => {
    const now = new Date();
    const [hours, minutes] = appointment.time.split(":");
    const appointmentTime = new Date();
    appointmentTime.setHours(parseInt(hours));
    appointmentTime.setMinutes(parseInt(minutes));

    const diffMs = appointmentTime - now;
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 0) {
      return "Past appointment";
    } else if (diffMins < 60) {
      return `Starts in ${diffMins} minutes`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `Starts in ${diffHours} hours`;
    }
  };

  return (
    <MeetingButtonWrapper>
      <MeetingButton
        onClick={() => setShowMeetingPopup(!showMeetingPopup)}
        active={appointment.status === "confirmed" && isToday()}
        disabled={appointment.status !== "confirmed"}
        title={
          appointment.status !== "confirmed"
            ? "Appointment must be confirmed to join meeting"
            : "Join video consultation"
        }
      >
        <Video size={16} />
        {appointment.status === "confirmed" && isToday() ? "Join" : "Meeting"}
      </MeetingButton>

      {showMeetingPopup && (
        <MeetingPopup>
          <MeetingPopupHeader>
            <span>Video Consultation</span>
            <X
              size={16}
              style={{ cursor: "pointer" }}
              onClick={() => setShowMeetingPopup(false)}
            />
          </MeetingPopupHeader>

          <MeetingPopupBody>
            <MeetingInfo>
              <CalendarIcon size={14} />
              {appointment.date}
            </MeetingInfo>

            <MeetingInfo>
              <Clock size={14} />
              {appointment.time} ({getTimeDifference()})
            </MeetingInfo>

            <MeetingInfo>
              <User size={14} />
              {appointment.patientName}
            </MeetingInfo>

            <MeetingLink>
              <LinkIcon
                size={14}
                style={{ marginRight: "8px", flexShrink: 0 }}
              />
              <MeetingLinkText>{meetingLink}</MeetingLinkText>
              <CopyButton onClick={copyMeetingLink}>
                <Copy size={14} />
              </CopyButton>
            </MeetingLink>

            <JoinMeetingButton onClick={joinMeeting}>
              <Video size={18} /> Join Meeting
            </JoinMeetingButton>
          </MeetingPopupBody>
        </MeetingPopup>
      )}
    </MeetingButtonWrapper>
  );
};

// Add this component to your modal
const UpcomingMeeting = ({ patient, appointment }) => {
  // Find the next appointment for this patient
  const nextAppointment = appointment || {
    date: "2025-03-02",
    time: "10:00 AM",
    type: "Video Consultation",
  };

  const generateMeetingLink = () => {
    return `https://meet.yourdomain.com/${Date.now()}-${patient.fullName
      .replace(/\s+/g, "")
      .toLowerCase()}`;
  };

  const meetingLink = generateMeetingLink();

  // Function to copy meeting link to clipboard
  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    alert("Meeting link copied to clipboard!");
  };

  // Function to join meeting
  const joinMeeting = () => {
    window.open(meetingLink, "_blank");
  };

  return (
    <MeetingCard>
      <MeetingCardInfo>
        <MeetingCardTitle>
          <Video
            size={16}
            style={{ verticalAlign: "middle", marginRight: "6px" }}
          />
          Upcoming Video Consultation
        </MeetingCardTitle>
        <MeetingCardTime>
          {nextAppointment.date} at {nextAppointment.time}
        </MeetingCardTime>
      </MeetingCardInfo>

      <div style={{ display: "flex", gap: "8px" }}>
        <ActionButton onClick={copyMeetingLink} title="Copy meeting link">
          <Copy size={16} />
        </ActionButton>
        <JoinMeetingButton
          onClick={joinMeeting}
          style={{ padding: "0.5rem 1rem" }}
        >
          <Video size={16} /> Join
        </JoinMeetingButton>
      </div>
    </MeetingCard>
  );
};