import { useRef, useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ width = "100%", height = "100", url }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  function handlePlayandPause() {
    setPlaying(!playing);
  }

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out
    ${isFullScreen ? "w-screen h-screen" : ""}
    `}
      style={{ width, height }}
    ></div>
  );
}

export default VideoPlayer;
