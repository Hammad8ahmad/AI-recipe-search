import { useState } from "react";
import "./interface.css";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import Recipes from "./Recipes";
import Header from "./Header";
import FetchAnotherRecipe from "./FetchAnotherRecipe";

function Interface() {
  const [items, setItems] = useState<string>(""); // Keeping items as a string
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState<string>("");
  const [recipes, setRecipes] = useState<any>(null);

  const url = "http://localhost:3000/recipe-search";


  const fetchNewRecipe = async() => {
       setLoading(true);
    try {
      const response = await axios.post(url, { items: items.split(","),requestType: "send another recipe"}); // Ensure backend expects an array
      setRecipes(response.data.recipes);
    } catch (err: any) {
      // setError(true);
      // setTimeout(() => setError(false), 2000);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    

    if (!items.trim()) {
      setErrorMessage("Plz enter any ingredients")
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
    else if(items.split(",").length < 3){
      setErrorMessage("Plz enter at least 3 ingredients")
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
    // if (items.split(",").length < 3) {
    //   setErrorMessage("Plz enter at least 3 ingredients")
    //   setTimeout(() => setErrorMessage(""), 2000);
    //   return;
    // }

    setLoading(true);
    setErrorMessage(""); // Clear previous errors
    try {
      const response = await axios.post(url, { items: items.split(",") }); // Ensure backend expects an array
      setRecipes(response.data.recipes);
      // setItems("")
    } catch (err: any) {
      console.log(err.response);
      if(err.response.status === 429){
        console.log(typeof(err.response.data.error))
        const numberOfSecondsRemaining  = err.response.data.error;
        const parts = numberOfSecondsRemaining.split(" ");
        const waitTime = parseInt(parts[parts.length - 4]);
        const numberOfHours = Math.floor(waitTime / 3600);
        setErrorMessage(`Api limit reached plz wait till ${numberOfHours} hours. `);
        
        setTimeout(() => setErrorMessage(""), 2000);
      }
       else if (err.response.status === 500) {
        setErrorMessage("Server error. Please try again later.");
      } else if(err.response.status) {
        setErrorMessage("An unexpected error occurred.");
      }
      setTimeout(() => setErrorMessage(""), 2000);
    
      // console.log(err)
      // setError(true);
      // setTimeout(() => setError(false), 2000);
      // console.log(err.message);
   } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Search Form Section */}
      <form className="max-w-[500px] mt-4 mx-auto" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <input
            placeholder="e.g., Bread, Milk, Egg..."
            className="input-bar w-full"
            name="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />
          <button type="submit" className="hidden">Search</button>
        </div>

        {/* Validation Messages */}
        {errorMessage && <div className="error mx-auto mt-4">
          <div className="error__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#393a37" d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
            </svg>
          </div>
          <div className="error__title r">{errorMessage}</div>
        </div>}
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <div className="mx-auto flex items-center justify-center mt-20">
          <OrbitProgress variant="track-disc" color="#000000" size="medium" />
        </div>
      ) : (<>
      <div className="flex flex-col justify-center items-center">
       {recipes && <FetchAnotherRecipe fetchNewRecipe={fetchNewRecipe}/>}
        <Recipes recipes={recipes} />
        </div></>
      )}
    </>
  );
}

export default Interface;
