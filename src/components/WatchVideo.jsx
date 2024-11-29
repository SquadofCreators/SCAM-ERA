import React from "react";
import { useParams } from "react-router-dom";

const WatchVideo = () => {
  const { videoUrl } = useParams(); // Get the video URL from params (use appropriate format)
  
  return (
    <div className="flex flex-col items-center justify-center w-full bg-transparent text-white">
      <h1 className="text-3xl font-bold mb-6">Watch Analyzed Video</h1>

      {/* Video Player */}
      <div className="w-full max-w-2xl">
        <video controls width="100%">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Prediction Result (This can be dynamic based on video) */}
      <div className="mt-4 text-xl font-bold text-[#5675f8]">
        Prediction: Real/Fake
      </div>
    </div>
  );
};

export default WatchVideo;
