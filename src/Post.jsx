import React from "react";


function Post({ title }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <span className="community-name">r/Community</span>
        <span className="post-date">• 2h ago</span>
      </div>

      <h3 className="post-title">{title}</h3>
      <p className="post-body">Dummy post body content for now.</p>

      <div className="post-actions">
        <button>⬆ Upvote</button>
        <button>⬇ Downvote</button>
        <button>💬 Comment</button>
        <button>↗ Share</button>
      </div>
    </div>
  );
}

export default Post;
