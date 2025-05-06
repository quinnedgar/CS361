import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;
export let Recipe = undefined;
const DB_NAME = 'recipes_db';
const DB_COLL = 'recipes';


async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {dbName:DB_NAME});
        connection = mongoose.connection.collection(DB_COLL);
        console.log("Successfully connected to MongoDB using Mongoose!");
        Recipe = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    const recipeSchema = mongoose.Schema({
        name: { type: String, required: true },
        ingredients: [{
            name: { type: String, required: true },
            quantity: { type: String }
          }],      
        directions: {type: String},
        time: {type: String},
        review: {type: Number}
      });      
    return mongoose.model("Recipes", recipeSchema);
}

async function createRecipe(name, ingredients, directions, time, review){
    const rec = new Recipe({name:name, ingredients:ingredients, directions:directions, time:time, review: review});
    return rec.save();
}


async function getRecipes(){
    return await Recipe.find();
}

async function getRecipeById(id) {
    return await Recipe.findById(id);
}

async function editRecipe(id, new_data) {

    const objectId = new mongoose.Types.ObjectId(id);
    const u = await Recipe.findById(objectId);

    if (!u) {
        throw new Error("Recipe not found");
    }

    if (new_data.name) u.name = new_data.name;
    if (new_data.reps) u.reps = new_data.reps;
    if (new_data.weight) u.weight = new_data.weight;
    if (new_data.unit) u.unit = new_data.unit;
    if (new_data.date) u.date = new_data.date;
    
    await u.save();
    return u;
}

async function deleteRecipe(id) {
    return await Recipe.findByIdAndDelete(id);
}

export { connect, createModel, createRecipe, getRecipes, deleteRecipe, getRecipeById, editRecipe };
/*
async function editExercise(id, new_data) {

    const objectId = new mongoose.Types.ObjectId(id);
    const u = await Exercise.findById(objectId);

    if (!u) {
        throw new Error("User not found");
    }

    if (new_data.name) u.name = new_data.name;
    if (new_data.reps) u.reps = new_data.reps;
    if (new_data.weight) u.weight = new_data.weight;
    if (new_data.unit) u.unit = new_data.unit;
    if (new_data.date) u.date = new_data.date;
    
    await u.save();
    return u;
}


async function deleteExercise(id) {
    let query = {};

    if (!id) {
        throw new Error("Exercise ID is required");
    }

    if (id) {
        query._id = new mongoose.Types.ObjectId(id);
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const deleted = await Exercise.findByIdAndDelete(objectId);

    if (!deleted) {
        throw new Error("Exercise not found");
    }

    return { success: true, message: "Exercise deleted successfully", deleted };
}



export { connect, createModel, createExercise, getExercises, editExercise, deleteExercise};
*/

