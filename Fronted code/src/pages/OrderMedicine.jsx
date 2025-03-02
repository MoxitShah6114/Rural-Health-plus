import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  X, 
  ChevronRight, 
  ShoppingBag, 
  Pill, 
  Clipboard, 
  Thermometer, 
  Droplet,
  Clock,
  Truck,
  Shield,
  CreditCard,
  Star,
  Filter,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Check,
  ExternalLink,
  Plus,
  Minus,
  Package,
  Calendar
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { medicines } from '../data/mockData';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 4px 15px rgba(74, 107, 255, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(74, 107, 255, 0.65); }
  100% { transform: scale(1); box-shadow: 0 4px 15px rgba(74, 107, 255, 0.5); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Modern pharmacy-themed color palette
const theme = {
  primary: '#4361ee', // Refined blue
  primaryLight: '#eef2ff',
  primaryDark: '#3730a3',
  secondary: '#10b981', // Vibrant green
  secondaryLight: '#d1fae5',
  accent: '#8b5cf6', // Purple accent
  accentLight: '#f3e8ff',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6',
  background: '#f8fafc',
  cardBg: '#ffffff',
  text: '#1e293b',
  textLight: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
  shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  gradient: 'linear-gradient(135deg, #4361ee, #3b82f6)',
};

// Category colors
const categoryColors = {
  'Prescription': { bg: '#ef4444', light: '#fee2e2', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
  'Over-the-counter': { bg: '#3b82f6', light: '#dbeafe', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
  'Supplements': { bg: '#f59e0b', light: '#fef3c7', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  'Vitamins': { bg: '#10b981', light: '#d1fae5', gradient: 'linear-gradient(135deg, #10b981, #34d399)' }
};

// Page wrapper for background styling
const PageWrapper = styled.div`
  background: ${theme.background};
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(67, 97, 238, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 20%);
  min-height: 100vh;
  padding: 2rem 0 6rem;
  overflow-x: hidden;
`;

const PageContainer = styled(Container)`
  max-width: 1280px;
  padding: 0 1.5rem;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin: 2rem auto 3.5rem;
  max-width: 800px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: ${theme.gradient};
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  margin: 0.5rem 0;
  color: var(--text);
  font-size: 3rem;
  font-weight: 800;
  background: ${theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 0.8s ease-out;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.textLight};
  font-size: 1.25rem;
  max-width: 700px;
  margin: 1.25rem auto 2rem;
  line-height: 1.7;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

// Hero section
const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3rem 0 5rem;
  gap: 3rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  animation: ${fadeInLeft} 0.8s ease-out;
`;

const HeroTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  color: ${theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
  
  span {
    background: ${theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${theme.textLight};
  margin-bottom: 2rem;
  line-height: 1.7;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${theme.gradient};
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 10px 20px rgba(67, 97, 238, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(67, 97, 238, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: ${theme.primary};
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 2px solid ${theme.primaryLight};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: ${theme.primaryLight};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  animation: ${fadeInRight} 0.8s ease-out;
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${float} 6s ease-in-out infinite;
`;

const HeroImageOverlay = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
  background: ${theme.gradient};
  border-radius: 20px;
  z-index: -1;
  opacity: 0.7;
`;

// Features section
const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 4rem 0;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  border: 1px solid ${theme.border};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.iconColor || theme.primary};
  }
  
  &:hover .feature-icon {
    background: ${props => props.iconColor || theme.primary};
    color: white;
    transform: scale(1.1) rotate(10deg);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color ? `${props.color}15` : `${theme.primary}15`};
  color: ${props => props.color || theme.primary};
  transition: all 0.4s ease;
  margin-bottom: 0.5rem;
  box-shadow: 0 10px 20px ${props => props.color ? `${props.color}20` : `${theme.primary}20`};
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.text};
`;

const FeatureDescription = styled.p`
  color: ${theme.textLight};
  font-size: 1rem;
  line-height: 1.6;
`;

// Search and filter section
const FilterContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin: 3rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
  border: 1px solid ${theme.border};
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 600px;
  margin-left: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 1rem 1.25rem 3.5rem;
  border-radius: 16px;
  border: 1px solid ${theme.border};
  background: ${theme.background};
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
    background: white;
  }
  
  &::placeholder {
    color: ${theme.textMuted};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.textMuted};
  transition: color 0.3s ease;
  
  ${SearchInput}:focus + & {
    color: ${theme.primary};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: ${theme.primary} ${theme.border};
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.border};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 4px;
  }
`;

const CategoryTab = styled.button`
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: ${props => props.active ? 
    props.color || theme.gradient : 
    'white'};
  color: ${props => props.active ? 'white' : props.color || theme.primary};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: ${props => props.active ? 
    `0 8px 16px ${props.color ? `${props.color}40` : `${theme.primary}40`}` : 
    '0 4px 12px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.active ? 
      props.color || theme.gradient : 
      props.color ? `${props.color}15` : theme.primaryLight};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ResultsCount = styled.div`
  color: ${theme.textLight};
  font-size: 1rem;
  animation: ${fadeIn} 0.8s ease-out 0.6s both;
  
  span {
    color: ${theme.text};
    font-weight: 600;
  }
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SortLabel = styled.span`
  color: ${theme.textLight};
  font-size: 0.95rem;
`;

const SortSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid ${theme.border};
  background: white;
  color: ${theme.text};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

// Products grid
const MedicinesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0 4rem;
`;

const MedicineCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid ${theme.border};
  background: white;
  box-shadow: ${theme.shadow};
  animation: ${fadeIn} 0.6s ease-out both;
  animation-delay: ${props => props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadowHover};
    
    .medicine-image {
      transform: scale(1.08);
    }
    
    .medicine-category {
      background: ${props => props.categoryColor?.bg || theme.primary};
      color: white;
    }
    
    .quick-view-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StockBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 3;
  background: ${props => props.inStock ? theme.success : theme.danger};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.active ? theme.danger : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? 'white' : theme.textLight};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#e11d48' : 'white'};
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  background: ${props => props.categoryColor?.light || theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MedicineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  class: medicine-image;
`;

const QuickViewButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: rgba(255, 255, 255, 0.95);
  color: ${theme.text};
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  class: quick-view-button;
  
  &:hover {
    background: white;
    transform: translateX(-50%) translateY(15px);
  }
`;

const MedicineCategory = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.color?.light || theme.primaryLight};
  color: ${props => props.color?.bg || theme.primary};
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  class: medicine-category;
`;

const DiscountBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: ${theme.warning};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MedicineInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MedicineName = styled.h3`
  color: ${theme.text};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.3s ease;
  
  ${MedicineCard}:hover & {
    color: ${theme.primary};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.warning};
`;

const RatingText = styled.span`
  color: ${theme.textLight};
  font-size: 0.85rem;
  margin-left: 0.5rem;
`;

const MedicineDescription = styled.p`
  color: ${theme.textLight};
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: ${theme.textMuted};
  font-size: 0.9rem;
  font-weight: normal;
`;

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.success};
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CartButton = styled(Button)`
  background: ${props => props.inCart ? theme.success : 
    props.categoryColor?.gradient || theme.gradient};
  color: white;
  font-weight: 600;
  padding: 0.9rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${props => props.inCart ? 
    '0 8px 16px rgba(16, 185, 129, 0.25)' :
    `0 8px 16px ${props.categoryColor ? `${props.categoryColor.bg}40` : `${theme.primary}40`}`};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.inCart ? 
      '0 12px 20px rgba(16, 185, 129, 0.35)' :
      `0 12px 20px ${props.categoryColor ? `${props.categoryColor.bg}50` : `${theme.primary}50`}`};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Cart components
const CartCount = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${theme.gradient};
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 4px 15px rgba(74, 107, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: scale(1.1);
    animation: none;
  }
`;

const CartCountBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${theme.danger};
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const CartSidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.open ? '0' : '-450px'};
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${theme.border};
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const CartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.background};
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CloseButton = styled.button`
    background: none;
  border: none;
  color: ${theme.textLight};
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.background};
    color: ${theme.text};
    transform: rotate(90deg);
  }
`;

const CartItems = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.border};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 4px;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.textMuted};
  text-align: center;
  padding: 2rem;
`;

const EmptyCartIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${theme.primaryLight};
  background: ${theme.primaryLight};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 3s ease-in-out infinite;
`;

const EmptyCartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.75rem;
`;

const EmptyCartText = styled.p`
  color: ${theme.textLight};
  margin-bottom: 2rem;
  max-width: 250px;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.border};
  position: relative;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    transform: translateX(-5px);
  }
