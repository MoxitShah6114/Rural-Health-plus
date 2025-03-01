import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { GlobalStyles } from './styles/GlobalStyles';
import { Home } from './pages/Home';
import { HealthEducation } from './pages/HealthEducation';
import { Telemedicine } from './pages/Telemedicine';
import { DoctorList } from './pages/DoctorList';
import { BookAppointment } from './pages/BookAppointment';
import { SymptomChecker } from './pages/SymptomChecker';
import { OrderMedicine } from './pages/OrderMedicine';
import { SetReminder } from './pages/SetReminder';
import { DoctorLogin } from './pages/DoctorLogin';
import { PatientSignup } from './pages/PatientSignup'; // Assuming you create this page
import { DoctorSignup } from './pages/DoctorSignup'; // Assuming you create this page
import { DoctorDashboard } from './pages/DoctorDashboard'; // Import the new component
import { PatientLogin } from './pages/PatientLogin';
import { PatientDashboard } from './pages/PatientDashboard'; // Import the new component



function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health-education" element={<HealthEducation />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/doctor-list/:department" element={<DoctorList />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/order-medicine" element={<OrderMedicine />} />
          <Route path="/set-reminder" element={<SetReminder />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/patient-signup" element={<PatientSignup />} />
          <Route path="/doctor-signup" element={<DoctorSignup />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />


        </Routes>
      </main>
    </Router>
  );
}

export default App;
