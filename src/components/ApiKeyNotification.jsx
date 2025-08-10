import { useState } from 'react'
import { AlertTriangle, ExternalLink, X } from 'lucide-react'
import styled from 'styled-components'

const NotificationBanner = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
  color: white;
  padding: 1rem 2rem;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`

const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`

const NotificationText = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`

const NotificationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`

const ApiKeyNotification = () => {
  const [isVisible, setIsVisible] = useState(true)
  const hasApiKey = import.meta.env.VITE_GEMINI_API_KEY && 
                    import.meta.env.VITE_GEMINI_API_KEY !== 'your_api_key_here' &&
                    import.meta.env.VITE_GEMINI_API_KEY.length > 10

  if (!isVisible || hasApiKey) {
    return null
  }

  return (
    <NotificationBanner>
      <NotificationContent>
        <AlertTriangle size={24} />
        <NotificationText>
          <h4>🤖 AI Features Available!</h4>
          <p>Add your free Gemini API key to unlock personalized workout plans and recipe generation</p>
        </NotificationText>
      </NotificationContent>
      
      <NotificationActions>
        <LinkButton 
          href="https://makersuite.google.com/app/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Get Free API Key
          <ExternalLink size={16} />
        </LinkButton>
        
        <CloseButton onClick={() => setIsVisible(false)}>
          <X size={20} />
        </CloseButton>
      </NotificationActions>
    </NotificationBanner>
  )
}

export default ApiKeyNotification
