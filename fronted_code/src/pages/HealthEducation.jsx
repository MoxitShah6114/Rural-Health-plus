import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { BookOpen, User, Calendar, Clock, Heart, Brain, Shield, Apple } from 'lucide-react';
import { healthArticles } from '../data/mockData';

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

// Page wrapper for background styling
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #f9fafc, #f0f4f8);
  min-height: 100vh;
  padding: 2rem 0 4rem;
`;

// Enhanced container with max-width
const PageContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

// Header section with enhanced styling
const HeaderSection = styled.div`
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

// Resource categories section
const CategoriesSection = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    
    .icon-wrapper {
      transform: scale(1.1);
    }
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || 'var(--primary)'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || 'var(--primary)'};
  color: white;
  border-radius: 50%;
  margin: 0 auto 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  
  &.heart-icon { background-color: #e74c3c; }
  &.brain-icon { background-color: #3498db; }
  &.shield-icon { background-color: #27ae60; }
  &.apple-icon { background-color: #f39c12; }
`;

const CategoryTitle = styled.h3`
  color: var(--text);
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const CategoryDescription = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
`;

// Articles section
const ArticlesSection = styled.div`
  margin-top: 3.5rem;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
`;

const SectionTitle = styled.h2`
  color: var(--text);
  font-size: 1.75rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.75rem;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), #4a90e2);
    border-radius: 2px;
  }
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  animation: ${fadeIn} 0.6s ease-out both;
  animation-delay: ${props => props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const ArticleImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.6));
  }
  
  ${ArticleCard}:hover & {
    transform: scale(1.05);
  }
`;

const ArticleContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ArticleCategory = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: ${props => {
    switch(props.category.toLowerCase()) {
      case 'nutrition': return 'rgba(243, 156, 18, 0.15)';
      case 'mental health': return 'rgba(52, 152, 219, 0.15)';
      case 'fitness': return 'rgba(39, 174, 96, 0.15)';
      case 'prevention': return 'rgba(231, 76, 60, 0.15)';
      default: return 'rgba(74, 107, 255, 0.15)';
    }
  }};
  color: ${props => {
    switch(props.category.toLowerCase()) {
      case 'nutrition': return '#f39c12';
      case 'mental health': return '#3498db';
      case 'fitness': return '#27ae60';
      case 'prevention': return '#e74c3c';
      default: return 'var(--primary)';
    }
  }};
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  align-self: flex-start;
`;

const ArticleTitle = styled.h3`
  color: var(--text);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
`;

const ArticleSummary = styled.p`
  color: var(--text-light);
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-light);
  font-size: 0.875rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PublishDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReadMoreButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;

// Resource categories data
const resourceCategories = [
  {
    id: 'heart-health',
    title: 'Heart Health',
    description: 'Resources for heart disease prevention, management, and healthy lifestyle choices.',
    icon: 'heart',
    color: '#e74c3c'
  },
  {
    id: 'mental-wellness',
    title: 'Mental Wellness',
    description: 'Information on mental health awareness, stress management, and emotional well-being.',
    icon: 'brain',
    color: '#3498db'
  },
  {
    id: 'preventive-care',
    title: 'Preventive Care',
    description: 'Guides on preventive screenings, vaccinations, and early detection of health issues.',
    icon: 'shield',
    color: '#27ae60'
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Diet',
    description: 'Expert advice on balanced nutrition, dietary plans, and healthy eating habits.',
    icon: 'apple',
    color: '#f39c12'
  }
];

export const HealthEducation = () => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get icon component based on name
  const getCategoryIcon = (iconName, size = 32) => {
    switch (iconName) {
      case 'heart': return <Heart size={size} />;
      case 'brain': return <Brain size={size} />;
      case 'shield': return <Shield size={size} />;
      case 'apple': return <Apple size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        <HeaderSection>
          <Title>Health Education Resources</Title>
          <Subtitle>
            Access reliable health information and educational materials to help
            maintain and improve health in rural and underserved communities.
          </Subtitle>
        </HeaderSection>
        
        <CategoriesSection>
          <CategoriesGrid>
            {resourceCategories.map((category) => (
              <CategoryCard key={category.id} color={category.color}>
                <IconWrapper color={category.color} className={`${category.icon}-icon`}>
                  {getCategoryIcon(category.icon)}
                </IconWrapper>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesSection>
        
        <ArticlesSection>
          <SectionTitle>Featured Articles</SectionTitle>
          <ArticlesGrid>
            {healthArticles.map((article, index) => (
              <ArticleCard key={article.id} index={index}>
                <ArticleImage src={article.image} />
                <ArticleContent>
                  <ArticleCategory category={article.category || 'Health'}>
                    {article.category || 'Health'}
                  </ArticleCategory>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleSummary>{article.summary}</ArticleSummary>
                  <ArticleMeta>
                    <Author>
                      <User size={14} />
                      {article.author}
                    </Author>
                    <PublishDate>
                      <Calendar size={14} />
                      {formatDate(article.date)}
                    </PublishDate>
                  </ArticleMeta>
                  <ReadMoreButton href={`/article/${article.id}`}>
                    Read More
                  </ReadMoreButton>
                </ArticleContent>
              </ArticleCard>
            ))}
          </ArticlesGrid>
        </ArticlesSection>
      </PageContainer>
    </PageWrapper>
  );
};
