// // import React, { useState } from 'react';
// // import styled from 'styled-components';
// // import { Container } from '../components/common/Container';
// // import { Card } from '../components/common/Card';
// // import { Button } from '../components/common/Button';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
// // import { mockAdmins } from '../data/mockAdmins'; // Assuming you have a mockAdmins data file

// // // Modern health-themed color palette
// // const theme = {
// //   primary: '#2563eb',
// //   primaryLight: '#dbeafe',
// //   primaryDark: '#1e40af',
// //   secondary: '#10b981',
// //   secondaryLight: '#d1fae5',
// //   accent: '#8b5cf6',
// //   accentLight: '#f3e8ff',
// //   warning: '#f59e0b',
// //   danger: '#ef4444',
// //   background: '#f8fafc',
// //   cardBg: '#ffffff',
// //   text: '#1e293b',
// //   textLight: '#64748b',
// //   textMuted: '#94a3b8',
// //   border: '#e2e8f0',
// //   shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
// // };

// // const PageContainer = styled(Container)`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   min-height: 80vh;
// //   padding: 2rem 1.5rem;
// // `;

// // const Title = styled.h1`
// //   color: ${theme.text};
// //   font-size: 2.75rem;
// //   font-weight: 800;
// //   margin-bottom: 2rem;
// //   text-align: center;
// //   position: relative;

// //   &:after {
// //     content: '';
// //     position: absolute;
// //     bottom: -12px;
// //     left: 50%;
// //     transform: translateX(-50%);
// //     width: 60px;
// //     height: 4px;
// //     background: linear-gradient(90deg, ${theme.primary}, ${theme.accent});
// //     border-radius: 4px;
// //   }
// // `;

// // const LoginCard = styled(Card)`
// //   width: 100%;
// //   max-width: 450px;
// //   border-radius: 16px;
// //   box-shadow: ${theme.shadow};
// //   overflow: hidden;
// //   background: ${theme.cardBg};
// //   transition: transform 0.3s ease, box-shadow 0.3s ease;

// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
// //   }
// // `;

// // const CardHeader = styled.div`
// //   background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
// //   padding: 2rem;
// //   text-align: center;
// //   color: white;
// // `;

// // const CardContent = styled.div`
// //   padding: 2rem;
// // `;

// // const Form = styled.form`
// //   display: flex;
// //   flex-direction: column;
// //   gap: 1.5rem;
// // `;

// // const FormGroup = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: 0.5rem;
// //   position: relative;
// // `;

// // const Label = styled.label`
// //   color: ${theme.text};
// //   font-weight: 600;
// //   font-size: 0.95rem;
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;

// //   svg {
// //     color: ${theme.primary};
// //   }
// // `;

// // const InputWrapper = styled.div`
// //   position: relative;
// //   display: flex;
// //   align-items: center;
// // `;

// // const Input = styled.input`
// //   width: 100%;
// //   padding: 0.9rem 1rem 0.9rem 2.75rem;
// //   border: 1px solid ${theme.border};
// //   border-radius: 8px;
// //   background-color: ${theme.background};
// //   color: ${theme.text};
// //   font-size: 1rem;
// //   transition: all 0.3s ease;

// //   &:focus {
// //     outline: none;
// //     border-color: ${theme.primary};
// //     box-shadow: 0 0 0 3px ${theme.primaryLight};
// //   }

// //   &::placeholder {
// //     color: ${theme.textMuted};
// //   }
// // `;

// // const InputIcon = styled.div`
// //   position: absolute;
// //   left: 1rem;
// //   color: ${theme.textLight};
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const PasswordToggle = styled.button`
// //   position: absolute;
// //   right: 1rem;
// //   background: none;
// //   border: none;
// //   color: ${theme.textLight};
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   transition: color 0.2s ease;

// //   &:hover {
// //     color: ${theme.primary};
// //   }
// // `;

// // const ErrorMessage = styled.div`
// //   background-color: #fee2e2;
// //   color: ${theme.danger};
// //   padding: 0.75rem;
// //   border-radius: 8px;
// //   margin-bottom: 1rem;
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;
// //   font-size: 0.9rem;

// //   svg {
// //     color: ${theme.danger};
// //   }
// // `;

// // export const AdminLogin = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const admin = mockAdmins.find(
// //       (a) => a.email === email && a.password === password
// //     );

// //     if (admin) {
// //       console.log('Login successful:', admin);
// //       navigate('/admin-panel'); // Redirect to AdminPanel
// //     } else {
// //       setError('Invalid email or password. Please try again.');
// //     }
// //   };

