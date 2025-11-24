import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, QrCode, X, FileDown, Pencil, Trash2 } from 'lucide-react';
import QRGenerator from './QRGenerator';

const StudentList = ({ students, onAddStudent, onUpdateStudent, onDeleteStudent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedStudentForQR, setSelectedStudentForQR] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Student Form State
    const [formData, setFormData] = useState({ id: '', name: '', email: '', class: '' });

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || student.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleOpenAdd = () => {
        setFormData({ id: '', name: '', email: '', class: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleOpenEdit = (student) => {
        setFormData(student);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.class) {
            if (isEditing) {
                onUpdateStudent(formData);
            } else {
                onAddStudent(formData);
            }
            setShowModal(false);
        }
    };

    const handleExportCSV = () => {
        const headers = ['ID,Name,Email,Class,Status,Last Seen'];
        const rows = students.map(s =>
            `${s.id},${s.name},${s.email},${s.class},${s.status},${s.lastSeen || ''}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "attendance_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Student List</h2>
                    <p className="text-slate-500">Manage and view all registered students.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                        <FileDown className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button
                        onClick={handleOpenAdd}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Student
                    </button>
                </div>
            </div>

            {/* Add/Edit Student Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass-card w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-bold text-slate-900 mb-6">
                            {isEditing ? 'Edit Student' : 'Add New Student'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g. john@school.edu"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Class/Grade</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.class}
                                    onChange={e => setFormData({ ...formData, class: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g. 10-A"
                                />
                            </div>
                            <button type="submit" className="w-full btn-primary mt-4">
                                {isEditing ? 'Save Changes' : 'Register Student'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* QR Generator Modal */}
            {selectedStudentForQR && (
                <QRGenerator
                    student={selectedStudentForQR}
                    onClose={() => setSelectedStudentForQR(null)}
                />
            )}

            <div className="glass-card p-4">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Present', 'Absent'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                        : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 text-sm">
                                <th className="p-4 font-medium">Student Info</th>
                                <th className="p-4 font-medium">ID</th>
                                <th className="p-4 font-medium">Class</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Time</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{student.name}</div>
                                                <div className="text-xs text-slate-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600 font-mono text-sm">{student.id}</td>
                                    <td className="p-4 text-slate-600">{student.class}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${student.status === 'Present'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                : 'bg-rose-50 text-rose-600 border-rose-200'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">
                                        {student.lastSeen || '--:--'}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedStudentForQR(student)}
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                title="Show QR Code"
                                            >
                                                <QrCode className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleOpenEdit(student)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit Student"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => onDeleteStudent(student.id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Delete Student"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No students found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentList;
