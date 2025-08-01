import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationProps } from '../types';

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pages = [
    { id: 0, name: 'Home', date: 'Welcome', path: '/' },
    { id: 1, name: 'Day 1', date: 'August 1', path: '/day-1' },
    { id: 2, name: 'Day 2', date: 'August 2', path: '/day-2' },
    { id: 3, name: 'Day 3', date: 'August 3', path: '/day-3' },
    { id: 4, name: 'Day 4', date: 'August 4', path: '/day-4' },
    { id: 5, name: 'Day 5', date: 'August 5', path: '/day-5' },
    { id: 6, name: 'Day 6', date: 'August 6', path: '/day-6' },
    { id: 7, name: 'Day 7', date: 'August 7', path: '/day-7' },
    { id: 8, name: 'Day 8', date: 'August 8', path: '/day-8' },
    { id: 9, name: 'Day 9', date: 'August 9', path: '/day-9' },
  ];

  const handlePageClick = (pageId: number, path: string) => {
    onPageChange(pageId);
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-lavender-200 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6 text-lavender-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Navigation Sidebar */}
      <nav className={`fixed left-0 top-0 h-full bg-gradient-to-b from-lavender-50 to-peach-50 shadow-lg border-r border-lavender-200 z-50 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:w-64 w-80`}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-lavender-700 mb-2">Blessings for Mom</h2>
            <p className="text-sm text-lavender-600">Humari Pyaari Maa</p>
          </div>
          
          <div className="space-y-2 flex-1 overflow-y-auto">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id, page.path)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                  isActivePage(page.path)
                    ? 'bg-lavender-200 text-lavender-800 shadow-md'
                    : 'text-lavender-700 hover:bg-lavender-100'
                }`}
              >
                <div className="font-medium">{page.name}</div>
                <div className="text-xs opacity-75">{page.date}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-auto">
            <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <p className="text-xs text-lavender-600">
                With love, from your family 💝
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation; 