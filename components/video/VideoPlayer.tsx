import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;  // Source URL of the video
  poster?: string;  // Optional poster image for the video
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // videoRef.current.muted = false; // Unmute the video
        videoRef.current.currentTime = 0; // Start from the beginning
        videoRef.current.play();
      } else {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }

      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={false}
        autoPlay={true}
        onClick={toggleVideoPlayback}
        width="100%"
      />
      { !isPlaying && (
        <div
      /*
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'lemongreen',
            borderRadius: '50%',
            padding: '20px',
          }}
        */
          onClick={toggleVideoPlayback}
        >
          {/* ▶️ */}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
