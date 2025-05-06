import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table'



function HomePage({ setRecipeToEdit }) {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();


    const loadRecipes = async () => {
        
        try{
            const response = await fetch('/recipes');
            const data = await response.json();
            if (Array.isArray(data)) {
                setRecipes(data);
            } else {
                console.error('Expected recipes data to be an array, got:', data);
                setRecipes([]);
            }
        }catch (error){
            console.error('Error loading recipes:', error);
            setRecipes([]);
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);
    

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this recipe? This action will result in the permanent loss of data. ");
        if (isConfirmed) {
            try {
                const response = await fetch(`/recipes/${id}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    setRecipes(recipes.filter(recipe => recipe._id !== id)); // UI Update
                } else {
                    console.error('Failed to delete recipe');
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        } else {
            console.log("Recipe deletion cancelled");
        }
    };
    


    const handleEdit = (id) => {
        const recipe = recipes.find((e) => e._id === id);
        setRecipeToEdit(recipe); 
        navigate(`/edit/${id}`); 
    };

    return (
        <div>
            <h1>Recipes List</h1>
            <Table recipes={recipes} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    
    );
}

export default HomePage;
