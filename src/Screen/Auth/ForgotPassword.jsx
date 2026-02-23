import React, { useState } from 'react';
import { Leaf, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authService } from '../../api/service';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await authService.forgotPassword({ email });
            setSent(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please check your email and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center py-12 px-4 relative">
            <Link to="/farmer/login" className="absolute top-8 left-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition">
                <ArrowLeft size={20} />
                Back to Login
            </Link>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    {!sent ? (
                        <>
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <Leaf className="w-8 h-8 text-green-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800">Forgot Password?</h1>
                                <p className="text-gray-500 mt-2 text-sm">Enter your registered email and we'll send you an OTP to reset your password.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Registered Email Address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition active:scale-95 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending OTP...
                                        </div>
                                    ) : 'Send OTP'}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Remember your password?{' '}
                                    <Link to="/farmer/login" className="text-green-600 font-semibold hover:underline">Login</Link>
                                </p>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">OTP Sent!</h2>
                            <p className="text-gray-500 text-sm mb-2">
                                We've sent a 6-digit OTP to
                            </p>
                            <p className="font-semibold text-green-700 mb-8">{email}</p>
                            <Link
                                to={`/farmer/reset-password?email=${encodeURIComponent(email)}`}
                                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg transition"
                            >
                                Enter OTP & Reset Password
                            </Link>
                            <p className="text-xs text-gray-400 mt-4">Didn't receive? Check your spam folder.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
