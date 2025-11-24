import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, QrCode, Users, LogOut, Menu, User } from 'lucide-react';

const Layout = ({ children, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/scan', icon: QrCode, label: 'Scan QR' },
        { path: '/students', icon: Users, label: 'Students' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans overflow-hidden relative">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-slate-200 m-4 rounded-2xl h-[calc(100vh-2rem)]">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900">
                        Attendify
                    </h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-0">
                {/* Header - Mobile */}
                <header className="md:hidden h-16 glass-panel border-b border-slate-200 flex items-center justify-between px-4 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                            <QrCode className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-slate-900">Attendify</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-500 hover:text-slate-900">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-xl z-50 md:hidden flex flex-col p-6">
                        <div className="flex justify-end mb-8">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="space-y-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `w-full flex items-center gap-4 px-4 py-4 rounded-xl text-lg ${isActive
                                        ? 'bg-primary-50 text-primary-600 border border-primary-100'
                                        : 'text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    {item.label}
                                </NavLink>
                            ))}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="w-6 h-6" />
                                Logout
                            </button>
                        </nav>
                    </div>
                )}

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
