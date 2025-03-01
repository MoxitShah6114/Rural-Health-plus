import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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
  CreditCard
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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Modern pharmacy-themed color palette
const theme = {
  primary: '#4a6bff', // Updated to match Telemedicine blue
  primaryLight: '#e0ecff',
  primaryDark: '#3451d1',
  secondary: '#10b981',
  secondaryLight: '#d1fae5',
  accent: '#7209b7',
  accentLight: '#f3e8ff',
  danger: '#ef4444',
  warning: '#f59e0b',
  background: '#f9fafb',
  cardBg: '#ffffff',
  text: '#1e293b',
  textLight: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
  shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

// Category colors
const categoryColors = {
  'Prescription': { bg: '#e74c3c', light: '#fde8e8' },
  'Over-the-counter': { bg: '#3498db', light: '#e0f2fe' },
  'Supplements': { bg: '#f39c12', light: '#fef3c7' },
  'Vitamins': { bg: '#27ae60', light: '#dcfce7' }
};

// Page wrapper for background styling
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #f9fafc, #f0f4f8);
  min-height: 100vh;
  padding: 2rem 0 4rem;
`;

const PageContainer = styled(Container)`
  max-width: 1200px;
  padding: 2rem 1.5rem;
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
    background: linear-gradient(90deg, var(--primary), #4a90e2);
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  margin: 0.5rem 0;
  color: var(--text);
  font-size: 2.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, ${theme.primary}, #4a90e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.textLight};
  font-size: 1.2rem;
  max-width: 700px;
  margin: 1rem auto 2rem;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

// Features section
const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
  
  &:hover .feature-icon {
    background: ${props => props.iconColor || theme.primary};
    color: white;
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color ? `${props.color}20` : `${theme.primary}20`};
  color: ${props => props.color || theme.primary};
  transition: all 0.3s ease;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.text};
`;

const FeatureDescription = styled.p`
  color: ${theme.textLight};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 2.5rem auto;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 1rem 1.25rem 3.5rem;
  border-radius: 16px;
  border: 1px solid ${theme.border};
  background: white;
  font-size: 1rem;
  box-shadow: ${theme.shadow};
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

const SearchIcon = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.textMuted};
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 2.5rem 0;
  overflow-x: auto;
  padding: 0.5rem 0;
  animation: ${fadeIn} 0.8s ease-out 0.5s both;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
  
  &::-webkit-scrollbar {
    height: 4px;
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
  background: ${props => props.active ? props.color || theme.primary : 'white'};
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
      props.color || theme.primary : 
      props.color ? `${props.color}15` : theme.primaryLight};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`;

const ResultsCount = styled.div`
  color: ${theme.textLight};
  margin-bottom: 1rem;
  font-size: 0.95rem;
  animation: ${fadeIn} 0.8s ease-out 0.6s both;
`;

const MedicinesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0 4rem;
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
    
    .medicine-category {
      background: ${props => props.categoryColor?.bg || theme.primary};
      color: white;
    }
  }
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
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#e11d48' : 'white'};
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
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
  
  ${MedicineCard}:hover & {
    transform: scale(1.05);
  }
`;

