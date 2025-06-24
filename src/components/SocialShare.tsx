import React from "react";
import "../css/SocialShare.css";

const SocialShare: React.FC = () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Check out this awesome clicking game!");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="social-share-container">
      <h3>Share the game if you enjoyed :)</h3>

      <button
        className="social-share-button"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${pageUrl}&text=${text}`,
            "_blank",
            "width=550,height=420"
          )
        }
      >
        Twitter
      </button>

      <button
        className="social-share-button"
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
            "_blank",
            "width=550,height=420"
          )
        }
      >
        Facebook
      </button>

      <button className="social-share-button" onClick={copyToClipboard}>
        Copy Link
      </button>
    </div>
  );
};

export default SocialShare;
