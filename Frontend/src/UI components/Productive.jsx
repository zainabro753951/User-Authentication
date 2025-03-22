import React from "react";
import AuthButton from "./AuthButton";
import { Link } from "react-router-dom";

const Productive = () => {
  return (
    <>
      <div className="w-full h-full xs:absolute md:relative border border-gray-200 md:rounded-[1.3vw] xs:rounded-[1.8vw] flex items-center justify-center">
        <div className="w-[70%] bg-white/40 border border-white backdrop-blur-md xs:p-[3.5vw] md:p-0 rounded-[2vw]">
          <h1 className="md:text-[3.5vw] xs:text-[5.5vw] font-family-poppins font-semibold">
            Productive Mind
          </h1>
          <p className="md:text-[1.3vw] xs:text-[3.5vw] tracking-tight py-2 md:leading-[1.7vw] xs:leading-[4.2vw] font-family-jost">
            With only the features you need, Organic Mind is customized for
            individuals seeking a stress-free way to stay focused on their
            goals, projects, and tasks.
          </p>
          <AuthButton path={"/sign-up"} text={"Get Started"} />
          <p className="md:text-[1.3vw] xs:text-[3.5vw] py-2 md:leading-[1.7vw] xs:leading-[4.2vw] text-center mt-2 font-medium font-family-jost">
            Already have an account? <Link to={"/sign-in"}>Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Productive;
