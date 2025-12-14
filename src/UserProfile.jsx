import React from 'react';

function UserProfile({ activeTab, setActiveTab }) {
  const tabs = [
    "Overview",
    "Posts",
    "Comments",
    "Saved",
    "History",
    "Hidden",
    "Upvoted",
    "Downvoted"
  ];

  return (
    <div className="profile-container">
      <div className="user-card">
        <img
          src="https://icon2.cleanpng.com/20180317/faw/kisspng-yooka-laylee-reddit-logo-clip-art-alien-peace-sign-5aacace9b64700.8647350015212658977466.jpg"
          alt="avatar"
          className="user-avatar"
        />
        <div className="user-info">
          <h2 className="username">User1</h2>
          <h2 className="user-id">u/id</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
