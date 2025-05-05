"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "", phoneNumber: "", dob: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Login successful!");
        router.push(redirect); // ⬅️ Use the redirect value from query param
      } else {
        const msg = await res.text();
        alert(`Login failed: ${msg}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="input" />
      <input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required className="input" />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} required className="input" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="input" />

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-4">
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
