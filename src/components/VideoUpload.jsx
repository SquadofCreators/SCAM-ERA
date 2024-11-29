import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null); // State for storing the video file
  const [isUploading, setIsUploading] = useState(false); // State to manage upload status
  const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const navigate = useNavigate(); // Navigation for redirecting

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  // Simulate upload logic (replace with actual API logic later)
  const handleUpload = () => {
    if (!videoFile) {
      alert("Please select a video to upload.");
      return;
    }

    setIsUploading(true);
    setShowPopup(true);

    // Simulate an upload process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false); // Hide the upload button
          setShowPopup(false); // Hide the progress popup
          // alert("Video uploaded successfully!");
          navigate("/"); // Redirect to another page after upload
        }, 500); // Simulate a brief delay before redirecting
      }
    }, 300); // Simulate progress every 300ms
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 mt-[5rem] bg-transparent text-white">
      <h1 className="text-3xl font-bold mb-6">Upload Video for Detection</h1>

      {/* Video File Input */}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="mb-4 w-64 p-2 border border-gray-600 rounded bg-transparent text-gray-300"
      />

      {/* Show Selected File */}
      {videoFile && (
        <p className="mb-4">
          Selected Video: <span className="font-semibold">{videoFile.name}</span>
        </p>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : "Upload Video"}
      </button>

      {/* Popup for Progress Loader */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-blue-600">
            <h2 className="text-xl font-semibold mb-4">Uploading Video...</h2>
            <div className="mb-4">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-center">{uploadProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
