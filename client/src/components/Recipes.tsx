import { useRecipeContext } from "../context/RecipeContext"; 
import VideoList from "./VideoList";

const Recipes = function () {
  const { fetchedRecipe, saveRecipe,isActive,setIsActive } = useRecipeContext(); 
  // const [isActive, setIsActive] = useState<boolean>(false);

  if (!fetchedRecipe) return null; 
  

  const saveRecipeHandler = async (recipe: any) => {
    const newState = !isActive;
    setIsActive(newState)

    if(newState){
      try {
    await saveRecipe(recipe);   // Call only once ✅
  } catch (error) {
    console.error("Error saving recipe:", error);
  }

    }
    
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 flex flex-col justify-between items-center gap-6">
      {fetchedRecipe.recipes.map((recipe: any, recipeIndex: number) => {
  const recipeVideos = fetchedRecipe.videos[recipeIndex] || []; // Get videos for this recipe

  return (
    <div key={recipeIndex} className="w-full rounded-lg p-8 bg-[#3A4A33] shadow-lg">
      <div className="text-4xl font-bold flex justify-between items-start">
        {recipe.recipe.label}
        <button onClick={() => saveRecipeHandler(recipe.recipe)}>
          {isActive ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </button>
      </div>
      <img
        className="rounded-full w-[150px] h-[150px] border border-black object-cover mb-2"
        src={recipe.recipe.images.SMALL.url}
        alt="cannot display :("
      />
      <div className="text-[#333333] text-2xl font-semibold mt-2">
        Calories: {Math.round(recipe.recipe.calories)}
      </div>
      <div className="ingredients pt-4">
        <h2 className="text-2xl font-semibold mb-2 text-[#333333]">Ingredients</h2>
        <ul className="list-disc text-[#fefae0] pl-5">
          {recipe.recipe.ingredients.map((ingredient: any, index: number) => (
            <li className="pt-4" key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
      <VideoList videos={recipeVideos} /> {/* Only relevant videos! */}
    </div>
  );
})}

    </div>
  );
};

export default Recipes;
