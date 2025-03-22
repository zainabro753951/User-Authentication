import React from "react";
import AuthSidebar from "../../UI components/AuthSidebar";
import Productive from "../../UI components/Productive";

const Welcome = () => {
  return (
    <div className="w-full grid md:grid-cols-2 relative h-screen lg:p-[1.2vw] md:p-[1.8vw] xs:p-[2.5vw] gap-[1.2vw]">
      <AuthSidebar />
      <Productive />
    </div>
  );
};

export default Welcome;
