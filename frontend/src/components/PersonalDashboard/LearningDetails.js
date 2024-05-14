"use client";
import React, { useState, useEffect } from "react";
import YouTubeVideos from "./YoutubeVideos";
import axios from "axios";
import Image from "next/image";

const LearningDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const apiKey = "860ae4cb72fa492e8b732f2f4c5ca1f2"; // Replace with your actual API key

  useEffect(() => {
    // Fetch articles from Bing News API
    const fetchArticles = async () => {
      const params = new URLSearchParams({
        q: "Personal Finance Management", // Your query
        count: "7", // Number of results to return
        offset: "0", // Results offset for pagination
        mkt: "en-US", // Market code
        safeSearch: "Off", // Safe search setting
        sortBy: "Relevance",
      });

      try {
        const response = await fetch(
          `https://api.bing.microsoft.com/v7.0/news/search?${params.toString()}`,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setArticles(data.value); // Update state with fetched articles
          console.log(data.value);
        } else {
          console.error("Error fetching articles:", response.statusText);
        }
      } catch (error) {
        setError("Failed to fetch articles");
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="mt-8 flex-col h-0" >
      {error && <p>Error loading articles: {error}</p>}

      <div className=" flex-col overflow-y-auto bg-white rounded-lg no-scrollbar">
        {articles.map((article) => (
          <div
            key={article.url}
            className=" p-2 mx-3 rounded-xl border-b border-gray-300  overflow-y-auto no-scrollbar"
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-black">
              <p className=" text-sm text-red-800 font-semibold hover:underline">
                {article.name}
              </p>
              <p className="text-xs">
                {article.description.length > 93
                  ? article.description.slice(0, 93) + "..."
                  : article.description}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningDetails;

{
  /* {article.image?.thumbnail?.contentUrl && (
                <Image
                  src={article.image.thumbnail.contentUrl}
                  alt="Article image"
                  width={160} // Example width
                  height={100} // Example height, adjust based on your design needs
                  className="rounded"
                />
              )} */
}
