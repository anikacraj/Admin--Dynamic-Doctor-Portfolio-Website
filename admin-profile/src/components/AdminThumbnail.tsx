'use client';

import { useState, ChangeEvent, useEffect } from 'react';

export default function AdminThumbnail() {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchThumbnail = async () => {
      const res = await fetch(`/api/admin/upload-thumbnail`);
      const data = await res.json();
      if (data.success) {
        setThumbnails(data.thumbnail || []);
      }
    };

    fetchThumbnail();
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setUploading(true);

      const res = await fetch('/api/admin/upload-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thumbnail: base64 }),
      });

      setUploading(false);

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Unknown error' }));
        alert(error.message || 'Failed to upload');
        return;
      }

      const data = await res.json();
      setThumbnails(data.admin.thumbnail || []);
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = async (index: number) => {
    const newThumbnails = thumbnails.filter((_, i) => i !== index);

    const res = await fetch('/api/admin/upload-thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ thumbnail: newThumbnails }),
    });

    if (res.ok) {
      setThumbnails(newThumbnails);
    } else {
      alert('Failed to delete thumbnail');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Admin Thumbnail</h2>

      {thumbnails.length > 0 ? (
        <div className="space-y-2">
          {thumbnails.map((img, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={img} alt={`Thumbnail ${index}`} className="w-40 h-40 object-cover rounded shadow" />
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No thumbnails uploaded.</p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {uploading && <p className="text-blue-500">Uploading...</p>}
    </div>
  );
}
