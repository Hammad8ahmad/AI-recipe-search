 function FetchAnotherRecipe({fetchNewRecipe } : {fetchNewRecipe:any}) {

    return<>
    
      {/* Get Another Recipe Button (Placed Above) */}
      <button
        onClick={fetchNewRecipe}
        className="bg-black  mx-auto  mt-4 text-white py-3 px-6 text-center font-semibold rounded-lg hover:bg-gray-800 transition"
      >
        Get Another Recipe <i className="fa-solid fa-arrows-rotate"></i>
      </button>
    </>

 }

 export default FetchAnotherRecipe