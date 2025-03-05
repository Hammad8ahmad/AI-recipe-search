import { useRef, useState } from "react";
import "./Interface.css";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import Recipes from "./Recipes";
import Header from "./Header";
import { useRecipeContext } from "../context/RecipeContext";

function Interface() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [item, setItem] = useState("");
  const recipeRef = useRef<HTMLInputElement>(null)

  const { fetchedRecipe, setFetchedRecipe, } = useRecipeContext();
  const url = import.meta.env.VITE_PROD_URL + "/api"


  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value)
    console.log("just a check : ",e.target.value)
  }
   console.log("checking rerender in in terface component")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item.trim()) {
      recipeRef.current?.blur()
      setErrorMessage("Please enter ingredients.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      recipeRef.current?.blur();
      const response = await axios.post(`${url}/recipe-search`, { items: item });
      console.log("Data from backend:", response.data);
      setFetchedRecipe(response.data);
      setItem("");
      setHasSearched(true); // Only show Recipes after successful search
    } catch (err: any) {
      if (err.response?.status === 500) {
        setErrorMessage("Server error. Please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setTimeout(() => setErrorMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow mb-4">
        <Header />

        {/* Search Form */}
        <form className="max-w-[500px]  mt-4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center ">
            <input
              placeholder="Enter your favourite dish, I'm sure we have it :)"
              className="input-bar mx-2 w-full"
              name="text"
              value={item}
              onChange={handleChange}
              ref={recipeRef}
            />
            <button type="submit" className="hidden">Search</button>
          </div>

          {errorMessage && (
            <div className="error mx-auto mt-4">
              <div className="error__icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
            </div>
            <div className="error__title">{errorMessage}</div>
            </div>
          )}
        </form>

        {/* fetches the new recipes when you search and handle fetching of recipes on reload */}

        {loading ? (
          <div className="flex items-center justify-center mt-20">
            <OrbitProgress variant="track-disc" color="#000000" size="medium" />
          </div>
        ) : (
          hasSearched ? <Recipes />:fetchedRecipe && <Recipes/>
        )}
         
      </main>

      <footer className="text-center mt-auto py-4 bg-[#a0b56d]">
        <p className="text-black text-sm sm:text-md lg:text-lg">
          © {new Date().getFullYear()} Hammad Ahmad: Thanks for visiting my site :)
        </p>
      </footer>
    </div>
  );
}

export default Interface;



