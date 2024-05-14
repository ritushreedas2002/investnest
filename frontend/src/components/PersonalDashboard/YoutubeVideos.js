import React, { useState, useEffect } from "react";
import axios from "axios";

function YouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const apiKey = "AIzaSyDGoeZzoW1kgGU8aefldET2jYgZ43DvkRc"; // Use your actual YouTube Data API key

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 10,
              q: "Personal Finance",
              type: "video",
              regionCode: "IN",
              videoDuration: "medium",
              videoSyndicated: "true",
              videoEmbeddable: "true",
              key: apiKey,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-80 relative mt-2 overflow-y-scroll h-[530px]">
      <div className=" flex flex-col items-center">
        {videos.map((video, index) => (
          <div key={video.id.videoId} className=" w-[330px] mb-4">
            {/* Embed YouTube video using iframe */}
            <iframe
              width="100%"
              height="180"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
            {/* <p style={{ margin: "0" }}>
              {video.snippet.title.length > 50
                ? video.snippet.title.slice(0, 50) + "..."
                : video.snippet.title}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideos;
