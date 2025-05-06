import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import EditPage from '../pages/EditPage';
import CreatePage from '../pages/CreatePage';
import './App.css';
import ViewPage from '../pages/ViewPage';
import LoginPage from '../pages/LoginPage';


function App() {
  const [count, setCount] = useState(0);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const navigate = useNavigate(); 
  

  const handleLogin = () => {
    navigate('/home'); 
  };


  return (
    <div>
      <Navigation />
      <Routes>
        {/* Define route for the landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={
          <HomePage setRecipeToEdit={setRecipeToEdit} />
        } />
        <Route path="/edit/:id" element={
        <EditPage recipeToEdit={recipeToEdit} setRecipeToEdit={setRecipeToEdit} />
        } />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/recipe/:id" element={<ViewPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
      </div>
  );
}

export default App;
