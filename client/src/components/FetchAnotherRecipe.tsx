import { useRecipeContext } from "../context/RecipeContext"

 function FetchAnotherRecipe({fetchNewRecipe } : {fetchNewRecipe:any}) {


    return<>
    
      {/* Get Another Recipe Button (Placed Above) */}
      <button
        onClick={fetchNewRecipe}
        className="bg-[#3A4A33] mx-auto  mt-4 text-white py-3 px-6 text-center font-semibold rounded-lg hover:bg-[#a0b56d] hover:text-[#333333] transition"
      >
        Get Another Recipe <i className="fa-solid fa-arrows-rotate"></i>
      </button>
    </>

 }

 export default FetchAnotherRecipe