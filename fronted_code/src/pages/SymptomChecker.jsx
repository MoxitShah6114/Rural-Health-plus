// import React, { useState, useRef, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { Container } from '../components/common/Container';
// import { Card } from '../components/common/Card';
// import { Button } from '../components/common/Button';

// // Enhanced color palette with CSS variables
// const AppWrapper = styled.div`
//   --primary: #4a6bff;
//   --primary-light: #7a8eff;
//   --primary-dark: #3451d1;
//   --primary-rgb: 74, 107, 255;
//   --secondary: #2cc9b5;
//   --secondary-light: #4edfd0;
//   --secondary-rgb: 44, 201, 181;
//   --accent: #ff6b6b;
//   --accent-light: #ff9999;
//   --accent-rgb: 255, 107, 107;
//   --text: #2d3748;
//   --text-light: #718096;
//   --text-lighter: #a0aec0;
//   --background: #f8fafc;
//   --card-bg: #ffffff;
//   --border: #e2e8f0;
//   --border-light: #edf2f7;
//   --success: #48bb78;
//   --warning: #f6ad55;
//   --error: #f56565;
//   --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
//   --shadow-md: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
//   --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
//   --radius-sm: 0.375rem;
//   --radius-md: 0.5rem;
//   --radius-lg: 0.75rem;
//   --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
//   font-family: var(--font-sans);
//   background-color: var(--background);
//   color: var(--text);
//   min-height: 100vh;
// `;

// // Animation keyframes
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-8px); }
//   100% { transform: translateY(0px); }
// `;

// // Enhanced styled components
// const PageContainer = styled(Container)`
//   padding: 2rem 1.5rem;
//   max-width: 900px;
  
//   @media (min-width: 768px) {
//     padding: 3rem 2rem;
//   }
// `;

// const Title = styled.h1`
//   margin: 1rem 0 2rem;
//   color: var(--text);
//   font-size: 2.25rem;
//   font-weight: 700;
//   text-align: center;
//   position: relative;
  
//   &::after {
//     content: '';
//     position: absolute;
//     bottom: -12px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 80px;
//     height: 4px;
//     background: linear-gradient(90deg, var(--primary), var(--secondary));
//     border-radius: 2px;
//   }
  
//   @media (min-width: 768px) {
//     font-size: 2.75rem;
//   }
// `;

// const Subtitle = styled.p`
//   text-align: center;
//   color: var(--text-light);
//   font-size: 1.1rem;
//   margin: -0.5rem 0 2rem;
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const Form = styled.form`
//   max-width: 600px;
//   margin: 0 auto;
//   background: var(--card-bg);
//   padding: 2rem;
//   border-radius: var(--radius-lg);
//   box-shadow: var(--shadow-md);
//   animation: ${fadeIn} 0.4s ease-out;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1.75rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   color: var(--text);
//   font-weight: 600;
//   font-size: 0.95rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.875rem 1rem;
//   border: 1px solid var(--border);
//   border-radius: var(--radius-md);
//   background-color: var(--background);
//   color: var(--text);
//   font-size: 1rem;
//   transition: all 0.2s ease;
  
//   &:focus {
//     outline: none;
//     border-color: var(--primary);
//     box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
//   }
  
//   &::placeholder {
//     color: var(--text-lighter);
//   }
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.875rem 1rem;
//   border: 1px solid var(--border);
//   border-radius: var(--radius-md);
//   background-color: var(--background);
//   color: var(--text);
//   min-height: 120px;
//   resize: vertical;
//   font-size: 1rem;
//   transition: all 0.2s ease;
  
//   &:focus {
//     outline: none;
//     border-color: var(--primary);
//     box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
//   }
  
//   &::placeholder {
//     color: var(--text-lighter);
//   }
// `;

// const EnhancedButton = styled(Button)`
//   font-weight: 600;
//   padding: 0.875rem 1.5rem;
//   border-radius: var(--radius-md);
//   transition: all 0.2s ease;
//   border: none;
//   cursor: pointer;
//   font-size: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
  
//   ${props => props.variant === 'primary' && `
//     background: linear-gradient(135deg, var(--primary), var(--primary-dark));
//     color: white;
//     box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
    
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.4);
//       background: linear-gradient(135deg, var(--primary-light), var(--primary));
//     }
    
//     &:active {
//       transform: translateY(0);
//     }
//   `}
  
//   ${props => props.variant === 'secondary' && `
//     background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
//     color: white;
//     box-shadow: 0 4px 12px rgba(var(--secondary-rgb), 0.3);
    
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 6px 16px rgba(var(--secondary-rgb), 0.4);
//     }
    
//     &:active {
//       transform: translateY(0);
//     }
//   `}
  
//   ${props => props.variant === 'outline' && `
//     background: transparent;
//     color: var(--primary);
//     border: 2px solid var(--primary);
    
//     &:hover {
//       background-color: rgba(var(--primary-rgb), 0.05);
//     }
//   `}
  
//   ${props => props.disabled && `
//     opacity: 0.7;
//     cursor: not-allowed;
//     transform: none !important;
//     box-shadow: none !important;
//   `}
  
//   ${props => props.fullWidth && `
//     width: 100%;
//   `}
// `;

// const ResultCard = styled(Card)`
//   margin-top: 2rem;
//   transition: all 0.3s ease;
//   background: var(--card-bg);
//   border-radius: var(--radius-lg);
//   box-shadow: var(--shadow-md);
//   padding: 1.5rem;
//   animation: ${fadeIn} 0.4s ease-out;
  
