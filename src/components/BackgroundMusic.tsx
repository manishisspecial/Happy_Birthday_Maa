import React, { useState, useEffect, useRef } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [hasAttemptedAutoPlay, setHasAttemptedAutoPlay] = useState(false);
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Aggressive auto-play strategy
  useEffect(() => {
    if (audioRef.current && !hasAttemptedAutoPlay) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      audioRef.current.muted = false;
      
      const attemptAutoPlay = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
          setHasAttemptedAutoPlay(true);
          setShowAutoPlayPrompt(false);
          console.log('Auto-play successful!');
        } catch (error) {
          console.log('Auto-play failed:', error);
          setHasAttemptedAutoPlay(true);
          // Don't show prompt immediately, wait a bit
          setTimeout(() => {
            if (!isPlaying) {
              setShowAutoPlayPrompt(true);
            }
          }, 2000);
        }
      };
      
      // Try immediately
      attemptAutoPlay();
      
      // Try after delays
      const delays = [500, 1000, 2000, 3000];
      delays.forEach(delay => {
        setTimeout(() => {
          if (!isPlaying && !hasAttemptedAutoPlay) {
            attemptAutoPlay();
          }
        }, delay);
      });
    }
  }, [volume, hasAttemptedAutoPlay, isPlaying]);

  // Global user interaction handler - this is the key part
  useEffect(() => {
    const handleAnyInteraction = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowAutoPlayPrompt(false);
          console.log('Music started on interaction!');
        } catch (error) {
          console.log('Playback failed on interaction:', error);
        }
      }
    };

    // Listen for ANY user interaction on the entire page
    const events = ['click', 'touchstart', 'keydown', 'mousedown', 'scroll', 'focus', 'pointerdown', 'mouseenter', 'mouseover'];
    events.forEach(event => {
      document.addEventListener(event, handleAnyInteraction, { once: false });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleAnyInteraction);
      });
    };
  }, [isPlaying]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowAutoPlayPrompt(false);
    };
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
        autoPlay
      />
      
      {/* Auto-play prompt - less intrusive */}
      {showAutoPlayPrompt && !isPlaying && (
        <div className="fixed bottom-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-lavender-200 max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎵</div>
            <div className="flex-1">
              <p className="text-sm text-lavender-800 font-medium">Background Music Ready</p>
              <p className="text-xs text-lavender-600">Click anywhere to start</p>
            </div>
            <button
              onClick={togglePlay}
              className="px-3 py-1 bg-gradient-to-r from-lavender-200 to-peach-200 hover:from-lavender-300 hover:to-peach-300 rounded-lg text-xs font-medium text-lavender-800 transition-all duration-200"
            >
              Play
            </button>
          </div>
        </div>
      )}
      
      {/* Music Control Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-200 ${
          isPlaying 
            ? 'bg-green-200 hover:bg-green-300' 
            : hasAttemptedAutoPlay 
              ? 'bg-yellow-200 hover:bg-yellow-300'
              : 'bg-lavender-200 hover:bg-lavender-300'
        }`}
        title={isPlaying ? "Music is playing" : hasAttemptedAutoPlay ? "Click to play music" : "Loading music..."}
      >
        <svg className={`w-6 h-6 ${
          isPlaying 
            ? 'text-green-700' 
            : hasAttemptedAutoPlay 
              ? 'text-yellow-700'
              : 'text-lavender-700'
        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        {!isPlaying && !hasAttemptedAutoPlay && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Music Controls Panel */}
      {showControls && (
        <div className="fixed top-16 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-lavender-200 min-w-64">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-lavender-800 mb-1">Background Music</h3>
              <p className="text-sm text-lavender-600">Tu Kitni Achhi Hai</p>
            </div>

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

            <div className="text-xs text-lavender-600 text-center bg-lavender-50 rounded-lg p-2">
              {isPlaying ? (
                <span>🎵 Music is playing in the background</span>
              ) : hasAttemptedAutoPlay ? (
                <span>💡 Click anywhere on the page to start music</span>
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