import React from 'react';
import { BlessingPage as BlessingPageType } from '../types';

interface BlessingPageProps {
  blessing: BlessingPageType;
}

const BlessingPage: React.FC<BlessingPageProps> = ({ blessing }) => {
  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in`}
      style={{
        background: blessing.background
      }}
    >
      <div className="max-w-4xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-lavender-200">
          {/* Date Header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="inline-block bg-gradient-to-r from-lavender-100 to-peach-100 px-4 sm:px-6 py-2 rounded-full">
              <span className="text-sm lg:text-base text-lavender-700 font-medium">{blessing.date}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-lavender-800 mb-6 lg:mb-8">
            {blessing.title}
          </h1>

          {/* Verse Card */}
          <div className="bg-gradient-to-br from-lavender-50 to-peach-50 rounded-lg lg:rounded-xl p-6 sm:p-8 lg:p-12 mb-6 lg:mb-8 border border-lavender-200">
            <div className="text-center space-y-6">
              {/* English Verse */}
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6 text-lavender-300">"</div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed text-lavender-800 font-medium mb-4 lg:mb-6">
                  {blessing.verse}
                </p>
                <div className="text-4xl sm:text-5xl lg:text-6xl text-lavender-300">"</div>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-px bg-lavender-300"></div>
                <span className="px-4 text-lavender-500 text-sm font-medium">हिंदी में</span>
                <div className="w-16 h-px bg-lavender-300"></div>
              </div>

              {/* Hindi Verse */}
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6 text-lavender-300">"</div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed text-lavender-800 font-medium mb-4 lg:mb-6">
                  {blessing.verseHindi}
                </p>
                <div className="text-4xl sm:text-5xl lg:text-6xl text-lavender-300">"</div>
              </div>
            </div>
          </div>

          {/* Reference */}
          <div className="text-center">
            <p className="text-base lg:text-lg text-lavender-600 font-medium">
              {blessing.reference}
            </p>
          </div>

          {/* Theme indicator */}
          <div className="mt-6 lg:mt-8 text-center">
            <span className="inline-block bg-lavender-200 text-lavender-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              {blessing.theme}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlessingPage; 