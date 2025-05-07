'use client';

import { useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  blockedUntil?: string;
};

export default function BlockList() {
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlockedUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blocked-users');
      const data = await res.json();
      setBlockedUsers(data.users);
    } catch (err) {
      console.error('Failed to fetch blocked users', err);
    }
    setLoading(false);
  };

  const handleUnblock = async (userId: string) => {
    try {
      const res = await fetch('/api/admin/block-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, blocked: false }),
      });

      const data = await res.json();
      if (data.success) {
        alert('User unblocked');
        fetchBlockedUsers(); // Refresh list
      }
    } catch (err) {
      console.error(err);
      alert('Failed to unblock user');
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  if (loading) return <p className="text-gray-500">Loading blocked users...</p>;
  if (blockedUsers.length === 0) return <p className="text-gray-500">No blocked users.</p>;

  return (
    <div className="space-y-4">
      {blockedUsers.map((user) => (
        <div
          key={user._id}
          className="border rounded p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-700"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-sm text-red-500">
              Blocked Until: {new Date(user.blockedUntil || '').toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => handleUnblock(user._id)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Unblock
          </button>
        </div>
      ))}
    </div>
  );
}