//   h3 {
//     color: var(--primary);
//     margin-top: 0;
//     font-size: 1.5rem;
//     position: relative;
//     padding-bottom: 0.75rem;
    
//     &::after {
//       content: '';
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       width: 60px;
//       height: 3px;
//       background: linear-gradient(90deg, var(--primary), var(--secondary));
//       border-radius: 2px;
//     }
//   }
  
//   p {
//     color: var(--text);
//     line-height: 1.6;
//   }
// `;

// const TabContainer = styled.div`
//   display: flex;
//   margin-bottom: 2rem;
//   background: var(--background);
//   padding: 0.5rem;
//   border-radius: var(--radius-lg);
//   box-shadow: var(--shadow-sm);
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const Tab = styled.button`
//   flex: 1;
//   padding: 0.875rem;
//   font-weight: 600;
//   font-size: 0.95rem;
//   background-color: ${props => props.active ? 'var(--primary)' : 'transparent'};
//   color: ${props => props.active ? 'white' : 'var(--text)'};
//   border: none;
//   border-radius: var(--radius-md);
//   cursor: pointer;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//     transform: translateX(-100%);
//     transition: transform 0.6s ease;
//   }
  
//   &:hover {
//     background-color: ${props => props.active ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.1)'};
    
//     &::before {
//       transform: translateX(100%);
//     }
//   }
  
//   ${props => props.disabled && `
//     opacity: 0.6;
//     cursor: not-allowed;
    
//     &:hover {
//       background-color: transparent;
      
//       &::before {
//         transform: translateX(-100%);
//       }
//     }
//   `}
  
//   svg {
//     margin-right: 8px;
//     vertical-align: middle;
//   }
// `;

// const ChatbotContainer = styled.div`
//   margin: 0 auto;
//   max-width: 600px;
//   border-radius: var(--radius-lg);
//   overflow: hidden;
//   box-shadow: var(--shadow-lg);
//   background: var(--card-bg);
//   height: 600px;
//   display: flex;
//   flex-direction: column;
//   animation: ${fadeIn} 0.5s ease-out;
// `;

// const ChatHeader = styled.div`
//   background: linear-gradient(135deg, var(--primary), var(--primary-dark));
//   color: white;
//   padding: 1.25rem 1.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
// `;

// const ChatTitle = styled.h3`
//   margin: 0;
//   font-size: 1.25rem;
//   font-weight: 600;
//   display: flex;
//   align-items: center;
  
//   svg {
//     margin-right: 10px;
//   }
// `;

// const OnlineIndicator = styled.span`
//   display: inline-block;
//   width: 10px;
//   height: 10px;
//   background-color: var(--success);
//   border-radius: 50%;
//   margin-right: 8px;
//   position: relative;
  
//   &::after {
//     content: '';
//     position: absolute;
//     top: -3px;
//     left: -3px;
//     width: 16px;
//     height: 16px;
//     background-color: rgba(72, 187, 120, 0.3);
//     border-radius: 50%;
//     animation: ${pulse} 1.5s infinite;
//   }
// `;

// const ChatBgPattern = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.03;
//   pointer-events: none;
//   background-image: radial-gradient(circle at 25px 25px, var(--text) 2%, transparent 0%),
//                     radial-gradient(circle at 75px 75px, var(--text) 2%, transparent 0%);
//   background-size: 100px 100px;
// `;

// const ChatMessages = styled.div`
//   padding: 1.5rem;
//   flex: 1;
//   overflow-y: auto;
//   background-color: var(--background);
//   position: relative;
  
//   &::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: var(--border-light);
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background-color: var(--text-lighter);
//     border-radius: 3px;
//   }
// `;

// const MessageGroup = styled.div`
//   margin-bottom: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   ${props => props.isUser ? 'align-items: flex-end;' : 'align-items: flex-start;'}
//   animation: ${fadeIn} 0.3s ease-out;
// `;

// const MessageBubble = styled.div`
//   padding: 1rem 1.25rem;
//   border-radius: 1.25rem;
//   max-width: 85%;
//   box-shadow: var(--shadow-sm);
//   line-height: 1.6;
//   position: relative;
  
//   ${props => props.isUser 
//     ? `
//       background: linear-gradient(135deg, var(--primary), var(--primary-dark));
//       color: white;
//       border-bottom-right-radius: 0.25rem;
      
//       &::before {
//         content: '';
//         position: absolute;
//         bottom: 0;
//         right: -8px;
//         width: 20px;
//         height: 20px;
//         background: var(--primary-dark);
//         border-radius: 0 0 0 20px;
//         clip-path: polygon(0 0, 0% 100%, 100% 100%);
//       }
//     ` 
//     : `
//       background: white;
//       color: var(--text);
//       border-bottom-left-radius: 0.25rem;
//       border: 1px solid var(--border-light);
      
//       &::before {
//         content: '';
//         position: absolute;
//         bottom: 0;
//         left: -8px;
//         width: 20px;
//         height: 20px;
//         background: white;
//         border-radius: 0 0 20px 0;
//         clip-path: polygon(100% 0, 0% 100%, 100% 100%);
//         border-left: 1px solid var(--border-light);
//         border-bottom: 1px solid var(--border-light);
//       }
//     `}
// `;

// const SenderInfo = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.5rem;
// `;

