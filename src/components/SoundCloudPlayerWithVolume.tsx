import React, { useState, useRef, useEffect } from "react";
import "../css/SoundCloudPlayerWithVolume.css";

const SoundCloudPlayerWithVolume: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [volume, setVolume] = useState(25); // 0 to 100
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  const postMessageToPlayer = (command: object) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify(command), "*");
    }
  };

  // Volume control effect
  useEffect(() => {
    if (muted) {
      postMessageToPlayer({ method: "setVolume", value: 0 });
      console.log("Volume set to 0 (muted)");
    } else {
      console.log("Setting volume to:", volume / 100);
      postMessageToPlayer({ method: "setVolume", value: volume / 100 });
    }
  }, [volume, muted]);

  // Play/pause control handlers
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handlePause = () => {
    postMessageToPlayer({ method: "pause" });
    setPaused(true);
  };

  const handlePlay = () => {
    postMessageToPlayer({ method: "play" });
    setPaused(false);
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        width="0"
        height="0"
        style={{
          position: "fixed",
          left: "-9999px",
          top: "auto",
          border: "none",
          overflow: "hidden",
          width: 0,
          height: 0,
        }}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1788413202&color=%230d7ccd&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        title="Frutiger Aero SoundCloud Player"
      />

      <div className="sc-attribution">
        <a
          href="https://soundcloud.com/skeuoss"
          title="Skeuoss.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Skeuoss.net
        </a>{" "}
        ·{" "}
        <a
          href="https://soundcloud.com/skeuoss/sets/frutiger-aero-music-playlist"
          title="Frutiger Aero Music Playlist 🌐🐠🫧🍀 7 Hours of Pure Nostalgia, Comfort &amp; Happiness"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frutiger Aero Music Playlist 🌐🐠🫧🍀 7 Hours of Pure Nostalgia,
          Comfort &amp; Happiness
        </a>
      </div>

      <div className="volume-control">
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="mute-button"
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <input
          type="range"
          min={0}
          max={10000}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const val = Number(e.target.value);
            setVolume(val);
            if (muted && val > 0) setMuted(false);
          }}
          className="volume-slider"
        />

        {paused ? (
          <button onClick={handlePlay} className="play-pause-button">
            ▶️
          </button>
        ) : (
          <button onClick={handlePause} className="play-pause-button">
            ⏸️
          </button>
        )}
      </div>
    </>
  );
};

export default SoundCloudPlayerWithVolume;
