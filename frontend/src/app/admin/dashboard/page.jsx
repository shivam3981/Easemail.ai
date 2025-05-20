'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard, Users, Mail, MessageCircle, Settings } from "lucide-react";

function Sidebar({ onFeedbackClick, onUsersClick, onEmailsClick, selected }) { 
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`transition-all duration-300 ${
        open ? "w-64" : "w-20"
      } bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 p-6 shadow-2xl h-screen flex flex-col border-r border-indigo-300/20 backdrop-blur-lg relative`}
    >
      {/* Hamburger Button */}
      <button
        className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 group focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        <span className="block w-7 h-1 bg-indigo-200 rounded group-hover:bg-indigo-400 transition" />
        <span className="block w-7 h-1 bg-indigo-200 rounded group-hover:bg-indigo-400 transition" />
        <span className="block w-7 h-1 bg-indigo-200 rounded group-hover:bg-indigo-400 transition" />
      </button>

      {/* Add spacing between hamburger and sidebar content */}
      <div className="h-8" />

      <nav className="space-y-2 flex-1">
        <button
          type="button"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 w-full shadow-lg ring-2 ring-indigo-400/30 ${
            selected === "dashboard"
              ? "text-white bg-indigo-600/80 font-semibold hover:bg-indigo-500/90"
              : "text-indigo-100 hover:bg-indigo-700/80 hover:text-white"
          } ${!open && "justify-center px-2"}`}
          onClick={() => onEmailsClick("dashboard")}
        >
          <LayoutDashboard className="w-5 h-5" /> {open && "Dashboard"}
        </button>
        <button
          type="button"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 w-full ${
            selected === "users"
              ? "text-white bg-indigo-600/80 font-semibold shadow-lg ring-2 ring-indigo-400/30 hover:bg-indigo-500/90"
              : "text-indigo-100 hover:bg-indigo-700/80 hover:text-white"
          } ${!open && "justify-center px-2"}`}
          onClick={() => onEmailsClick("users")}
        >
          <Users className="w-5 h-5" /> {open && "Users"}
        </button>
        <button
          type="button"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 w-full ${
            selected === "emails"
              ? "text-white bg-indigo-600/80 font-semibold shadow-lg ring-2 ring-indigo-400/30 hover:bg-indigo-500/90"
              : "text-indigo-100 hover:bg-indigo-700/80 hover:text-white"
          } ${!open && "justify-center px-2"}`}
          onClick={() => onEmailsClick("emails")}
        >
          <Mail className="w-5 h-5" /> {open && "Emails"}
        </button>
        <button
          type="button"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 w-full ${
            selected === "settings"
              ? "text-white bg-indigo-600/80 font-semibold shadow-lg ring-2 ring-indigo-400/30 hover:bg-indigo-500/90"
              : "text-indigo-100 hover:bg-indigo-700/80 hover:text-white"
          } ${!open && "justify-center px-2"}`}
          onClick={() => onEmailsClick("settings")}
        >
          <Settings className="w-5 h-5" /> {open && "Settings"}
        </button>
      </nav>
      <div className={`mt-10 flex flex-col items-center transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
        <img src="https://i.pravatar.cc/48" alt="Admin" className="rounded-full w-12 h-12 border-2 border-indigo-400 shadow-lg mb-2" />
        <span className="text-indigo-100 font-semibold">Admin</span>
        <span className="text-indigo-300 text-xs">Administrator</span>
      </div>
      <div className={`mt-auto text-indigo-300 text-xs text-center pt-6 border-t border-indigo-400/10 transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
        © 2025 Easemail.ai
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur rounded-xl px-6 py-4 shadow">
      <h2 className="text-2xl font-bold text-indigo-800">Admin Dashboard</h2>
      <div className="flex items-center space-x-4">
        <input className="border border-indigo-200 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" type="text" placeholder="Search..." />
        <img src="https://i.pravatar.cc/40" alt="Admin" className="rounded-full w-10 h-10 border-2 border-indigo-400 shadow" />
      </div>
    </div>
  );
}

