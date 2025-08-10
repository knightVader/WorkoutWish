import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Activity, Target, Heart, Calendar } from 'lucide-react'
import styled from 'styled-components'
import geminiService from '../services/geminiService'

const AssessmentContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: var(--bg-primary);
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem 2rem;
  }
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

const FormCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
    padding: 0 0.5rem;
  }
`

const Step = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  background: ${props => props.active ? 'var(--gradient-sunset)' : 'var(--bg-secondary)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  font-weight: 500;
  font-size: 0.9rem;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    gap: 0.2rem;
    flex: 1;
    min-width: 0;
    justify-content: center;
  }

  @media (max-width: 380px) {
    font-size: 0.7rem;
    padding: 0.25rem 0.4rem;
  }
`

const FormSection = styled.div`
  margin-bottom: 2.5rem;

  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--orange-primary);
    font-size: 1.25rem;
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
`

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--orange-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--orange-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  option {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: var(--orange-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const HealthAssessment = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userClickedGenerate, setUserClickedGenerate] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    
    // Health & Fitness
    fitnessLevel: '',
    workoutExperience: '',
    healthConditions: '',
    injuries: '',
    
    // Goals & Preferences
    primaryGoal: '',
    targetWeight: '',
    workoutFrequency: '',
    workoutDuration: '',
    preferredWorkoutTypes: '',
    
    // Lifestyle
    activityLevel: '',
    sleepHours: '',
    stressLevel: '',
    dietaryRestrictions: '',
    foodAllergies: ''
  })

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Health Status', icon: Heart },
    { id: 3, title: 'Fitness Goals', icon: Target },
    { id: 4, title: 'Lifestyle', icon: Activity }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep)
    if (currentStep < 4) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      console.log('Moved to step:', nextStep)
      
      if (nextStep === 4) {
        console.log('🎯 Reached final step - waiting for user to click Generate')
        setUserClickedGenerate(false) // Reset the flag
      }
    }
  }

  const handlePrev = () => {
    console.log('Prev button clicked, current step:', currentStep)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with step:', currentStep)
    console.log('User clicked generate:', userClickedGenerate)
    
    // Only proceed if we're on the last step and user explicitly clicked
    if (currentStep !== 4) {
      console.log('Not on last step, preventing submission')
      return
    }

    if (!userClickedGenerate) {
      console.log('Form submitted without user clicking generate button - preventing automatic submission')
      return
    }
    
    // Validate required fields
    if (!formData.name || !formData.age || !formData.gender || !formData.height || !formData.weight) {
      alert('Please fill in all required personal information fields.')
      setUserClickedGenerate(false)
      return
    }

    if (!formData.fitnessLevel || !formData.primaryGoal) {
      alert('Please fill in your fitness level and primary goal.')
      setUserClickedGenerate(false)
      return
    }

    setIsGenerating(true)

    try {
      console.log('Generating plans with data:', formData)
      
      // Integrate with Gemini API
      const plans = await geminiService.generateFitnessPlans(formData)
      console.log('Generated plans:', plans)
      
      // Store both form data and generated plans
      console.log('💾 Saving to localStorage...')
      console.log('Assessment Data:', formData)
      console.log('Generated Plans:', plans)
      
      localStorage.setItem('userAssessmentData', JSON.stringify(formData))
      localStorage.setItem('generatedPlans', JSON.stringify(plans))
      
      console.log('✅ Data saved to localStorage')
      console.log('Verification - Assessment:', localStorage.getItem('userAssessmentData'))
      console.log('Verification - Plans:', localStorage.getItem('generatedPlans'))
      
      // Navigate to plans page
      navigate('/plans')
      
    } catch (error) {
      console.error('Error generating plans:', error)
      alert('There was an error generating your plans. Please make sure you have added your Gemini API key to the .env file.')
    } finally {
      setIsGenerating(false)
      setUserClickedGenerate(false)
    }
  }

  const handleGenerateClick = () => {
    console.log('Generate button clicked by user')
    setUserClickedGenerate(true)
    // The form submission will be handled by the form's onSubmit
  }

  const renderPersonalInfo = () => (
    <FormSection>
      <h3>
        <User size={20} />
        Personal Information
      </h3>
      <FormRow>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            min="16"
            max="100"
          />
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="Enter height in cm"
            min="100"
            max="250"
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label htmlFor="weight">Current Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="Enter current weight in kg"
          min="30"
          max="300"
        />
      </FormGroup>
    </FormSection>
  )

  const renderHealthStatus = () => (
    <FormSection>
      <h3>
        <Heart size={20} />
        Health & Fitness Status
      </h3>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="fitnessLevel">Current Fitness Level</Label>
          <Select
            id="fitnessLevel"
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleInputChange}
          >
            <option value="">Select fitness level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="workoutExperience">Workout Experience (years)</Label>
          <Select
            id="workoutExperience"
            name="workoutExperience"
            value={formData.workoutExperience}
            onChange={handleInputChange}
          >
            <option value="">Select experience</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </Select>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label htmlFor="healthConditions">Health Conditions</Label>
        <Textarea
          id="healthConditions"
          name="healthConditions"
          value={formData.healthConditions}
          onChange={handleInputChange}
          placeholder="List any health conditions (diabetes, heart disease, etc.)"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="injuries">Past or Current Injuries</Label>
        <Textarea
          id="injuries"
          name="injuries"
          value={formData.injuries}
          onChange={handleInputChange}
          placeholder="List any injuries or physical limitations"
        />
      </FormGroup>
    </FormSection>
  )

  const renderFitnessGoals = () => (
    <FormSection>
      <h3>
        <Target size={20} />
        Fitness Goals
      </h3>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="primaryGoal">Primary Goal</Label>
          <Select
            id="primaryGoal"
            name="primaryGoal"
            value={formData.primaryGoal}
            onChange={handleInputChange}
          >
            <option value="">Select primary goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="endurance">Build Endurance</option>
            <option value="strength">Increase Strength</option>
            <option value="flexibility">Improve Flexibility</option>
            <option value="general-fitness">General Fitness</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="targetWeight">Target Weight (kg)</Label>
          <Input
            id="targetWeight"
            name="targetWeight"
            type="number"
            value={formData.targetWeight}
            onChange={handleInputChange}
            placeholder="Enter target weight"
            min="30"
            max="300"
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label htmlFor="workoutFrequency">Workout Frequency (per week)</Label>
          <Select
            id="workoutFrequency"
            name="workoutFrequency"
            value={formData.workoutFrequency}
            onChange={handleInputChange}
          >
            <option value="">Select frequency</option>
            <option value="1-2">1-2 times</option>
            <option value="3-4">3-4 times</option>
            <option value="5-6">5-6 times</option>
            <option value="daily">Daily</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="workoutDuration">Preferred Workout Duration</Label>
          <Select
            id="workoutDuration"
            name="workoutDuration"
            value={formData.workoutDuration}
            onChange={handleInputChange}
          >
            <option value="">Select duration</option>
            <option value="15-30">15-30 minutes</option>
            <option value="30-45">30-45 minutes</option>
            <option value="45-60">45-60 minutes</option>
            <option value="60+">60+ minutes</option>
          </Select>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label htmlFor="preferredWorkoutTypes">Preferred Workout Types</Label>
        <Textarea
          id="preferredWorkoutTypes"
          name="preferredWorkoutTypes"
          value={formData.preferredWorkoutTypes}
          onChange={handleInputChange}
          placeholder="e.g., cardio, strength training, yoga, swimming, etc."
        />
      </FormGroup>
    </FormSection>
  )

  const renderLifestyle = () => (
    <FormSection>
      <h3>
        <Activity size={20} />
        Lifestyle Information
      </h3>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="activityLevel">Daily Activity Level</Label>
          <Select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleInputChange}
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary (desk job)</option>
            <option value="lightly-active">Lightly Active</option>
            <option value="moderately-active">Moderately Active</option>
            <option value="very-active">Very Active</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="sleepHours">Average Sleep Hours</Label>
          <Select
            id="sleepHours"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleInputChange}
          >
            <option value="">Select sleep hours</option>
            <option value="less-than-6">Less than 6 hours</option>
            <option value="6-7">6-7 hours</option>
            <option value="7-8">7-8 hours</option>
            <option value="8+">8+ hours</option>
          </Select>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
        <Input
          id="stressLevel"
          name="stressLevel"
          type="range"
          min="1"
          max="10"
          value={formData.stressLevel}
          onChange={handleInputChange}
        />
        <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          Current: {formData.stressLevel || 'Not selected'}
        </div>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
        <Textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleInputChange}
          placeholder="e.g., vegetarian, vegan, keto, gluten-free, etc."
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="foodAllergies">Food Allergies</Label>
        <Textarea
          id="foodAllergies"
          name="foodAllergies"
          value={formData.foodAllergies}
          onChange={handleInputChange}
          placeholder="List any food allergies or intolerances"
        />
      </FormGroup>
    </FormSection>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo()
      case 2:
        return renderHealthStatus()
      case 3:
        return renderFitnessGoals()
      case 4:
        return renderLifestyle()
      default:
        return renderPersonalInfo()
    }
  }

  return (
    <AssessmentContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Health <span className="gradient-text">Assessment</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Help us create the perfect fitness plan tailored just for you
          </Subtitle>
        </Header>

        <FormCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StepIndicator>
            {steps.map((step) => (
              <Step key={step.id} active={currentStep === step.id}>
                <step.icon size={16} />
                {step.title}
              </Step>
            ))}
          </StepIndicator>

          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}

            <ButtonGroup>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handlePrev}
                disabled={currentStep === 1}
                style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isGenerating}
                  onClick={handleGenerateClick}
                >
                  {isGenerating ? (
                    <>
                      <div className="loading"></div>
                      Generating Plans...
                    </>
                  ) : (
                    'Generate My Plans'
                  )}
                </button>
              )}
            </ButtonGroup>
          </form>
        </FormCard>
      </Container>
    </AssessmentContainer>
  )
}

export default HealthAssessment
