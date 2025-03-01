import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Stethoscope, 
  Eye, 
  Pill, 
  Activity 
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { departments } from '../data/mockData';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Page wrapper for background styling
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #f9fafc, #f0f4f8);
  min-height: 100vh;
  padding: 2rem 0 4rem;
`;

// Enhanced container with max-width
const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
`;

// Header section with enhanced styling
const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), #4a90e2);
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  margin: 0.5rem 0;
  color: var(--text);
  font-size: 2.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), #4a90e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-light);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 1rem auto 2rem;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

// Enhanced grid layout for services
const DepartmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Enhanced card with hover effects
const DepartmentCard = styled(Card)`
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: white;
  animation: ${fadeIn} 0.6s ease-out both;
  animation-delay: ${props => props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
    
    ${props => props.iconColor && `
      & > div:first-child {
        background-color: ${props.iconColor};
        transform: scale(1.1);
      }
    `}
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.iconColor || 'var(--primary)'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

// Enhanced icon wrapper
const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || 'var(--primary)'};
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  
  svg {
    transition: transform 0.3s ease;
  }
  
  ${DepartmentCard}:hover & svg {
    transform: scale(1.1);
  }
`;

// Enhanced title styling
const DepartmentTitle = styled.h3`
  color: var(--text);
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

// Enhanced description styling
const DepartmentDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

// Button for call-to-action
const LearnMoreButton = styled.span`
  display: inline-block;
  margin-top: auto;
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  border: 2px solid ${props => props.color || 'var(--primary)'};
  color: ${props => props.color || 'var(--primary)'};
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  ${DepartmentCard}:hover & {
    background-color: ${props => props.color || 'var(--primary)'};
    color: white;
  }
`;

// Section divider
const SectionDivider = styled.div`
  margin: 4rem 0;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--border);
    z-index: 1;
  }
`;

const DividerText = styled.span`
  background: linear-gradient(to bottom, #f9fafc, #f0f4f8);
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
  color: var(--text-light);
  font-weight: 500;
`;

// Info section
const InfoSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out;
`;

const InfoTitle = styled.h2`
  color: var(--text);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--primary);
    border-radius: 2px;
  }
`;

const InfoText = styled.p`
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const BenefitsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const BenefitItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  background-color: #f8fafc;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #eef2f7;
    transform: translateY(-3px);
  }
  
  svg {
    color: var(--primary);
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
`;

const BenefitText = styled.span`
  color: var(--text);
  font-weight: 500;
`;

// Function to get icon based on icon name
const getIcon = (iconName, size = 32) => {
  switch (iconName) {
    case 'heart':
      return <Heart size={size} />;
    case 'brain':
      return <Brain size={size} />;
    case 'baby':
      return <Baby size={size} />;
    case 'bone':
      return <Bone size={size} />;
    case 'stethoscope':
      return <Stethoscope size={size} />;
    case 'eye':
      return <Eye size={size} />;
    case 'pill':
      return <Pill size={size} />;
    case 'activity':
      return <Activity size={size} />;
    default:
      return null;
  }
};

// Enhanced department data with additional services and colors
const enhancedDepartments = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart and cardiovascular system specialists for diagnosis and treatment of heart conditions.',
    icon: 'heart',
    color: '#e74c3c'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Brain and nervous system specialists treating conditions like stroke, epilepsy, and migraines.',
    icon: 'brain',
    color: '#3498db'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Child healthcare specialists providing comprehensive care for infants, children, and adolescents.',
    icon: 'baby',
    color: '#27ae60'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Bone and joint specialists treating injuries, arthritis, and other musculoskeletal conditions.',
    icon: 'bone',
    color: '#f39c12'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Skin, hair, and nail specialists treating conditions like acne, eczema, and skin cancer.',
    icon: 'stethoscope',
    color: '#9b59b6'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    description: 'Eye care specialists treating vision problems, eye diseases, and performing eye surgeries.',
    icon: 'eye',
    color: '#16a085'
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    description: 'Hormone specialists treating diabetes, thyroid disorders, and other endocrine conditions.',
    icon: 'activity',
    color: '#e67e22'
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    description: 'Mental health specialists providing therapy and medication for psychological conditions.',
    icon: 'pill',
    color: '#8e44ad'
  }
];

export const Telemedicine = () => {
  return (
    <PageWrapper>
      <StyledContainer>
        <HeaderSection>
          <Title>Telemedicine Services</Title>
          <Subtitle>
            Connect with top specialists from the comfort of your home. 
            Our telemedicine platform provides secure video consultations, 
            digital prescriptions, and continuous care.
          </Subtitle>
        </HeaderSection>
        
        <DepartmentsGrid>
          {enhancedDepartments.map((department, index) => (
            <DepartmentCard
              key={department.id}
              as={Link}
              to={`/doctor-list/${department.id}`}
              iconColor={department.color}
              index={index}
            >
              <IconWrapper color={department.color}>
                {getIcon(department.icon)}
              </IconWrapper>
              <DepartmentTitle>{department.name}</DepartmentTitle>
              <DepartmentDescription>
                {department.description}
              </DepartmentDescription>
              <LearnMoreButton color={department.color}>
                Find Specialists
              </LearnMoreButton>
            </DepartmentCard>
          ))}
        </DepartmentsGrid>
        
        <SectionDivider>
          <DividerText>Why Choose Telemedicine</DividerText>
        </SectionDivider>
        
        <InfoSection>
          <InfoTitle>Benefits of Telemedicine</InfoTitle>
          <InfoText>
            Telemedicine offers convenient access to healthcare from anywhere, eliminating travel time and 
            reducing exposure to other illnesses. Our platform connects you with board-certified specialists 
            who can diagnose conditions, prescribe medications, and provide follow-up care through secure 
            video consultations.
          </InfoText>
          
          <BenefitsList>
            <BenefitItem>
              <Activity size={20} />
              <BenefitText>Convenience & Accessibility</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <Stethoscope size={20} />
              <BenefitText>Board-Certified Specialists</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <Pill size={20} />
              <BenefitText>Digital Prescriptions</BenefitText>
            </BenefitItem>
            <BenefitItem>
              <Heart size={20} />
              <BenefitText>Continuous Care</BenefitText>
            </BenefitItem>
          </BenefitsList>
          
          <InfoText>
            Our telemedicine platform is HIPAA-compliant, ensuring your medical information remains private and secure. 
            Many insurance plans cover telemedicine visits, and we offer affordable self-pay options for those without coverage.
          </InfoText>
        </InfoSection>
      </StyledContainer>
    </PageWrapper>
  );
};
