import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, Brain, Pill, Bell, Activity, ArrowRight, UserPlus, 
  Heart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, 
  ArrowUp, ChevronRight, Calendar, FileText, HelpCircle, Shield
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
// import { Header_0 } from '../components/Header_0';

// Modern healthcare color palette
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
  footerBg: '#1e293b',
  footerText: '#e2e8f0',
  footerMuted: '#94a3b8',
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 0;
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 1000px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HighlightText = styled.span`
  position: relative;
  color: #fff;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    bottom: 5px;
    height: 12px;
    background-color: ${theme.accent};
    z-index: -1;
    opacity: 0.5;
    transform: skew(-12deg) rotate(-2deg);
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.35rem;
  margin: 2rem auto;
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

const CTAButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const CTAButton = styled(Button)`
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  min-width: 220px;
  justify-content: center;
  
  &:first-child {
    background-color: white;
    color: ${theme.primary};
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      background-color: #f8fafc;
    }
  }
  
  &:last-child {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-3px);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const ServicesSection = styled.section`
  padding: 6rem 0;
  background-color: ${theme.background};
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${theme.text};
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.primary}, ${theme.accent});
    border-radius: 4px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${theme.textLight};
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${theme.border};
  background: ${theme.cardBg};
  box-shadow: ${theme.shadow};
  padding: 2rem;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadowHover};
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || theme.primaryLight};
  color: ${props => props.iconColor || theme.primary};
  border-radius: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: inherit;
    opacity: 0.4;
    transform: scale(0.85);
  }
`;

const ServiceTitle = styled.h3`
  margin: 1rem 0;
  color: ${theme.text};
  font-size: 1.35rem;
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  color: ${theme.textLight};
  margin-bottom: 1.75rem;
  line-height: 1.6;
`;

const LearnMoreButton = styled(Button)`
  background: transparent;
  color: ${theme.primary};
  font-weight: 600;
  border: 2px solid ${theme.primaryLight};
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${theme.primaryLight};
    transform: translateY(-2px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

// Footer Styles
const FooterSection = styled.footer`
  background-color: ${theme.footerBg};
  color: ${theme.footerText};
  padding: 4rem 0 0;
`;

const FooterContainer = styled(Container)`
  max-width: 1200px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const FooterLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.25rem;
  
  &:hover {
    color: ${theme.primaryLight};
  }
