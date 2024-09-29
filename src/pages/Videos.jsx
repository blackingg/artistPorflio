import React, { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { videos } from "../data";

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-8 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-[#252323] rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <IoPlayCircleOutline className="text-6xl text-[#dfff1d]" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              <button
                onClick={() => handleVideoSelect(video)}
                className="bg-[#dfff1d] text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#252323] p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedVideo.title}</h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 mb-4">
              {/* Placeholder for video player */}
              <div className="flex items-center justify-center h-full">
                <p className="text-lg">Video player placeholder</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="bg-[#dfff1d] text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