// const SenderAvatar = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background: ${props => props.isUser 
//     ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' 
//     : 'linear-gradient(135deg, var(--secondary), var(--secondary-light))'};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 600;
//   font-size: 14px;
//   margin-right: ${props => props.isUser ? '0' : '8px'};
//   margin-left: ${props => props.isUser ? '8px' : '0'};
//   box-shadow: var(--shadow-sm);
// `;

// const SenderName = styled.span`
//   font-size: 0.85rem;
//   color: var(--text-light);
//   font-weight: 500;
// `;

// const MessageTime = styled.span`
//   font-size: 0.75rem;
//   color: var(--text-lighter);
//   margin-top: 0.5rem;
//   display: block;
//   ${props => props.isUser ? 'text-align: right;' : 'text-align: left;'}
// `;

// const ChatInputContainer = styled.div`
//   padding: 1rem;
//   background-color: white;
//   border-top: 1px solid var(--border);
//   display: flex;
//   align-items: center;
// `;

// const ChatInputWrapper = styled.div`
//   position: relative;
//   flex: 1;
//   margin-right: 0.75rem;
// `;

// const ChatInput = styled.input`
//   width: 100%;
//   padding: 0.875rem 1rem 0.875rem 3rem;
//   border: 1px solid var(--border);
//   border-radius: var(--radius-lg);
//   background-color: var(--background);
//   color: var(--text);
//   font-size: 1rem;
//   transition: all 0.2s ease;
  
//   &:focus {
//     outline: none;
//     border-color: var(--primary);
//     box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
//   }
  
//   &::placeholder {
//     color: var(--text-lighter);
//   }
  
//   &:disabled {
//     background-color: var(--border-light);
//     cursor: not-allowed;
//   }
// `;

// const InputIcon = styled.div`
//   position: absolute;
//   left: 1rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: var(--text-light);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const SendButton = styled(EnhancedButton)`
//   border-radius: 50%;
//   width: 46px;
//   height: 46px;
//   padding: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
  
//   svg {
//     width: 20px;
//     height: 20px;
//   }
  
//   &:disabled {
//     opacity: 0.5;
//   }
// `;

// const ThinkingAnimation = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   padding: 0 10px;
// `;

// const ThinkingDot = styled.div`
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   background-color: var(--text-light);
//   animation: ${pulse} 1s infinite;
//   animation-delay: ${props => props.delay || '0s'};
// `;

// const FeatureCard = styled.div`
//   background: white;
//   border-radius: var(--radius-lg);
//   padding: 1.5rem;
//   margin-bottom: 2rem;
//   box-shadow: var(--shadow-md);
//   display: flex;
//   align-items: center;
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: var(--shadow-lg);
//   }
  
//   svg {
//     width: 48px;
//     height: 48px;
//     color: var(--primary);
//     margin-right: 1rem;
//     flex-shrink: 0;
//   }
  
//   h3 {
//     margin: 0 0 0.5rem;
//     color: var(--text);
//     font-size: 1.25rem;
//   }
  
//   p {
//     margin: 0;
//     color: var(--text-light);
//   }
// `;

// const FeatureGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1.5rem;
//   margin: 2rem auto;
//   max-width: 900px;
  
//   @media (min-width: 768px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `;

// // Icons
// const PaperPlaneIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 2L11 13"></path>
//     <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
//   </svg>
// );

// const MedicalIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
//     <path d="M12 8v8"></path>
//     <path d="M8 12h8"></path>
//   </svg>
// );

// const BrainIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44"></path>
//     <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44"></path>
//     <path d="M4.42 11.247a2.5 2.5 0 0 0 3.241 3.241L12 12l-4.339-4.339a2.5 2.5 0 0 0-3.241 3.241"></path>
//     <path d="M19.58 11.247a2.5 2.5 0 0 1-3.241 3.241L12 12l4.339-4.339a2.5 2.5 0 0 1 3.241 3.241"></path>
//   </svg>
// );

// const ChatIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//   </svg>
// );

// const FormIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//     <polyline points="14 2 14 8 20 8"></polyline>
//     <line x1="16" y1="13" x2="8" y2="13"></line>
//     <line x1="16" y1="17" x2="8" y2="17"></line>
//     <polyline points="10 9 9 9 8 9"></polyline>
//   </svg>
// );

// const MessageIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//   </svg>
// );

// // Mock Gemini API call function with enhanced responses
// const callGeminiAPI = async (userInput, symptoms, duration) => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1500));
  
