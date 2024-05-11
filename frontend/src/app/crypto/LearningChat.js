import { useState } from "react";
import ChatIcon from "next/image";

// const topics = [
//   {
//     title: "Bitcoin",
//     description: "Learn about the first decentralized digital currency.",
//   },
//   {
//     title: "Ethereum",
//     description:
//       "Explore the smart contract platform that enables developers to build decentralized applications.",
//   },
//   {
//     title: "Bitcoin",
//     description: "Learn about the first decentralized digital currency.",
//   },
//   {
//     title: "Ethereum",
//     description:
//       "Explore the smart contract platform that enables developers to build decentralized applications.",
//   },
//   {
//     title: "Ripple",
//     description:
//       "Discover the digital payment protocol for financial transactions.",
//   },
//   {
//     title: "Litecoin",
//     description:
//       "Understand the peer-to-peer cryptocurrency inspired by Bitcoin.",
//   },
//   {
//     title: "Cardano",
//     description:
//       "Dive into the blockchain platform for smart contracts, similar to Ethereum.",
//   },
//   // ...add more topics as needed
// ];

const articles = {
  Bitcoin: [
    {
      title: "The Rise of Bitcoin",
      description: "An overview of Bitcoin’s surge in popularity and value.",
      tags: ["#crypto", "#bitcoin", "#investment"],
    },
    {
      title: "Understanding Bitcoin",
      description: "A deep dive into the workings of Bitcoin and its network.",
      tags: ["#crypto", "#bitcoin", "#blockchain"],
    },
    // ...add more articles as needed
  ],
  Ethereum: [
    {
      title: "Smart Contracts Explained",
      description: "Understanding the building blocks of Ethereum.",
      tags: ["#ethereum", "#smartcontracts", "#blockchain"],
    },
    {
      title: "Ethereum vs. Bitcoin",
      description: "A comparison of the two most popular cryptocurrencies.",
      tags: ["#ethereum", "#bitcoin", "#comparison"],
    },
    // ...add more articles as needed
  ],
  Ripple: [
    {
      title: "The Basics of Ripple",
      description: "An introduction to the digital payment protocol.",
      tags: ["#ripple", "#crypto", "#finance"],
    },
    // ...add more articles as needed
  ],
  Litecoin: [
    {
      title: "Litecoin Mining",
      description: "A guide to mining this popular cryptocurrency.",
      tags: ["#litecoin", "#mining", "#crypto"],
    },
    // ...add more articles as needed
  ],
  Cardano: [
    {
      title: "The Future of Cardano",
      description: "What to expect from this innovative blockchain platform.",
      tags: ["#cardano", "#crypto", "#blockchain"],
    },
    // ...add more articles as needed
  ],
  Bitcoin2: [
    {
      title: "The Rise of Bitcoin",
      description: "An overview of Bitcoin’s surge in popularity and value.",
      tags: ["#crypto", "#bitcoin", "#investment"],
    },
    {
      title: "Understanding Bitcoin",
      description: "A deep dive into the workings of Bitcoin and its network.",
      tags: ["#crypto", "#bitcoin", "#blockchain"],
    },
    // ...add more articles as needed
  ],
  Ethereum2: [
    {
      title: "Smart Contracts Explained",
      description: "Understanding the building blocks of Ethereum.",
      tags: ["#ethereum", "#smartcontracts", "#blockchain"],
    },
    {
      title: "Ethereum vs. Bitcoin",
      description: "A comparison of the two most popular cryptocurrencies.",
      tags: ["#ethereum", "#bitcoin", "#comparison"],
    },
    // ...add more articles as needed
  ],
  Ripple2: [
    {
      title: "The Basics of Ripple",
      description: "An introduction to the digital payment protocol.",
      tags: ["#ripple", "#crypto", "#finance"],
    },
    // ...add more articles as needed
  ],
  Litecoin2: [
    {
      title: "Litecoin Mining",
      description: "A guide to mining this popular cryptocurrency.",
      tags: ["#litecoin", "#mining", "#crypto"],
    },
    // ...add more articles as needed
  ],
  Cardano2: [
    {
      title: "The Future of Cardano",
      description: "What to expect from this innovative blockchain platform.",
      tags: ["#cardano", "#crypto", "#blockchain"],
    },
    // ...add more articles as needed
  ],
  Bitcoin1: [
    {
      title: "The Rise of Bitcoin",
      description: "An overview of Bitcoin’s surge in popularity and value.",
      tags: ["#crypto", "#bitcoin", "#investment"],
    },
    {
      title: "Understanding Bitcoin",
      description: "A deep dive into the workings of Bitcoin and its network.",
      tags: ["#crypto", "#bitcoin", "#blockchain"],
    },
    // ...add more articles as needed
  ],
  Ethereum1: [
    {
      title: "Smart Contracts Explained",
      description: "Understanding the building blocks of Ethereum.",
      tags: ["#ethereum", "#smartcontracts", "#blockchain"],
    },
    {
      title: "Ethereum vs. Bitcoin",
      description: "A comparison of the two most popular cryptocurrencies.",
      tags: ["#ethereum", "#bitcoin", "#comparison"],
    },
    // ...add more articles as needed
  ],
  Ripple1: [
    {
      title: "The Basics of Ripple",
      description: "An introduction to the digital payment protocol.",
      tags: ["#ripple", "#crypto", "#finance"],
    },
    // ...add more articles as needed
  ],
  Litecoin1: [
    {
      title: "Litecoin Mining",
      description: "A guide to mining this popular cryptocurrency.",
      tags: ["#litecoin", "#mining", "#crypto"],
    },
    // ...add more articles as needed
  ],
  Cardano1: [
    {
      title: "The Future of Cardano",
      description: "What to expect from this innovative blockchain platform.",
      tags: ["#cardano", "#crypto", "#blockchain"],
    },
    // ...add more articles as needed
  ],
  // ...add more topics and articles as needed
};

