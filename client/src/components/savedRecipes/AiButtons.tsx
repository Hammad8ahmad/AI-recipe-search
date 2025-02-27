

// const AiButtons = ({recipe,handleAnalysis,handleOptimization,handleInstructions} : any) => {

//     return <>
//      <div className='flex justify-between items-center gap-2 '>
//               <button
//                 onClick={() => handleAnalysis(recipe)}
//                 className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out"
//               >
//                 <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
//                 <span className="relative z-10">✨ Nutrition Insights</span>
//               </button>

//               <button
//                 onClick={() => handleOptimization(recipe)}
//                 className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out"
//               >
//                 <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
//                 <span className="relative z-10">✨ Recipe Optimization</span>
//               </button>

//               <button
//                 onClick={() => handleInstructions(recipe)}
//                 className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out"
//               >
//                 <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
//                 <span className="relative z-10">✨ Instructions</span>
//               </button>
//               </div>
//     </>
// }
// export default AiButtons

const AiButtons = ({ recipe, handleAnalysis, handleOptimization, handleInstructions }: any) => {
  return (
    <div className="flex justify-between items-center gap-2 flex-wrap sm:flex-nowrap w-full">
      <button
        onClick={() => handleAnalysis(recipe)}
        className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out w-full sm:w-auto"
      >
        <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
        <span className="relative z-10">✨ Nutrition Insights</span>
      </button>

      <button
        onClick={() => handleOptimization(recipe)}
        className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out w-full sm:w-auto"
      >
        <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
        <span className="relative z-10">✨ Tips</span>
      </button>

      <button
        onClick={() => handleInstructions(recipe)}
        className="relative px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out w-full sm:w-auto"
      >
        <span className="absolute inset-0 bg-white opacity-30 blur-md rounded-lg"></span>
        <span className="relative z-10">✨ Instructions</span>
      </button>
    </div>
  );
};

export default AiButtons;


