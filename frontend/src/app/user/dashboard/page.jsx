'use client';
import React from 'react';
import { FaUser, FaEnvelope, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-cyan-400">Ease Mail - User Dashboard</h1>
                <p className="text-gray-400">Welcome back! Manage your mails smartly with AI.</p>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/user/profile"
                    className="block bg-[#1e293b] p-6 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                    <FaUser className="text-3xl mb-3 text-cyan-300" />
                    <h3 className="text-xl font-semibold">My Profile</h3>
                    <p className="text-gray-400 text-sm">View and update your profile info</p>
                </Link>

                <Link
                    href="/user/compose"
                    className="block bg-[#1e293b] p-6 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                    <FaEnvelope className="text-3xl mb-3 text-cyan-300" />
                    <h3 className="text-xl font-semibold">Compose Email</h3>
                    <p className="text-gray-400 text-sm">Generate emails using AI</p>
                </Link>

                <Link
                    href="/user/history"
                    className="block bg-[#1e293b] p-6 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                    <FaHistory className="text-3xl mb-3 text-cyan-300" />
                    <h3 className="text-xl font-semibold">Email History</h3>
                    <p className="text-gray-400 text-sm">Check previously generated emails</p>
                </Link>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
                <button className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition">
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;