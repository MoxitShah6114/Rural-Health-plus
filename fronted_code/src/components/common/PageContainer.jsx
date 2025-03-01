import styled from 'styled-components';
import { Container } from './Container';

export const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  
  @media (min-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const PageDescription = styled.p`
  font-size: 1.125rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 800px;
`;