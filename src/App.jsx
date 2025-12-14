import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileHeader from "./ProfileHeader.jsx";
import Sidebar from './Sidebar.jsx';
import UserProfile from './UserProfile.jsx';
import RightSidebar from './StatsSidebar.jsx';
import StatsSidebar from './StatsSidebar.jsx';
import Post from './Post.jsx';


function App() {
 const [activeTab, setActiveTab] = useState("Overview");

  // Fake posts per tab
  const postsData = {
    Overview: ["Post A", "Post B", "Post C"],
    Posts: ["My Post 1", "My Post 2"],
    Comments: ["Comment Post 1", "Comment Post 2"],
    Saved: ["Saved Post 1"],
    History: ["History Post 1", "History Post 2"],
    Hidden: ["Hidden Post 1", "Hidden Post 2", "Hidden Post 3"],
    Upvoted: ["Upvoted Post 1"],
    Downvoted: ["Downvoted Post 1"]
  };

  return (
    <div>
      <ProfileHeader />

      <div className="main-content">
        <Sidebar />

        <div className="middle-content">
          {/* Pass state to UserProfile */}
          <UserProfile activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Render posts based on active tab */}
          {postsData[activeTab].map((title, index) => (
            <Post key={index} title={title} />
          ))}
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}

export default App
