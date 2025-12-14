import {
  FiMenu,
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiGrid,
  FiChevronRight,
} from "react-icons/fi";

const items = [
  { name: "Home", icon: FiHome },
  { name: "Popular", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "All", icon: FiGrid },
];

export default function PrimarySidebar({ isOpen, setIsOpen, active, setActive }) {
  return (
    <>
      {/* Reddit-style sidebar */}
      <aside
        className={`fixed top-12 left-0 h-[calc(100vh-3rem)]
        bg-[#1a1a1b] border-r border-gray-800
        transition-all duration-200 ease-in-out
        z-30 overflow-hidden
        ${isOpen ? "w-56 shadow-lg" : "w-0"}`}
      >
        <nav className={`py-4 px-3 transition-opacity duration-200
          ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Feeds
          </h3>
          <div className="space-y-1">
            {items.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`relative flex items-center w-full gap-3
                py-2.5 px-3 rounded
                transition-colors duration-150
                ${active === name 
                  ? "bg-[#272729] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#272729] hover:text-white"
                }`}
              >
                {/* Reddit-style icon circle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${active === name ? "bg-[#d93a00]/10" : "bg-gray-800"}
                  transition-colors duration-150`}>
                  <Icon size={18} />
                </div>
                
                <span className="text-sm">
                  {name}
                </span>
                
                {/* Active indicator - subtle like Reddit */}
                {active === name && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#ff4500] rounded-r"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Divider like Reddit */}
          <div className="my-4 border-t border-gray-800"></div>
          
          {/* Sidebar footer text - shows it's Reddit-inspired */}
          <div className="px-3">
            <p className="text-xs text-gray-500">
              Reddit-inspired navigation
            </p>
          </div>
        </nav>
      </aside>

      {/* Simple toggle button like Reddit's */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 -translate-y-1/2 z-40
        bg-[#1a1a1b] hover:bg-[#272729] 
        border border-gray-700 p-2.5 
        rounded-r-lg text-white
        transition-all duration-200 ease-in-out
        hover:border-gray-600
        ${isOpen ? "left-[13.5rem]" : "left-0 shadow-md"}`}
      >
        <div className="relative flex items-center">
          <FiMenu size={18} />
          {!isOpen && (
            <FiChevronRight 
              size={12} 
              className="ml-1 text-gray-400 animate-pulse"
            />
          )}
        </div>
        
        {/* Simple tooltip */}
        <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2
          bg-gray-900 text-white text-xs px-2 py-1 rounded
          whitespace-nowrap opacity-0 group-hover:opacity-100
          transition-opacity duration-150 pointer-events-none
          ${isOpen ? "hidden" : "block"}`}>
          Open menu
        </div>
      </button>

      {/* Minimal visual cue when closed */}
      {!isOpen && (
        <div className="fixed top-12 left-0 h-[calc(100vh-3rem)] w-1 z-20 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50"></div>
        </div>
      )}
    </>
  );
}