const MedicineCategory = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.color?.light || theme.primaryLight};
  color: ${props => props.color?.bg || theme.primary};
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DiscountBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: ${theme.warning};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const MedicineName = styled.h3`
  color: ${theme.text};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
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

const CartButton = styled(Button)`
  background: ${props => props.inCart ? theme.secondary : props.categoryColor?.bg || theme.primary};
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
  box-shadow: ${props => `0 8px 16px ${props.categoryColor ? `${props.categoryColor.bg}40` : `${theme.primary}40`}`};
  
  &:hover {
    background: ${props => props.inCart ? '#059669' : props.categoryColor ? props.categoryColor.bg : theme.primaryDark};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CartCount = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${theme.primary};
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
  right: ${props => props.open ? '0' : '-400px'};
  width: 380px;
  max-width: 100vw;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  
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
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
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
  
  &:hover {
    background: ${theme.background};
    color: ${theme.text};
  }
`;

const CartItems = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem;
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
  margin-bottom: 1rem;
  color: ${theme.primaryLight};
  background: ${theme.primaryLight};
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
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
  border-radius: 9999px;
  margin-bottom: 0.5rem;
  background: ${props => props.color?.light || theme.primaryLight};
  color: ${props => props.color?.bg || theme.primary};
`;

const CartItemPrice = styled.div`
  font-weight: 600;
  color: ${props => props.color?.bg || theme.primary};
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
  border-radius: 50%;
  border: 1px solid ${theme.border};
  background: white;
  color: ${theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: ${theme.background};
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 0.75rem;
  font-weight: 600;
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
  border-radius: 4px;
  margin-left: auto;
  
  &:hover {
    color: ${theme.danger};
    background: #fee2e2;
  }
`;

const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${theme.border};
  background: ${theme.background};
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  font-size: 1.125rem;
`;

const TotalLabel = styled.span`
  color: ${theme.textLight};
`;

const TotalAmount = styled.span`
  font-weight: 700;
  color: ${theme.text};
`;

const CheckoutButton = styled(Button)`
  background: ${theme.secondary};
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
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.25);
  
  &:hover {
    background: #059669;
    transform: translateY(-2px);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.open ? 1 : 0};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

// Enhanced medicine data with additional fields
const enhancedMedicines = medicines.map(medicine => ({
  ...medicine,
  discount: Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : 0,
  originalPrice: medicine.price,
  category: ['Supplements', 'Prescription', 'Over-the-counter', 'Vitamins'][Math.floor(Math.random() * 4)]
})).map(medicine => ({
  ...medicine,
  price: medicine.discount ? Number((medicine.originalPrice * (1 - medicine.discount / 100)).toFixed(2)) : medicine.originalPrice
}));

// Features data
const features = [
  {
    id: 'delivery',
    title: 'Free Next-Day Delivery',
    description: 'On orders over $25 placed before 4 PM',
    icon: <Truck size={24} />,
    color: '#3498db'
  },
  {
    id: 'security',
    title: 'Secure Transactions',
    description: 'Your payment information is always protected',
    icon: <Shield size={24} />,
    color: '#27ae60'
  },
  {
    id: 'prescription',
    title: 'Easy Prescription Refills',
    description: 'Quickly refill your medications online',
    icon: <Clipboard size={24} />,
    color: '#e74c3c'
  },
  {
    id: 'payment',
    title: 'Multiple Payment Options',
    description: 'Pay with credit card, PayPal, or insurance',
    icon: <CreditCard size={24} />,
    color: '#f39c12'
  }
];

