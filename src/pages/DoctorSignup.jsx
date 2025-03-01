import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { User, Mail, Phone, Award, Briefcase, Clock, Lock, FileText, Upload, ChevronRight, CheckCircle } from 'lucide-react';
import { departments } from '../data/departments';

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
  max-width: 1100px;
  padding: 3rem 1.5rem;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${theme.text};
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.primary}, ${theme.accent});
    border-radius: 4px;
  }
`;

const Subtitle = styled.p`
  color: ${theme.textLight};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`;

const FormCard = styled.div`
  background: ${theme.cardBg};
  border-radius: 16px;
  box-shadow: ${theme.shadow};
  overflow: hidden;
  margin-bottom: 2rem;
`;

const FormHeader = styled.div`
  background: linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark});
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SignupForm = styled.form`
  padding: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.spacious ? '2rem' : '1.5rem'};
  position: relative;
  
  ${props => props.fullWidth && `
    grid-column: 1 / -1;
  `}
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.75rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: ${theme.background};
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

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.75rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: ${theme.background};
  color: ${theme.text};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.75rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: ${theme.background};
  color: ${theme.text};
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
  
  &::placeholder {
    color: ${theme.textMuted};
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed ${theme.border};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${theme.background};
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${theme.primary};
    background-color: ${theme.primaryLight}10;
  }
  
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 1rem;
  color: ${theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.5;
  }
`;

const UploadText = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${theme.text};
`;

const UploadSubtext = styled.div`
  color: ${theme.textLight};
  font-size: 0.9rem;
`;

const SelectedFile = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: ${theme.primaryLight};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.primary};
  font-size: 0.9rem;
  
  svg {
    color: ${theme.secondary};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${theme.border};
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SignupButton = styled(Button)`
  background: linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark});
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SignupPrompt = styled.div`
  color: ${theme.textLight};
  
  a {
    color: ${theme.primary};
    font-weight: 600;
    margin-left: 0.25rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${theme.primaryDark};
      text-decoration: underline;
    }
  }
`;

const RequiredIndicator = styled.span`
  color: ${theme.danger};
  margin-left: 0.25rem;
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
`;

const PasswordRequirement = styled.li`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    color: ${props => props.met ? theme.secondary : theme.textMuted};
    width: 14px;
    height: 14px;
  }
`;

export const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    licenseNumber: '',
    specialty: '',
    experience: '',
    password: '',
    confirmPassword: '',
    biography: '',
    department: departments[0]?.id || '',
    image: null,
  });
  
  const [fileName, setFileName] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here (e.g., API call)
    console.log(formData);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Doctor Signup</Title>
        <Subtitle>
          Join our network of healthcare professionals and help us provide quality 
          healthcare services to rural communities.
        </Subtitle>
      </PageHeader>
      
      <FormCard>
        <FormHeader>
          <FormTitle>Create Your Doctor Account</FormTitle>
          <StepIndicator>Required fields are marked with <RequiredIndicator>*</RequiredIndicator></StepIndicator>
        </FormHeader>
        
        <SignupForm onSubmit={handleSubmit}>
          <FormGrid>
            {/* Personal Information */}
            <FormGroup>
              <FormLabel>
                <User size={16} /> Full Name <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <User size={18} />
                </InputIcon>
                <Input 
                  type="text" 
                  name="fullName" 
                  placeholder="Enter your full name" 
                  required 
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <User size={16} /> Username <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <User size={18} />
                </InputIcon>
                <Input 
                  type="text" 
                  name="username" 
                  placeholder="Choose a username" 
                  required 
                  value={formData.username}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <Mail size={16} /> Email Address <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <Phone size={16} /> Mobile Number <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Phone size={18} />
                </InputIcon>
                <Input 
                  type="tel" 
                  name="mobile" 
                  placeholder="+1 (123) 456-7890" 
                  required 
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            {/* Professional Information */}
            <FormGroup>
              <FormLabel>
                <Award size={16} /> Medical License Number <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Award size={18} />
                </InputIcon>
                <Input 
                  type="text" 
                  name="licenseNumber" 
                  placeholder="Enter your license number" 
                  required 
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <Briefcase size={16} /> Department <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Briefcase size={18} />
                </InputIcon>
                <Select 
                  name="department" 
                  required 
                  value={formData.department}
                  onChange={handleChange}
                >
                  {departments.map(department => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </Select>
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <Briefcase size={16} /> Specialty <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Briefcase size={18} />
                </InputIcon>
                <Input 
                  type="text" 
                  name="specialty" 
                  placeholder="Your medical specialty" 
                  required 
                  value={formData.specialty}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <Clock size={16} /> Years of Experience <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Clock size={18} />
                </InputIcon>
                <Input 
                  type="number" 
                  name="experience" 
                  placeholder="Number of years" 
                  required 
                  min="0"
                  max="70"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            {/* Security Information */}
            <FormGroup>
              <FormLabel>
                <Lock size={16} /> Password <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input 
                  type="password" 
                  name="password" 
                  placeholder="Create a strong password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
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
              <FormLabel>
                <Lock size={16} /> Confirm Password <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm your password" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            {/* Additional Information */}
            <FormGroup fullWidth>
              <FormLabel>
                <FileText size={16} /> Biography (Optional)
              </FormLabel>
              <InputWrapper>
                <InputIcon>
                  <FileText size={18} />
                </InputIcon>
                <TextArea 
                  name="biography" 
                  placeholder="Tell us about your education, specializations, and experience (500 characters max)" 
                  maxLength="500"
                  value={formData.biography}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup fullWidth>
              <FormLabel>
                <Upload size={16} /> Profile Image <RequiredIndicator>*</RequiredIndicator>
              </FormLabel>
              <FileUploadArea>
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  required
                  onChange={handleImageChange} 
                />
                <UploadIcon>
                  <Upload />
                </UploadIcon>
                <UploadText>Drag and drop your profile image here</UploadText>
                <UploadSubtext>or click to browse (JPG, PNG, max 5MB)</UploadSubtext>
                
                {fileName && (
                  <SelectedFile>
                    <CheckCircle size={16} /> {fileName}
                  </SelectedFile>
                )}
              </FileUploadArea>
            </FormGroup>
          </FormGrid>
          
          <FormActions>
            <SignupPrompt>
              Already have an account?<Link to="/doctor-login">Login here</Link>
            </SignupPrompt>
            <SignupButton type="submit">
              Create User <ChevronRight size={18} />
            </SignupButton>
          </FormActions>
        </SignupForm>
      </FormCard>
    </PageContainer>
  );
};
