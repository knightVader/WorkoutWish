import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Target, Users, Award, Zap } from 'lucide-react'
import styled from 'styled-components'

const HomeContainer = styled.div`
  padding-top: 70px;
  min-height: 100vh;
`

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 50%,
    var(--bg-primary) 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 107, 53, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 0 1rem;
    min-height: 80vh;
    justify-content: center;
  }
`

const HeroText = styled.div`
  z-index: 10;
  position: relative;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  .gradient-text {
    background: var(--gradient-sunset);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
  }
`

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  z-index: 10;
  position: relative;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const HeroVisual = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    order: -1;
  }
`

const FloatingCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  position: absolute;
  backdrop-filter: blur(10px);
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }

  &.card-1 {
    top: 10%;
    left: 10%;
    width: 200px;
  }

  &.card-2 {
    top: 60%;
    right: 10%;
    width: 180px;
  }

  &.card-3 {
    bottom: 10%;
    left: 30%;
    width: 160px;
  }
`

const StatsSection = styled.section`
  padding: 4rem 0;
  background: var(--bg-secondary);
`

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  
  .stat-icon {
    color: var(--orange-primary);
    margin-bottom: 1rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    background: var(--gradient-sunset);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .stat-label {
    color: var(--text-secondary);
    font-weight: 500;
  }
`

const FeaturesSection = styled.section`
  padding: 6rem 0;
`

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`

const SectionTitle = styled(motion.h2)`
  margin-bottom: 3rem;
  
  .gradient-text {
    background: var(--gradient-sunset);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const FeatureCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 2.5rem;
  text-align: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-8px);
    border-color: var(--orange-primary);
    box-shadow: var(--shadow-lg);
  }

  .feature-icon {
    color: var(--orange-primary);
    margin-bottom: 1.5rem;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`

const Home = () => {
  const stats = [
    { icon: Users, number: '10K+', label: 'Happy Users' },
    { icon: Target, number: '95%', label: 'Success Rate' },
    { icon: Award, number: '500+', label: 'Workout Plans' },
    { icon: Zap, number: '24/7', label: 'AI Support' },
  ]

  const features = [
    {
      icon: Target,
      title: 'Personalized Plans',
      description: 'Get custom workout and diet plans tailored to your fitness level, goals, and preferences.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Nutrition',
      description: 'Discover delicious recipes and meal plans generated specifically for your dietary needs.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join thousands of fitness enthusiasts on their journey to a healthier lifestyle.'
    }
  ]

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transform Your Body, <span className="gradient-text">Elevate Your Life</span>
            </HeroTitle>
            
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get personalized workout plans, nutrition guidance, and recipe suggestions powered by AI. 
              Your fitness journey starts here with WorkoutWish.
            </HeroSubtitle>

            <CTAButtons
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/health-assessment" className="btn btn-primary">
                Start Your Journey
                <ArrowRight size={20} />
              </Link>
              <Link to="/dish-generator" className="btn btn-secondary">
                Explore Recipes
              </Link>
            </CTAButtons>
          </HeroText>

          <HeroVisual
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FloatingCard 
              className="card-1"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h4 style={{ color: 'var(--orange-primary)', marginBottom: '0.5rem' }}>Workout Plan</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Custom exercises tailored for you
              </p>
            </FloatingCard>

            <FloatingCard 
              className="card-2"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <h4 style={{ color: 'var(--orange-primary)', marginBottom: '0.5rem' }}>Nutrition</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                AI-powered meal suggestions
              </p>
            </FloatingCard>

            <FloatingCard 
              className="card-3"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <h4 style={{ color: 'var(--orange-primary)', marginBottom: '0.5rem' }}>Progress</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Track your fitness journey
              </p>
            </FloatingCard>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsContainer>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon size={48} className="stat-icon" />
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </StatCard>
            ))}
          </StatsGrid>
        </StatsContainer>
      </StatsSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="gradient-text">WorkoutWish</span>?
          </SectionTitle>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <feature.icon size={48} className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
    </HomeContainer>
  )
}

export default Home
