import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, icon, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="service-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1e3a5f]">{title}</h3>
    </motion.div>
  );
};

export default ServiceCard;