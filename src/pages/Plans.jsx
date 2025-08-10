import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Dumbbell, 
  Apple, 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle,
  PlayCircle
} from 'lucide-react'
import styled from 'styled-components'

const PlansContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: var(--bg-primary);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled(motion.h1)`
  margin-bottom: 1rem;
  
  .gradient-text {
    background: var(--gradient-sunset);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--bg-accent);
`

const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  background: none;
  border: none;
  padding: 1rem 2rem;
  color: ${props => props.active ? 'var(--orange-primary)' : 'var(--text-secondary)'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 2px solid ${props => props.active ? 'var(--orange-primary)' : 'transparent'};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--orange-primary);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`

const PlanCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: var(--transition);

  &:hover {
    border-color: var(--orange-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  h3 {
    color: var(--text-primary);
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      color: var(--orange-primary);
    }
  }

  .plan-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--text-secondary);
      font-size: 0.9rem;

      .icon {
        color: var(--orange-primary);
      }
    }
  }
`

const PlanContent = styled.div`
  .plan-description {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .plan-items {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`

const PlanItem = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);

  &:hover {
    border-color: var(--orange-primary);
  }

  .item-icon {
    color: var(--orange-primary);
    flex-shrink: 0;
  }

  .item-content {
    flex: 1;

    .item-title {
      color: var(--text-primary);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .item-details {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
  }

  .item-status {
    color: var(--text-secondary);
    font-size: 0.8rem;
    
    &.completed {
      color: var(--orange-primary);
    }
  }
`

const PlanActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);

  .empty-icon {
    color: var(--orange-primary);
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`

const Plans = () => {
  const [activeTab, setActiveTab] = useState('workout')
  const [userAssessmentData, setUserAssessmentData] = useState(null)
  const [generatedPlans, setGeneratedPlans] = useState(null)

  useEffect(() => {
    // Check if user has completed assessment
    const assessmentData = localStorage.getItem('userAssessmentData')
    const plansData = localStorage.getItem('generatedPlans')
    
    if (assessmentData) {
      setUserAssessmentData(JSON.parse(assessmentData))
    }
    
    if (plansData) {
      setGeneratedPlans(JSON.parse(plansData))
    }
  }, [])

  // Use real generated plans instead of mock data
  const workoutPlans = generatedPlans?.workoutPlan ? [generatedPlans.workoutPlan] : []
  const nutritionPlans = generatedPlans?.nutritionPlan ? [generatedPlans.nutritionPlan] : []

  const renderWorkoutPlans = () => (
    <>
      {workoutPlans.length > 0 ? (
        workoutPlans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PlanHeader>
              <h3>
                <Dumbbell size={24} className="icon" />
                {plan.title}
              </h3>
              <div className="plan-meta">
                <div className="meta-item">
                  <Clock size={16} className="icon" />
                  {plan.duration}
                </div>
                <div className="meta-item">
                  <Target size={16} className="icon" />
                  {plan.difficulty}
                </div>
                <div className="meta-item">
                  <TrendingUp size={16} className="icon" />
                  {plan.completedSessions}/{plan.sessions} sessions
                </div>
              </div>
            </PlanHeader>

            <PlanContent>
              <p className="plan-description">{plan.description}</p>
              
              <div className="plan-items">
                {plan.exercises.map((exercise, idx) => (
                  <PlanItem key={idx}>
                    <div className="item-icon">
                      <Dumbbell size={20} />
                    </div>
                    <div className="item-content">
                      <div className="item-title">{exercise.name}</div>
                      <div className="item-details">{exercise.sets}</div>
                    </div>
                    <div className="item-status">
                      <CheckCircle size={16} />
                    </div>
                  </PlanItem>
                ))}
              </div>
            </PlanContent>
          </PlanCard>
        ))
      ) : (
        <EmptyState
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Dumbbell size={64} className="empty-icon" />
          <h3>
            {userAssessmentData 
              ? `Welcome back, ${userAssessmentData.name}!` 
              : 'No Workout Plans Yet'}
          </h3>
          <p>
            {userAssessmentData 
              ? 'Your personalized workout plans are being generated. Please check back soon!'
              : 'Complete your health assessment to get personalized workout plans tailored to your fitness goals.'}
          </p>
          <Link to="/health-assessment" className="btn btn-primary">
            {userAssessmentData ? 'Update Assessment' : 'Complete Assessment'}
          </Link>
        </EmptyState>
      )}
    </>
  )

  const renderNutritionPlans = () => (
    <>
      {nutritionPlans.length > 0 ? (
        nutritionPlans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PlanHeader>
              <h3>
                <Apple size={24} className="icon" />
                {plan.title}
              </h3>
              <div className="plan-meta">
                <div className="meta-item">
                  <Calendar size={16} className="icon" />
                  {plan.duration}
                </div>
                <div className="meta-item">
                  <Target size={16} className="icon" />
                  {plan.calories}
                </div>
                <div className="meta-item">
                  <TrendingUp size={16} className="icon" />
                  Day {plan.completedDays}
                </div>
              </div>
            </PlanHeader>

            <PlanContent>
              <p className="plan-description">{plan.description}</p>
              
              <div className="plan-items">
                {plan.foods.map((food, idx) => (
                  <PlanItem key={idx}>
                    <div className="item-icon">
                      <Apple size={20} />
                    </div>
                    <div className="item-content">
                      <div className="item-title">{food.name}</div>
                      <div className="item-details">{food.serving}</div>
                    </div>
                    <div className="item-status">
                      <CheckCircle size={16} />
                    </div>
                  </PlanItem>
                ))}
              </div>
            </PlanContent>
          </PlanCard>
        ))
      ) : (
        <EmptyState
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Apple size={64} className="empty-icon" />
          <h3>
            {userAssessmentData 
              ? `Welcome back, ${userAssessmentData.name}!` 
              : 'No Nutrition Plans Yet'}
          </h3>
          <p>
            {userAssessmentData 
              ? 'Your personalized nutrition plans are being generated. Please check back soon!'
              : 'Complete your health assessment to get personalized nutrition plans tailored to your dietary needs and goals.'}
          </p>
          <Link to="/health-assessment" className="btn btn-primary">
            {userAssessmentData ? 'Update Assessment' : 'Complete Assessment'}
          </Link>
        </EmptyState>
      )}
    </>
  )

  return (
    <PlansContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="gradient-text">Plans</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Track your progress and manage your personalized workout and nutrition plans
          </Subtitle>
        </Header>

        <TabsContainer>
          <Tab 
            active={activeTab === 'workout'} 
            onClick={() => setActiveTab('workout')}
          >
            <Dumbbell size={20} />
            Workout Plans
          </Tab>
          <Tab 
            active={activeTab === 'nutrition'} 
            onClick={() => setActiveTab('nutrition')}
          >
            <Apple size={20} />
            Nutrition Plans
          </Tab>
        </TabsContainer>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'workout' ? renderWorkoutPlans() : renderNutritionPlans()}
        </motion.div>
      </Container>
    </PlansContainer>
  )
}

export default Plans