//   // Enhanced context-aware responses based on symptoms
//   if (symptoms.toLowerCase().includes('headache')) {
//     if (userInput.toLowerCase().includes('medicine') || userInput.toLowerCase().includes('treatment')) {
//       return "For headaches, I can provide some general information about treatment options:\n\n• Over-the-counter pain relievers like acetaminophen (Tylenol), ibuprofen (Advil, Motrin), or aspirin can help relieve pain\n• Rest in a quiet, dark room with your eyes closed\n• Apply a cold compress or ice pack to your forehead or neck\n• Stay hydrated by drinking plenty of water\n• Try gentle massage of your scalp or temples\n• Maintain regular sleep patterns\n\nIf your headache is severe, persistent, or accompanied by other concerning symptoms like fever, stiff neck, confusion, or vision changes, please seek immediate medical attention.";
//     } else if (userInput.toLowerCase().includes('cause')) {
//       return "Headaches can have many different causes. Given that you've experienced this for " + duration + ", here are some possibilities:\n\n• Tension headaches (often from stress, poor posture, or eye strain)\n• Migraines (can be triggered by certain foods, hormonal changes, or environmental factors)\n• Dehydration or hunger\n• Sinus issues or allergies\n• Medication side effects\n• Eye strain, especially from screens\n• Lack of sleep or poor sleep quality\n• Caffeine withdrawal\n\nIf your headaches are frequent or severe, I'd recommend consulting with a healthcare provider for proper diagnosis and treatment.";
//     } else if (userInput.toLowerCase().includes('migraine')) {
//       return "Migraines are a specific type of headache that can cause intense, throbbing pain, often on one side of the head. They're frequently accompanied by nausea, vomiting, and sensitivity to light and sound. Some people experience an 'aura' before a migraine starts, which can include visual disturbances like flashing lights or blind spots.\n\nFor migraine management:\n• Identify and avoid personal triggers (certain foods, stress, lack of sleep)\n• Take prescribed medications at the first sign of a migraine\n• Rest in a dark, quiet room\n• Apply cold compresses to your head\n• Stay hydrated\n• Practice stress management techniques\n\nIf you suspect you're having migraines, a healthcare provider can help with specific diagnosis and treatment options.";
//     }
//   }
  
//   if (symptoms.toLowerCase().includes('fever')) {
//     if (userInput.toLowerCase().includes('medicine') || userInput.toLowerCase().includes('treatment')) {
//       return "For fever management, here are some general recommendations:\n\n• Over-the-counter medications like acetaminophen (Tylenol) or ibuprofen (Advil, Motrin) can help reduce fever\n• Stay well-hydrated with water, clear broths, or electrolyte drinks\n• Rest as much as possible to help your body fight the underlying cause\n• Dress in lightweight clothing and use light blankets\n• Take lukewarm (not cold) baths or apply cool compresses\n\nYou should seek immediate medical attention if your fever is above 103°F (39.4°C), lasts more than three days, or is accompanied by severe headache, stiff neck, confusion, difficulty breathing, or rash.";
//     } else if (userInput.toLowerCase().includes('cause')) {
//       return "Fever is your body's natural defense against infection. Given that you've had symptoms for " + duration + ", your fever could be caused by:\n\n• Viral infections (common cold, flu, COVID-19)\n• Bacterial infections (strep throat, urinary tract infections)\n• Inflammatory conditions\n• Certain medications\n• Heat exhaustion (though this is different from a true fever)\n\nThe underlying cause of your fever will determine the appropriate treatment. If your fever is high, persistent, or accompanied by other concerning symptoms, please consult with a healthcare provider.";
//     }
//   }
  
//   if (symptoms.toLowerCase().includes('cough')) {
//     if (userInput.toLowerCase().includes('medicine') || userInput.toLowerCase().includes('treatment')) {
     
//     } else if (userInput.toLowerCase().includes('cause')) {
      
//     }
//   }
  
//   // Default responses for common questions
//   if (userInput.toLowerCase().includes('medicine') || userInput.toLowerCase().includes('treatment')) {
//     return "Based on your symptoms of " + symptoms + " for " + duration + ", I recommend consulting with a healthcare professional for proper diagnosis and treatment. While I can provide general information, your specific condition may require personalized care.\n\nGeneral recommendations include:\n• Rest and allow your body to recover\n• Stay hydrated\n• Consider over-the-counter pain relievers if appropriate for your symptoms\n• Monitor your symptoms for any changes or worsening\n\nPlease remember that this is general advice and not a substitute for professional medical care.";
//   }
  
//   if (userInput.toLowerCase().includes('serious') || userInput.toLowerCase().includes('emergency')) {
//     return "Some symptoms require immediate medical attention. Please seek emergency care if you experience:\n\n• Difficulty breathing or shortness of breath\n• Severe chest or upper abdominal pain\n• Sudden confusion or changes in mental state\n• Sudden severe headache\n• Sudden dizziness, weakness, or vision changes\n• Severe or persistent vomiting\n• Uncontrolled bleeding\n• Severe burns or injuries\n• Suicidal thoughts\n\nIf you're experiencing any of these symptoms, please call emergency services or go to your nearest emergency room immediately.";
//   }
  
//   if (userInput.toLowerCase().includes('test') || userInput.toLowerCase().includes('diagnos')) {
//     return "For your symptoms of " + symptoms + " lasting " + duration + ", a healthcare provider might recommend various tests to determine the cause. These could include physical examination, blood tests, imaging studies, or other diagnostic procedures depending on your specific situation.\n\nIt's best to consult with a healthcare provider who can evaluate your symptoms in person and recommend appropriate testing based on your medical history and current condition.";
//   }
  
//   if (userInput.toLowerCase().includes('prevention') || userInput.toLowerCase().includes('avoid')) {
//     return "To help prevent or manage your symptoms of " + symptoms + " in the future, consider these general recommendations:\n\n• Maintain a healthy lifestyle with regular exercise and balanced nutrition\n• Get adequate sleep and manage stress\n• Stay hydrated\n• Practice good hygiene, including regular handwashing\n• Avoid known triggers for your symptoms\n• Follow any treatment plans prescribed by your healthcare provider\n\nFor more specific prevention strategies, it's best to consult with a healthcare provider who can tailor recommendations to your individual health needs.";
//   }
  
//   // Default general response
//   return "I understand you're experiencing " + symptoms + " for " + duration + ". This must be concerning for you. While I can provide general health information, I can't diagnose specific conditions.\n\nTo better assist you, could you share more details about your symptoms or ask a specific question? For example, you might ask about potential causes, home management strategies, or when to seek medical care.\n\nRemember that for personalized medical advice, it's always best to consult with a healthcare professional who can evaluate your specific situation.";
// };

