import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const RealTimeDetection = () => {
  const videoRef = useRef(null); // Reference for video element
  const canvasRef = useRef(null); // Reference for canvas element
  const [isLoading, setIsLoading] = useState(true); // State for loading camera
  const [isCameraAccessible, setIsCameraAccessible] = useState(true); // State to check if camera is accessible
  const [prediction, setPrediction] = useState(null); // Prediction state (null until ready)
  const [isProcessing, setIsProcessing] = useState(false); // State to check if processing is in progress

  const videoWidth = 640;
  const videoHeight = 480;

  const location = useLocation(); // Hook to detect route changes

  // Function to start the camera feed
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true, // Request video stream
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream; // Attach the stream to the video element
        videoRef.current.play(); // Start the video
      }
      setIsLoading(false);
      setIsCameraAccessible(true); // Camera access granted
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setIsLoading(false);
      setIsCameraAccessible(false); // Camera access denied
    }
  };

  // Function to stop the camera feed
  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks when we stop the camera
        videoRef.current.srcObject = null; // Clear the video source
      }
    }
  };

  // Function to process the video frame (simulate prediction logic)
  const processFrame = async () => {
    if (videoRef.current && !isProcessing) {
      setIsProcessing(true);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, videoWidth, videoHeight);

      // Get image data from the canvas
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);

      // Simulate prediction on the current frame (replace with actual model prediction logic)
      const predictedClass = Math.random() > 0.5 ? "Real" : "Fake"; // Simulating a random prediction

    //   setPrediction(predictedClass);  // Update the prediction state

      // Simulate a small delay for the prediction process
      setTimeout(() => {
        setIsProcessing(false); // Stop processing after prediction
      }, 1000); // You can adjust this delay based on your model's processing time
    }
  };

  // Handle route changes (stop camera when route changes)
  useEffect(() => {
    startCamera(); // Start camera when component mounts

    // Start a loop that processes frames at a regular interval
    const interval = setInterval(processFrame, 1000); // Process frame every 1 second

    // Cleanup when the route changes or component unmounts
    return () => {
      clearInterval(interval); // Clear the interval
      stopCamera(); // Stop the camera when the component unmounts or route changes
    };
  }, [location]); // Run effect whenever the route changes

  return (
    <div className="flex flex-col items-center justify-center w-full bg-transparent text-white">
      <h1 className="text-3xl font-bold mb-6">Real-Time Detection</h1>

      {/* Check for camera access and loading state */}
      {isCameraAccessible ? (
        isLoading ? (
          <div className="text-xl">Loading camera...</div>
        ) : (
          <div className="relative">
            {/* Video Element with Fixed Dimensions */}
            <video
              ref={videoRef}
              width={videoWidth}
              height={videoHeight}
              className="border-2 border-[#5675f8]"
              autoPlay
              muted
            ></video>

            {/* Canvas for processing video */}
            <canvas
              ref={canvasRef}
              width={videoWidth}
              height={videoHeight}
              className="absolute top-0 left-0"
              style={{ pointerEvents: "none" }} // Make canvas non-interactive
            ></canvas>
          </div>
        )
      ) : (
        <div className="text-xl text-red-500">
          Camera access denied. Please allow camera access to use real-time detection.
        </div>
      )}

      {/* Show prediction only when processing is finished */}
      {
    //   isProcessing ? (
    //     <div className="text-xl">Waiting for prediction...</div>
    //   ) : 
      prediction ? (
        <div className="mt-4 text-xl font-bold text-[#5675f8]">{prediction}</div>
      ) : (
        <div className="mt-4 text-xl font-bold text-[#5675f8]">Waiting for prediction...</div>
      )}
    </div>
  );
};

export default RealTimeDetection;
