import React from 'react';
import NutritionBox from '../components/NutritionBox.jsx';
import HealthFact from '../components/HealthFacts.jsx';
import './LandingPage.css'

const LandingPage = () => {
    return (
      <div className="landing-page">
        <br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>        <header className="header">
          <h1 className="title">Welcome to the Recipe App</h1>
          <p className="subtitle">Discover delicious recipes with full nutritional details!</p>
        </header>
  
        <section className="content">
          <h2 className="section-title">Featured Recipes</h2>
  
          <div className="recipe-container">
            <div className="recipe-card">
              <h3>Grilled Chicken Salad</h3>
              <NutritionBox />
              <HealthFact fact="Grilled chicken is high in protein and low in fat!" />
            </div>
  
            <div className="recipe-card">
              <h3>Vegan Tacos</h3>
              <NutritionBox />
              <HealthFact fact="Vegan tacos are packed with fiber and antioxidants!" />
            </div>

            <div className="recipe-card">
              <h3>Chicken Pad Thai</h3>
              <NutritionBox />
              <HealthFact fact="Grilled chicken is high in protein and low in fat!" />
            </div>
          </div>
          
        </section>
      </div>
    );
  };
  
  export default LandingPage;
  