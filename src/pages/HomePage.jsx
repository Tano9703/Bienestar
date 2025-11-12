import React from 'react';
    import { motion } from 'framer-motion';
    import LeftSidebar from '@/components/LeftSidebar';
    import CommunityFeed from '@/components/CommunityFeed';
    import RightSidebar from '@/components/RightSidebar';
    import Seo from '@/components/Seo';

    const HomePage = () => {
      return (
        <>
          <Seo
            title="Comunidad"
            description="Bienvenido al feed de la comunidad de CrossLearning. Conecta, comparte y aprende con tus compañeros."
            path="/"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <motion.aside 
              className="hidden lg:block lg:col-span-3 sticky top-24"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LeftSidebar />
            </motion.aside>

            <motion.main 
              className="col-span-1 lg:col-span-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CommunityFeed />
            </motion.main>

            <motion.aside 
              className="hidden lg:block lg:col-span-3 sticky top-24"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RightSidebar />
            </motion.aside>
          </div>
        </>
      );
    };

    export default HomePage;