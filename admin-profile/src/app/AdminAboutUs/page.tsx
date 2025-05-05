'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AdminAboutUs from '../AdminInputAboutUs/page';

export default function AboutAdminPage() {
  return (
  <div>
      <motion.section
      className="min-h-screen w-full px-6 py-20 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Dr Port – Admin Panel
        </motion.h1>

        <motion.p
          className="text-lg leading-relaxed text-center text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to the Admin Dashboard of <span className="font-semibold text-blue-600 dark:text-blue-400">Dr Port</span> – a platform built to empower doctors with personalized online portfolios, seamless appointment management, and patient engagement.
        </motion.p>

        <div className="space-y-6">
          <motion.div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-2">🌟 Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To simplify digital identity creation for doctors, making it easy to showcase their qualifications, experience, and services online, while maintaining full control over their data.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-2">🛠 What We Offer</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Doctor portfolio creation with full customization.</li>
              <li>Secure login & email verification system.</li>
              <li>Admin-level moderation of all users.</li>
              <li>Live profile editing, photo gallery, and contact form integration.</li>
              <li>Real-time updates and clean user interface.</li>
            </ul>
          </motion.div>

          <motion.div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-2">🔐 Admin Privileges</h2>
            <p className="text-gray-700 dark:text-gray-300">
              As an admin, you are entrusted with full access to all user data, portfolio visibility controls, verification requests, content moderation, and security management.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-2">🚀 Vision for the Future</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Dr Port is designed to grow – we plan to integrate AI-based diagnosis tools, patient-doctor messaging, and appointment scheduling in future versions. Admins will be key to scaling and securing the platform as we evolve.
            </p>
          </motion.div>

          <motion.div
            className="text-center pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Need help or support? Contact our admin team at: <br />
              <span className="text-blue-600 dark:text-blue-400 font-medium">admin@drport.io</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>

    <AdminAboutUs />
  </div>

  );
}

