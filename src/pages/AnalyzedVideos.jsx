import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnalyzedVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]); // State to store video data
  const [isLoading, setIsLoading] = useState(true); // State to check loading status

  // Sample data (replace with your actual data fetching logic)
  const sampleVideos = [
    {
      id: 1,
      name: "Video 1",
      videoUrl: "path_to_video_1.mp4",
      thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6anuxZWkX_e6Huoooie8vqznVwfHbsiv-CA&s",
      prediction: "Fake", // Result of analysis
    },
    {
      id: 2,
      name: "Video 2",
      videoUrl: "path_to_video_2.mp4",
      thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgwbio5IAJ-vps4tnReX8JJkutTvT770_2KE0Mb1HTvcX6RQvoNlLbfs_xIrAmmaVdbUQ&usqp=CAU",
      prediction: "Real",
    },
    // Add more videos here
  ];

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setVideos(sampleVideos);
      setIsLoading(false);
    }, 1000); // Simulated delay for loading
  }, []);

  // Function to handle video selection and navigation
  const handleVideoSelect = (videoUrl) => {
    navigate(`/watch/${videoUrl}`); // Navigate to the video playback page
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-transparent text-white">
      <h1 className="text-3xl font-bold mb-6">Analyzed Videos</h1>

      {isLoading ? (
        <div className="text-xl">Loading analyzed videos...</div>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg border border-[#5675f8] shadow-lg cursor-pointer"
              onClick={() => handleVideoSelect(video.videoUrl)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4 bg-[#1c1c24] rounded-b-lg">
                <h3 className="text-lg font-semibold">{video.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{video.prediction}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyzedVideos;
