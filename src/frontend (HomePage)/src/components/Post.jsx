import { useState, useRef, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare } from "react-icons/fa";
import { FiMoreHorizontal, FiBookmark, FiEyeOff, FiFlag } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";

// Default example post data for development
const DEFAULT_POSTS = [
  {
    id: 1,
    title: "This is an example post",
    author: "example_user",
    subreddit: "webdev",
    content: "This is example content for development purposes. Replace with real data from your backend.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    timestamp: "4h ago",
    upvotes: 42,
    comments: 12,
  },
  {
    id: 2,
    title: "Another example post",
    author: "another_user",
    subreddit: "reactjs",
    content: "Example content showing how props will work with backend data.",
    image: null,
    timestamp: "6h ago",
    upvotes: 128,
    comments: 24,
  }
];

export default function Post({
  // Main post data props
  postId,
  title,
  author,
  subreddit,
  content,
  image,
  timestamp = "Just now",
  upvotes = 0,
  comments = 0,
  
  // Optional props for backend integration
  onVote,         // Function to handle voting (postId, voteType)
  onComment,      // Function to handle comment click
  onShare,        // Function to handle sharing
  onSave,         // Function to save post
  onReport,       // Function to report post
  onFollow,       // Function to follow post
  onHide,         // Function to hide post
  
  // For development/testing
  useExample = false,
  exampleIndex = 0,
}) {
  // If useExample is true, use default data for development
  const postData = useExample 
    ? DEFAULT_POSTS[exampleIndex % DEFAULT_POSTS.length] 
    : {
        postId,
        title,
        author,
        subreddit,
        content,
        image,
        timestamp,
        upvotes,
        comments,
      };

  // State for UI interactions
  const [localVote, setLocalVote] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const menuRef = useRef(null);
  const shareRef = useRef(null);

  // Calculate total votes (upvotes - downvotes) with local adjustment
  const calculateTotalVotes = () => {
    const baseVotes = postData.upvotes || 0;
    return baseVotes + localVote;
  };

  const handleUpvote = () => {
    const newVote = localVote === 1 ? 0 : 1;
    setLocalVote(newVote);
    
    // If backend integration callback is provided
    if (onVote) {
      onVote(postData.postId, newVote === 1 ? 'upvote' : 'remove_vote');
    }
  };

  const handleDownvote = () => {
    const newVote = localVote === -1 ? 0 : -1;
    setLocalVote(newVote);
    
    // If backend integration callback is provided
    if (onVote) {
      onVote(postData.postId, newVote === -1 ? 'downvote' : 'remove_vote');
    }
  };

  const handleCommentClick = () => {
    console.log(`Opening comments for post ${postData.postId}`);
    if (onComment) {
      onComment(postData.postId);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postData.title,
        text: postData.content || postData.title,
        url: window.location.href,
      }).then(() => {
        if (onShare) {
          onShare(postData.postId, 'native_share');
        }
      });
    } else {
      // Fallback: toggle share options
      setShowShareOptions(!showShareOptions);
    }
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    
    if (onSave) {
      onSave(postData.postId, newSavedState);
    } else {
      console.log(`${newSavedState ? 'Saving' : 'Unsaving'} post ${postData.postId}`);
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport(postData.postId);
    } else {
      console.log(`Reporting post ${postData.postId}`);
    }
    setShowMenu(false);
  };

  const handleFollow = () => {
    const newFollowState = !isFollowed;
    setIsFollowed(newFollowState);
    
    if (onFollow) {
      onFollow(postData.postId, newFollowState);
    } else {
      console.log(`${newFollowState ? 'Following' : 'Unfollowing'} post ${postData.postId}`);
    }
    setShowMenu(false);
  };

  const handleHide = () => {
    if (onHide) {
      onHide(postData.postId);
    } else {
      console.log(`Hiding post ${postData.postId}`);
    }
    setShowMenu(false);
  };

  const shareOptions = [
    { 
      text: "Copy Link", 
      action: () => copyToClipboard() 
    },
    { 
      text: "Share via Reddit", 
      action: () => {
        console.log("Share via Reddit");
        if (onShare) onShare(postData.postId, 'reddit');
      }
    },
    { 
      text: "Share via Twitter", 
      action: () => {
        console.log("Share via Twitter");
        if (onShare) onShare(postData.postId, 'twitter');
      }
    },
    { 
      text: "Share via Facebook", 
      action: () => {
        console.log("Share via Facebook");
        if (onShare) onShare(postData.postId, 'facebook');
      }
    },
    { 
      text: "Share via Email", 
      action: () => {
        console.log("Share via Email");
        if (onShare) onShare(postData.postId, 'email');
      }
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("Link copied to clipboard!");
      setShowShareOptions(false);
      if (onShare) onShare(postData.postId, 'copy_link');
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuOptions = [
    {
      text: isFollowed ? "Unfollow post" : "Follow post",
      icon: <MdNotifications size={16} />,
      action: handleFollow,
      color: "text-gray-300 hover:text-white",
    },
    {
      text: "Show fewer posts like this",
      icon: <FiEyeOff size={16} />,
      action: () => console.log("Showing fewer posts"),
      color: "text-gray-300 hover:text-white",
    },
    {
      text: isSaved ? "Unsave" : "Save",
      icon: <FiBookmark size={16} />,
      action: handleSave,
      color: "text-gray-300 hover:text-white",
    },
    {
      text: "Hide",
      icon: <FiEyeOff size={16} />,
      action: handleHide,
      color: "text-gray-300 hover:text-white",
    },
    {
      text: "Report",
      icon: <FiFlag size={16} />,
      action: handleReport,
      color: "text-red-500 hover:text-red-400",
    },
  ];

  return (
    <div className="bg-[#1a1a1b] border border-gray-700 rounded-md p-4 text-white relative">
      {/* Development indicator (only shows when using examples) */}
      {useExample && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold z-10">
          DEV EXAMPLE
        </div>
      )}
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${postData.subreddit}`}
            className="w-7 h-7 rounded-full"
            alt={`r/${postData.subreddit}`}
          />

          <div className="text-xs text-gray-400">
            <span className="font-semibold text-gray-200">r/{postData.subreddit}</span>
            <span className="mx-1">•</span>
            <span>u/{postData.author}</span>
            <span className="mx-1">•</span>
            <span>{postData.timestamp}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Join
          </button>
          <div className="relative" ref={menuRef}>
            <FiMoreHorizontal 
              className="text-gray-400 cursor-pointer hover:text-gray-200"
              onClick={() => setShowMenu(!showMenu)}
            />
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-[#1a1a1b] border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
                {menuOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      if (option.text !== "Show fewer posts like this") {
                        setShowMenu(false);
                      }
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm
                      hover:bg-[#272729] transition-colors duration-150
                      ${option.color}`}
                  >
                    <span className="text-gray-400">{option.icon}</span>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{postData.title}</h3>

      {/* Text */}
      {postData.content && (
        <p className="text-sm text-gray-300 mb-3">{postData.content}</p>
      )}

      {/* Image */}
      {postData.image && (
        <img
          src={postData.image}
          className="rounded-md max-h-[500px] object-cover mb-3"
          alt="post"
        />
      )}

      {/* Footer */}
      <div className="flex items-center gap-6 text-sm text-gray-400">

        {/* Voting */}
        <div className="flex items-center gap-2">
          <FaArrowUp
            onClick={handleUpvote}
            className={`cursor-pointer ${
              localVote === 1 ? "text-orange-500" : "hover:text-orange-400"
            }`}
          />

          <span
            className={`font-semibold min-w-[20px] text-center ${
              localVote === 1
                ? "text-orange-500"
                : localVote === -1
                ? "text-blue-500"
                : ""
            }`}
          >
            {calculateTotalVotes()}
          </span>

          <FaArrowDown
            onClick={handleDownvote}
            className={`cursor-pointer ${
              localVote === -1 ? "text-blue-500" : "hover:text-blue-400"
            }`}
          />
        </div>

        {/* Comments */}
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
          onClick={handleCommentClick}
        >
          <FaRegComment />
          <span>{postData.comments} Comments</span>
        </div>

        {/* Share Button */}
        <div className="relative" ref={shareRef}>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
            onClick={handleShare}
          >
            <FaShare />
            <span>Share</span>
          </div>
          
          {/* Share Options Dropdown */}
          {showShareOptions && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-[#1a1a1b] border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#272729] transition-colors duration-150 hover:text-white"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* More options (three dots) in footer - only visible on mobile if needed */}
        <div className="md:hidden flex items-center gap-2 cursor-pointer hover:text-gray-200">
          <FiMoreHorizontal />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}