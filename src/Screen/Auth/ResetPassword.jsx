import React, { useState, useRef } from 'react';
import { Leaf, Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../api/service';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const prefillEmail = searchParams.get('email') || '';

    const [email, setEmail] = useState(prefillEmail);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // digits only
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(''));
            inputRefs.current[5]?.focus();
        }
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter the 6-digit OTP.');
            return;
        }

        setLoading(true);
        try {
            await authService.resetPassword({
                email,
                otp: otpString,
                newPassword,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP or something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center py-12 px-4 relative">
            <Link to="/farmer/forgot-password" className="absolute top-8 left-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition">
                <ArrowLeft size={20} />
                Back
            </Link>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    {!success ? (
                        <>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <Lock className="w-8 h-8 text-green-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
                                <p className="text-gray-500 mt-2 text-sm">Enter the OTP sent to your email and choose a new password.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email (prefilled or editable) */}
                                {!prefillEmail && (
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Registered Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                )}

                                {/* OTP Input */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Enter 6-digit OTP</label>
                                    <div className="flex gap-3 justify-center" onPaste={handleOtpPaste}>
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                ref={(el) => (inputRefs.current[idx] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                className={`w-11 h-13 text-center text-xl font-bold border-2 rounded-xl outline-none transition
                                                    ${digit ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-800'}
                                                    focus:border-green-500 focus:bg-green-50`}
                                                style={{ height: '52px' }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="New password (min 6 chars)"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Confirm new password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition
                                                ${confirmPassword && confirmPassword !== newPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        />
                                    </div>
                                    {confirmPassword && confirmPassword !== newPassword && (
                                        <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition active:scale-95 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Resetting...
                                        </div>
                                    ) : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Password Reset!</h2>
                            <p className="text-gray-500 text-sm mb-8">Your password has been updated successfully. You can now log in with your new password.</p>
                            <button
                                onClick={() => navigate('/farmer/login')}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg transition"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
