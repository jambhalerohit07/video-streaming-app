import React from "react";
import { Menu, Search, Mic, Video, Bell } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <img
            src="../../../../public/youtube.png"
            alt="YouTube"
            className="w-8"
          />
          <span className="font-semibold text-xl">YouTube</span>
        </div>
      </div>

      <div className="hidden md:flex items-center w-[45%]">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full px-4 py-2 border border-gray-300 rounded-l-full 
            focus:outline-none focus:border-gray-400 
          "
        />

        <button
          className="
            px-4 py-2.5 bg-gray-100 border border-gray-300 
            border-l-0 rounded-r-full hover:bg-gray-200
          "
        >
          <Search size={20} />
        </button>

        <button className="ml-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Mic size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Video size={24} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-200 relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
            9+
          </span>
        </button>

        <img
          src="../../../../public/icons8-profile-96.png"
          alt="User"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
      </div>

      <div className="flex md:hidden items-center ml-3">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Search size={22} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
