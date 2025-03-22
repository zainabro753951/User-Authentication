import React from "react";

const AuthSidebar = () => {
  return (
    <div className="w-full h-full flex items-center relative justify-center md:rounded-[1.3vw] xs:rounded-[1.8vw] bg-black">
      <h2 className="text-white absolute top-[2vw] left-[2vw] md:text-[2.5vw] xs:text-[3.5vw] font-family-poppins font-semibold xs:leading-[4vw] md:leading-[2.7vw]">
        Organic <br /> Mind
      </h2>
      <img className="w-1/2 " src="/imgs/sigin/sidebar.png" alt="" />
    </div>
  );
};

export default AuthSidebar;
