import { useState } from "react";
import "./interface.css";
import axios from "axios";

function Interface() {
  const [items, setItems] = useState<string>("");
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

    try {
      const response = await axios.post(url, { items });
      const data = response.data.recipes;
      console.log("this is the raw data coming from the backend ", data);
      setRecipes(data);
    } catch (error: any) {
      console.log(error.message);
      setItems("");
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="w-full max-w-3xl mx-auto  p-16 rounded-xl shadow-lg  text-center">
        <h1 className="text-5xl font-bold leading-tight mb-8">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg ">
          This is an AI recipe search web app that gives you recipes based on
          the ingredients that you provide. Get started by writing your
          ingredients in the input bar and it will give you recipes :).
        </p>
      </header>

      {/* Search Form Section */}
      <form
        id="form"
        className="w-full max-w-md mx-auto mt-12 p-8 bg-[#FFFFFF] rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* INPUT BARRRRRRRR */}
        <div className="mb-6">
          <label
            htmlFor="recipeSearch"
            className="block text-xl font-semibold text-[#333333] mb-2"
          >
            Enter Two Or More Ingredients
          </label>
          <input
            type="text"
            id="recipeSearch"
            name="recipeSearch"
            className="w-full p-5 border border-[#B8D8D8] rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            placeholder="e.g., Pasta, Tacos, Pancakes..."
            value={items}
            onChange={(e: any) => {
              setItems(e.target.value.split(","));
            }}
          />
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

        <button
          type="submit"
          className="w-full py-4 bg-[#ff5353] text-white text-3xl font-semibold rounded-lg mt-2"
        >
          Search Recipe
        </button>
      </form>

      {/* Recipe Section */}
      {recipes ? (
        <div className="w-full max-w-6xl mx-auto mt-12 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe: any) => {
            return (
              <div className="w-full rounded-xl p-8 bg-[#3A4A33] flex flex-col gap-4 shadow-lg">
                <div className="text-4xl font-bold">{recipe.recipeName}</div>
                {/* Ingredients Section */}
                <div className="ingredients pt-4">
                  <h2 className="text-2xl font-semibold  mb-4">Ingredients</h2>
                  <ul className="list-inside list-disc space-y-3 text-[#333333]">
                    {recipe.ingredients.map(
                      (ingredient: string, index: number) => {
                        return (
                          <li
                            key={index}
                            className="text-lg text-[#333333] flex items-center gap-2"
                          >
                            {/* <span className="w-2 h-2 rounded-full bg-[#622020]">
                              {" "}
                            </span> */}
                            {ingredient}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>

                {/* Instructions Section */}
                <div className="instructions pt-4 text-[#333333]">
                  <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                  <div className="space-y-5">
                    {recipe.instructions.map(
                      (instruction: string, index: number) => {
                        return (
                          <p key={index}>
                            <span className="mr-2 font-bold">{index + 1}.</span>{" "}
                            {instruction}
                          </p>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default Interface;
