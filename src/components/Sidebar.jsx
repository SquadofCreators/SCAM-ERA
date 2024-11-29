import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { user } from "../assets"; // User profile icon asset
import { navlinks } from "../constants"; // Updated navigation links for the project
import Logo from "../assets/logo.png"; // Logo for the project

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#5675f8]"
    } flex items-center justify-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {/* SVG Icon with dynamic color change */}
    {!isActive ? (
      <img
        src={imgUrl}
        alt={`${name}_icon`}
        className="h-6 w-6"
        style={{ filter: "invert(100%)" }} // Invert colors to make it white by default
      />
    ) : (
      <img
        src={imgUrl}
        alt={`${name}_icon`}
        className={`h-6 w-6 ${isActive !== name && "grayscale"}`}
        style={{ filter: "invert(100%)" }} // Ensure the icon remains white when active
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <div className="rounded-[10px] bg-[#2c2f32] p-2">
          <img src={Logo} alt="logo" className="h-[2.5rem] w-[2.5rem]" />
        </div>
      </Link>

      {/* Navigation Icons */}
      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        {/* User Profile Icon */}
        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={user}
          handleClick={() => {
            navigate("/profile");
            setIsActive("profile");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
