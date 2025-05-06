import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPage({ recipeToEdit, setRecipeToEdit }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(recipeToEdit || {
        name: '',
        ingredients: '',
        directions: '',
        time: '',
        review: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (recipeToEdit) {
            setRecipe(recipeToEdit);
        } 
    }, [id, recipeToEdit]);

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/recipes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe)
            });

            if (response.ok) {
                setMessage('Recipe updated successfully!');
                setRecipeToEdit(null);
                alert("Edit Successful");
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                alert("Edit Unsuccessful");
                navigate('/');
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
            setMessage('Error connecting to server.');
        }
    };

    const handleCancel = () => {
        navigate(`/home`); // Navigate back to the recipe view page without saving changes.
    };


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Recipe</h2>
            <p className="text-muted">Modify the recipe details below:</p>
            {message && <div className="alert alert-danger">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input 
                        type="text"
                        name="name"
                        value={recipe.name}
                        onChange={handleChange}
                        placeholder="Recipe Name..."
                        required
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
    <label className="form-label">Ingredients:</label>
    <textarea
        name="ingredients"
        value={recipe.ingredients.map(ingredient => ingredient.name).join(', ')} // Join ingredient names into a string
        onChange={handleChange}
        required
        className="form-control"
        rows="4"
    />
</div>


                <div className="mb-3">
                    <label className="form-label">Directions:</label>
                    <textarea
                        name="directions"
                        value={recipe.directions}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="4"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Time:</label>
                    <input
                        type="text"
                        name="time"
                        value={recipe.time}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Review:</label>
                    <input
                        type="text"
                        name="review"
                        value={recipe.review}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="text-end">
                    <button 
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update Recipe
                    </button>
                    
                    <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}>
                    Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPage;
