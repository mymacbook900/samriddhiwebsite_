import React, { useState } from 'react';
import { Leaf, User, Phone, Mail, Lock, MapPin, Sprout, Landmark } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { authService } from '../../api/service';

const FarmerSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        farmerName: '',
        farmerFatherName: '',
        mobileNumber: '',
        whatsappNumber: '',
        email: '',
        password: '',
        crops: '',
        sizeOfLand: '',
        address: {
            pincode: '',
            state: '',
            district: '',
            city: '',
            tehsil: '',
            village: '',
            fullAddress: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Format crops as an array
            const formattedData = {
                ...formData,
                crops: formData.crops.split(',').map(crop => crop.trim()).filter(crop => crop !== '')
            };

            const response = await authService.signup(formattedData);

            if (response.data.success) {
                localStorage.setItem('farmerToken', response.data.token);
                localStorage.setItem('farmerData', JSON.stringify(response.data.data));
                localStorage.setItem('isFarmerRegistered', 'true'); // Mark as registered
                setSuccess('Account created successfully! Welcome to the community.');
                window.dispatchEvent(new Event('storage'));
                setTimeout(() => navigate('/products'), 2000);
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition z-50">
                <ArrowLeft size={20} />
                Back to Home
            </Link>

            <div className="container mx-auto px-4 py-20 relative">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
                    <div className="md:flex">
                        {/* Left Side - Info */}
                        <div className="hidden md:block md:w-1/3 bg-green-600 p-12 text-white relative">
                            <div className="relative z-10">
                                <Leaf className="w-12 h-12 mb-6" />
                                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                                <p className="text-green-100 mb-8">
                                    Register as a farmer to access exclusive benefits, premium products, and expert agricultural support.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">1</div>
                                        <span>Quality Seeds</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">2</div>
                                        <span>Expert Advice</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">3</div>
                                        <span>Better Yield</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-tr-full"></div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="md:w-2/3 p-8 md:p-12">
                            <div className="text-center md:text-left mb-8">
                                <h1 className="text-3xl font-bold text-gray-800">Farmer Registration</h1>
                                <p className="text-gray-600">Please provide your details to get started</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded animate-shake">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded animate-bounce">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-4 border-b pb-2">Basic Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="farmerName"
                                                placeholder="Farmer Name"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.farmerName}
                                            />
                                        </div>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="farmerFatherName"
                                                placeholder="Father's Name"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.farmerFatherName}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                placeholder="Mobile Number"
                                                required
                                                pattern="[6-9]\d{9}"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.mobileNumber}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="whatsappNumber"
                                                placeholder="WhatsApp Number"
                                                pattern="[6-9]\d{9}"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.whatsappNumber}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
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
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.password}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Farming Details */}
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-4 border-b pb-2">Farming Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Sprout className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="crops"
                                                placeholder="Crops (comma separated, e.g. Wheat, Rice)"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.crops}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Landmark className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="sizeOfLand"
                                                placeholder="Land Size (e.g. 5 Acres)"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.sizeOfLand}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Details */}
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-4 border-b pb-2">Address Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="address.pincode"
                                                placeholder="Pincode"
                                                required
                                                pattern="\d{6}"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.pincode}
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.state"
                                                placeholder="State"
                                                required
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.state}
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.district"
                                                placeholder="District"
                                                required
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.district}
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.city"
                                                placeholder="City"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.city}
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.tehsil"
                                                placeholder="Tehsil"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.tehsil}
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.village"
                                                placeholder="Village"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.village}
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <textarea
                                                name="address.fullAddress"
                                                placeholder="Full Address"
                                                required
                                                rows="2"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                                onChange={handleChange}
                                                value={formData.address.fullAddress}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transform transition active:scale-95 disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Registering...
                                            </div>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                </div>

                                <p className="text-center text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/farmer/login" className="text-green-600 font-semibold hover:underline">
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmerSignup;