export const OrderMedicine = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  // Get unique categories
  const categories = ['All', ...new Set(enhancedMedicines.map(med => med.category))];

  // Filter medicines based on search and category
  const filteredMedicines = enhancedMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || medicine.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine) => {
    if (cart.find(item => item.id === medicine.id)) {
      // Update quantity if already in cart
      setQuantities({
        ...quantities,
        [medicine.id]: (quantities[medicine.id] || 1) + 1
      });
    } else {
      setCart([...cart, medicine]);
      setQuantities({
        ...quantities,
        [medicine.id]: 1
      });
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
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
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(itemId => itemId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (quantities[item.id] || 1)), 0);

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Prescription': return <Clipboard size={20} />;
      case 'Over-the-counter': return <Pill size={20} />;
      case 'Supplements': return <Droplet size={20} />;
      case 'Vitamins': return <Thermometer size={20} />;
      default: return <Pill size={20} />;
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <Title>Online Pharmacy</Title>
          <Subtitle>
            Browse our wide selection of medications and health supplements. 
            Fast delivery and secure payment options available.
          </Subtitle>
        </Header>
        
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
        
        <SearchContainer>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search for medicines, supplements, etc..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <CategoryTabs>
          <CategoryTab 
            active={activeCategory === 'All'}
            onClick={() => setActiveCategory('All')}
          >
            <Pill size={18} /> All Products
          </CategoryTab>
          
          {categories.slice(1).map(category => (
            <CategoryTab 
              key={category} 
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              color={categoryColors[category]?.bg}
            >
              {getCategoryIcon(category)} {category}
            </CategoryTab>
          ))}
        </CategoryTabs>
        
        <ResultsCount>
          Showing {filteredMedicines.length} products {activeCategory !== 'All' ? `in ${activeCategory}` : ''}
        </ResultsCount>
        
        <MedicinesGrid>
          {filteredMedicines.map((medicine, index) => (
            <MedicineCard 
              key={medicine.id} 
              index={index}
              categoryColor={categoryColors[medicine.category]}
            >
              <FavoriteButton 
                active={favorites.includes(medicine.id)}
                onClick={() => toggleFavorite(medicine.id)}
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
                <MedicineImage src={medicine.image} alt={medicine.name} />
              </ImageContainer>
              
              <ContentContainer>
                <MedicineName>{medicine.name}</MedicineName>
                <MedicineDescription>{medicine.description}</MedicineDescription>
                
                <PriceContainer>
                  <Price>
                    ${medicine.price.toFixed(2)}
                    {medicine.discount > 0 && (
                      <OldPrice>${medicine.originalPrice.toFixed(2)}</OldPrice>
                    )}
                  </Price>
                </PriceContainer>
                
                <CartButton
                  inCart={cart.some(item => item.id === medicine.id)}
                  onClick={() => cart.some(item => item.id === medicine.id) 
                    ? setCartOpen(true) 
                    : addToCart(medicine)
                  }
                  categoryColor={categoryColors[medicine.category]}
                >
                  {cart.some(item => item.id === medicine.id) 
                    ? <>View in Cart <ChevronRight size={16} /></> 
                    : <>Add to Cart <ShoppingCart size={16} /></>
                  }
                </CartButton>
              </ContentContainer>
            </MedicineCard>
          ))}
        </MedicinesGrid>
        
        {cart.length > 0 && (
          <CartCount onClick={() => setCartOpen(true)}>
            <ShoppingBag size={24} />
            <CartCountBadge>{totalItems}</CartCountBadge>
          </CartCount>
        )}
        
        <Overlay open={cartOpen} onClick={() => setCartOpen(false)} />
        
        <CartSidebar open={cartOpen}>
          <CartHeader>
            <CartTitle>
              <ShoppingBag size={20} />
              Your Cart ({totalItems})
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
                <h3>Your cart is empty</h3>
                <p>Browse our products and add items to your cart</p>
              </EmptyCart>
            ) : (
              cart.map(item => (
                <CartItem key={item.id}>
                  <CartItemImage src={item.image} alt={item.name} />
                  <CartItemDetails>
                    <CartItemCategory color={categoryColors[item.category]}>
                      {item.category}
                    </CartItemCategory>
                    <CartItemName>{item.name}</CartItemName>
                    <CartItemPrice color={categoryColors[item.category]}>
                      ${item.price.toFixed(2)}
                    </CartItemPrice>
                    <CartItemActions>
                      <QuantityButton onClick={() => updateQuantity(item.id, -1)}>-</QuantityButton>
                      <QuantityDisplay>{quantities[item.id] || 1}</QuantityDisplay>
                      <QuantityButton onClick={() => updateQuantity(item.id, 1)}>+</QuantityButton>
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
              <CartTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalAmount>${totalAmount.toFixed(2)}</TotalAmount>
              </CartTotal>
              <CheckoutButton fullWidth>
                Proceed to Checkout <ChevronRight size={16} />
              </CheckoutButton>
            </CartFooter>
          )}
        </CartSidebar>
      </PageContainer>
    </PageWrapper>
  );
};
