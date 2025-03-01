import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --secondary: #64748b;
    --success: #22c55e;
    --danger: #ef4444;
    --warning: #f59e0b;
    --background: #ffffff;
    --text: #0f172a; 
    --text-light: #64748b;
    --border: #e2e8f0;
    --shadow: rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    --secondary: #94a3b8;
    --background: #0f172a;
    --text: #f8fafc;
    --text-light: #94a3b8;
    --border: #1e293b;
    --shadow: rgba(0, 0, 0, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--text);
    line-height: 1.5;
    transition: all 0.2s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @keyframes slideUp {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    90% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
`;

const FAQItem = styled.div`
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 0 auto;
  animation: slideUp 2s infinite;
`;
