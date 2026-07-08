import React from "react";
import {APP_INFO} from "../../../config/appInfo"

const APP_VERSION = import.meta.env.VITE_APP_VERSION || "dev";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-between gap-2 text-sm text-gray-500 md:flex-row">
        <div className=""> 
          © {new Date().getFullYear()} Testing Portal
        </div>

        <div className="flex items-center gap-2">
          {/* <span>Build</span> */}

          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
            Version: {APP_INFO.version || "0.0.0.0"}
          </span>
        </div>
      </div>
    </footer>
  );
}