// // Actual Gemini API implementation (commented out for now)
// /*
// const callGeminiAPI = async (userInput, symptoms, duration) => {
//   try {
//     const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${YOUR_API_KEY}`
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: `Patient symptoms: ${symptoms}. Duration: ${duration}. Patient question: ${userInput}. 
//             Provide a helpful, informative response about these symptoms. Include possible causes, 
//             general treatment options, and when they should seek professional medical help. 
//             Do not provide a definitive diagnosis. Make it clear this is general information only.`
//           }]
//         }]
//       })
//     });

//     const data = await response.json();
//     return data.candidates[0].content.parts[0].text;
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     throw error;
//   }
// };
// */

// export const SymptomChecker = () => {
//   const [activeTab, setActiveTab] = useState('form');
//   const [symptoms, setSymptoms] = useState('');
//   const [duration, setDuration] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: 'AI Health Assistant',
//       text: 'Hello! I\'m your health assistant. You can ask me questions about your symptoms, and I\'ll provide information to help you understand your condition better. Please note that I\'m not a replacement for professional medical advice.',
//       isUser: false,
//       time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//     }
//   ]);
//   const [currentMessage, setCurrentMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const [showIntro, setShowIntro] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowResult(true);
//     setShowIntro(false);
    
//     // Add initial chatbot message based on symptoms
//     setMessages(prev => [...prev, {
//       sender: 'AI Health Assistant',
//       text: `I see you're experiencing ${symptoms} for ${duration}. How can I help you with these symptoms?`,
//       isUser: false,
//       time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//     }]);
    
//     // Switch to chatbot tab after form submission
//     setActiveTab('chatbot');
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!currentMessage.trim()) return;
    
//     // Add user message
//     setMessages(prev => [...prev, {
//       sender: 'You',
//       text: currentMessage,
//       isUser: true,
//       time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//     }]);
    
//     setCurrentMessage('');
//     setIsLoading(true);
    
//     try {
//       // Call Gemini API with user message and context
//       const response = await callGeminiAPI(currentMessage, symptoms, duration);
      
//       // Add AI response
//       setMessages(prev => [...prev, {
//         sender: 'AI Health Assistant',
//         text: response,
//         isUser: false,
//         time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//       }]);
//     } catch (error) {
//       console.error('Error calling Gemini API:', error);
      
//       // Add error message
//       setMessages(prev => [...prev, {
//         sender: 'AI Health Assistant',
//         text: 'I apologize, but I encountered an error processing your request. Please try again or consult with a healthcare professional directly.',
//         isUser: false,
//         time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Auto-scroll to the bottom of chat when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Format message text with line breaks
//   const formatMessage = (text) => {
//     return text.split('\n').map((line, i) => (
//       <React.Fragment key={i}>
//         {line}
//         {i < text.split('\n').length - 1 && <br />}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <AppWrapper>
//       <PageContainer>
//         <Title>Health Symptom Assistant</Title>
//         <Subtitle>
//           Get insights about your symptoms and guidance on next steps
//         </Subtitle>
        
//         {showIntro && (
//           <FeatureGrid>
//             <FeatureCard>
//               <MedicalIcon />
//               <div>
//                 <h3>Symptom Analysis</h3>
//                 <p>Describe your symptoms and get information about potential causes and management options.</p>
//               </div>
//             </FeatureCard>
//             <FeatureCard>
//               <BrainIcon />
//               <div>
//                 <h3>AI-Powered Insights</h3>
//                 <p>Our advanced AI uses medical knowledge to provide relevant health information.</p>
//               </div>
//             </FeatureCard>
//           </FeatureGrid>
//         )}
        
//         <TabContainer>
//           <Tab 
//             active={activeTab === 'form'} 
//             onClick={() => setActiveTab('form')}
//           >
//             <FormIcon /> Symptom Form
//           </Tab>
//           <Tab 
//             active={activeTab === 'chatbot'} 
//             onClick={() => setActiveTab('chatbot')}
//             disabled={!showResult}
//             style={{ opacity: !showResult ? 0.5 : 1 }}
//           >
//             <ChatIcon /> AI Assistant
//           </Tab>
//         </TabContainer>
        
//         {activeTab === 'form' && (
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label htmlFor="symptoms">Describe your symptoms</Label>
//               <TextArea 
//                 id="symptoms" 
//                 value={symptoms} 
//                 onChange={(e) => setSymptoms(e.target.value)} 
//                 placeholder="E.g., headache, fever, cough..." 
//                 required 
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="duration">How long have you had these symptoms?</Label>
//               <Input 
//                 type="text" 
//                 id="duration" 
//                 value={duration} 
//                 onChange={(e) => setDuration(e.target.value)} 
//                 placeholder="E.g., 2 days, 1 week..." 
//                 required 
//               />
//             </FormGroup>
//             <EnhancedButton type="submit" variant="primary" fullWidth>
//               Submit & Get Help
//             </EnhancedButton>
//           </Form>
//         )}
        
