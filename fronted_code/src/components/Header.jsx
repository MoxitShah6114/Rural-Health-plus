import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, User, X, Heart, Bell, UserPlus } from 'lucide-react';
import { Container } from './common/Container';
import { Button } from './common/Button';

// Enhanced health-themed color palette
const theme = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#dbeafe',
  secondary: '#10b981',
  secondaryLight: '#d1fae5',
  accent: '#8b5cf6',
  accentLight: '#f3e8ff',
  background: '#ffffff',
  backgroundAlt: '#f8fafc',
  text: '#1e293b',
  textLight: '#64748b',
  border: '#e2e8f0',
  borderDark: '#cbd5e1',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
};

const HeaderWrapper = styled.header`
  background-color: ${theme.background};
  border-bottom: 1px solid ${theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${theme.shadow};
  transition: all 0.3s ease;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
  padding: 0 1.5rem;
  max-width: 1400px;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    color: ${theme.primaryDark};
  }
`;

const LogoIcon = styled.span`
  color: ${theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${theme.primaryLight};
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scale(0.8);
  }
  
  ${Logo}:hover &::after {
    transform: scale(1.1);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${theme.text};
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.primaryLight};
    color: ${theme.primary};
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 880px) {
    display: none;
  }
`;

const LoginButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 880px) {
    display: none;
  }
`;

const LoginButton = styled(Button)`
  padding: ${props => props.variant === 'outline' ? '0.5rem 1.25rem' : '0.5rem 1.25rem'};
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border-radius: 9999px;
  
  ${props => props.variant === 'outline' ? `
    background-color: transparent;
    color: ${theme.primary};
    border: 2px solid ${theme.primary};
    
    &:hover {
      background-color: ${theme.primaryLight};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    }
  ` : `
    background-color: ${theme.accent};
    color: white;
    border: none;
    
    &:hover {
      background-color: #7c3aed;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }
  `}
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: ${theme.secondary};
  border-radius: 50%;
  border: 2px solid white;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${theme.background};
  z-index: 200;
  display: flex;
  flex-direction: column;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  box-shadow: ${props => props.isOpen ? '0 0 0 100vw rgba(0,0,0,0.5)' : 'none'};
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.border};
`;

const MobileMenuClose = styled(IconButton)`
  font-size: 1.5rem;
`;

const MobileActions = styled.div`
  margin-top: auto;
  padding: 1.5rem;
  border-top: 1px solid ${theme.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${theme.backgroundAlt};
`;

const MobileLoginButton = styled(Button)`
  background-color: ${props => props.variant === 'secondary' ? theme.accent : theme.primary};
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem;
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.variant === 'secondary' ? '#7c3aed' : theme.primaryDark};
    transform: translateY(-2px);
  }
`;

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <Logo to="/">
            <LogoIcon><Heart size={24} /></LogoIcon>
            Rural Health+
          </Logo>

          <Actions>
            <IconButton aria-label="Notifications">
              <Bell size={20} />
              <NotificationBadge />
            </IconButton>

            <LoginButtonGroup>
              <LoginButton as={Link} to="/patient-login">
                <UserPlus size={16} />
                Patient Login
              </LoginButton>
              
              <LoginButton as={Link} to="/doctor-login" variant="outline">
                <User size={16} />
                Doctor Login
              </LoginButton>
            </LoginButtonGroup>

            <MobileMenuButton onClick={toggleMobileMenu} aria-label="Open menu">
              <Menu size={24} />
            </MobileMenuButton>
          </Actions>
        </HeaderContainer>
      </HeaderWrapper>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to="/" onClick={closeMobileMenu}>
            <LogoIcon><Heart size={24} /></LogoIcon>
            Rural Health+
          </Logo>
          <MobileMenuClose onClick={closeMobileMenu} aria-label="Close menu">
            <X size={24} />
          </MobileMenuClose>
        </MobileMenuHeader>

        <MobileActions>
          <MobileLoginButton as={Link} to="/patient-login" onClick={closeMobileMenu}>
            <UserPlus size={20} />
            Patient Login
          </MobileLoginButton>
          
          <MobileLoginButton as={Link} to="/doctor-login" onClick={closeMobileMenu} variant="secondary">
            <User size={20} />
            Doctor Login
          </MobileLoginButton>
        </MobileActions>
      </MobileMenu>
    </>
  );
};
