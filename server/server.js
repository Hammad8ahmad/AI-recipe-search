const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./errorMiddleware");
const recipeRoutes = require("./Routes/recipeRoutes");
const edamamApiRoute = require("./Routes/edamamApiRoute");
const getAnalysisFromAi = require("./Routes/nutritionalAnalysisRoute");
const getRecipeOptimizationfromAi = require("./controllers/recipeOptimizationController");
const getInstructionsFromAi = require("./controllers/recipeInstructionsController");
const  initializeDB = require("./Model/initDb");

// Load environment variables
dotenv.config();



// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ai-recipe-search.vercel.app',
  'https://ai-recipe-search.duckdns.org'
];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api/recipe-search", edamamApiRoute);
app.use("/api/analysis", getAnalysisFromAi);
app.use("/api/optimization", getRecipeOptimizationfromAi);
app.use("/api/instructions", getInstructionsFromAi);
app.use("/api/recipes", recipeRoutes);

// Attach error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
  console.log(`Server started listening at port ${PORT}.`);
  await initializeDB;


});
