import React, { useState, useEffect } from 'react';
import { User, Mail, Save, Building } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@school.edu',
        role: 'Administrator',
        institution: 'Springfield High School'
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedProfile = localStorage.getItem('admin_profile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem('admin_profile', JSON.stringify(profile));
        setIsEditing(false);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h2>
                <p className="text-slate-500">Manage your account settings and preferences.</p>
            </div>

            <div className="glass-card p-8">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                        {profile.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{profile.name}</h3>
                        <p className="text-slate-500">{profile.role}</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className={`input-field pl-10 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    disabled={!isEditing}
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className={`input-field pl-10 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Institution</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={profile.institution}
                                    onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                                    className={`input-field pl-10 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        {isEditing ? (
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="btn-primary"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
