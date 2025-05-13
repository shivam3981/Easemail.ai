'use client';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
};

const mockEmails = [
    { subject: 'Welcome to EaseMail!', date: '2025-05-10' },
    { subject: 'Your AI-generated follow-up', date: '2025-05-09' },
    // Add more mock emails as needed
];

const ProfileCard = ({ user }) => (
    <div className="bg-[#1e293b] rounded-xl p-6 flex items-center gap-4 shadow-md mb-6">
        <FaUser className="text-4xl text-cyan-300" />
        <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
        </div>
    </div>
);

const EmailHistory = ({ emails }) => (
    <div className="bg-[#1e293b] rounded-xl p-6 shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaEnvelopeOpenText className="text-cyan-300" /> Generated Email History
        </h3>
        {emails.length === 0 ? (
            <p className="text-gray-400">No emails generated yet.</p>
        ) : (
            <ul className="divide-y divide-gray-700">
                {emails.map((email, idx) => (
                    <li key={idx} className="py-2">
                        <div className="font-medium">{email.subject}</div>
                        <div className="text-gray-400 text-sm">{email.date}</div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const LogoutButton = () => (
    <button
        className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition"
        onClick={() => {
            // Add your logout logic here
            alert('Logged out!');
        }}
    >
        <FaSignOutAlt className="mr-2" />
        Logout
    </button>
);

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400">Ease Mail - User Dashboard</h1>
                    <p className="text-gray-400">Welcome back! Manage your mails smartly with AI.</p>
                </div>

                {/* Profile */}
                <ProfileCard user={mockUser} />

                {/* Email History */}
                <EmailHistory emails={mockEmails} />

                {/* Logout */}
                <div className="text-center">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;