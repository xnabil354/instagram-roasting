"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstagramRoaster: React.FC = () => {
    const [query, setQuery] = useState('');
    const [model, setModel] = useState('geminiai');
    const [roasting, setRoasting] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(true);

    const fetchRoasting = async () => {
        try {
            setLoading(true);
            setError(''); // Reset error state before making the request
            const response = await axios.post('https://roasting-instagram-api.vercel.app/roasting-instagram', {
                query,
                model,
            });
            setRoasting(response.data.roasting);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
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
            <input
                type="text"
                className="border p-2 w-full mb-4"
                placeholder="Enter Instagram Username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
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
                {loading ? 'Loading...' : 'Gass Roasting!'}
            </button>
            {error && (
                <div className="mt-4 p-4 border border-red-500 rounded bg-red-100 text-red-700">
                    <p>{error}</p>
                </div>
            )}
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