// //   const toggleShowPassword = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   return (
// //     <PageContainer>
// //       <Title>Admin Login</Title>
// //       <LoginCard>
// //         <CardHeader>
// //           <h2>Admin Access</h2>
// //         </CardHeader>

// //         <CardContent>
// //           {error && (
// //             <ErrorMessage>
// //               <AlertCircle size={18} />
// //               {error}
// //             </ErrorMessage>
// //           )}

// //           <Form onSubmit={handleSubmit}>
// //             <FormGroup>
// //               <Label htmlFor="email">
// //                 <Mail size={16} /> Email
// //               </Label>
// //               <InputWrapper>
// //                 <InputIcon>
// //                   <Mail size={18} />
// //                 </InputIcon>
// //                 <Input
// //                   type="email"
// //                   id="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   placeholder="Enter your email"
// //                   required
// //                 />
// //               </InputWrapper>
// //             </FormGroup>

// //             <FormGroup>
// //               <Label htmlFor="password">
// //                 <Lock size={16} /> Password
// //               </Label>
// //               <InputWrapper>
// //                 <InputIcon>
// //                   <Lock size={18} />
// //                 </InputIcon>
// //                 <Input
// //                   type={showPassword ? "text" : "password"}
// //                   id="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   placeholder="Enter your password"
// //                   required
// //                 />
// //                 <PasswordToggle 
// //                   type="button" 
// //                   onClick={toggleShowPassword}
// //                   aria-label={showPassword ? "Hide password" : "Show password"}
// //                 >
// //                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                 </PasswordToggle>
// //               </InputWrapper>
// //             </FormGroup>

// //             <Button type="submit" variant="primary">
// //               <LogIn size={18} />
// //               Login
// //             </Button>
// //           </Form>

// //           <div style={{ textAlign: 'center', marginTop: '1rem' }}>
// //             Don't have an account? <Link to="/admin-signup">Register here</Link>
// //           </div>
// //         </CardContent>
// //       </LoginCard>
// //     </PageContainer>
// //   );
// // };




// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Container } from '../components/common/Container';
// import { Card } from '../components/common/Card';
// import { Button } from '../components/common/Button';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
// import { mockAdmins } from '../data/mockAdmins';

// // Modern health-themed color palette
// const theme = {
//   primary: '#2563eb',
//   primaryLight: '#dbeafe',
//   primaryDark: '#1e40af',
//   secondary: '#10b981',
//   secondaryLight: '#d1fae5',
//   accent: '#8b5cf6',
//   accentLight: '#f3e8ff',
//   warning: '#f59e0b',
//   danger: '#ef4444',
//   background: '#f8fafc',
//   cardBg: '#ffffff',
//   text: '#1e293b',
//   textLight: '#64748b',
//   textMuted: '#94a3b8',
//   border: '#e2e8f0',
//   shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
// };

// const PageContainer = styled(Container)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 80vh;
//   padding: 2rem 1.5rem;
// `;

// const Title = styled.h1`
//   color: ${theme.text};
//   font-size: 2.75rem;
//   font-weight: 800;
//   margin-bottom: 2rem;
//   text-align: center;
//   position: relative;

//   &:after {
//     content: '';
//     position: absolute;
//     bottom: -12px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 60px;
//     height: 4px;
//     background: linear-gradient(90deg, ${theme.primary}, ${theme.accent});
//     border-radius: 4px;
//   }
// `;

// const LoginCard = styled(Card)`
//   width: 100%;
//   max-width: 450px;
//   border-radius: 16px;
//   box-shadow: ${theme.shadow};
//   overflow: hidden;
//   background: ${theme.cardBg};
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//   }
// `;

// const CardHeader = styled.div`
//   background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
//   padding: 2rem;
//   text-align: center;
//   color: white;
// `;

// const CardTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin: 0;
// `;

// const CardContent = styled.div`
//   padding: 2rem;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   position: relative;
// `;

// const Label = styled.label`
//   color: ${theme.text};
//   font-weight: 600;
//   font-size: 0.95rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   svg {
//     color: ${theme.primary};
//   }
// `;

// const InputWrapper = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.9rem 1rem 0.9rem 2.75rem;
//   border: 1px solid ${theme.border};
//   border-radius: 8px;
//   background-color: ${theme.background};
//   color: ${theme.text};
//   font-size: 1rem;
//   transition: all 0.3s ease;

//   &:focus {
//     outline: none;
//     border-color: ${theme.primary};
//     box-shadow: 0 0 0 3px ${theme.primaryLight};
//   }

//   &::placeholder {
//     color: ${theme.textMuted};
//   }
// `;

