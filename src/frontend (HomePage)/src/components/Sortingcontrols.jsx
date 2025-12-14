import React, { useState } from "react";
import { 
  FiAward,
  FiTrendingUp, 
  FiClock,
  FiBarChart2,
  FiChevronDown
} from "react-icons/fi";

export default function SortingControls() {
  const [activeSort, setActiveSort] = useState("best");
  const [showTopFilter, setShowTopFilter] = useState(false);
  const [selectedTime, setSelectedTime] = useState("today");

  const sortingOptions = [
    { id: "best", label: "Best", icon: FiAward },
    { id: "hot", label: "Hot", icon: FiTrendingUp },
    { id: "new", label: "New", icon: FiClock },
    { id: "top", label: "Top", icon: FiBarChart2 },
  ];

  const timeFilters = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year", label: "This Year" },
    { id: "all", label: "All Time" },
  ];

  return (
    <div className="bg-[#1a1a1b] border-b border-gray-800">
      {/* Container that's left-aligned and limited to 640px */}
      <div className="max-w-[640px] pl-4">
        {/* First row: Sorting buttons */}
        <div className="flex items-center py-3">
          <span className="text-sm text-gray-500 font-medium mr-4 whitespace-nowrap">
            Sort by:
          </span>
          
          {/* Buttons start immediately after the label */}
          <div className="flex">
            {sortingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveSort(option.id);
                    if (option.id !== "top") setShowTopFilter(false);
                  }}
                  className={`
                    relative px-3 py-2 text-sm font-medium
                    flex items-center gap-1.5
                    ${activeSort === option.id
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                >
                  <Icon 
                    size={14} 
                    className={`${activeSort === option.id ? "text-[#ff4500]" : "text-gray-500"}`}
                  />
                  {option.label}
                  
                  {/* Active indicator - red bottom border */}
                  {activeSort === option.id && (
                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#ff4500] rounded-t"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Second row: Time period (only for Top) */}
        {activeSort === "top" && (
          <div className="border-t border-gray-800/50 py-3 flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Time period:
            </span>
            <div className="relative">
              <button
                onClick={() => setShowTopFilter(!showTopFilter)}
                className="flex items-center gap-1 bg-[#272729] hover:bg-[#343536] text-gray-300 text-sm px-3 py-1 rounded border border-gray-700"
              >
                <span>{timeFilters.find(t => t.id === selectedTime)?.label}</span>
                <FiChevronDown size={12} className={`${showTopFilter ? "rotate-180" : ""}`} />
              </button>
              
              {showTopFilter && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setShowTopFilter(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-36 bg-[#1a1a1b] border border-gray-700 rounded-md shadow-xl z-20 overflow-hidden">
                    {timeFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setSelectedTime(filter.id);
                          setShowTopFilter(false);
                        }}
                        className={`w-full px-3 py-2 text-sm text-left
                          ${selectedTime === filter.id
                            ? "bg-[#272729] text-white"
                            : "text-gray-300 hover:bg-[#272729] hover:text-white"
                          }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}