`;

const CartItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 1rem;
  background: ${props => props.color || theme.primaryLight};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CartItemDetails = styled.div`
  flex-grow: 1;
`;

const CartItemName = styled.h4`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${theme.text};
`;

const CartItemCategory = styled.div`
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: ${props => props.color?.light || theme.primaryLight};
  color: ${props => props.color?.bg || theme.primary};
`;

const CartItemPrice = styled.div`
  font-weight: 600;
  color: ${props => props.color?.bg || theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 0.85rem;
    color: ${theme.textMuted};
    text-decoration: line-through;
  }
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${theme.border};
  background: white;
  color: ${theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.background};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 0.75rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${theme.textMuted};
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  margin-left: auto;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.danger};
    background: #fee2e2;
    transform: scale(1.05);
  }
`;

const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${theme.border};
  background: ${theme.background};
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 0.75rem;
    border-top: 1px dashed ${theme.border};
    font-size: 1.125rem;
  }
`;

const SummaryLabel = styled.span`
  color: ${theme.textLight};
`;

const SummaryValue = styled.span`
  font-weight: ${props => props.bold ? '700' : '500'};
  color: ${props => props.bold ? theme.text : theme.textLight};
`;

const CheckoutButton = styled(Button)`
  background: ${theme.gradient};
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 16px rgba(67, 97, 238, 0.25);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(67, 97, 238, 0.35);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ContinueShoppingButton = styled(Button)`
  background: white;
  color: ${theme.primary};
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${theme.border};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    background: ${theme.primaryLight};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${props => props.open ? 1 : 0};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