const videos = {
  Bitcoin:
    '<iframe src="https://www.youtube.com/embed/bGpZrr32ECw?si=6kG4AEAIJPwI9Yu5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  Bitcoin1:
    '<iframe src="https://www.youtube.com/embed/bGpZrr32ECw?si=6kG4AEAIJPwI9Yu5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  Bitcoin2:
    '<iframe src="https://www.youtube.com/embed/bGpZrr32ECw?si=6kG4AEAIJPwI9Yu5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  Bitcoin3:
    '<iframe src="https://www.youtube.com/embed/bGpZrr32ECw?si=6kG4AEAIJPwI9Yu5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  Bitcoin4:
    '<iframe src="https://www.youtube.com/embed/bGpZrr32ECw?si=6kG4AEAIJPwI9Yu5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  Ethereum:
    '<iframe src="https://www.youtube.com/embed/your-video-id" frameborder="0" allowfullscreen></iframe>',
  // ...add more videos as needed
};

export default function CryptoTopics() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [contentType, setContentType] = useState("Articles");
  const [showChat, setShowChat] = useState(false);

  const handleBack = () => setSelectedTopic(null);
  const toggleChat = () => setShowChat(!showChat);

  return (
    <div className="relative bg-gray-600  rounded-xl text-white px-4 py-3">
      {selectedTopic ? (
        <>
          <button onClick={handleBack} className="text-sm mb-[33.5px]">
            &lt; Back
          </button>
          <div className=" h-[534.5px]">
            {articles[selectedTopic].map((article, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-400">{article.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {article.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <label
              htmlFor="content-type"
              className="block text-sm font-medium text-gray-300"
            >
              Content Type
            </label>
            <select
              id="content-type"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="bg-gray-700 text-white border-none"
            >
              <option value="Articles">Articles</option>
              <option value="Videos">Videos</option>
            </select>
          </div>
          <div className=" h-[534px] overflow-hidden">
            {/* Chat Window */}
            <div
              className={` z-40 transition-all bg-white rounded-xl duration-300 ease-in-out ${
                showChat ? "h-[534px]" : "h-0"
              } overflow-hidden w-full`}
            >
              <div className=" text-black p-4">
                <button
                  onClick={toggleChat}
                  className="text-black bg-gray-300 rounded-full text-sm p-1 float-right"
                >
                  X
                </button>
                {/* Chat content goes here */}
                Chat window content...
              </div>
            </div>
            <div
              className={`grid topics-section ${
                contentType === "Articles" ? "grid-cols-2" : "grid-cols-1"
              } gap-2.5 overflow-y-auto h-[90%]`}
            >
              {contentType === "Articles"
                ? Object.keys(articles).map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTopic(topic)}
                      className="bg-gray-800 p-4 rounded-lg mr-1"
                    >
                      <h3 className="text-lg font-semibold">{topic}</h3>
                      <p className="text-sm text-gray-400">
                        {articles[topic][0].description}
                      </p>
                    </button>
                  ))
                : Object.keys(videos).map((topic, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-4 rounded-lg mr-1"
                      dangerouslySetInnerHTML={{ __html: videos[topic] }}
                    />
                  ))}
                  
            </div>
            
            {/* Chat Button */}
            <div className="mt-2 h-[8.5%] rounded-3xl flex items-center justify-center bg-red-500">
              <button onClick={toggleChat} className=" w-full h-full">
                Ask AI
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* {Object.keys(articles).map((topic, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold">{topic}</h3>
                  <p className="text-sm text-gray-400">
                  {articles[topic][0].description}
                  </p>
                </button>
              ))} */