// const InputIcon = styled.div`
//   position: absolute;
//   left: 1rem;
//   color: ${theme.textLight};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const PasswordToggle = styled.button`
//   position: absolute;
//   right: 1rem;
//   background: none;
//   border: none;
//   color: ${theme.textLight};
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: color 0.2s ease;

//   &:hover {
//     color: ${theme.primary};
//   }
// `;

// const RememberForgot = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: -0.5rem;
// `;

// const RememberMe = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
  
//   input {
//     accent-color: ${theme.primary};
//     width: 16px;
//     height: 16px;
//   }
  
//   label {
//     color: ${theme.textLight};
//     font-size: 0.9rem;
//     cursor: pointer;
//   }
// `;

// const ForgotPassword = styled(Link)`
//   color: ${theme.primary};
//   font-size: 0.9rem;
//   font-weight: 500;
//   transition: color 0.2s ease;
  
//   &:hover {
//     color: ${theme.primaryDark};
//     text-decoration: underline;
//   }
// `;

// const LoginButton = styled(Button)`
//   background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
//   color: white;
//   font-weight: 600;
//   padding: 1rem;
//   border-radius: 8px;
//   border: none;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   margin-top: 0.5rem;
//   width: 100%;
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
//   }
  
//   &:active {
//     transform: translateY(0);
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//     transform: none;
//     box-shadow: none;
//   }
// `;

// const ErrorMessage = styled.div`
//   background-color: #fee2e2;
//   color: ${theme.danger};
//   padding: 0.75rem;
//   border-radius: 8px;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.9rem;

//   svg {
//     color: ${theme.danger};
//   }
// `;

// const SignupPrompt = styled.div`
//   text-align: center;
//   margin-top: 1.5rem;
//   color: ${theme.textLight};
//   font-size: 0.95rem;
// `;

// const SignupLink = styled(Link)`
//   color: ${theme.primary};
//   font-weight: 600;
//   transition: color 0.2s ease;
//   margin-left: 0.25rem;
  
//   &:hover {
//     color: ${theme.primaryDark};
//     text-decoration: underline;
//   }
// `;

// export const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
    
//     // Find admin in mockAdmins data
//     const admin = mockAdmins.find(
//       (admin) => admin.email === email && admin.password === password
//     );

//     if (admin) {
//       // Simulate a short loading time
//       setTimeout(() => {
//         // Store admin info in localStorage
//         localStorage.setItem('adminToken', 'mock-admin-token');
//         localStorage.setItem('adminInfo', JSON.stringify({
//           id: admin.id,
//           email: admin.email,
//           role: 'admin'
//         }));
        
//         // If "remember me" is checked
//         if (rememberMe) {
//           localStorage.setItem('rememberAdmin', 'true');
//         }
        
//         console.log('Login successful:', admin);
        
//         // Redirect to admin panel
//         navigate('/admin-panel');
//       }, 500);
//     } else {
//       setError('Invalid email or password. Please try again.');
//       setLoading(false);
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <PageContainer>
//       <Title>Admin Login</Title>
//       <LoginCard>
//         <CardHeader>
//           <CardTitle>Rural Health+ Admin Access</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {error && (
//             <ErrorMessage>
//               <AlertCircle size={18} />
//               {error}
//             </ErrorMessage>
//           )}

//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label htmlFor="email">
//                 <Mail size={16} /> Email Address
//               </Label>
//               <InputWrapper>
//                 <InputIcon>
//                   <Mail size={18} />
//                 </InputIcon>
//                 <Input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="admin@example.com"
//                   required
//                   disabled={loading}
//                 />
//               </InputWrapper>
//             </FormGroup>

//             <FormGroup>
//               <Label htmlFor="password">
//                 <Lock size={16} /> Password
//               </Label>
//               <InputWrapper>
//                 <InputIcon>
//                   <Lock size={18} />
//                 </InputIcon>
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   disabled={loading}
//                 />
//                 <PasswordToggle 
//                   type="button" 
//                   onClick={toggleShowPassword}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   disabled={loading}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </PasswordToggle>
//               </InputWrapper>
//             </FormGroup>

//             <RememberForgot>
//               <RememberMe>
//                 <input 
//                   type="checkbox" 
//                   id="remember" 
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   disabled={loading}
//                 />
//                 <label htmlFor="remember">Remember me</label>
//               </RememberMe>
//               <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
//             </RememberForgot>

//             <LoginButton type="submit" disabled={loading}>
//               <LogIn size={18} />
//               {loading ? 'Logging in...' : 'Sign In to Dashboard'}
//             </LoginButton>
//           </Form>
          
