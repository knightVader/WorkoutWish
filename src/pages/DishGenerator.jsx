import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Clock, Users, Zap, Star, BookOpen, Activity, Heart, Target } from 'lucide-react'
import styled from 'styled-components'
import geminiService from '../services/geminiService'

const DishContainer = styled.div`
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

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

const FormCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const FormSection = styled.div`
  margin-bottom: 2rem;

  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--orange-primary);
    font-size: 1.2rem;
    text-align: center;
    justify-content: center;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.9rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--orange-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 0.9rem;
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
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: var(--transition);
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: var(--orange-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`

const ResultsSection = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`

const LoadingCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const DishesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const DishCard = styled(motion.div)`
  background: var(--gradient-dark);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--orange-primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  &.selected {
    border-color: var(--orange-primary);
    box-shadow: var(--shadow-md);
  }
`

const DishHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h3 {
    color: var(--text-primary);
    margin: 0;
    font-size: 1.25rem;
  }

  .difficulty {
    background: var(--orange-primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: var(--border-radius);
    font-size: 0.8rem;
    font-weight: 600;
  }
`

const DishMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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
`

const DishDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
`

const RecipeSection = styled(motion.div)`
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  margin-top: 1rem;

  h4 {
    color: var(--orange-primary);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ingredients, .instructions {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    padding-left: 1.5rem;
    
    li {
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
`

const DishGenerator = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingRecipeId, setLoadingRecipeId] = useState(null)
  const [dishes, setDishes] = useState([])
  const [selectedDish, setSelectedDish] = useState(null)
  const [recipeDetails, setRecipeDetails] = useState(null)
  const [formData, setFormData] = useState({
    dietType: '',
    cuisinePreference: '',
    cookingTime: '',
    servings: '',
    skillLevel: '',
    availableIngredients: '',
    dietaryRestrictions: '',
    mealType: '',
    calories: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateDishes = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setDishes([])
    setSelectedDish(null)
    setRecipeDetails(null)

    try {
      console.log('Generating dishes with preferences:', formData)
      
      // Use Gemini API to generate real dishes
      const generatedDishes = await geminiService.generateDishes(formData)
      console.log('Generated dishes:', generatedDishes)
      
      // Add IDs to dishes if they don't have them
      const dishesWithIds = generatedDishes.map((dish, index) => ({
        ...dish,
        id: dish.id || index + 1
      }))
      
      setDishes(dishesWithIds)
    } catch (error) {
      console.error('Error generating dishes:', error)
      alert('There was an error generating dishes. Please make sure you have added your Gemini API key to the .env file.')
    } finally {
      setIsLoading(false)
    }
  }

  const selectDish = async (dish) => {
    setSelectedDish(dish)
    setLoadingRecipeId(dish.id)
    setRecipeDetails(null)

    try {
      console.log('Getting detailed recipe for:', dish.name)
      
      // Use Gemini API to generate detailed recipe
      const recipeDetails = await geminiService.generateDetailedRecipe(dish.name, formData)
      console.log('Generated recipe details:', recipeDetails)
      
      setRecipeDetails(recipeDetails)
    } catch (error) {
      console.error('Error getting recipe details:', error)
      alert('There was an error getting the recipe details. Please make sure you have added your Gemini API key to the .env file.')
    } finally {
      setLoadingRecipeId(null)
    }
  }

  return (
    <DishContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recipe <span className="gradient-text">Generator</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get personalized recipe recommendations based on your preferences and cooking skills
          </Subtitle>
        </Header>

        <ContentContainer>
          <FormCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={generateDishes}>
              <FormSection>
                <h3>
                  <ChefHat size={16} />
                  Recipe Preferences
                </h3>
                <FormGrid>
                <FormGroup>
                  <Label htmlFor="dietType">Diet Type</Label>
                  <Select
                    id="dietType"
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="low-carb">Low Carb</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="cuisinePreference">Cuisine Preference</Label>
                  <Select
                    id="cuisinePreference"
                    name="cuisinePreference"
                    value={formData.cuisinePreference}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="italian">Italian</option>
                    <option value="asian">Asian</option>
                    <option value="mexican">Mexican</option>
                    <option value="indian">Indian</option>
                    <option value="american">American</option>
                    <option value="middle-eastern">Middle Eastern</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                  <Textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    placeholder="e.g., gluten-free, dairy-free, nut allergies"
                  />
                </FormGroup>
                </FormGrid>
              </FormSection>

              <FormSection>
                <h3>
                  <Clock size={16} />
                  Cooking Details
                </h3>
                <FormGrid>
                <FormGroup>
                  <Label htmlFor="cookingTime">Max Cooking Time</Label>
                  <Select
                    id="cookingTime"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="15">Under 15 min</option>
                    <option value="30">Under 30 min</option>
                    <option value="45">Under 45 min</option>
                    <option value="60">Under 1 hour</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="servings">Number of Servings</Label>
                  <Select
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="4">4 people</option>
                    <option value="6">6+ people</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="skillLevel">Cooking Skill Level</Label>
                  <Select
                    id="skillLevel"
                    name="skillLevel"
                    value={formData.skillLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                </FormGroup>
                </FormGrid>
              </FormSection>

              <FormSection>
                <h3>
                  <Zap size={16} />
                  Additional Options
                </h3>
                <FormGrid>
                <FormGroup>
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select
                    id="mealType"
                    name="mealType"
                    value={formData.mealType}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="calories">Target Calories</Label>
                  <Input
                    id="calories"
                    name="calories"
                    type="number"
                    value={formData.calories}
                    onChange={handleInputChange}
                    placeholder="e.g., 400"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="availableIngredients">Available Ingredients</Label>
                  <Textarea
                    id="availableIngredients"
                    name="availableIngredients"
                    value={formData.availableIngredients}
                    onChange={handleInputChange}
                    placeholder="List ingredients you have at home"
                  />
                </FormGroup>
                </FormGrid>
              </FormSection>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading"></div>
                    Generating Recipes...
                  </>
                ) : (
                  'Generate Recipes'
                )}
              </button>
            </form>
          </FormCard>

          <ResultsSection>
            {isLoading && dishes.length === 0 ? (
              <LoadingCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="loading" style={{ width: '40px', height: '40px' }}></div>
                <h3>Generating your perfect recipes...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Our AI is analyzing your preferences to create personalized dish recommendations
                </p>
              </LoadingCard>
            ) : (
              <DishesGrid>
                {dishes.map((dish, index) => (
                  <DishCard
                    key={dish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => selectDish(dish)}
                    className={selectedDish?.id === dish.id ? 'selected' : ''}
                  >
                    <DishHeader>
                      <h3>{dish.name}</h3>
                      <span className="difficulty">{dish.difficulty}</span>
                    </DishHeader>
                    
                    <DishMeta>
                      <div className="meta-item">
                        <Clock size={16} className="icon" />
                        {dish.cookingTime} min
                      </div>
                      <div className="meta-item">
                        <Users size={16} className="icon" />
                        {dish.servings} servings
                      </div>
                      <div className="meta-item">
                        <Zap size={16} className="icon" />
                        {dish.calories} cal
                      </div>
                    </DishMeta>
                    
                    <DishDescription>{dish.description}</DishDescription>
                    
                    <button 
                      className="btn btn-ghost" 
                      style={{ width: '100%', marginTop: '1rem' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        selectDish(dish)
                      }}
                      disabled={loadingRecipeId === dish.id}
                    >
                      {loadingRecipeId === dish.id ? (
                        <>
                          <div className="loading" style={{ width: '16px', height: '16px' }}></div>
                          Generating Recipe...
                        </>
                      ) : (
                        <>
                          <BookOpen size={16} />
                          Get Full Recipe
                        </>
                      )}
                    </button>
                  </DishCard>
                ))}
              </DishesGrid>
            )}

            {selectedDish && recipeDetails && !isLoading && (
              <RecipeSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h4>
                  <BookOpen size={20} />
                  Complete Recipe: {selectedDish.name}
                </h4>
                
                <div className="ingredients">
                  <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Ingredients:
                  </h5>
                  <ul>
                    {recipeDetails.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="instructions">
                  <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Instructions:
                  </h5>
                  <ol>
                    {recipeDetails.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Nutrition Facts Section */}
                {recipeDetails.nutrition && (
                  <div style={{ 
                    padding: '1.5rem', 
                    background: 'var(--bg-accent)', 
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '1rem',
                    border: '1px solid var(--orange-primary)'
                  }}>
                    <h5 style={{ color: 'var(--orange-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={18} />
                      Nutrition Facts (Per Serving)
                    </h5>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                      gap: '0.75rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Calories:</strong> {recipeDetails.nutrition.calories}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Protein:</strong> {recipeDetails.nutrition.protein}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Carbs:</strong> {recipeDetails.nutrition.carbs}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Fat:</strong> {recipeDetails.nutrition.fat}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Fiber:</strong> {recipeDetails.nutrition.fiber}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Sugar:</strong> {recipeDetails.nutrition.sugar}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Sodium:</strong> {recipeDetails.nutrition.sodium}</div>
                    </div>
                  </div>
                )}

                {/* Health Benefits Section */}
                {recipeDetails.healthBenefits && (
                  <div style={{ 
                    padding: '1rem', 
                    background: 'var(--bg-accent)', 
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ color: 'var(--orange-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Heart size={16} />
                      Health Benefits:
                    </h5>
                    <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                      {recipeDetails.healthBenefits.map((benefit, index) => (
                        <li key={index} style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fitness Notes Section */}
                {recipeDetails.fitnessNotes && (
                  <div style={{ 
                    padding: '1rem', 
                    background: 'var(--bg-accent)', 
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ color: 'var(--orange-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Target size={16} />
                      Fitness Notes:
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      {recipeDetails.fitnessNotes}
                    </p>
                  </div>
                )}

                {/* Macro Balance Section */}
                {recipeDetails.macroBalance && (
                  <div style={{ 
                    padding: '1rem', 
                    background: 'var(--bg-accent)', 
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ color: 'var(--orange-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Zap size={16} />
                      Macro Balance:
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      {recipeDetails.macroBalance}
                    </p>
                  </div>
                )}

                <div style={{ 
                  padding: '1rem', 
                  background: 'var(--bg-accent)', 
                  borderRadius: 'var(--border-radius)'
                }}>
                  <h5 style={{ color: 'var(--orange-primary)', marginBottom: '0.5rem' }}>
                    <ChefHat size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                    Prep Tips:
                  </h5>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    {recipeDetails.prepTips}
                  </p>
                </div>
              </RecipeSection>
            )}
          </ResultsSection>
        </ContentContainer>
      </Container>
    </DishContainer>
  )
}

export default DishGenerator
