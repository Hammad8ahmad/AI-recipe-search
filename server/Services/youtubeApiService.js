//  OLD AXIOS CONFIGURATION


// import axios from "axios";



// const youtube = axios.create({
//   baseURL: "https://www.googleapis.com/youtube/v3",
//   params: {
//     part: "snippet",
//     fields: "items(id/videoId,snippet/title)",
//     maxResults: 1,
//     key: process.env.YOUTUBE_API_KEY,
//   },
// });

// module.exports = {
//     youtube
// };

//  NEW FETCH CONFIGURATION


const baseURL = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_API_KEY;

const youtube = async (query) => {
  try {
    const url = `${baseURL}/search?part=snippet&fields=items(id/videoId,snippet/title)&maxResults=1&q=${query}&key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error.message);
    return [];
  }
};

module.exports = { youtube };
