import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Go Home
        </Link>
    </div>
);

export default NotFound;
