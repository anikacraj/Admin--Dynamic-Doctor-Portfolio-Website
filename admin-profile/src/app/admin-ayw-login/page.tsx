"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

export default function AdminLogin() {
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    phoneNumber: "", 
    dob: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/adminD";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Basic client-side validation
      if (!form.email || !form.password || !form.phoneNumber || !form.dob) {
        alert("Please fill in all fields");
        return;
      }
  
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setCookie("auth-token", data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });
        router.push(redirect);
      } else {
        // Show specific error messages
        const errorMessage = data.message || "Login failed. Please check your credentials.";
        alert(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

// Add this useEffect to show validation errors
useEffect(() => {
  const checkFormValidity = () => {
    const isValid = (
      form.email.trim() !== '' &&
      form.password.trim() !== '' &&
      form.phoneNumber.trim() !== '' &&
      form.dob.trim() !== ''
    );
    return isValid;
  };

  if (isSubmitting && !checkFormValidity()) {
    alert("Please fill in all required fields");
    setIsSubmitting(false);
  }
}, [isSubmitting, form]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}