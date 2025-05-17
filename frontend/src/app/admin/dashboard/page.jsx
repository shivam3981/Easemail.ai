import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard } from "lucide-react";
const data = [
  { name: 'Job App', generated: 120 },
  { name: 'Follow-Up', generated: 85 },
  { name: 'Resignation', generated: 40 },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white p-6 shadow-md h-screen">
      <h1 className="text-2xl font-bold mb-6">Easemail.ai</h1>
      <nav className="space-y-4">
        <a className="flex items-center text-gray-700 hover:text-indigo-600" href="#">
          <LayoutDashboard className="mr-2" /> Dashboard
        </a>
        <a className="block text-gray-700 hover:text-indigo-600" href="#">Users</a>
        <a className="block text-gray-700 hover:text-indigo-600" href="#">Emails</a>
        <a className="block text-gray-700 hover:text-indigo-600" href="#">Feedback</a>
        <a className="block text-gray-700 hover:text-indigo-600" href="#">Settings</a>
      </nav>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="flex items-center space-x-4">
        <input className="border rounded p-1 px-3" type="text" placeholder="Search..." />
        <img src="https://i.pravatar.cc/40" alt="Admin" className="rounded-full w-8 h-8" />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <Topbar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card><CardContent><h2 className="text-sm text-gray-500">Total Users</h2><p className="text-lg font-bold">1,420</p></CardContent></Card>
          <Card><CardContent><h2 className="text-sm text-gray-500">Emails Generated</h2><p className="text-lg font-bold">3,872</p></CardContent></Card>
          <Card><CardContent><h2 className="text-sm text-gray-500">Avg AI Rating</h2><p className="text-lg font-bold">4.6 / 5</p></CardContent></Card>
          <Card><CardContent><h2 className="text-sm text-gray-500">Active Today</h2><p className="text-lg font-bold">245</p></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Email Type Usage</CardTitle></CardHeader>
          <CardContent>
            {/* <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="generated" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
