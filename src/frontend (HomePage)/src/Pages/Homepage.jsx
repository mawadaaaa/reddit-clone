import { useState } from "react";
import Header from "../components/Header";
import PrimarySidebar from "../components/PrimarySidebar";
import Post from "../components/Post";
import SortingControls from "../components/SortingControls";

export default function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFeed, setActiveFeed] = useState("Home");

  return (
    <>
      <Header />

      <div className="pt-16 bg-[#0a0a0a] min-h-screen text-white">
        <PrimarySidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          active={activeFeed}
          setActive={setActiveFeed}
        />

        <main
          className="transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? "14rem" : "3.5rem" }}
        >
          {/* Sorting Controls */}
          <SortingControls />
          
          {/* Posts Container - Same width as controls */}
          <div className="w-full px-4">
            <div className="max-w-[640px] mx-auto py-4">
              <div className="space-y-4">
                <Post
                  title="Reddit's Sorting Algorithm: How 'Best' Actually Works"
                  author="alex_tech"
                  subreddit="programming"
                  content="The 'Best' sort uses Wilson score confidence intervals, not just upvote counts."
                  timestamp="2h ago"
                />

                <Post
                  title="Why React's New Concurrent Features Are a Game Changer"
                  author="react_wizard"
                  subreddit="webdev"
                  image="https://picsum.photos/800/450"
                  timestamp="5h ago"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}