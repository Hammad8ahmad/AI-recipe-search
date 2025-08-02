const pool = require("../Model/db");



// Post a recipe to the db

const postRecipe = async (req,res,next) => {

 const {label,ingredients,calories,image_url} = req.body;
 const userId = req.user
 console.log(req.body,userId)

  try {
    const result = await pool.query(
      "INSERT INTO recipes (label, ingredients, calories, image_url,user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [label, JSON.stringify(ingredients),calories,image_url,userId]
    );

    res.status(201).json({ message: "Recipe saved", recipe: result.rows[0] });
  } catch (err) {
    next(err)
    
  }
}


// Getting all recipes from the db


const getRecipes = async (req, res,next) => {
  const userId = req.user
  console.log("this is the userId",userId)
  try {
    const result = await pool.query("SELECT * FROM recipes WHERE user_id = $1",[userId]);
    res.json(result.rows);
  } catch (err) {
    next(err)
  }
}

// Delete a recipe from the db

const deleteRecipe = async (req,res) => {
  const { id } = req.params;
  const userId = req.user

   try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1 AND user_id = $2",[id,userId])
    res.json(result)
    
   } catch (error) {
    next(error)
   }

}



module.exports = {

    postRecipe,
    getRecipes,
    deleteRecipe
}