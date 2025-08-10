import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
// You'll need to add your API key to environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDCzeFkfXnEfQphvWpFajKOLyt4YCQTcDg'

if (!API_KEY) {
  console.warn('⚠️ VITE_GEMINI_API_KEY not found in environment variables. Please add your Gemini API key to the .env file.')
}

const genAI = new GoogleGenerativeAI(API_KEY)

// Get the generative model (updated to use the current model name)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Helper function to clean and parse JSON from AI response
const parseAIResponse = (text) => {
  try {
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('Failed to parse AI response as JSON:', error)
    console.log('Raw response:', text)
    throw new Error('AI response was not valid JSON format')
  }
}

export const geminiService = {
  // Generate workout and nutrition plans based on user assessment
  generateFitnessPlans: async (assessmentData) => {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
    }

    try {
      const prompt = `
        You are a professional fitness and nutrition expert. Based on the following user health assessment data, create personalized workout and nutrition plans.

        User Profile:
        - Name: ${assessmentData.name}
        - Age: ${assessmentData.age}
        - Gender: ${assessmentData.gender}
        - Height: ${assessmentData.height}cm
        - Weight: ${assessmentData.weight}kg
        - Target Weight: ${assessmentData.targetWeight}kg
        
        Fitness Information:
        - Fitness Level: ${assessmentData.fitnessLevel}
        - Workout Experience: ${assessmentData.workoutExperience}
        - Primary Goal: ${assessmentData.primaryGoal}
        - Workout Frequency: ${assessmentData.workoutFrequency}
        - Workout Duration: ${assessmentData.workoutDuration}
        - Preferred Workout Types: ${assessmentData.preferredWorkoutTypes}
        
        Health Status:
        - Health Conditions: ${assessmentData.healthConditions}
        - Injuries: ${assessmentData.injuries}
        - Activity Level: ${assessmentData.activityLevel}
        - Sleep Hours: ${assessmentData.sleepHours}
        - Stress Level: ${assessmentData.stressLevel}
        
        Dietary Information:
        - Dietary Restrictions: ${assessmentData.dietaryRestrictions}
        - Food Allergies: ${assessmentData.foodAllergies}

        Please respond with ONLY a valid JSON object with the following structure:
        {
          "workoutPlan": {
            "title": "Plan Name",
            "description": "Brief description",
            "duration": "X min",
            "difficulty": "Beginner/Intermediate/Advanced",
            "sessions": 12,
            "completedSessions": 0,
            "exercises": [
              {"name": "Exercise Name", "sets": "3 x 12", "type": "strength"}
            ]
          },
          "nutritionPlan": {
            "title": "Plan Name",
            "description": "Brief description",
            "duration": "30 days",
            "calories": "XXXX cal/day",
            "meals": 5,
            "completedDays": 0,
            "foods": [
              {"name": "Food Name", "serving": "Amount", "type": "protein"}
            ]
          },
          "tips": "Additional tips for achieving their fitness goals"
        }

        Do not include any text before or after the JSON object.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      return parseAIResponse(text)
    } catch (error) {
      console.error('Error generating fitness plans:', error)
      throw new Error(`Failed to generate fitness plans: ${error.message}`)
    }
  },

  // Generate dish recommendations based on user preferences
  generateDishes: async (preferences) => {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
    }

    try {
      const prompt = `
        You are a professional chef and nutritionist. Based on the following dietary preferences, generate 3-5 dish recommendations.

        Preferences:
        - Diet Type: ${preferences.dietType || 'Any'}
        - Cuisine Preference: ${preferences.cuisinePreference || 'Any'}
        - Max Cooking Time: ${preferences.cookingTime || 'Any'} minutes
        - Number of Servings: ${preferences.servings || 'Any'}
        - Skill Level: ${preferences.skillLevel || 'Any'}
        - Meal Type: ${preferences.mealType || 'Any'}
        - Target Calories: ${preferences.calories || 'Any'}
        - Dietary Restrictions: ${preferences.dietaryRestrictions || 'None'}
        - Available Ingredients: ${preferences.availableIngredients || 'Any'}

        Please respond with ONLY a valid JSON array of dish objects with this exact structure:
        [
          {
            "name": "Dish Name",
            "description": "Brief description (2-3 sentences)",
            "difficulty": "Easy/Medium/Hard",
            "cookingTime": 25,
            "servings": 2,
            "calories": 450
          }
        ]

        Do not include any text before or after the JSON array.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      return parseAIResponse(text)
    } catch (error) {
      console.error('Error generating dishes:', error)
      throw new Error(`Failed to generate dish recommendations: ${error.message}`)
    }
  },

  // Generate detailed recipe for a specific dish
  generateDetailedRecipe: async (dishName, preferences) => {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
    }

    try {
      const prompt = `
        You are a professional chef and nutrition expert. Generate a detailed recipe for "${dishName}" considering these preferences:
        - Diet Type: ${preferences.dietType || 'Any'}
        - Dietary Restrictions: ${preferences.dietaryRestrictions || 'None'}
        - Servings: ${preferences.servings || '2-4'}
        - Available Ingredients: ${preferences.availableIngredients || 'Standard pantry items'}

        Since this is for a fitness website, include comprehensive nutritional information. Please respond with ONLY a valid JSON object with this exact structure:
        {
          "ingredients": [
            "1 cup ingredient name",
            "2 tbsp another ingredient"
          ],
          "instructions": [
            "Step 1 description",
            "Step 2 description"
          ],
          "nutrition": {
            "calories": "xxx per serving",
            "protein": "xx g",
            "carbs": "xx g",
            "fat": "xx g",
            "fiber": "xx g",
            "sugar": "xx g",
            "sodium": "xxx mg"
          },
          "healthBenefits": [
            "High in protein for muscle building",
            "Rich in vitamins and minerals"
          ],
          "fitnessNotes": "How this dish supports fitness goals and when to consume it",
          "macroBalance": "Brief analysis of protein/carb/fat ratio for fitness",
          "prepTips": "Preparation and storage tips"
        }

        Do not include any text before or after the JSON object.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      return parseAIResponse(text)
    } catch (error) {
      console.error('Error generating detailed recipe:', error)
      throw new Error(`Failed to generate detailed recipe: ${error.message}`)
    }
  }
}

export default geminiService
