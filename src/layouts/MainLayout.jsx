import React, { useState, useEffect } from 'react';
    import { Outlet } from 'react-router-dom';
    import Header from '@/components/Header';
    import BottomNav from '@/components/BottomNav';

    export default function MainLayout() {
      const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
      const [lastScrollY, setLastScrollY] = useState(0);

      useEffect(() => {
        const controlNavbar = () => {
          if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY && window.scrollY > 100) { 
              setIsBottomNavVisible(false);
            } else {
              setIsBottomNavVisible(true);
            }
            setLastScrollY(window.scrollY);
          }
        };

        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', controlNavbar);
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          };
        }
      }, [lastScrollY]);

      return (
        <div className="min-h-screen flex flex-col bg-brand-light-gray">
          <Header />
          <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </main>
          <BottomNav isVisible={isBottomNavVisible} />
        </div>
      );
    }