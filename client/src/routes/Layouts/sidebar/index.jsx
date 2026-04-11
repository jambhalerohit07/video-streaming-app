import React from "react";
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  ListVideo,
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`
        bg-white shadow-md h-screen pt-4 transition-all
        fixed top-0 left-0 z-40
        ${isOpen ? "w-60" : "w-15"}
      `}
    >
      <div className="h-16"></div>

      <ul className={`flex flex-col gap-1  ${isOpen ? "" : "items-center"}`}>
        <SidebarItem icon={<Home size={22} />} label="Home" isOpen={isOpen} />
        <SidebarItem
          icon={<Compass size={22} />}
          label="Explore"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<PlaySquare size={22} />}
          label="Shorts"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ListVideo size={22} />}
          label="Subscriptions"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<Clock size={22} />}
          label="History"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ThumbsUp size={22} />}
          label="Liked Videos"
          isOpen={isOpen}
        />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen }) => {
  return (
    <li
      className="
        flex items-center gap-4 p-3 hover:bg-gray-100 
        cursor-pointer transition-all rounded-lg
      "
    >
      <span>{icon}</span>
      {isOpen && <span className="text-[15px] font-medium">{label}</span>}
    </li>
  );
};

export default Sidebar;
