'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  
phoneNo:string;
  profilePhoto:string;
};

export default function VerifiedDoctor() {
  const [VerifiedDoctor, setVerifiedDoctor] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVerifiedDoctor = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/get-verified');
      const data = await res.json();
  
      if (Array.isArray(data.users)) {
        setVerifiedDoctor(data.users);
      } else {
        console.error('Invalid response format:', data);
        setVerifiedDoctor([]); // fallback to empty array
      }
    } catch (err) {
      console.error('Failed to fetch VerifiedDoctor users', err);
      setVerifiedDoctor([]); // fallback in case of error
    }
    setLoading(false);
  };



  useEffect(() => {
    fetchVerifiedDoctor();
  }, []);

  if (loading) return <p className="text-gray-500">Loading Verified doctor ...</p>;
  if (!Array.isArray(VerifiedDoctor) || VerifiedDoctor.length === 0) {
    return <p className="text-gray-500">No Verified doctors</p>;
  }

  return (
    <div className="space-y-4">
      {VerifiedDoctor.map((user) => (
        <div
          key={user._id}
          className="border rounded p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-700"
        >
<div>
  <p className="font-semibold flex items-center gap-2">
    {user.name}
    <span className="relative group inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 via-sky-400 to-blue-600 shadow-md cursor-pointer">
      <ShieldCheck className="w-3.5 h-3.5 text-white" />
      <span className="absolute bottom-full mb-2 hidden group-hover:flex text-xs text-white bg-gray-900 px-2 py-1 rounded shadow-lg whitespace-nowrap">
        Verified Medical Professional
      </span>
    </span>
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
  <div>{user.phoneNo}</div>
</div>
      
        </div>
      ))}
    </div>
  );
}
