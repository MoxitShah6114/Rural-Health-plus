// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Update in api.js
export const patientSignup = async (patientData) => {
  try {
    const response = await api.post('/patient/signup', patientData);
    return response.data;
  } catch (error) {
    console.error("API Error in patientSignup:", error);
    throw error; // Re-throw the error to be caught by the component
  }
};


// Patient Login
// In api.js
export const patientLogin = async (credentials) => {
  const response = await api.post('/patient/login', credentials);
  return response.data; // This will return the response, which includes the patient data and message
};


// Doctor Signup - FIXED
// In api.js
// In api.js
// export const doctorSignup = async (formData) => {
//     try {
//       const response = await api.post('/doctor/signup', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("API Error in doctorSignup:", error);
//       throw error;
//     }
//   };
  

// // Doctor Login
// export const doctorLogin = async (credentials) => {
//   const response = await api.post('/doctor/login', credentials);
//   return response.data;
// };


// api.js or similar file
export const doctorSignup = async (formData) => {
  const response = await axios.post('http://localhost:5000/api/doctor/signup', formData);
  return response.data;
};

export const doctorLogin = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/doctor/login', credentials);
  return response.data;
};

export const fetchPendingDoctors = async () => {
  const response = await axios.get('http://localhost:5000/api/doctors/pending');
  return response.data;
};

export const approveDoctor = async (doctorId) => {
  const response = await axios.patch(`http://localhost:5000/api/doctors/${doctorId}/approve`);
  return response.data;
};

export const rejectDoctor = async (doctorId, reason) => {
  const response = await axios.patch(`http://localhost:5000/api/doctors/${doctorId}/reject`, { reason });
  return response.data;
};


export default api;
