import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation.tsx';
import HomePage from './pages/HomePage.tsx';
import BlessingPage from './components/BlessingPage.tsx';
import BackgroundMusic from './components/BackgroundMusic.tsx';
import { blessings } from './data/blessings.ts';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Enhanced user interaction detection to enable audio
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        console.log('User interaction detected - audio should now be enabled');
      }
    };

    // Listen for any user interaction with more comprehensive events
    const events = ['click', 'touchstart', 'keydown', 'mousedown', 'scroll', 'focus', 'pointerdown', 'mouseenter'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Also try to enable audio when window gains focus
    const handleWindowFocus = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        console.log('Window focus detected - audio should now be enabled');
      }
    };
    window.addEventListener('focus', handleWindowFocus, { once: true });

    // Try to enable audio on page load after a short delay
    const timeoutId = setTimeout(() => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        console.log('Timeout reached - enabling audio');
      }
    }, 2000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      window.removeEventListener('focus', handleWindowFocus);
      clearTimeout(timeoutId);
    };
  }, [hasUserInteracted]);

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-lavender-50 to-peach-50">
        {/* Navigation Sidebar */}
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 overflow-auto">
          <Routes>
            {/* Home Route */}
            <Route 
              path="/" 
              element={<HomePage />} 
            />
            
            {/* Individual Blessing Routes */}
            {blessings.map((blessing) => (
              <Route
                path={`/day-${blessing.id}`}
                element={<BlessingPage blessing={blessing} />}
              />
            ))}
            
            {/* Redirect to home for any unmatched routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Background Music */}
        <BackgroundMusic />
      </div>
    </Router>
  );
}

export default App;