//         {showResult && activeTab === 'form' && (
//           <ResultCard>
//             <h3>Preliminary Assessment</h3>
//             <p>
//               Based on your symptoms, we recommend consulting with a healthcare professional. 
//               You can also chat with our AI assistant for more information about your symptoms.
//             </p>
//             <EnhancedButton 
//               variant="primary" 
//               fullWidth 
//               style={{ marginTop: '1rem' }} 
//               onClick={() => setActiveTab('chatbot')}
//             >
//               Chat with AI Assistant
//             </EnhancedButton>
//             <EnhancedButton 
//               variant="outline" 
//               fullWidth 
//               style={{ marginTop: '1rem' }} 
//               onClick={() => window.location.href = '/telemedicine'}
//             >
//               Book Doctor Consultation
//             </EnhancedButton>
//           </ResultCard>
//         )}
        
//         {activeTab === 'chatbot' && showResult && (
//           <ChatbotContainer>
//             <ChatHeader>
//               <ChatTitle>
//                 <OnlineIndicator />
//                 AI Health Assistant
//               </ChatTitle>
//             </ChatHeader>
            
//             <ChatMessages>
//               <ChatBgPattern />
//               {messages.map((message, index) => (
//                 <MessageGroup key={index} isUser={message.isUser}>
//                   <SenderInfo>
//                     {!message.isUser && (
//                       <SenderAvatar isUser={message.isUser}>
//                         {message.isUser ? 'Y' : 'AI'}
//                       </SenderAvatar>
//                     )}
//                     <SenderName>{message.sender}</SenderName>
//                     {message.isUser && (
//                       <SenderAvatar isUser={message.isUser}>
//                         {message.isUser ? 'Y' : 'AI'}
//                       </SenderAvatar>
//                     )}
//                   </SenderInfo>
//                   <MessageBubble isUser={message.isUser}>
//                     {formatMessage(message.text)}
//                   </MessageBubble>
//                   <MessageTime isUser={message.isUser}>{message.time}</MessageTime>
//                 </MessageGroup>
//               ))}
//               {isLoading && (
//                 <MessageGroup isUser={false}>
//                   <SenderInfo>
//                     <SenderAvatar isUser={false}>AI</SenderAvatar>
//                     <SenderName>AI Health Assistant</SenderName>
//                   </SenderInfo>
//                   <MessageBubble isUser={false} style={{ display: 'flex', alignItems: 'center', minWidth: '80px' }}>
//                     <ThinkingAnimation>
//                       <ThinkingDot />
//                       <ThinkingDot delay="0.2s" />
//                       <ThinkingDot delay="0.4s" />
//                     </ThinkingAnimation>
//                   </MessageBubble>
//                 </MessageGroup>
//               )}
//               <div ref={messagesEndRef} />
//             </ChatMessages>
            
//             <form onSubmit={handleSendMessage}>
//               <ChatInputContainer>
//                 <ChatInputWrapper>
//                   <InputIcon>
//                     <MessageIcon />
//                   </InputIcon>
//                   <ChatInput 
//                     type="text" 
//                     placeholder="Ask about your symptoms or treatment options..." 
//                     value={currentMessage}
//                     onChange={(e) => setCurrentMessage(e.target.value)}
//                     disabled={isLoading}
//                   />
//                 </ChatInputWrapper>
//                 <SendButton 
//                   type="submit" 
//                   variant="primary" 
//                   disabled={isLoading || !currentMessage.trim()}
//                 >
//                   <PaperPlaneIcon />
//                 </SendButton>
//               </ChatInputContainer>
//             </form>
//           </ChatbotContainer>
//         )}
        
//         {!showResult && activeTab === 'chatbot' && (
//           <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
//             <ChatIcon style={{ width: '48px', height: '48px', marginBottom: '1rem', opacity: 0.5 }} />
//             <h3>Please submit your symptoms first</h3>
//             <p>Fill out the symptom form to start chatting with our AI Health Assistant.</p>
//             <EnhancedButton 
//               variant="primary" 
//               onClick={() => setActiveTab('form')}
//               style={{ marginTop: '1rem' }}
//             >
//               Go to Symptom Form
//             </EnhancedButton>
//           </div>
//         )}
//       </PageContainer>
//     </AppWrapper>
//   );
// };



// src/components/SymptomChecker/SymptomChecker.jsx
// src/components/SymptomChecker/SymptomChecker.jsx// src/components/SymptomChecker/SymptomChecker.jsx



// src/components/SymptomChecker/SymptomChecker.jsx// src/components/SymptomChecker/SymptomChecker.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Send, Loader, AlertCircle, Heart, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

// Configure axios with the backend URL
// If the port was changed in the backend, update it here
axios.defaults.baseURL = 'http://localhost:5001';

// Theme definition
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

// Styled components
const ChatContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 650px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: ${theme.shadow};
  overflow: hidden;
  position: relative;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
  color: white;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TitleIcon = styled.div`
  background: rgba(255, 255, 255, 0.2);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: ${theme.background};
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.background};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.border};
    border-radius: 20px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 85%;
  ${props => props.isUser ? 'align-self: flex-end;' : 'align-self: flex-start;'}
`;

const MessageBubble = styled.div`
  padding: 1rem;
  border-radius: 12px;
  position: relative;
  line-height: 1.6;
  font-size: 1rem;
  
  ${props => props.isUser ? `
    background-color: ${theme.primary};
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    background-color: white;
    color: ${theme.text};
    border: 1px solid ${theme.border};
    border-bottom-left-radius: 4px;
  `}
  
  /* Markdown styling */
  p {
    margin: 0.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  strong {
    color: ${props => props.isUser ? 'white' : theme.primary};
    font-weight: 600;
  }
  
  a {
    color: ${props => props.isUser ? 'white' : theme.accent};
    text-decoration: underline;
  }
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: ${theme.textMuted};
  margin-top: 0.25rem;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid ${theme.border};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.9rem 1rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
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

const SendButton = styled(Button)`
  background: ${theme.primary};
  color: white;
  border-radius: 8px;
  padding: 0.9rem;
  min-width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${theme.primaryDark};
  }
  
  &:disabled {
    background: ${theme.textMuted};
    cursor: not-allowed;
  }
