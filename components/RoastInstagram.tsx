"use client";

import React, { useState } from 'react';
import axios from 'axios';

const InstagramRoaster: React.FC = () => {
    const [query, setQuery] = useState('');
    const [model, setModel] = useState('geminiai');
    const [roasting, setRoasting] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRoasting = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://roasting-instagram-api.vercel.app/roasting-instagram', {
                query,
                model,
            });
            setRoasting(response.data.roasting);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Instagram Roaster</h1>
            <input
                type="text"
                className="border p-2 w-full mb-4"
                placeholder="Enter Instagram Username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select
                className="border p-2 w-full mb-4"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            >
                <option value="geminiai">Gemini AI</option>
                <option value="groqai">Groq AI</option>
            </select>
            <button
                className="bg-blue-500 text-white p-2 w-full"
                onClick={fetchRoasting}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Roast'}
            </button>
            {roasting && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                    <h2 className="text-xl font-bold mb-2">Roasting Result:</h2>
                    <p>{roasting}</p>
                </div>
            )}
        </div>
    );
};

export default InstagramRoaster;
