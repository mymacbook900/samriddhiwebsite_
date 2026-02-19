import React, { useState } from 'react';
import { ClipboardList, PackageOpen, Leaf, ChevronDown, ChevronUp, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const statusConfig = {
    Pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
    Processing: { label: 'Processing', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: Clock },
    Shipped: { label: 'Shipped', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: Truck },
    Delivered: { label: 'Delivered', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle },
    Cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
};

const Orders = () => {
    // Placeholder orders — integrate with real API later
    const [orders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 pt-28 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <ClipboardList className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">My Orders</h1>
                    </div>
                    <p className="text-green-100">Track and manage your orders</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                {orders.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                            <PackageOpen className="w-12 h-12 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-3">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Start shopping to see your orders here</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition"
                        >
                            <Leaf className="w-4 h-4" />
                            Shop Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const status = statusConfig[order.status] || statusConfig.Pending;
                            const StatusIcon = status.icon;
                            return (
                                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                                    {/* Order Header */}
                                    <div
                                        className="px-6 py-4 flex items-center justify-between cursor-pointer"
                                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">Order #{order._id?.slice(-6).toUpperCase()}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${status.color} ${status.bg} border ${status.border}`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-green-600 text-lg">₹{order.totalAmount}</span>
                                            {expandedOrder === order._id
                                                ? <ChevronUp size={18} className="text-gray-400" />
                                                : <ChevronDown size={18} className="text-gray-400" />
                                            }
                                        </div>
                                    </div>

                                    {/* Expanded Items */}
                                    {expandedOrder === order._id && (
                                        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 space-y-3">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-green-100" />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                                    </div>
                                                    <p className="font-bold text-gray-700 text-sm">₹{item.price * item.qty}</p>
                                                </div>
                                            ))}
                                            <div className="border-t pt-3 flex justify-between text-sm font-bold text-gray-800">
                                                <span>Total</span>
                                                <span className="text-green-600">₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Orders;
