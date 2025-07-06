'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-600 pt-2 pb-2  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold">
            <Link href="/">AdminPanel</Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-[300px] ">
            <Link href="/Home" className="hover:text-blue-400 text-2xl">Home</Link>
   
            <Link href="/adminHome" className="hover:text-blue-400 text-2xl">Users</Link>
            
           
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
       <Link href="/Home" className="hover:text-blue-400">Home</Link>
   
            <Link href="/adminHome" className="hover:text-blue-400">Users</Link>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
