import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardList, PackageOpen, Leaf, ChevronDown, ChevronUp, CheckCircle, Clock, Truck, XCircle, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { orderService } from '../../api/service';



const statusConfig = {
    placed: { label: 'Order Placed', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
    confirmed: { label: 'Confirmed', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: CheckCircle },
    delivered: { label: 'Delivered', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: Truck },
    cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(null); // stores orderId being cancelled

    // Helper to get latest farmer data (reused from Cart.jsx logic)
    const getFarmerInfo = useCallback(() => {
        try {
            const token = localStorage.getItem('farmerToken');
            const raw = localStorage.getItem('farmerData');
            const validToken = (token && token !== "null" && token !== "undefined") ? token : null;
            if (!raw || raw === 'undefined' || raw === 'null') return { token: validToken, farmerId: null };
            const parsed = JSON.parse(raw);
            const id = parsed?._id || parsed?.id || parsed?.farmerId || parsed?.data?._id || parsed?.data?.id || parsed?.farmer?._id || parsed?.user?._id;
            return { token: validToken, farmerId: id };
        } catch {
            return { token: null, farmerId: null };
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        const { token, farmerId } = getFarmerInfo();
        if (!farmerId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await orderService.getFarmerOrders(farmerId);
            setOrders(res.data.data || []);
        } catch (err) {
            console.error('Orders.jsx: Fetch error:', err);
            setError(err.response?.data?.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    }, [getFarmerInfo]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) return;

        const { token } = getFarmerInfo();
        setCancelLoading(orderId);
        try {
            await orderService.cancelOrder(orderId);
            // Update local state instead of refetching or refetch
            fetchOrders();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to cancel order');
        } finally {
            setCancelLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 pt-28 pb-12 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 left-20 w-56 h-28 rounded-full bg-emerald-300 blur-2xl" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <ClipboardList className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">My Orders</h1>
                    </div>
                    <p className="text-green-100 italic">Track and manage your agricultural orders</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500">Loading your orders...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <p className="text-red-500 font-medium mb-4">{error}</p>
                        <button onClick={fetchOrders} className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-emerald-700 transition">
                            <RefreshCw size={16} /> Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && orders.length === 0 ? (
                    <div className="text-center py-24 bg-white/50 rounded-3xl border border-dashed border-green-200">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                            <PackageOpen className="w-12 h-12 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-3">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Your agricultural journey starts with your first order!</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition shadow-emerald-100"
                        >
                            <Leaf className="w-4 h-4" />
                            Shop Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const status = statusConfig[order.orderStatus] || statusConfig.placed;
                            const StatusIcon = status.icon;
                            return (
                                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                                    {/* Order Header */}
                                    <div
                                        className="px-6 py-5 flex items-center justify-between cursor-pointer"
                                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">#{order.orderId || order._id?.slice(-8).toUpperCase()}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${status.color} ${status.bg} border ${status.border}`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Total Price</p>
                                                <p className="font-bold text-emerald-600 text-lg">₹{order.totalPrice}</p>
                                            </div>
                                            {expandedOrder === order._id
                                                ? <ChevronUp size={20} className="text-emerald-400 bg-emerald-50 rounded-full p-0.5" />
                                                : <ChevronDown size={20} className="text-gray-400 bg-gray-50 rounded-full p-0.5" />
                                            }
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedOrder === order._id && (
                                        <div className="border-t border-gray-100 bg-gray-50/50">
                                            {/* Items */}
                                            <div className="px-6 py-4 space-y-4">
                                                {order.items?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100">
                                                        <img
                                                            src={item.productId?.productImages?.[0] || 'https://via.placeholder.com/48'}
                                                            alt={item.productId?.productName}
                                                            className="w-14 h-14 rounded-lg object-cover bg-emerald-50 border border-emerald-100"
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-bold text-sm text-gray-800">{item.productId?.productName}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.unitPrice}</p>
                                                        </div>
                                                        <p className="font-bold text-gray-700 text-sm">₹{item.subTotal}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Summary & Actions */}
                                            <div className="px-6 py-4 bg-emerald-50/30 border-t border-gray-100 flex flex-wrap justify-between items-end gap-4">
                                                <div className="text-xs text-gray-500 space-y-1">
                                                    <p><span className="font-semibold">Delivery To:</span> {order.location?.village}, {order.location?.city}</p>
                                                    <p><span className="font-semibold">Payment:</span> {order.paymentMethod?.toUpperCase()} {order.utrId ? `(UTR: ${order.utrId})` : ''}</p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    {order.orderStatus === 'placed' && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleCancelOrder(order.orderId); }}
                                                            disabled={cancelLoading === order.orderId}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                                                        >
                                                            {cancelLoading === order.orderId ? <RefreshCw size={14} className="animate-spin" /> : <XCircle size={14} />}
                                                            Cancel Order
                                                        </button>
                                                    )}
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-500">Grand Total</p>
                                                        <p className="text-xl font-bold text-emerald-600">₹{order.totalPrice}</p>
                                                    </div>
                                                </div>
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
