import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#1a1a1b] border-b border-gray-700 h-12 z-50 flex items-center px-4">
      
      {/* Logo Placeholder */}
      <div className="text-white font-bold text-lg">Reddit</div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <input
          type="text"
          placeholder="Search Reddit"
          className="w-full max-w-xl bg-[#272729] border border-gray-600 rounded-full px-4 py-1 text-sm text-white outline-none
                     focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button className="text-white bg-orange-600 px-4 py-1 rounded-full hover:bg-orange-500">
          Log In
        </button>
        <button className="text-black bg-white px-4 py-1 rounded-full hover:bg-gray-200">
          Sign Up
        </button>
      </div>
    </header>
  );
}
