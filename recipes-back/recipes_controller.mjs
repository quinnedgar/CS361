import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as recipes from './recipes_model.mjs';
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.post('/recipes', async (req, res) => {
    try{
        const {name, ingredients, directions, time, review} = req.body;
        /*if(!Array.isArray(ingredients) || ingredients.length === 0){
            return res.status(400).json({ error: "Invalid request" });
        }*/
      
        const e = await recipes.createRecipe(name, ingredients, directions, time, review);     
        res.status(201).json(e);
    }catch (error) {
        res.status(400).json({ error: "Invalid request" });
    }
});

const PORT = process.env.PORT;


app.listen(PORT, async () => {
    await recipes.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});


app.get('/recipes', async (req, res) => {
    try {
        let recipesList = await recipes.getRecipes();
        const { name, ingredients, directions, time, review } = req.query;

        
        if (name || ingredients || directions || time || review) {
            recipesList = recipesList.filter(recipe => {
                return (!name || recipe.name.toLowerCase().includes(name.toLowerCase())) &&
                       (!ingredients || recipe.ingredients.some(i => i.name.toLowerCase() === ingredients.toLowerCase())) &&
                       (!directions || recipe.directions.toLowerCase().includes(directions.toLowerCase())) &&
                       (!time || recipe.time.toLowerCase() === time.toLowerCase()) &&
                       (!review || recipe.review === parseFloat(review));
            });
        }

        res.status(200).json(recipesList);
    } catch (error) {
        res.status(404).json({ error: "Invalid request" });
    }
});

app.get('/recipes/:id', async (req, res) => { 
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const recipe = await recipes.getRecipeById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.delete('/recipes/:id', async (req, res) => { 
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        
        const deleteResult = await recipes.Recipe.findByIdAndDelete(id);
        if (!deleteResult) {
            console.error(`Failed to delete, no matching document: ${id}`);
            return res.status(400).json({ error: "Not found" });
        }

        res.status(204).send();

    } catch (error) {
        console.error("Unexpected error in DELETE request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.put('/recipes/:id', async (req, res) => { 
    const {id } = req.params;
    const update = req.body;

    const reqd = ["name", "ingredients", "directions", "time", "review"];
    const missingFields = reqd.filter(field => !(field in update));

    if(missingFields.length > 0){
        return res.status(400).json({ error: "Invalid request" });
    }

    try {
        const u = await recipes.editRecipe(id, update);
        if (!u) {
            return res.status(400).json({ error: "Invalid request" });
        }
        res.status(200).json(u);
    } catch (error) {
        res.status(404).json({ error: "Not found" });
    }

});