// Product Modal
const ProductModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, ${props => props.open ? '-50%' : '-60%'});
  width: 90%;
  max-width: 900px;
  background: white;
  border-radius: 20px;
  z-index: 1001;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  opacity: ${props => props.open ? 1 : 0};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-height: 90vh;
  overflow: hidden;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: white;
  color: ${theme.textLight};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    color: ${theme.danger};
    transform: rotate(90deg);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ModalImageSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.color || theme.primaryLight};
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalMainImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 1rem;
  animation: ${float} 5s ease-in-out infinite;
`;

const ModalThumbnails = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ModalThumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? 'white' : 'transparent'};
  box-shadow: ${props => props.active ? '0 0 0 2px ' + theme.primary : 'none'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalDetailsSection = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  max-height: 80vh;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.border};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalCategory = styled.div`
  display: inline-block;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${props => props.color?.light || theme.primaryLight};
  color: ${props => props.color?.bg || theme.primary};
  font-weight: 600;
`;

const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.text};
  margin-bottom: 1rem;
`;

const ModalRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ModalPrice = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.text};
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ModalOldPrice = styled.span`
  text-decoration: line-through;
  color: ${theme.textMuted};
  font-size: 1.1rem;
  font-weight: normal;
`;

const ModalDescription = styled.p`
  color: ${theme.textLight};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ModalFeatures = styled.div`
  margin-bottom: 2rem;