//           <SignupPrompt>
//             Don't have an account?
//             <SignupLink to="/admin-signup">Register here</SignupLink>
//           </SignupPrompt>

//           {/* Development helper - shows available mock accounts */}
//           {process.env.NODE_ENV === 'development' && (
//             <div style={{ 
//               marginTop: '1.5rem', 
//               padding: '1rem', 
//               background: theme.primaryLight, 
//               borderRadius: '8px',
//               fontSize: '0.85rem'
//             }}>
//               <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Development Accounts:</div>
//               <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
//                 {mockAdmins.map(admin => (
//                   <li key={admin.id}>
//                     Email: <span style={{ fontWeight: 'bold' }}>{admin.email}</span>, 
//                     Password: <span style={{ fontWeight: 'bold' }}>{admin.password}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </CardContent>
//       </LoginCard>
//     </PageContainer>
//   );
// };





import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { mockAdmins } from '../data/mockAdmins';

// Modern health-themed color palette
const theme = {
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1e40af',
  secondary: '#10b981',
  secondaryLight: '#d1fae5',
  accent: '#8b5cf6',
  accentLight: '#f3e8ff',
  warning: '#f59e0b',
  danger: '#ef4444',
  background: '#f8fafc',
  cardBg: '#ffffff',
  text: '#1e293b',
  textLight: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
};

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem 1.5rem;
`;

const Title = styled.h1`
  color: ${theme.text};
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.primary}, ${theme.accent});
    border-radius: 4px;
  }
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  box-shadow: ${theme.shadow};
  overflow: hidden;
  background: ${theme.cardBg};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
  padding: 2rem;
  text-align: center;
  color: white;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Label = styled.label`
  color: ${theme.text};
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${theme.primary};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.75rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  background-color: ${theme.background};
  color: ${theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }

  &::placeholder {
    color: ${theme.textMuted};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${theme.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: ${theme.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.primary};
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.5rem;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    accent-color: ${theme.primary};
    width: 16px;
    height: 16px;
  }
  
  label {
    color: ${theme.textLight};
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

const ForgotPassword = styled(Link)`
  color: ${theme.primary};
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.primaryDark};
    text-decoration: underline;
  }
`;

const LoginButton = styled(Button)`
  background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: ${theme.danger};
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  svg {
    color: ${theme.danger};
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${theme.textLight};
  font-size: 0.95rem;
`;

const SignupLink = styled(Link)`
  color: ${theme.primary};
  font-weight: 600;
  transition: color 0.2s ease;
  margin-left: 0.25rem;
  
  &:hover {
    color: ${theme.primaryDark};
    text-decoration: underline;
  }
`;

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Find admin in mockAdmins data
    const admin = mockAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (admin) {
      // Simulate a short loading time
      setTimeout(() => {
        // Store admin info in localStorage
        localStorage.setItem('adminToken', 'mock-admin-token');
        localStorage.setItem('adminInfo', JSON.stringify({
          id: admin.id,
          email: admin.email,
          role: 'admin'
        }));
        
        // If "remember me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        }
        
        console.log('Login successful:', admin);
        
        // Redirect to admin panel
        navigate('/admin-panel');
      }, 500);
    } else {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer>
      <Title>Admin Login</Title>
      <LoginCard>
        <CardHeader>
          <CardTitle>Rural Health+ Admin Access</CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {error}
            </ErrorMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">
                <Mail size={16} /> Email Address
              </Label>
              <InputWrapper>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                <Lock size={16} /> Password
              </Label>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
                <PasswordToggle 
                  type="button" 
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>

            <RememberForgot>
              <RememberMe>
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  disabled={loading}
                />
                <label htmlFor="remember">Remember me</label>
              </RememberMe>
              <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
            </RememberForgot>

            <LoginButton type="submit" disabled={loading}>
              <LogIn size={18} />
              {loading ? 'Logging in...' : 'Sign In to Dashboard'}
            </LoginButton>
          </Form>
          
          <SignupPrompt>
            Don't have an account?
            <SignupLink to="/admin-signup">Register here</SignupLink>
          </SignupPrompt>

          {/* Development helper - shows available mock accounts */}
          {process.env.NODE_ENV !== 'production' && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: theme.primaryLight, 
              borderRadius: '8px',
              fontSize: '0.85rem'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Development Accounts:</div>
              <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                {mockAdmins.map(admin => (
                  <li key={admin.id}>
                    Email: <span style={{ fontWeight: 'bold' }}>{admin.email}</span>, 
                    Password: <span style={{ fontWeight: 'bold' }}>{admin.password}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </LoginCard>
    </PageContainer>
  );
};
