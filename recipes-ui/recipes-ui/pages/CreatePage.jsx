import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    directions: '',
    time: '',
    review: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert "Flour 3 Cups, Sugar 1 Cup" into [{name: "Flour", quantity: "3 Cups"}, ...]
    const parsedIngredients = recipe.ingredients
      .split(',')
      .map((item) => {
        const parts = item.trim().split(' ');
        const name = parts.slice(0, -2).join(' '); // everything except last 2 tokens
        const quantity = parts.slice(-2).join(' '); // last 2 tokens
        return { name, quantity };
      })
      .filter((ing) => ing.name && ing.quantity); // avoid blank entries
  
    const recipeData = {
      name: recipe.name,
      ingredients: parsedIngredients,
      directions: recipe.directions,
      time: parseInt(recipe.time, 10),
      review: parseInt(recipe.review, 10)
    };
  
    console.log('Recipe Data:', recipeData);
  
    try {
      const response = await fetch('/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
      });
  
      if (response.ok) {
        alert('Recipe Created');
        navigate('/home');
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert('Recipe Not Created');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error connecting to server:', error);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-start bg-light" style={{ minHeight: '100vh', paddingTop: '350px' }}>
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-4 rounded shadow-sm" 
      style={{ width: 360 }}
    >
      <h2 className="mb-4">Add a New Recipe</h2>
      <h6> First, just add the name of your new recipe! </h6>
  
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          className="form-control" 
          name="name" 
          value={recipe.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      <br />
      <h6> Then, add the ingredients. Remember to use commas to separate each ingredient like: "Flour 3 Cups, Sugar 1 Cup, Vanilla Extract 1 Tbsp "</h6>
      <br />
  
      <div className="mb-3">
        <label className="form-label">Ingredients (comma‑separated)</label>
        <textarea 
          className="form-control" 
          name="ingredients" 
          value={recipe.ingredients} 
          onChange={handleChange} 
          rows={3} 
          required 
        />
      </div>
      <br />
      <h6> Then you can add your directions. Don't forget a step!</h6>
      <br />
      <div className="mb-3">
        <label className="form-label">Directions</label>
        <textarea 
          className="form-control" 
          name="directions" 
          value={recipe.directions} 
          onChange={handleChange} 
          rows={4} 
          required 
        />
      </div>
      <br />
      <h6> Finally, add the cook time and leave a review!</h6>
      <br />
      <div className="row g-2 mb-4">
        <div className="col">
          <label className="form-label">Time (min)</label>
          <input 
            type="number" 
            className="form-control" 
            name="time" 
            value={recipe.time} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col">
          <label className="form-label">Review (1–5)</label>
          <input 
            type="number" 
            className="form-control" 
            name="review" 
            value={recipe.review} 
            onChange={handleChange} 
            min="1" max="5" required 
          />
        </div>
      </div>
  
      <button type="submit" className="btn btn-primary w-100">
        Add Recipe
      </button>
    </form>
  </div>
  
  );
}

export default CreatePage;
