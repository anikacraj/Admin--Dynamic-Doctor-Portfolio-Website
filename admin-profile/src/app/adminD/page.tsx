'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  'Verified Doctor',
  'Verify Doctor',
  'Block List',
  'Tamil Design',
  'Sign Out',
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Verified Doctor');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="md:flex hidden flex-col w-64 bg-blue-600 dark:bg-blue-800 p-6 space-y-4 shadow-md">
        <h2 className="text-2xl font-bold text-white mb-8">DR PORT.</h2>
        {menuItems.map((item) => (
          <motion.button
            key={item}
            onClick={() => setActiveMenu(item)}
            whileHover={{ scale: 1.03 }}
            className={clsx(
              'w-full text-left px-4 py-2 rounded-md transition',
              item === activeMenu
                ? 'bg-white text-blue-600 font-semibold'
                : 'text-white hover:bg-blue-500'
            )}
          >
            {item}
          </motion.button>
        ))}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 top-0 left-0 w-64 h-full bg-blue-600 dark:bg-blue-800 p-6 space-y-4 shadow-lg md:hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">DR PORT.</h2>
              <button onClick={toggleSidebar}>
                <X className="text-white" size={24} />
              </button>
            </div>
            {menuItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => {
                  setActiveMenu(item);
                  setSidebarOpen(false);
                }}
                whileHover={{ scale: 1.03 }}
                className={clsx(
                  'w-full text-left px-4 py-2 rounded-md transition',
                  item === activeMenu
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-white hover:bg-blue-500'
                )}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex justify-between items-center bg-blue-600 text-white p-4 shadow">
          <h2 className="text-xl font-bold">DR PORT.</h2>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h1 className="text-2xl font-bold mb-2">{activeMenu}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You clicked on <strong>{activeMenu}</strong>. This section adjusts beautifully on all devices.
            </p>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow-lg"
            >
              {activeMenu} Content
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
