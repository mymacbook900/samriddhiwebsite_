import React, { useState } from 'react';
import { Leaf, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FarmerLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/farmer/login', formData);

            if (response.data.success) {
                localStorage.setItem('farmerToken', response.data.token);
                localStorage.setItem('farmerData', JSON.stringify(response.data.user));
                localStorage.setItem('isFarmerRegistered', 'true'); // Mark as registered
                // Dispatch storage event so Header updates immediately
                window.dispatchEvent(new Event('storage'));
                navigate('/products');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition">
                <ArrowLeft size={20} />
                Back to Home
            </Link>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <Leaf className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Farmer Login</h1>
                        <p className="text-gray-600">Welcome back! Please login to your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 cursor-pointer">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                Remember me
                            </label>
                            <Link to="/farmer/forgot-password" className="text-green-600 font-semibold hover:underline">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transform transition active:scale-95 disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>

                        <p className="text-center text-gray-600 mt-8">
                            Don't have an account?{' '}
                            <Link to="/farmer/signup" className="text-green-600 font-semibold hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FarmerLogin;
