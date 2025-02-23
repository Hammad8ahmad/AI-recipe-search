
 

// const appId = process.env.EDAMAM_APP_ID;
// const appKey = process.env.EDAMAM_APP_KEY;

// if (!appId || !appKey) {
//   console.error('Missing Edamam API credentials');
// }

 const fetchingRecipesFromEdamam = async (query) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
    );
    const data = await response.json();
    return data.hits.slice(0, 5); // Return only the top 5 results
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
module.exports = {fetchingRecipesFromEdamam}