'use client'; // For Next.js App Router

import { motion } from 'framer-motion';
import React from 'react';

const AdminWelcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-extrabold mb-4"
        >
          Welcome, Admin!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-300"
        >
          You are now in control of the dashboard. Manage content, users, and more with ease.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AdminWelcome;
