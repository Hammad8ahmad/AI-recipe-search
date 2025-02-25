import { useState } from "react";
import "./interface.css";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import Recipes from "./Recipes";
import Header from "./Header";
import { useRecipeContext } from "../context/RecipeContext";

function Interface() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [item, setItem] = useState("");

  const { fetchedRecipe, setFetchedRecipe, } = useRecipeContext();

  const url = "http://localhost:3000/api/recipe-search";

  const handleChange = (e : any) => {
    setItem(e.target.value)
    console.log("just a check : ",e.target.value)
  }
   console.log("checking rerender in in terface component")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item.trim()) {
      setErrorMessage("Please enter ingredients.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(url, { items: item });
      console.log("Data from backend:", response.data);
      setFetchedRecipe(response.data);
      setItem("");
      setHasSearched(true); // Only show Recipes after successful search
    } catch (err: any) {
      if (err.response?.status === 429) {
        const waitTime = parseInt(err.response.data.error?.split(" ").slice(-4, -3)[0]);
        const numberOfHours = Math.floor(waitTime / 3600);
        setErrorMessage(`API limit reached. Please wait ${numberOfHours} hours.`);
      } else if (err.response?.status === 500) {
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mb-4">
        <Header />

        {/* Search Form */}
        <form className="max-w-[500px] mt-4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <input
              placeholder="Enter your favourite dish, I'm sure we have it :)"
              className="input-bar w-full"
              name="text"
              value={item}
              onChange={handleChange}
            />
            <button type="submit" className="hidden">Search</button>
          </div>

          {errorMessage && (
            <div className="error mx-auto mt-4">
              <div className="error__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#393a37" d="M13 13h-2v-6h2zm0 4h-2v-2h2z..."></path>
                </svg>
              </div>
              <div className="error__title">{errorMessage}</div>
            </div>
          )}
        </form>

        {/* fetches the new recipes when you search */}

        {loading ? (
          <div className="flex items-center justify-center mt-20">
            <OrbitProgress variant="track-disc" color="#000000" size="medium" />
          </div>
        ) : (
          hasSearched ? <Recipes />:fetchedRecipe && <Recipes/>
        )}

        

      

        {/* fetches recipes that are stored in the state */}

        {/* {/* {loading ? (
          <div className="flex items-center justify-center mt-20">
            <OrbitProgress variant="track-disc" color="#000000" size="medium" />
          </div>
        ) : (
          fetchedRecipe && <Recipes />
        )} */}
         
      </main>

      <footer className="text-center mt-auto py-4 bg-[#a0b56d]">
        <p className="text-black text-xl">
          © {new Date().getFullYear()} Hammad Ahmad: Thanks for visiting my site :)
        </p>
      </footer>
    </div>
  );
}

export default Interface;