`;

const DisclaimerText = styled.div`
  font-size: 0.8rem;
  color: ${theme.textLight};
  text-align: center;
  padding: 0.75rem;
  background-color: ${theme.primaryLight};
  border-top: 1px solid ${theme.border};
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: ${theme.textLight};
  font-style: italic;
`;

const SymptomPresets = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.75rem 1rem;
  background-color: white;
  border-top: 1px solid ${theme.border};
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: white;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.border};
    border-radius: 20px;
  }
`;

const PresetButton = styled.button`
  background-color: ${theme.background};
  border: 1px solid ${theme.border};
  color: ${theme.text};
  padding: 0.5rem 0.75rem;
  border-radius: 16px;
  font-size: 0.85rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    background-color: ${theme.primaryLight};
    border-color: ${theme.primary};
    color: ${theme.primary};
  }
`;

const ErrorBanner = styled.div`
  padding: 10px;
  background-color: #fee2e2;
  color: ${theme.danger};
  text-align: center;
  border-bottom: 1px solid #fecaca;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StatusBanner = styled.div`
  padding: 8px 12px;
  background-color: ${props => props.connected ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.connected ? theme.secondary : theme.danger};
  text-align: center;
  border-bottom: 1px solid ${props => props.connected ? '#a7f3d0' : '#fecaca'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.85rem;
`;

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const SymptomChecker = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      content: "Hello! I'm your medical symptom assistant. Please describe your symptoms or health concerns, and I'll try to provide some information. Remember, I'm not a replacement for professional medical advice.",
      isUser: false,
      time: formatTime()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [apiStatus, setApiStatus] = useState({
    checked: false,
    connected: false,
    message: "Checking connection..."
  });
  const messagesEndRef = useRef(null);
  
  // Common symptoms and conditions for preset buttons
  const commonSymptoms = [
    { text: "Headache", icon: <AlertCircle size={14} /> },
    { text: "Fever", icon: <AlertCircle size={14} /> },
    { text: "Cough", icon: <AlertCircle size={14} /> },
    { text: "Sore throat", icon: <AlertCircle size={14} /> },
    { text: "Chest pain", icon: <AlertCircle size={14} /> },
    { text: "Shortness of breath", icon: <AlertCircle size={14} /> },
    { text: "Abdominal pain", icon: <AlertCircle size={14} /> },
    { text: "Nausea", icon: <AlertCircle size={14} /> },
    { text: "Skin rash", icon: <AlertCircle size={14} /> },
    { text: "Joint pain", icon: <AlertCircle size={14} /> },
    { text: "Dizziness", icon: <AlertCircle size={14} /> },
    { text: "Fatigue", icon: <AlertCircle size={14} /> }
  ];
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Check if API is available when component mounts
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        setApiStatus({
          checked: false,
          connected: false,
          message: "Checking connection..."
        });
        
        const response = await axios.get('/api/test');
        
        if (response.data.success) {
          setApiStatus({
            checked: true,
            connected: true,
            message: "Connected to medical service"
          });
        } else {
          throw new Error("Invalid response");
        }
      } catch (error) {
        console.error('API test failed:', error);
        setApiStatus({
          checked: true,
          connected: false,
          message: "Connection issue with the medical service. Some features may be limited."
        });
      }
    };
    
    checkApiStatus();
  }, []);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const startNewConversation = () => {
    setConversationHistory([]);
    setMessages([
      {
        id: 'welcome',
        content: "Hello! I'm your medical symptom assistant. Please describe your symptoms or health concerns, and I'll try to provide some information. Remember, I'm not a replacement for professional medical advice.",
        isUser: false,
        time: formatTime()
      }
    ]);
  };
  
  const testApiConnection = async () => {
    try {
      setApiStatus({
        ...apiStatus,
        message: "Testing connection..."
      });
      
      const response = await axios.get('/api/test');
      
      if (response.data.success) {
        setApiStatus({
          checked: true,
          connected: true,
          message: "Connected to medical service"
        });
        alert('Successfully connected to the medical service!');
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error('API connection test failed:', error);
      setApiStatus({
        checked: true,
        connected: false,
        message: "Connection issue with the medical service. Some features may be limited."
      });
      alert('Failed to connect to the medical service. Check if the server is running.');
    }
  };
  
  // Fallback to direct Gemini API call if server is unavailable
  const sendMessageDirectToGemini = async (userMessage) => {
    try {
      // Direct call to Gemini API
      const API_KEY = 'AIzaSyDP-ANGndZhGl2dRjYEE5U9sD1steobR38'; // Replace with your API key
      const MODEL = 'gemini-1.5-pro';
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
      
      // Medical context to keep responses focused on health
      const MEDICAL_CONTEXT = `
        You are a specialized medical symptoms assistant. Your role is to help users understand health concerns and provide preliminary information.
        
        CRITICAL GUIDELINES:
        1. ONLY respond to health and medical queries. For ANY non-medical questions, politely explain you can only discuss health topics.
        2. Always include a disclaimer that you're not replacing professional medical advice.
        3. Never diagnose with certainty - only suggest possibilities.
        4. For emergencies, advise seeking immediate medical attention.
        5. Use clear, simple language to explain medical concepts.
        6. Focus only on evidence-based information from reputable medical sources.
      `;
      
      // Format the conversation
      const contents = [
        {
          role: "user",
          parts: [{ text: MEDICAL_CONTEXT }]
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'll act as a medical symptoms assistant following these guidelines." }]
        }
      ];
      
      // Add previous conversation if available
      if (conversationHistory.length > 0) {
        conversationHistory.forEach(msg => {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        });
      }
      
      // Add current message
      contents.push({
        role: "user",
        parts: [{ text: userMessage }]
      });
      
      // Make direct API request
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents,
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Extract the generated text
      return {
        success: true,
        message: response.data.candidates[0].content.parts[0].text
      };
    } catch (error) {
      console.error('Error calling Gemini API directly:', error);
      return {
        success: false,
        message: "Sorry, I couldn't connect to the AI service. Please try again later."
      };
    }
  };
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    const newUserMessage = {
      id: Date.now().toString(),
      content: userMessage,
      isUser: true,
      time: formatTime()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);
    
    // Add to conversation history for context
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];
    
    try {
      let response;
      
      // Try server first, fall back to direct API if needed
      if (apiStatus.connected) {
        try {
          // Call the server API
          response = await axios.post('/api/gemini/chat', {
            message: userMessage,
            history: updatedHistory
          });
        } catch (serverError) {
          console.error('Server API failed, falling back to direct API:', serverError);
          // Update status to show server is disconnected
          setApiStatus({
            checked: true,
            connected: false,
            message: "Connection issue with the medical service. Using fallback mode."
          });
          
          // Fall back to direct API call
          response = await sendMessageDirectToGemini(userMessage);
        }
      } else {
        // Use direct API call if server is known to be disconnected
        response = await sendMessageDirectToGemini(userMessage);
      }
      
      if (response.success || (response.data && response.data.success)) {
        // Extract bot response
        const botResponse = response.message || response.data.message;
        
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now().toString() + '-response',
            content: botResponse,
            isUser: false,
            time: formatTime()
          }
        ]);
        
        // Update conversation history
        setConversationHistory([
          ...updatedHistory,
          { role: 'model', content: botResponse }
        ]);
      } else {
        // Handle error response
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now().toString() + '-error',
            content: "I'm having trouble processing your health query. Please try again or rephrase your question.",
            isUser: false,
            time: formatTime()
          }
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Provide a user-friendly error message
      let errorMessage = "Sorry, I couldn't connect to the medical database. Please try again later.";
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 429) {
          errorMessage = "You've sent too many requests. Please wait a moment before trying again.";
        }
      }
      
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString() + '-error',
          content: errorMessage,
          isUser: false,
          time: formatTime()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && input.trim()) {
      sendMessage();
    }
  };
  
  const handlePresetClick = (symptom) => {
    setInput(prev => {
      const newInput = prev.trim() ? 
        `${prev}, ${symptom.toLowerCase()}` : 
        `I'm experiencing ${symptom.toLowerCase()}`;
      return newInput;
    });
    // Focus the input after selecting a symptom
    document.getElementById('chat-input').focus();
  };
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>
          <TitleIcon>
            <Heart size={20} />
          </TitleIcon>
          Medical Symptom Assistant
        </ChatTitle>
        <HeaderActions>
          <IconButton onClick={testApiConnection} title="Test Connection">
            <RefreshCw size={18} />
          </IconButton>
          <IconButton onClick={startNewConversation} title="New conversation">
            <RefreshCw size={18} />
          </IconButton>
        </HeaderActions>
      </ChatHeader>
      
      {apiStatus.checked && (
        <StatusBanner connected={apiStatus.connected}>
          {apiStatus.connected ? (
            <>
              <RefreshCw size={14} />
              {apiStatus.message}
            </>
          ) : (
            <>
              <AlertCircle size={14} />
              {apiStatus.message}
            </>
          )}
        </StatusBanner>
      )}
      
      <ChatMessages>
        {messages.map(message => (
          <MessageContainer key={message.id} isUser={message.isUser}>
            <MessageBubble isUser={message.isUser}>
              {message.isUser ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
            </MessageBubble>
            <MessageTime isUser={message.isUser}>{message.time}</MessageTime>
          </MessageContainer>
        ))}
        
        {loading && (
          <LoadingIndicator>
            <Loader size={16} className="animate-spin" />
            Analyzing your symptoms...
          </LoadingIndicator>
        )}
        
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <SymptomPresets>
        {commonSymptoms.map(symptom => (
          <PresetButton 
            key={symptom.text} 
            onClick={() => handlePresetClick(symptom.text)}
          >
            {symptom.icon}
            {symptom.text}
          </PresetButton>
        ))}
      </SymptomPresets>
      
      <ChatInputContainer>
        <ChatInput
          id="chat-input"
          type="text"
          placeholder="Describe your symptoms or health concern..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <SendButton 
          onClick={sendMessage} 
          disabled={loading || !input.trim()}
        >
          <Send size={18} />
        </SendButton>
      </ChatInputContainer>
      
      <DisclaimerText>
        <AlertCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
        This AI assistant provides information only. Always consult with a healthcare professional for medical advice.
      </DisclaimerText>
    </ChatContainer>
  );
};