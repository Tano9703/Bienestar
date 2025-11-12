import React, { useState } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Menu, X } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const menuItems = [
      { name: 'Wellness Log', path: '/wellness-log' },
      { name: 'Mentor Network', path: '/mentor-network' },
      { name: 'Pre-Onboarding', path: '/pre-onboarding' },
      { name: 'Onboarding', path: '/onboarding' },
    ];

    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const drawerVariants = {
        hidden: { x: '-100%' },
        visible: { x: '0%', transition: { type: 'tween', duration: 0.3 } },
        exit: { x: '-100%', transition: { type: 'tween', duration: 0.3 } },
      };

      return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                  <Menu className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img
                    className="h-10 w-auto"
                    src="https://horizons-cdn.hostinger.com/0e1f7dd3-06a3-49ec-a3f5-eb9a3a70d9a6/f37727e20374c5671d0f7193f8b3d12a.png"
                    alt="CrossLearning — Smart Learning & Agile Talent Development Ecosystem"
                  />
                </Link>
              </div>

              <nav className="hidden lg:flex lg:space-x-4">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-primary-blue/10 text-brand-primary-blue'
                          : 'text-brand-charcoal hover:bg-gray-200/70'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                  className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 lg:hidden"
                  variants={drawerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                       <Link to="/" onClick={() => setIsMenuOpen(false)}>
                          <img
                            className="h-10 w-auto"
                            src="https://horizons-cdn.hostinger.com/0e1f7dd3-06a3-49ec-a3f5-eb9a3a70d9a6/f37727e20374c5671d0f7193f8b3d12a.png"
                            alt="CrossLearning — Smart Learning & Agile Talent Development Ecosystem"
                          />
                        </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                    <nav className="flex flex-col space-y-2">
                      {menuItems.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                              isActive
                                ? 'bg-brand-primary-blue/10 text-brand-primary-blue'
                                : 'text-brand-charcoal hover:bg-gray-200/70'
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </header>
      );
    };

    export default Header;