const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./errorMiddleware");
const recipeRoutes = require("./Routes/recipeRoutes")
const edamamApiRoute = require("./Routes/edamamApiRoute");
const getAnalysisFromAi = require("./Routes/nutritionalAnalysisRoute");
const getRecipeOptimizationfromAi = require("./controllers/recipeOptimizationController");
const getInstructionsFromAi = require("./controllers/recipeInstructionsController");


// Cors 
const corsOptions = {
  origin: ["http://localhost:5173"],
};

dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());


// Attach error handling middleware

app.use("/api/recipe-search",edamamApiRoute)
app.use("/api/analysis",getAnalysisFromAi)
app.use("/api/optimization",getRecipeOptimizationfromAi)
app.use("/api/instructions",getInstructionsFromAi)
app.use("/api/recipes",recipeRoutes)
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log("Server started listening at port 3000.");

});
