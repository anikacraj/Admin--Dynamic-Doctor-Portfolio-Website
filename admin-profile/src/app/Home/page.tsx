"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    
  const handleSignOut = async () => {
    try {
      await fetch("/api/admin-signout", { method: "POST" });
      router.push("/admin-ayw-login"); // or home page
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      {/* Header */}
      <header className="flex items-center justify-between sm:px-8 px-2 py-8 shadow-md bg-blue-600 dark:bg-blue-700 text-white ">
        <h1 className="sm:text-3xl text-xl font-bold">DR PORT.</h1>
        <nav className="space-x-4 text-sm md:text-base ">
          {/* <a href="#dashboard" className="hover:underline">Dashboard</a>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#signout" className="hover:underline">Sign Out</a> */}
   <Link href="/admin-ayw-login?redirect=/adminD" className="hover:underline">Dashboard</Link>
<Link href="/admin-ayw-login?redirect=/AdminAboutUs" className="hover:underline">About Us</Link>
<button onClick={handleSignOut} className="hover:underline">
      Sign Out
    </button>
        </nav>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-6 flex flex-col-reverse lg:flex-row  items-center justify-around sm:mt-[150px] mb-7 gap-10 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to the Admin Panel</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Here you can manage doctor profiles, view analytics, and control platform features efficiently.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition shadow-md">
            Manage Now
          </button>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <Image 
            src="/admin-illustration.png" 
            alt="Admin Illustration" 
            width={500} 
            height={400} 
            className="rounded-xl shadow-xl dark:shadow-blue-900"
          />
        </motion.div>
      </main>

      {/* Doctor Slider */}
      <section className="p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
        <h3 className="text-2xl font-bold mb-6 text-center">Top Level Doctors</h3>
        <div className="overflow-x-auto whitespace-nowrap flex gap-4 sm:justify-center px-2 pb-2 scrollbar-thin scrollbar-thumb-blue-500">
          {[1, 2, 3, 4, 5].map((doc) => (
            <motion.div
              key={doc}
        
              whileHover={{ scale: 1.05 }}
              className="min-w-[200px] bg-white dark:bg-gray-700 rounded-xl shadow-md dark:shadow-lg p-4 text-center transition"
            >
              <Image 
                src={`/doctor-${doc}.jpg`} 
                alt={`Doctor ${doc}`} 
                width={150} 
                height={150} 
                className="mx-auto rounded-full mb-3 border-4 border-blue-500"
              />
              <p className="font-semibold">Dr. Name {doc}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Specialist</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 dark:bg-blue-700 text-white p-4 text-center mt-4">
        &copy; {new Date().getFullYear()} DR PORT. All rights reserved.
      </footer>
    </div>
  );
}
