'use client';

import { useState } from 'react';

export default function RoastingForm() {
  const [username, setUsername] = useState('');
  const [model, setModel] = useState('geminiai');
  const [roasting, setRoasting] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/roasting-instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: username, model }),
      });
      const data = await response.json();
      setRoasting(data.roasting);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
        {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
                        <p className="mb-4">Hanya sekedar Hiburan!! Jangan dibawa Hati!</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowModal(false)}
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Instagram username"
          className="w-full p-2 border rounded"
        />
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="geminiai">Gemini AI</option>
          <option value="groqai">Groq AI</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Roast'}
        </button>
      </form>
      {roasting && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Roasting Result:</h2>
          <p>{roasting}</p>
        </div>
      )}
    </div>
  );
}