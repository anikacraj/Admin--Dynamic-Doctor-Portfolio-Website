"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function AdminRegister() {
  const [form, setForm] = useState({
    role: "",
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select a role.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin-x98p9v1k", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Registration successful. Check your email to verify your account.");
        setForm({ role: "", name: "", email: "", phoneNumber: "", dob: "", password: "" });
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] flex items-center justify-center p-4">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Admin Register
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="" disabled>Select a role</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <InputField name="name" label="Name" type="text" value={form.name} onChange={handleChange} />
          <InputField name="email" label="Email" type="email" value={form.email} onChange={handleChange} />
          <InputField name="phoneNumber" label="Phone Number" type="tel" value={form.phoneNumber} onChange={handleChange} />
          <InputField name="dob" label="Date of Birth" type="date" value={form.dob} onChange={handleChange} />
          <InputField name="password" label="Password" type="password" value={form.password} onChange={handleChange} />

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 text-white rounded-lg font-semibold shadow-lg transition ${
              isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </motion.button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <Link href="/admin/login" className="hover:text-blue-500 transition">Already have an account?</Link>
          <Link href="/admin/forgot-password" className="hover:text-blue-500 transition">Forgot Password?</Link>
        </div>
      </motion.div>
    </div>
  );
}

type InputProps = {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ name, label, type, value, onChange }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
  );
}