function FeedbackModal({ open, onClose }) {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-indigo-800">Send Feedback</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold">Thank you for your feedback!</div>
        ) : (
          <>
            <textarea
              className="w-full border border-indigo-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={4}
              placeholder="Your feedback..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => {
                  setSubmitted(true);
                  setTimeout(() => {
                    setSubmitted(false);
                    setFeedback("");
                    onClose();
                  }, 1500);
                }}
                disabled={!feedback.trim()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [userStats, setUserStats] = useState({ total: 0, activeToday: 0 });
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [emailStats, setEmailStats] = useState([
    { name: 'Job App', generated: 0 },
    { name: 'Follow-Up', generated: 0 },
    { name: 'Resignation', generated: 0 },
  ]);
  const [selected, setSelected] = useState("dashboard");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setUserStats({
          total: data.length,
          activeToday: data.filter(u => {
            const created = new Date(u.createdAt);
            const today = new Date();
            return (
              created.getDate() === today.getDate() &&
              created.getMonth() === today.getMonth() &&
              created.getFullYear() === today.getFullYear()
            );
          }).length
        });
      });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/stats`)
      .then(res => res.json())
      .then(stats => {
        // stats should be an array of { name, generated }
        setEmailStats(stats);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Sidebar 
        onFeedbackClick={() => setFeedbackOpen(true)} 
        onUsersClick={() => setShowUsers((v) => !v)}
        onEmailsClick={setSelected}
        selected={selected}
      />
      <main className="flex-1 p-8 space-y-8">
        <Topbar />

        {!showUsers ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white shadow-lg hover:scale-105 transition">
                <CardContent className="flex flex-col items-start py-6">
                  <div className="mb-2"><Users className="w-6 h-6" /></div>
                  <h2 className="text-sm opacity-80">Total Users</h2>
                  <p className="text-2xl font-bold mt-1">{userStats.total}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-tr from-purple-500 to-indigo-400 text-white shadow-lg hover:scale-105 transition">
                <CardContent className="flex flex-col items-start py-6">
                  <div className="mb-2"><Mail className="w-6 h-6" /></div>
                  <h2 className="text-sm opacity-80">Emails Generated</h2>
                  <p className="text-2xl font-bold mt-1">
                    {emailStats.reduce((sum, e) => sum + (e.generated || 0), 0)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-tr from-pink-500 to-indigo-400 text-white shadow-lg hover:scale-105 transition">
                <CardContent className="flex flex-col items-start py-6">
                  <div className="mb-2"><LayoutDashboard className="w-6 h-6" /></div>
                  <h2 className="text-sm opacity-80">Avg AI Rating</h2>
                  <p className="text-2xl font-bold mt-1">4.6 / 5</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-tr from-green-500 to-indigo-400 text-white shadow-lg hover:scale-105 transition">
                <CardContent className="flex flex-col items-start py-6">
                  <div className="mb-2"><Users className="w-6 h-6" /></div>
                  <h2 className="text-sm opacity-80">Active Today</h2>
                  <p className="text-2xl font-bold mt-1">{userStats.activeToday}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg rounded-xl bg-white/90">
              <CardHeader>
                <CardTitle className="text-indigo-800">Email Type Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emailStats}>
                    <XAxis dataKey="name" tick={{ fill: "#6366f1", fontWeight: 600 }} />
                    <YAxis tick={{ fill: "#6366f1" }} />
                    <Tooltip />
                    <Bar dataKey="generated" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="shadow-lg rounded-xl bg-white/90">
            <CardHeader>
              <CardTitle className="text-indigo-800">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id}>
                        <td className="px-4 py-2">{u.name || "N/A"}</td>
                        <td className="px-4 py-2">{u.email}</td>
                        <td className="px-4 py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
