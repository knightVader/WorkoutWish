# 🏋️‍♂️ WorkoutWish

<p align="center">
  <img src="./public/favicon-64.svg" alt="WorkoutWish Logo" width="80" height="80">
</p>

<p align="center">
  <strong>Transform Your Body, Elevate Your Life</strong>
</p>

<p align="center">
  A modern, AI-powered fitness and nutrition web application that generates personalized workout plans and healthy recipes to help you achieve your fitness goals.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Google_Gemini-AI-orange?style=for-the-badge&logo=google" alt="Google Gemini">
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components" alt="Styled Components">
</p>

---

## ✨ Features

### 🏠 **Landing Page**
- Beautiful dark mode design with sunset orange accents
- Animated hero section with floating elements and smooth transitions
- Statistics showcase and feature highlights
- Fully responsive design optimized for all devices

### 💪 **Smart Health Assessment**
- **4-Step Interactive Form**: Personal info, health status, fitness goals, and lifestyle
- **Progress Tracking**: Visual progress indicator with smooth step transitions
- **Form Validation**: Real-time validation with user-friendly error messages
- **Data Persistence**: Secure local storage for seamless user experience

### 🤖 **AI-Powered Fitness Plans**
- **Custom Workout Plans**: Tailored exercise routines based on fitness level, goals, and preferences
- **Nutrition Plans**: Personalized meal plans with detailed macro and calorie breakdowns
- **Progress Monitoring**: Track your fitness journey with detailed metrics and analytics
- **Goal-Oriented**: Plans adapt to weight loss, muscle gain, or general fitness goals

### 🍳 **Intelligent Recipe Generator**
- **AI-Powered Suggestions**: Smart dish recommendations using Google Gemini AI
- **Comprehensive Nutrition**: Detailed nutritional facts per serving including macros, calories, and health benefits
- **Advanced Filtering**: Filter by cuisine type, cooking time, skill level, and dietary restrictions
- **Fitness Integration**: Recipes include fitness notes and macro balance analysis
- **Detailed Instructions**: Step-by-step cooking instructions with prep tips

---

## 🚀 Technology Stack

<table>
<tr>
<td width="50%">

### **Frontend**
- **React 18.3.1** - Modern React with hooks
- **Vite 5.4.2** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations

</td>
<td width="50%">

### **AI & Services**
- **Google Gemini AI** - Workout & recipe generation
- **Lucide React** - Beautiful icon library
- **ESLint** - Code quality
- **Local Storage** - Data persistence

</td>
</tr>
</table>

---

## 📁 Project Structure

```
WorkoutWish/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── ErrorBoundary.jsx   # Error handling
│   │   └── ApiKeyNotification.jsx
│   ├── pages/                   # Main application pages
│   │   ├── Home.jsx            # Landing page with hero
│   │   ├── HealthAssessment.jsx # 4-step health form
│   │   ├── DishGenerator.jsx   # AI recipe generator
│   │   └── Plans.jsx           # Workout & nutrition plans
│   ├── services/               # External integrations
│   │   └── geminiService.js    # Google Gemini AI
│   ├── App.jsx                 # Main app component
│   └── main.jsx               # Application entry point
├── public/                     # Static assets
└── package.json               # Dependencies & scripts
```

---


## 🎯 How to Use

### **Step 1: Health Assessment**
1. Click "Get Started" on the landing page
2. Complete the 4-step health and fitness assessment
3. Provide personal info, health status, goals, and lifestyle preferences

### **Step 2: Get Your AI Plans**
1. Receive personalized workout and nutrition plans
2. View detailed exercise routines and meal recommendations
3. Access your plans anytime from the "Plans" page

### **Step 3: Generate Recipes**
1. Use the "Dish Generator" for healthy recipe ideas
2. Filter by diet type, cuisine, cooking time, and skill level
3. Get detailed recipes with nutritional information and fitness notes

---

## 🌟 Key Features

### **Multi-Step Health Assessment**
- **Personal Information**: Age, gender, height, weight
- **Health Status**: Activity level, health conditions
- **Fitness Goals**: Weight loss, muscle gain, endurance
- **Lifestyle Factors**: Schedule, equipment, preferences

### **AI Recipe Generation**
- Advanced filtering with multiple criteria
- Real-time generation using Gemini AI
- Comprehensive nutritional breakdowns
- Health benefits and fitness-focused recommendations

### **Smart Plan Management**
- Persistent data storage
- Interactive plan displays
- Progress tracking capabilities
- Goal-oriented customization

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 🔮 Future Features

- [ ] User authentication and profiles
- [ ] Progress photos and measurements
- [ ] Social features and community
- [ ] Workout video integration
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Wearable device integration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>WorkoutWish - Transform Your Body, Elevate Your Life 💪</strong>
</p>

<p align="center">
  Built with ❤️ using React, AI, and modern web technologies
</p>
