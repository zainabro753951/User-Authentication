import React from "react";
import { Link } from "react-router-dom";

const AuthButton = ({ text, path }) => {
  return (
    <Link
      to={path ? path : ""}
      className="w-full flex justify-center h-full md:py-[1vw] xs:py-[2.5vw] md:text-[1.2vw] xs:text-[3.7vw] font-family-poppins font-semibold my-2 rounded-[0.6vw] bg-theme-golden"
    >
      {text}
    </Link>
  );
};

export default AuthButton;
