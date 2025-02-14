import { useState } from "react";
import "./interface.css";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import Recipes from "./Recipes";
import Header from "./Header";

function Interface() {
  const [items, setItems] = useState<string>(""); // Keeping items as a string
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const url = "http://localhost:3000/recipe-search";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setItems("")

    if (!items.trim()) {
      setShow2(false);
      setShow(true);
      setTimeout(() => setShow(false), 2000);
      return;
    }
    if (items.split(",").length < 3) {
      setShow(false);
      setShow2(true);
      setTimeout(() => setShow2(false), 2000);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(url, { items: items.split(",") }); // Ensure backend expects an array
      setRecipes(response.data.recipes);
    } catch (err: any) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      console.log(err.message);
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
            placeholder="e.g., Pasta, Tacos, Pancakes..."
            className="input-bar w-full"
            name="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />
          <button type="submit" className="hidden">Search</button>
        </div>

        {/* Validation Messages */}
        {show && <div className="error mx-auto mt-4">
          <div className="error__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#393a37" d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
            </svg>
          </div>
          <div className="error__title r">Plz enter any ingredients</div>
        </div>}
        {show2 && <div className="error mx-auto mt-4">
          <div className="error__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#393a37" d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
            </svg>
          </div>
          <div className="error__title r">Plz enter at least 3 ingredients</div>
        </div>}
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <div className="mx-auto flex items-center justify-center mt-20">
          <OrbitProgress variant="track-disc" color="#000000" size="medium" />
        </div>
      ) : (
        <Recipes recipes={recipes} />
      )}

      {/* Error Message */}
      {error && (
        <div className="error mx-auto">
          <div className="error__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#393a37" d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
            </svg>
          </div>
          <div className="error__title">OpenAI API limit reached, try again after 24 hours :(</div>
        </div>
      )}
    </>
  );
}

export default Interface;
