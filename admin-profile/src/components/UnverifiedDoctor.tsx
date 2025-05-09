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

export default function UnVerifiedDoctor() {
  const [UnVerifiedDoctor, setUnVerifiedDoctor] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVerifiedDoctor = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/unverified-users');
      const data = await res.json();
  
      if (Array.isArray(data.users)) {
        setUnVerifiedDoctor(data.users);
      } else {
        console.error('Invalid response format:', data);
        setUnVerifiedDoctor([]); // fallback to empty array
      }
    } catch (err) {
      console.error('Failed to fetch VerifiedDoctor users', err);
      setUnVerifiedDoctor([]); // fallback in case of error
    }
    setLoading(false);
  };



  useEffect(() => {
    fetchVerifiedDoctor();
  }, []);

  if (loading) return <p className="text-gray-500">Loading Verified doctor ...</p>;
  if (!Array.isArray(UnVerifiedDoctor) || UnVerifiedDoctor.length === 0) {
    return <p className="text-gray-500">No Verified doctors</p>;
  }

  return (
    <div className="space-y-4">
      {UnVerifiedDoctor.map((user) => (
        <div
          key={user._id}
          className="border rounded p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-700"
        >
<div>
  <p className="font-semibold flex items-center gap-2">
    {user.name}
  
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
  <div>{user.phoneNo}</div>
</div>
      
        </div>
      ))}
    </div>
  );
}
