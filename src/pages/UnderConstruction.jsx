import React from "react";
import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-[10rem] text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">
          Under Construction
        </h1>
        <p className="text-lg mb-6">We are building something amazing! Stay tuned!</p>
        <div className="flex items-center justify-center animate__animated animate__pulse animate__infinite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-yellow-500 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 9.293a1 1 0 011.414 0L10 13.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-sm">Please check back later!</p>
      </div>
      <div className="mt-6">
        <Link to="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
