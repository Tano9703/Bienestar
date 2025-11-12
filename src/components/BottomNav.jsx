import React from 'react';
    import { NavLink } from 'react-router-dom';
    import { Home, MessageSquare, Calendar, User } from 'lucide-react';
    import { motion } from 'framer-motion';

    const navItems = [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Feed', path: '/feed', icon: MessageSquare },
      { name: 'Calendar', path: '/calendar', icon: Calendar },
      { name: 'Profile', path: '/profile', icon: User },
    ];

    const BottomNav = ({ isVisible }) => {
      return (
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-gray-200/80 lg:hidden z-40"
          initial={{ y: "100%" }}
          animate={{ y: isVisible ? "0%" : "100%" }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <nav className="flex justify-around items-center h-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center w-full h-full transition-colors ${
                      isActive ? 'text-brand-primary-blue' : 'text-brand-mid-gray'
                    }`
                  }
                >
                  <Icon className="h-6 w-6 mb-0.5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </motion.div>
      );
    };

    export default BottomNav;