import React, { useState, useRef, useEffect } from "react";
import "../css/SoundCloudPlayerWithVolume.css";

const SoundCloudPlayerWithVolume: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [volume, setVolume] = useState(25);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  const postMessageToPlayer = (command: object) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify(command), "*");
    }
  };

  useEffect(() => {
    if (muted) {
      postMessageToPlayer({ method: "setVolume", value: 0 });
      console.log("Volume set to 0 (muted)");
    } else {
      console.log("Setting volume to:", volume / 1);
      postMessageToPlayer({ method: "setVolume", value: volume / 1 });
    }
  }, [volume, muted]);

  const toggleMute = () => setMuted((prev) => !prev);

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
          border: "none",
          width: 0,
          height: 0,
        }}
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1788413202&color=%230d7ccd&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        title="SoundCloud Player"
      />

      {/* Removed toggle button */}

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
          max={100}
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
