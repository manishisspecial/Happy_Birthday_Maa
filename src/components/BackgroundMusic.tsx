import React, { useState, useEffect, useRef } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [hasAttemptedAutoPlay, setHasAttemptedAutoPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play on component mount
  useEffect(() => {
    if (audioRef.current && !hasAttemptedAutoPlay) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      
      // Try to auto-play immediately
      const attemptAutoPlay = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
          setHasAttemptedAutoPlay(true);
        } catch (error) {
          console.log('Auto-play prevented. Waiting for user interaction...');
          setHasAttemptedAutoPlay(true);
        }
      };
      
      attemptAutoPlay();
    }
  }, [volume, hasAttemptedAutoPlay]);

  // Listen for user interaction to enable auto-play
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (audioRef.current && !isPlaying && hasAttemptedAutoPlay) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Playback failed on user interaction:', error);
        }
      }
    };

    // Add event listeners for user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isPlaying, hasAttemptedAutoPlay]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Playback failed:', error);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/Tu Kitni Achhi Hai - Raja Aur Runk 128 Kbps.mp3"
        preload="auto"
      />
      
      {/* Music Control Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed top-4 right-4 z-50 p-3 bg-lavender-200 hover:bg-lavender-300 rounded-full shadow-lg transition-all duration-200"
        title="Music Controls"
      >
        <svg className="w-6 h-6 text-lavender-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </button>

      {/* Music Controls Panel */}
      {showControls && (
        <div className="fixed top-16 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-lavender-200 min-w-64">
          <div className="space-y-4">
            {/* Title */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-lavender-800 mb-1">Background Music</h3>
              <p className="text-sm text-lavender-600">Tu Kitni Achhi Hai</p>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-full py-3 px-4 bg-gradient-to-r from-lavender-200 to-peach-200 hover:from-lavender-300 hover:to-peach-300 rounded-lg font-medium text-lavender-800 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isPlaying ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-lavender-700">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-lavender-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-lavender-600">
                <span>0%</span>
                <span>{Math.round(volume * 100)}%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Status Note */}
            <div className="text-xs text-lavender-600 text-center bg-lavender-50 rounded-lg p-2">
              {isPlaying ? (
                <span>🎵 Music is playing in the background</span>
              ) : hasAttemptedAutoPlay ? (
                <span>💡 Click play to start the beautiful background music</span>
              ) : (
                <span>⏳ Loading music...</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic; 