const pool = require("../Model/db");



// Post a recipe to the db

const postRecipe = async (req,res,next) => {

 const {label,ingredients,calories,image_url} = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO recipes (label, ingredients, calories, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [label, JSON.stringify(ingredients),calories,image_url]
    );

    res.status(201).json({ message: "Recipe saved", recipe: result.rows[0] });
  } catch (err) {
    next(err)
    
  }

}
// this is just a test to check 

// Getting all recipes from the db

const getRecipes = async (req, res,next) => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);
  } catch (err) {
    next(err)
  }
}

// Delete a recipe from the db

const deleteRecipe = async (req,res) => {
  const { id } = req.params;

   try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1",[id])
    res.json(result)
    
   } catch (error) {
    next(err)
   }

}



module.exports = {

    postRecipe,
    getRecipes,
    deleteRecipe
}