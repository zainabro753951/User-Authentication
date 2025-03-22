import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
const Header = () => {
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setisDropdownOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-gray-100 border-b relative border-gray-300">
      <div className="max-w-[80vw] fixed  left-1/2 flex justify-between items-center -translate-x-1/2 w-full py-[0.5vw]">
        <div>
          <h3 className="text-theme-orange md:text-[2vw] font-semibold font-family-poppins flex items-center">
            <span className="text-[3vw]">&copy;</span> TimeCapsule
          </h3>
        </div>
        <div className="flex gap-[5vw] items-center font-family-poppins md:text-[1.2vw] xs:text-[3.2] font-medium">
          <nav className="flex items-center gap-3">
            <Link className="px-[1vw]">Home</Link>
            <Link className="px-[1vw]">Create Capsule</Link>
            <Link className="px-[1vw]">Explore Capsules</Link>
            <div className="w-[3vw] h-[3vw] bg-red-400 rounded-full overflow-hidden">
              <img src="" alt="" />
            </div>
          </nav>
          <div className="relative " ref={dropdownRef}>
            <p
              className="text-[2vw] cursor-pointer"
              onClick={() => setisDropdownOpen(!isDropdownOpen)}
            >
              <IoMdMenu />
            </p>
            <div
              className={`w-[25vw] overflow-hidden bg-gray-200 absolute -bottom-[9.3vw] flex flex-col -left-[23vw] rounded-md ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="md:py-[1vw] xs:py-[2vw] md:text-[1.2vw] flex items-center gap-3 xs:text-[3.2] px-3 ">
                <IoMdLogOut className="-rotate-90" />
                <span>Logout</span>
              </div>
              <div className="md:py-[1vw] xs:py-[2vw] md:text-[1.2vw] flex items-center gap-3 xs:text-[3.2] px-3 ">
                <IoSettingsOutline />
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
