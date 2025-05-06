import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewPage({ setRecipeToEdit }) {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/recipes/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecipe(data); // Set the fetched recipe data to state
                } else {
                    throw new Error('Failed to fetch recipe');
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleEdit = () => {
        if (recipe) {
            setRecipeToEdit(recipe);
            navigate(`/edit/${id}`);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{recipe.name}</h1>
            <p><strong>Time:</strong> {recipe.time}</p>
            <p><strong>Review:</strong> {recipe.review}</p>

            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} ({ingredient.quantity})
                    </li>
                ))}
            </ul>

            <h3>Directions:</h3>
            <p>{recipe.directions}</p>

            <button onClick={handleEdit}>Edit Recipe</button>
        </div>
    );
}

export default ViewPage;
