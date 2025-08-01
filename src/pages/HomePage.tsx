import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-peach-50 to-pastel-blue animate-fade-in">
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full text-center">
          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-lavender-200">
            {/* Birthday Header */}
            <div className="mb-6 lg:mb-8">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🎉</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-lavender-800 mb-3 lg:mb-4">
                Happy Birthday Month
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-peach-600 mb-4 lg:mb-6">
                Mummy 💐
              </h2>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-br from-lavender-50 to-peach-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 mb-6 lg:mb-8 border border-lavender-200">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-lavender-800 mb-4 lg:mb-6">
                Welcome to your special birthday month! Each day brings a new blessing 
                and verse chosen with love for you.
              </p>
              <p className="text-base lg:text-lg text-lavender-700">
                Navigate through the days to discover beautiful messages of love, 
                hope, and blessings for your August birthday celebration.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white/70 rounded-xl p-4 lg:p-6 border border-lavender-200">
                <div className="text-2xl lg:text-3xl mb-3">📖</div>
                <h3 className="text-base lg:text-lg font-semibold text-lavender-800 mb-2">Daily Verses</h3>
                <p className="text-sm text-lavender-600">Beautiful Bible verses for each day</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4 lg:p-6 border border-lavender-200">
                <div className="text-2xl lg:text-3xl mb-3">💝</div>
                <h3 className="text-base lg:text-lg font-semibold text-lavender-800 mb-2">Special Blessings</h3>
                <p className="text-sm text-lavender-600">Heartfelt messages of love and care</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4 lg:p-6 border border-lavender-200 sm:col-span-2 lg:col-span-1">
                <div className="text-2xl lg:text-3xl mb-3">🌸</div>
                <h3 className="text-base lg:text-lg font-semibold text-lavender-800 mb-2">Beautiful Design</h3>
                <p className="text-sm text-lavender-600">Elegant and peaceful themes</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-peach-100 to-lavender-100 rounded-xl p-4 lg:p-6">
              <p className="text-sm lg:text-base text-lavender-700 font-medium">
                Use the navigation menu to explore your daily blessings! 
                Each day holds a special message just for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 