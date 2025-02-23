const { youtube } = require('../Services/youtubeApiService');

const fetchYouTubeVideos = async (query) => {
  try {
    const videos = await youtube(query); // Call the youtube function directly
    return videos; // No need for .get() since youtube() already returns the data
  } catch (error) {
    console.error("Error fetching YouTube videos:", error.message);
    return [];
  }
};

module.exports = {
  fetchYouTubeVideos,
};
