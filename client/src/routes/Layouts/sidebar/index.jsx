import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  Shield,
  Lock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "./sidebar.service";
import SidebarSkeleton from "./SidebarSkeleton";

const ICONS = {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  Shield,
  Lock,
};

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const { data = [], isLoading } = useSidebar();

  const buildSidebarTree = (modules = []) => {
    const lookup = {};

    modules.forEach((module) => {
      lookup[module._id] = {
        ...module,
        children: [],
      };
    });

    const tree = [];

    modules.forEach((module) => {
      if (module.parent && lookup[module.parent]) {
        lookup[module.parent].children.push(lookup[module._id]);
      } else {
        tree.push(lookup[module._id]);
      }
    });

    const sortTree = (items) =>
      items
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          ...item,
          children: sortTree(item.children),
        }));

    return sortTree(tree);
  };

  const sidebarTree = useMemo(() => buildSidebarTree(data), [data]);

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    const expanded = {};

    const traverse = (items) => {
      items.forEach((item) => {
        const hasActive = (children) =>
          children.some((child) => {
            if (child.route === pathname) return true;
            return hasActive(child.children);
          });

        if (hasActive(item.children)) {
          expanded[item._id] = true;
        }

        traverse(item.children);
      });
    };

    traverse(sidebarTree);

    setExpandedMenus((prev) => ({
      ...prev,
      ...expanded,
    }));
  }, [pathname, sidebarTree]);

  return (
    <div
      className={`bg-white shadow-md h-screen pt-4 fixed top-0 left-0 z-40 border-r border-gray-300 transition-all duration-300 ${isOpen ? "w-60" : "w-16"
        }`}
    >
      <div className="h-16"></div>

      {isLoading ? (
        <SidebarSkeleton isOpen={isOpen} />
      ) : (
        <ul className={`flex flex-col gap-1 ${isOpen ? "" : "items-center"}`}>
          {sidebarTree.map((item) => (
            <SidebarItem
              key={item._id}
              item={item}
              isOpen={isOpen}
              level={0}
              expandedMenus={expandedMenus}
              toggleMenu={toggleMenu}
              setSidebarOpen={setSidebarOpen}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const SidebarItem = ({
  item,
  isOpen,
  level,
  expandedMenus,
  toggleMenu,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hasChildren = item.children.length > 0;

  const expanded = expandedMenus[item._id];

  const isActive = pathname === item.route;

  const hasActiveChild = useMemo(() => {
    const check = (children) =>
      children.some((child) => {
        if (child.route === pathname) return true;
        return check(child.children);
      });

    return check(item.children);
  }, [item.children, pathname]);

  const handleClick = () => {
    if (hasChildren) {
      if (!isOpen) {
        setSidebarOpen(true);
        requestAnimationFrame(() => {
          toggleMenu(item._id);
        });
        return;
      }
      toggleMenu(item._id);
      return;
    }
    if (item.route) {
      navigate(item.route);
    }
  };
  const Icon = ICONS[item.icon];

  return (
    <>
      <li
        onClick={handleClick}
        className={`
          flex items-center justify-between
          py-3 pr-3
          cursor-pointer
          rounded-xl
          transition-all
          border-r-[3px]
          ${isActive
            ? "bg-blue-100 text-blue-700 border-blue-700"
            : hasActiveChild
              ? "bg-blue-50 text-blue-600 border-blue-300"
              : "border-transparent hover:bg-gray-100"
          }
        `}
        style={{
          paddingLeft: `${16 + level * 18}px`,
        }}
      >
        <div className="flex items-center gap-3">
          {(isOpen || level === 0) && Icon && <Icon size={18} />}

          {isOpen && (
            <span className="whitespace-nowrap">{item.title}</span>
          )}
        </div>

        {isOpen &&
          hasChildren &&
          (expanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          ))}
      </li>

      {isOpen &&
        expanded &&
        hasChildren &&
        item.children.map((child) => (
          <SidebarItem
            key={child._id}
            item={child}
            isOpen={isOpen}
            level={level + 1}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            setSidebarOpen={setSidebarOpen}
          />
        ))}
    </>
  );
};

export default Sidebar;