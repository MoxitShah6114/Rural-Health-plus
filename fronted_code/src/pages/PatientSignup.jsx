import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { patientSignup } from './api'; // Ensure this line is present

import { 
  User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, 
  CheckCircle, AlertCircle, Heart 
} from 'lucide-react';

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

const SignupCard = styled(Card)`
  width: 100%;
  max-width: 500px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const CardIcon = styled.div`
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardSubtitle = styled.p`
  margin-top: 0.75rem;
  margin-bottom: 0;
  opacity: 0.9;
  font-size: 0.95rem;
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

const PasswordStrengthMeter = styled.div`
  height: 4px;
  background-color: ${theme.border};
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const PasswordStrengthIndicator = styled.div`
  height: 100%;
  width: ${props => props.strength}%;
  background-color: ${props => {
    if (props.strength < 30) return theme.danger;
    if (props.strength < 70) return theme.warning;
    return theme.secondary;
  }};
  transition: all 0.3s ease;
`;

const PasswordStrengthText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  
  span {
    color: ${props => {
      if (props.strength < 30) return theme.danger;
      if (props.strength < 70) return theme.warning;
      return theme.secondary;
    }};
    font-weight: 500;
  }
`;

const PasswordRequirements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  color: ${theme.textLight};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem 1rem;
`;

const PasswordRequirement = styled.li`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    color: ${props => props.met ? theme.secondary : theme.textMuted};
    width: 14px;
    height: 14px;
  }
`;

const SignupButton = styled(Button)`
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.border};
  }
  
  span {
    padding: 0 1rem;
    color: ${theme.textLight};
    font-size: 0.9rem;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: ${theme.textLight};
  font-size: 0.95rem;
`;

const LoginLink = styled(Link)`
  color: ${theme.primary};
  font-weight: 600;
  transition: color 0.2s ease;
  margin-left: 0.25rem;
  
  &:hover {
    color: ${theme.primaryDark};
    text-decoration: underline;
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

const RequiredIndicator = styled.span`
  color: ${theme.danger};
  margin-left: 0.25rem;
`;
export const PatientSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains a number", met: /[0-9]/.test(formData.password) },
    { text: "Contains special character", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    if (name === 'password') {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 8) strength += 20;
      if (/[A-Z]/.test(value)) strength += 20;
      if (/[a-z]/.test(value)) strength += 20;
      if (/[0-9]/.test(value)) strength += 20;
      if (/[^A-Za-z0-9]/.test(value)) strength += 20;
      
      setPasswordStrength(strength);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
  
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.password) {
      setError('All fields are required');
      return;
    }
  
    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      const response = await patientSignup({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });
      
      console.log('Signup successful:', response);
      
      // Redirect to login page after successful signup
      alert('Signup successful! You can now log in.');
      navigate('/patient-login');
    } catch (error) {
      console.error('Signup error:', error);
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Signup failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred during signup. Please try again.');
      }
    }
  };
  



  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <PageContainer>
      <Title>Patient Signup</Title>
      <SignupCard>
        <CardHeader>
          <CardTitle>
            <CardIcon>
              <Heart size={20} />
            </CardIcon>
            Create Your Patient Account
          </CardTitle>
          <CardSubtitle>
            Join our healthcare platform to access medical services
          </CardSubtitle>
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
              <Label htmlFor="fullName">
                <User size={16} /> Full Name <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <InputWrapper>
                <InputIcon>
                  <User size={18} />
                </InputIcon>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">
                <Mail size={16} /> Email Address <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <InputWrapper>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="mobile">
                <Phone size={16} /> Mobile Number <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <InputWrapper>
                <InputIcon>
                  <Phone size={18} />
                </InputIcon>
                <Input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">
                <Lock size={16} /> Password <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
                <PasswordToggle 
                  type="button" 
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
              <PasswordStrengthMeter>
                <PasswordStrengthIndicator strength={passwordStrength} />
              </PasswordStrengthMeter>
              <PasswordStrengthText strength={passwordStrength}>
                <div>Password Strength:</div>
                <span>
                  {passwordStrength < 30 ? "Weak" : 
                   passwordStrength < 70 ? "Moderate" : "Strong"}
                </span>
              </PasswordStrengthText>
              <PasswordRequirements>
                {passwordRequirements.map((req, index) => (
                  <PasswordRequirement key={index} met={req.met}>
                    {req.met ? <CheckCircle size={14} /> : <CheckCircle size={14} />} {req.text}
                  </PasswordRequirement>
                ))}
              </PasswordRequirements>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">
                <Lock size={16} /> Confirm Password <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <PasswordToggle 
                  type="button" 
                  onClick={toggleShowConfirmPassword}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>
            
            <SignupButton type="submit">
              <UserPlus size={18} />
              Create Account
            </SignupButton>
          </Form>
          
          <Divider>
            <span>OR</span>
          </Divider>
          
          <LoginPrompt>
            Already have an account?
            <LoginLink to="/patient-login">
              Login here
            </LoginLink>
          </LoginPrompt>
        </CardContent>
      </SignupCard>
    </PageContainer>
  );
};
