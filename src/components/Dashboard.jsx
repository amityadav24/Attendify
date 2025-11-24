import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserX, TrendingUp, Plus, FileDown, FileText } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

// Reusable statistic card component
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="glass-card p-6 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon className="w-24 h-24" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-slate-50 ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('text-', 'text-')}`} />
                </div>
                <span className="text-sm font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
            <p className="text-slate-500 text-sm">{title}</p>
        </div>
    </div>
);

const Dashboard = ({ students }) => {
    const totalStudents = students.length;
    const presentCount = students.filter(s => s.status === 'Present').length;
    const absentCount = totalStudents - presentCount;
    const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

    const [loading, setLoading] = useState(false);

    const handleExport = () => {
        setLoading(true);
        setTimeout(() => {
            const headers = ['ID,Name,Email,Class,Status,Last Seen'];
            const rows = students.map(s => `${s.id},${s.name},${s.email},${s.class},${s.status},${s.lastSeen || ''}`);
            const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'attendance_export.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setLoading(false);
        }, 1500);
    };

    const handleGenerateReport = () => {
        setLoading(true);
        setTimeout(() => {
            alert(`Attendance Report Generated!\n\nTotal: ${totalStudents}\nPresent: ${presentCount}\nAbsent: ${absentCount}\nRate: ${attendanceRate}%`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
                <p className="text-slate-500">Welcome back, here's today's attendance summary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value={totalStudents} icon={Users} color="text-blue-600" trend="+12%" />
                <StatCard title="Present Today" value={presentCount} icon={UserCheck} color="text-emerald-600" trend="+5%" />
                <StatCard title="Absent Today" value={absentCount} icon={UserX} color="text-rose-600" trend="-2%" />
                <StatCard title="Attendance Rate" value={`${attendanceRate}%`} icon={TrendingUp} color="text-violet-600" trend="+3%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {students.slice(0, 5).map(student => (
                            <div key={student.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">{student.name}</h4>
                                        <p className="text-xs text-slate-500">{student.id}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === 'Present'
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                    : 'bg-rose-50 text-rose-600 border border-rose-100'
                                    }`}>{student.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button onClick={handleGenerateReport} className="w-full btn-primary flex items-center justify-center gap-2" disabled={loading}>
                            {loading ? <LoadingSpinner /> : <FileText className="w-4 h-4" />}
                            Generate Report
                        </button>
                        <Link to="/students" className="w-full px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Student
                        </Link>
                        <button onClick={handleExport} className="w-full px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all flex items-center justify-center gap-2" disabled={loading}>
                            {loading ? <LoadingSpinner /> : <FileDown className="w-4 h-4" />}
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
