const pool = require("../Model/db");



// Post a recipe to the db

const postRecipe = async (req,res,next) => {

 const {name,ingredients,instructions} = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *",
      [name, JSON.stringify(ingredients), JSON.stringify(instructions)]
    );

    res.status(201).json({ message: "Recipe saved", recipe: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }

}

// Getting all recipes from the db

const getRecipes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

// Delete a recipe from the db

const deleteRecipe = async (req,res) => {
  const { id } = req.params;

   try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1",[id])
    res.json(result)
    
   } catch (error) {
    res.status(500).json({error : "Database error"})
    
   }

}



module.exports = {

    postRecipe,
    getRecipes,
    deleteRecipe
}