`;

const ModalFeatureTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  padding-left: 1.5rem;
  
  li {
    color: ${theme.textLight};
    margin-bottom: 0.75rem;
    line-height: 1.5;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${theme.primary};
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const QuantityLabel = styled.span`
  color: ${theme.textLight};
  font-weight: 500;
`;

const QuantityButtons = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  overflow: hidden;
`;

const ModalQuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${theme.background};
  border: none;
  color: ${theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.primaryLight};
  }
`;

const ModalQuantityDisplay = styled.span`
  width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: white;
`;

const ModalAddToCartButton = styled(Button)`
  background: ${theme.gradient};
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 16px rgba(67, 97, 238, 0.25);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(67, 97, 238, 0.35);
  }
`;

const ModalBuyNowButton = styled(Button)`
  background: white;
  color: ${theme.primary};
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid ${theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${theme.primaryLight};
    transform: translateY(-3px);
  }
`;

// Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? theme.primary : theme.border};
  background: ${props => props.active ? theme.primary : 'white'};
  color: ${props => props.active ? 'white' : theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : 'normal'};
  
  &:hover {
    background: ${props => props.active ? theme.primary : theme.primaryLight};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Notification
const Notification = styled.div`
  position: fixed;
  bottom: ${props => props.show ? '2rem' : '-100px'};
  left: 50%;
  transform: translateX(-50%);
  background: ${props => {
    switch(props.type) {
      case 'success': return theme.success;
      case 'error': return theme.danger;
      case 'warning': return theme.warning;
      default: return theme.primary;
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 1000;
  max-width: 90%;
`;

const NotificationText = styled.span`
  font-weight: 500;
`;

// Enhanced medicine data with additional fields
const enhancedMedicines = medicines.map(medicine => ({
  ...medicine,
  discount: Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : 0,
  originalPrice: medicine.price,
  category: ['Supplements', 'Prescription', 'Over-the-counter', 'Vitamins'][Math.floor(Math.random() * 4)],
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviewCount: Math.floor(Math.random() * 500) + 10,
  inStock: Math.random() > 0.2,
  deliveryDays: Math.floor(Math.random() * 3) + 1,
  features: [
    'Clinically tested',
    'No artificial preservatives',
    'Suitable for adults and children',
    'Non-GMO ingredients',
    'Gluten-free formula'
  ].slice(0, Math.floor(Math.random() * 3) + 2)
})).map(medicine => ({
  ...medicine,
  price: medicine.discount ? Number((medicine.originalPrice * (1 - medicine.discount / 100)).toFixed(2)) : medicine.originalPrice
}));

// Features data
const features = [
  {
    id: 'delivery',
    title: 'Fast & Free Delivery',
    description: 'Get your medications delivered within 24 hours for orders over $25',
    icon: <Truck size={28} />,
    color: '#3b82f6'
  },
  {
    id: 'security',
    title: 'Secure Transactions',
    description: 'Your payment and personal information are always protected',
    icon: <Shield size={28} />,
    color: '#10b981'
  },
  {
    id: 'prescription',
    title: 'Easy Prescription Refills',
    description: 'Upload your prescription and get medications delivered to your doorstep',
    icon: <Clipboard size={28} />,
    color: '#ef4444'
  },
  {
    id: 'payment',
    title: 'Multiple Payment Options',
    description: 'Pay with credit card, PayPal, or use your insurance for eligible items',
    icon: <CreditCard size={28} />,
    color: '#f59e0b'
  }
];

export const OrderMedicine = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});
  const [sortOption, setSortOption] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const itemsPerPage = 8;
  
  const searchRef = useRef(null);
  const modalRef = useRef(null);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    
    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  // Get unique categories
  const categories = ['All', ...new Set(enhancedMedicines.map(med => med.category))];

  // Filter and sort medicines
  const filteredMedicines = enhancedMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || medicine.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    switch(sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        return b.discount - a.discount;
      case 'rating':
        return b.rating - a.rating;
      default: // popular
        return b.reviewCount - a.reviewCount;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedMedicines.length / itemsPerPage);
  const currentMedicines = sortedMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cart functions
  const addToCart = (medicine, quantity = 1) => {
    if (cart.find(item => item.id === medicine.id)) {
      // Update quantity if already in cart
      setQuantities({
        ...quantities,
        [medicine.id]: (quantities[medicine.id] || 1) + quantity
      });
      showNotification(`Updated ${medicine.name} quantity in cart`, 'success');
    } else {
      setCart([...cart, medicine]);
      setQuantities({
        ...quantities,
        [medicine.id]: quantity
      });
      showNotification(`Added ${medicine.name} to cart`, 'success');
    }
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
    showNotification(`Removed ${itemToRemove.name} from cart`, 'info');
  };

  const updateQuantity = (id, delta) => {
    const newQuantity = (quantities[id] || 1) + delta;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setQuantities({
        ...quantities,
        [id]: newQuantity
      });
    }
  };

  const toggleFavorite = (id) => {
    const medicine = enhancedMedicines.find(m => m.id === id);
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(itemId => itemId !== id));
      showNotification(`Removed ${medicine.name} from favorites`, 'info');
    } else {
      setFavorites([...favorites, id]);
      showNotification(`Added ${medicine.name} to favorites`, 'success');
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalQuantity(1);
    setModalOpen(true);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    
    setTimeout(() => {
      setNotification(prev => ({...prev, show: false}));
    }, 3000);
  };

  const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (quantities[item.id] || 1)), 0);
  const shipping = subtotal > 25 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + shipping + tax;

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Prescription': return <Clipboard size={18} />;
      case 'Over-the-counter': return <Pill size={18} />;
      case 'Supplements': return <Droplet size={18} />;
      case 'Vitamins': return <Thermometer size={18} />;
      default: return <Pill size={18} />;
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <HeroTitle>Your Health, <span>Delivered</span> to Your Doorstep</HeroTitle>
            <HeroDescription>
              Browse our extensive collection of medications, supplements, and health products. 
              Enjoy fast delivery, competitive prices, and professional pharmaceutical advice.
            </HeroDescription>
            <HeroButtons>
              <PrimaryButton onClick={() => searchRef.current?.focus()}>
                <Search size={18} /> Find Medications
              </PrimaryButton>
              <SecondaryButton>
                <Clipboard size={18} /> Upload Prescription
              </SecondaryButton>
            </HeroButtons>
          </HeroContent>
          <HeroImageContainer>
            <HeroImage src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Pharmacy" />
            <HeroImageOverlay />
          </HeroImageContainer>
        </HeroSection>
        
        {/* Features Section */}
        <FeaturesSection>
          {features.map(feature => (
            <FeatureCard key={feature.id} iconColor={feature.color}>
              <FeatureIcon color={feature.color} className="feature-icon">
                {feature.icon}
              </FeatureIcon>
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesSection>
        
        {/* Search and Filter Section */}
        <FilterContainer>
          <FilterHeader>
            <FilterTitle>
              <Filter size={20} /> Find Products
            </FilterTitle>
            <SearchContainer>
              <SearchInput 
                ref={searchRef}
                type="text" 
                placeholder="Search for medicines, supplements, vitamins..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
            </SearchContainer>
          </FilterHeader>
          
          <CategoryTabs>
            <CategoryTab 
              active={activeCategory === 'All'}
              onClick={() => {
                setActiveCategory('All');
                setCurrentPage(1);
              }}
            >
              <Pill size={18} /> All Products
            </CategoryTab>
            
            {categories.slice(1).map(category => (
              <CategoryTab 
                key={category} 
                active={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                color={categoryColors[category]?.bg}
              >
                {getCategoryIcon(category)} {category}
                </CategoryTab>
            ))}
          </CategoryTabs>
          
          <ResultsInfo>
            <ResultsCount>
              Showing <span>{currentMedicines.length}</span> of <span>{filteredMedicines.length}</span> products
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </ResultsCount>
            
            <SortOptions>
              <SortLabel>Sort by:</SortLabel>
              <SortSelect 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Highest Rating</option>
              </SortSelect>
            </SortOptions>
          </ResultsInfo>
        </FilterContainer>
        
        {/* Products Grid */}
        <MedicinesGrid>
          {currentMedicines.map((medicine, index) => (
            <MedicineCard 
              key={medicine.id} 
              index={index}
              categoryColor={categoryColors[medicine.category]}
            >
              {!medicine.inStock && (
                <StockBadge inStock={false}>
                  <AlertCircle size={14} /> Out of Stock
                </StockBadge>
              )}
              
              <FavoriteButton 
                active={favorites.includes(medicine.id)}
                onClick={() => toggleFavorite(medicine.id)}
                aria-label={favorites.includes(medicine.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={18} fill={favorites.includes(medicine.id) ? 'white' : 'none'} />
              </FavoriteButton>
              
              <ImageContainer categoryColor={categoryColors[medicine.category]}>
                <MedicineCategory 
                  className="medicine-category"
                  color={categoryColors[medicine.category]}
                >
                  {getCategoryIcon(medicine.category)} {medicine.category}
                </MedicineCategory>
                
                {medicine.discount > 0 && (
                  <DiscountBadge>
                    <Clock size={14} /> {medicine.discount}% OFF
                  </DiscountBadge>
                )}
                
                <MedicineImage src={medicine.image} alt={medicine.name} className="medicine-image" />
                
                <QuickViewButton 
                  className="quick-view-button"
                  onClick={() => openProductModal(medicine)}
                >
                  <Search size={16} /> Quick View
                </QuickViewButton>
              </ImageContainer>
              
              <ContentContainer>
                <MedicineInfo>
                  <MedicineName>{medicine.name}</MedicineName>
                  
                  <RatingContainer>
                    <Rating>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          fill={i < Math.floor(medicine.rating) ? theme.warning : 'none'}
                          color={theme.warning}
                        />
                      ))}
                    </Rating>
                    <RatingText>{medicine.rating} ({medicine.reviewCount})</RatingText>
                  </RatingContainer>
                  
                  <MedicineDescription>{medicine.description}</MedicineDescription>
                </MedicineInfo>
                
                <PriceContainer>
                  <Price>
                    ${medicine.price.toFixed(2)}
                    {medicine.discount > 0 && (
                      <OldPrice>${medicine.originalPrice.toFixed(2)}</OldPrice>
                    )}
                  </Price>
                </PriceContainer>
                
                {medicine.inStock && (
                  <DeliveryInfo>
                    <Truck size={14} /> 
                    {medicine.deliveryDays === 1 
                      ? 'Next day delivery' 
                      : `Delivery in ${medicine.deliveryDays} days`}
                  </DeliveryInfo>
                )}
                
                <CartButton
                  inCart={cart.some(item => item.id === medicine.id)}
                  onClick={() => medicine.inStock && (
                    cart.some(item => item.id === medicine.id) 
                      ? setCartOpen(true) 
                      : addToCart(medicine)
                  )}
                  categoryColor={categoryColors[medicine.category]}
                  disabled={!medicine.inStock}
                >
                  {!medicine.inStock ? (
                    'Out of Stock'
                  ) : cart.some(item => item.id === medicine.id) ? (
                    <>View in Cart <ChevronRight size={16} /></> 
                  ) : (
                    <>Add to Cart <ShoppingCart size={16} /></>
                  )}
                </CartButton>
              </ContentContainer>
            </MedicineCard>
          ))}
        </MedicinesGrid>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft size={16} />
            </PageButton>
            
            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight size={16} />
            </PageButton>
          </Pagination>
        )}
        
        {/* Cart Button */}
        {cart.length > 0 && (
          <CartCount onClick={() => setCartOpen(true)}>
            <ShoppingBag size={24} />
            <CartCountBadge>{totalItems}</CartCountBadge>
          </CartCount>
        )}
        
        {/* Cart Overlay */}
        <Overlay open={cartOpen} onClick={() => setCartOpen(false)} />
        
        {/* Cart Sidebar */}
        <CartSidebar open={cartOpen}>
          <CartHeader>
            <CartTitle>
              <ShoppingBag size={20} />
              Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </CartTitle>
            <CloseButton onClick={() => setCartOpen(false)}>
              <X size={20} />
            </CloseButton>
          </CartHeader>
          
          <CartItems>
            {cart.length === 0 ? (
              <EmptyCart>
                <EmptyCartIcon>
                  <ShoppingBag size={40} color={theme.primary} />
                </EmptyCartIcon>
                <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
                <EmptyCartText>Browse our products and add items to your cart</EmptyCartText>
                <SecondaryButton onClick={() => setCartOpen(false)}>
                  <ArrowLeft size={18} /> Continue Shopping
                </SecondaryButton>
              </EmptyCart>
            ) : (
              cart.map(item => (
                <CartItem key={item.id}>
                  <CartItemImage color={categoryColors[item.category]?.light}>
                    <img src={item.image} alt={item.name} />
                  </CartItemImage>
                  <CartItemDetails>
                    <CartItemCategory color={categoryColors[item.category]}>
                      {item.category}
                    </CartItemCategory>
                    <CartItemName>{item.name}</CartItemName>
                    <CartItemPrice color={categoryColors[item.category]}>
                      ${item.price.toFixed(2)}
                      {item.discount > 0 && (
                        <span>${item.originalPrice.toFixed(2)}</span>
                      )}
                    </CartItemPrice>
                    <CartItemActions>
                      <QuantityButton onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={14} />
                      </QuantityButton>
                      <QuantityDisplay>{quantities[item.id] || 1}</QuantityDisplay>
                      <QuantityButton onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={14} />
                      </QuantityButton>
                      <RemoveButton onClick={() => removeFromCart(item.id)}>
                        <X size={14} /> Remove
                      </RemoveButton>
                    </CartItemActions>
                  </CartItemDetails>
                </CartItem>
              ))
            )}
          </CartItems>
          
          {cart.length > 0 && (
            <CartFooter>
              <CartSummary>
                <SummaryRow>
                  <SummaryLabel>Subtotal</SummaryLabel>
                  <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Shipping</SummaryLabel>
                  <SummaryValue>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Estimated Tax</SummaryLabel>
                  <SummaryValue>${tax.toFixed(2)}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Total</SummaryLabel>
                  <SummaryValue bold>${totalAmount.toFixed(2)}</SummaryValue>
                </SummaryRow>
              </CartSummary>
              
              <CheckoutButton fullWidth>
                Proceed to Checkout <ChevronRight size={16} />
              </CheckoutButton>
              
              <ContinueShoppingButton fullWidth onClick={() => setCartOpen(false)}>
                <ArrowLeft size={16} /> Continue Shopping
              </ContinueShoppingButton>
            </CartFooter>
          )}
        </CartSidebar>
        
        {/* Product Modal */}
        <Overlay open={modalOpen} onClick={() => setModalOpen(false)} />
        
        <ProductModal open={modalOpen} ref={modalRef}>
          {selectedProduct && (
            <>
              <ModalCloseButton onClick={() => setModalOpen(false)}>
                <X size={20} />
              </ModalCloseButton>
              
              <ModalContent>
                <ModalImageSection color={categoryColors[selectedProduct.category]?.light}>
                  <ModalCategory color={categoryColors[selectedProduct.category]}>
                    {getCategoryIcon(selectedProduct.category)} {selectedProduct.category}
                  </ModalCategory>
                  
                  <ModalMainImage src={selectedProduct.image} alt={selectedProduct.name} />
                  
                  <ModalThumbnails>
                    <ModalThumbnail active>
                      <img src={selectedProduct.image} alt={selectedProduct.name} />
                    </ModalThumbnail>
                    {/* Placeholder thumbnails */}
                    <ModalThumbnail>
                      <img src={selectedProduct.image} alt={selectedProduct.name} />
                    </ModalThumbnail>
                    <ModalThumbnail>
                      <img src={selectedProduct.image} alt={selectedProduct.name} />
                    </ModalThumbnail>
                  </ModalThumbnails>
                </ModalImageSection>
                
                <ModalDetailsSection>
                  <ModalTitle>{selectedProduct.name}</ModalTitle>
                  
                  <ModalRating>
                    <Rating>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={18}
                          fill={i < Math.floor(selectedProduct.rating) ? theme.warning : 'none'}
                          color={theme.warning}
                        />
                      ))}
                    </Rating>
                    <RatingText>
                      {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                    </RatingText>
                  </ModalRating>
                  
                  <ModalPrice>
                    ${selectedProduct.price.toFixed(2)}
                    {selectedProduct.discount > 0 && (
                      <ModalOldPrice>${selectedProduct.originalPrice.toFixed(2)}</ModalOldPrice>
                    )}
                  </ModalPrice>
                  
                  <ModalDescription>
                    {selectedProduct.description}
                    {/* Extended description */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                    Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec 
                    ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia.
                  </ModalDescription>
                  
                  <ModalFeatures>
                    <ModalFeatureTitle>Key Benefits</ModalFeatureTitle>
                    <FeatureList>
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </FeatureList>
                  </ModalFeatures>
                  
                  {selectedProduct.inStock ? (
                    <>
                      <DeliveryInfo>
                        <Truck size={16} /> 
                        {selectedProduct.deliveryDays === 1 
                          ? 'Next day delivery available' 
                          : `Delivery in ${selectedProduct.deliveryDays} days`}
                      </DeliveryInfo>
                      
                      <QuantityControl>
                        <QuantityLabel>Quantity:</QuantityLabel>
                        <QuantityButtons>
                          <ModalQuantityButton 
                            onClick={() => setModalQuantity(prev => Math.max(prev - 1, 1))}
                            disabled={modalQuantity <= 1}
                          >
                            <Minus size={16} />
                          </ModalQuantityButton>
                          <ModalQuantityDisplay>{modalQuantity}</ModalQuantityDisplay>
                          <ModalQuantityButton onClick={() => setModalQuantity(prev => prev + 1)}>
                            <Plus size={16} />
                          </ModalQuantityButton>
                        </QuantityButtons>
                      </QuantityControl>
                      
                      <ModalActions>
                        <ModalAddToCartButton 
                          onClick={() => {
                            addToCart(selectedProduct, modalQuantity);
                            setModalOpen(false);
                          }}
                        >
                          <ShoppingCart size={18} /> Add to Cart
                        </ModalAddToCartButton>
                        <ModalBuyNowButton>
                          <CreditCard size={18} /> Buy Now
                        </ModalBuyNowButton>
                      </ModalActions>
                    </>
                  ) : (
                    <StockBadge inStock={false} style={{ position: 'relative', display: 'inline-flex', top: 0, left: 0, marginTop: '1rem' }}>
                      <AlertCircle size={16} /> Out of Stock
                    </StockBadge>
                  )}
                </ModalDetailsSection>
              </ModalContent>
            </>
          )}
        </ProductModal>
        
        {/* Notification */}
        <Notification show={notification.show} type={notification.type}>
          {notification.type === 'success' && <Check size={18} />}
          {notification.type === 'error' && <AlertCircle size={18} />}
          {notification.type === 'info' && <AlertCircle size={18} />}
          <NotificationText>{notification.message}</NotificationText>
        </Notification>
      </PageContainer>
    </PageWrapper>
  );
};
