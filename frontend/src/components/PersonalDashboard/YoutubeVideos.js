import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function YouTubeVideos() {
  const [videos, setVideos] = useState([]);
  //const apiKey = 'AIzaSyACxhfb9ar8WpOWlqiDR72Vo1_JQiaheng';  // Replace YOUR_API_KEY with your actual YouTube Data API key
  const apiKey = "AIzaSyDGoeZzoW1kgGU8aefldET2jYgZ43DvkRc";
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
        console.log(response.data);
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "49vw",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <div
        style={{ display: "flex", width: "100%", overflowX: "scroll" }}
        className="no-scrollbar"
      >
        {videos.map((video, index) => (
          <div
            key={video.id.videoId}
            style={{ flex: "0 0 auto", maxWidth: "300px", margin: "0 10px" }}
          >
            {/* Embed YouTube video using iframe */}
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
            <p style={{ margin: "0" }}>
              {video.snippet.title.length > 50
                ? video.snippet.title.slice(0, 50) + "..."
                : video.snippet.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideos;
