import { useState } from "react";
import "./interface.css";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import Recipes from "./Recipes";
import Header from "./Header";

function Interface() {
  const [items, setItems] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const url = "http://localhost:3000/recipe-search";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setItems("");

    if (items === "") {
      setShow2(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
      return;
    }
    if (items.length < 3) {
      setShow(false);
      setShow2(true);
      setTimeout(() => {
        setShow2(false);
      }, 2000);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(url, { items });
      const data = response.data.recipes;
      console.log("this is the raw data coming from the backend ", data);
      setRecipes(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setItems("");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Search Form Section */}
      <form
        id="form"
        className=" max-w-[500px] mt-2 mx-auto  "
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center ">
          <input
            type="text"
            id="recipeSearch"
            name="recipeSearch"
            className=" w-full px-4 py-2 rounded-sm border-y-2 border-l-2 outline-none border-black"
            placeholder="e.g., Pasta, Tacos, Pancakes..."
            value={items}
            onChange={(e: any) => {
              setItems(e.target.value.split(","));
            }}
          />
          <button
            type="submit"
            className="px-4 py-2 text-[#100e05] bg-[#a0b56d] border-2 max-w-[120px] border-black hover:bg-[#7f8e4f]  rounded-sm"
          >
            Search
          </button>
        </div>

        {/* Show Bar for Empty Ingredients */}
        {show && (
          <div className="text-sm text-[#FF6B6B]  text-center">
            Please enter any ingredients.
          </div>
        )}
        {show2 && (
          <div className="text-sm text-[#FF6B6B] text-center">
            Please enter at least 3 ingredients
          </div>
        )}
      </form>

      {/* Recipe Section */}
      {loading ? (
        <div className="mx-auto flex items-center justify-center mt-20">
          <OrbitProgress
            variant="track-disc"
            color="#000000"
            size="medium"
            text=""
            textColor=""
          />
        </div>
      ) : (
        <Recipes recipes={recipes} />
      )}
    </>
  );
}

export default Interface;
