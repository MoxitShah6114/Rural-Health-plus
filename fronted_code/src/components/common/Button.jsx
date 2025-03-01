import styled, { css } from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return css`
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: var(--secondary);
          color: white;
          border: none;
          &:hover {
            background-color: var(--text-light);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 2px solid var(--primary);
          color: var(--primary);
          &:hover {
            background-color: var(--primary);
            color: white;
          }
        `;
      default:
        return css`
          background-color: var(--primary);
          color: white;
          border: none;
          &:hover {
            background-color: var(--primary-dark);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;