`;

const LogoIconWrapper = styled.span`
  color: ${theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const FooterDescription = styled.p`
  color: ${theme.footerMuted};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 300px;
`;

const FooterColumnTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, ${theme.primary}, ${theme.accent});
    border-radius: 2px;
  }
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: ${theme.footerMuted};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    transform: translateX(3px);
  }
  
  svg {
    font-size: 0.75rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${theme.footerMuted};
  
  svg {
    margin-top: 0.25rem;
    color: ${theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.color || theme.primary};
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const Copyright = styled.p`
  color: ${theme.footerMuted};
  font-size: 0.9rem;
  
  a {
    color: ${theme.footerText};
    font-weight: 500;
    
    &:hover {
      color: ${theme.primary};
    }
  }
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const FooterBottomLink = styled(Link)`
  color: ${theme.footerMuted};
  font-size: 0.9rem;
  
  &:hover {
    color: white;
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transition: all 0.3s ease;
  z-index: 99;
  
  &:hover {
    background: ${theme.primaryDark};
    transform: translateY(-3px);
  }
`;

const services = [
  {
    icon: <Stethoscope size={32} />,
    title: 'Telemedicine',
    description: 'Connect with healthcare professionals from the comfort of your home through secure video consultations.',
    link: '/telemedicine',
    bgColor: theme.primaryLight,
    iconColor: theme.primary
  },
  {
    icon: <Brain size={32} />,
    title: 'Symptom Checker',
    description: 'Get AI-powered preliminary diagnosis based on your symptoms and receive guidance on next steps.',
    link: '/symptom-checker',
    bgColor: theme.accentLight,
    iconColor: theme.accent
  },
  {
    icon: <Pill size={32} />,
    title: 'Order Medicine',
    description: 'Order prescribed medications with doorstep delivery to ensure you never run out of essential medicines.',
    link: '/order-medicine',
    bgColor: theme.secondaryLight,
    iconColor: theme.secondary
  },
  {
    icon: <Bell size={32} />,
    title: 'Medication Reminders',
    description: 'Never miss your medications with smart reminders and track your health progress over time.',
    link: '/set-reminder',
    bgColor: '#fff3cd',
    iconColor: theme.warning
  }
];

export const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* <Header_0 /> */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Healthcare at Your <HighlightText>Fingertips</HighlightText>
          </HeroTitle>
          <HeroSubtitle>
            Bringing quality healthcare services to rural communities through technology,
            making healthcare accessible to everyone, everywhere.
          </HeroSubtitle>
          <CTAButtonGroup>
            <CTAButton as={Link} to="/patient-signup">
              <Activity size={20} />
              Get Started as Patient
            </CTAButton>
            <CTAButton as={Link} to="/doctor-signup">
              <UserPlus size={20} />
              Join as Doctor
            </CTAButton>
          </CTAButtonGroup>
        </HeroContent>
      </HeroSection>

      <ServicesSection>
        <Container>
          <SectionTitle>Our Services</SectionTitle>
          <SectionSubtitle>
            Discover how our platform brings essential healthcare services directly to you,
            no matter where you are located.
          </SectionSubtitle>
          
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <IconWrapper bgColor={service.bgColor} iconColor={service.iconColor}>
                  {service.icon}
                </IconWrapper>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <LearnMoreButton as={Link} to={service.link}>
                  Learn More
                  <ArrowRight size={16} />
                </LearnMoreButton>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

      {/* Footer Section */}
      <FooterSection>
        <FooterContainer>
          <FooterGrid>
            <div>
              <FooterLogo to="/">
                <LogoIconWrapper>
                  <Heart size={20} />
                </LogoIconWrapper>
                Rural Health+
              </FooterLogo>
              <FooterDescription>
                Providing accessible healthcare solutions to rural communities through 
                technology and innovation. Our mission is to ensure quality healthcare 
                for everyone, everywhere.
              </FooterDescription>
              <SocialLinks>
                <SocialLink href="#" color="#4267B2" aria-label="Facebook">
                  <Facebook size={18} />
                </SocialLink>
                <SocialLink href="#" color="#1DA1F2" aria-label="Twitter">
                  <Twitter size={18} />
                </SocialLink>
                <SocialLink href="#" color="#0077B5" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </SocialLink>
                <SocialLink href="#" color="#E4405F" aria-label="Instagram">
                  <Instagram size={18} />
                </SocialLink>
              </SocialLinks>
            </div>
            
            <div>
              <FooterColumnTitle>About Us</FooterColumnTitle>
              <FooterLinkList>
                <FooterLinkItem>
                  <FooterLink to="/about">
                    <ChevronRight size={14} />
                    About Us
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/annual-checkup">
                    <ChevronRight size={14} />
                    Annual Checkup
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/blog">
                    <ChevronRight size={14} />
                    Blog
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/careers">
                    <ChevronRight size={14} />
                    Careers
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/get-diagnosis">
                    <ChevronRight size={14} />
                    Get A Diagnosis
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/how-it-works">
                    <ChevronRight size={14} />
                    How It Works
                  </FooterLink>
                </FooterLinkItem>
              </FooterLinkList>
            </div>
            
            <div>
              <FooterColumnTitle>Top Insurances</FooterColumnTitle>
              <FooterLinkList>
                <FooterLinkItem>
                  <FooterLink to="/insurance/aetna">
                    <ChevronRight size={14} />
                    Aetna
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/insurance/health-net">
                    <ChevronRight size={14} />
                    Health Net
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/insurance/health-plan">
                    <ChevronRight size={14} />
                    Health Plan
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/insurance/health-smarth">
                    <ChevronRight size={14} />
                    Health Smarth
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/insurance/blue-shield">
                    <ChevronRight size={14} />
                    Blue Shield
                  </FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/insurance/more">
                    <ChevronRight size={14} />
                    View More
                  </FooterLink>
                </FooterLinkItem>
              </FooterLinkList>
            </div>
            
            <div>
              <FooterColumnTitle>Contact Us</FooterColumnTitle>
              <ContactItem>
                <MapPin size={18} />
                <div>123 Healthcare Avenue, Rural County, State 12345</div>
              </ContactItem>
              <ContactItem>
                <Phone size={18} />
                <div>+1 (800) 123-4567</div>
              </ContactItem>
              <ContactItem>
                <Mail size={18} />
                <div>info@ruralhealth.plus</div>
              </ContactItem>
              <FooterColumnTitle style={{ marginTop: '2rem' }}>Follow Us</FooterColumnTitle>
              <SocialLinks>
                <SocialLink href="#" color="#4267B2" aria-label="Facebook">
                  <Facebook size={18} />
                </SocialLink>
                <SocialLink href="#" color="#1DA1F2" aria-label="Twitter">
                  <Twitter size={18} />
                </SocialLink>
                <SocialLink href="#" color="#0077B5" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </SocialLink>
                <SocialLink href="#" color="#E4405F" aria-label="Instagram">
                  <Instagram size={18} />
                </SocialLink>
              </SocialLinks>
            </div>
          </FooterGrid>
          
          <FooterBottom>
            <Copyright>
              © {new Date().getFullYear()} Rural Health+. All rights reserved. Developed by{' '}
              <a href="#" target="_blank" rel="noopener noreferrer">
                Rural Health+
              </a>
            </Copyright>
            <FooterBottomLinks>
              <FooterBottomLink to="/privacy-policy">Privacy Policy</FooterBottomLink>
              <FooterBottomLink to="/terms">Terms & Conditions</FooterBottomLink>
              <FooterBottomLink to="/contact">Contact Us</FooterBottomLink>
              <FooterBottomLink to="/faq">FAQ</FooterBottomLink>
            </FooterBottomLinks>
          </FooterBottom>
        </FooterContainer>
      </FooterSection>
      
      <ScrollToTop onClick={scrollToTop} aria-label="Scroll to top">
        <ArrowUp size={20} />
      </ScrollToTop>
    </>
  );
};
