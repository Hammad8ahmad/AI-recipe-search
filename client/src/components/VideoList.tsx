function VideoList({ videos }: any) {
  console.log("videos for this recipe:", videos);

  return (
    <div>
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video: any, index: number) => {
          const videoId = video.id?.videoId; // Ensure we access the correct path
          const videoSrc = `https://www.youtube-nocookie.com/embed/${videoId}`;

          return (
            <div className="video-tab" key={index}>
              <iframe
                className="youtube-video"
                src={videoSrc}
                allowFullScreen
                title={`Video ${index + 1}`}
              />
            </div>
          );
        })
      ) : (
        <div className="bg-red-500">
          API limit reached. No videos available :(
        </div>
      )}
    </div>
  );
}

export default VideoList;
