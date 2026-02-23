import React, { useState, useEffect, useCallback } from 'react';
import {
    ShoppingCart, Trash2, Plus, Minus, ArrowRight,
    Leaf, PackageOpen, X, RefreshCw, Tag, Percent,
    ShieldCheck, AlertCircle, MapPin, CreditCard, Wallet, Camera, Check
} from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import { cartService, orderService } from '../../api/service';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState({}); // per-item loading
    const [clearLoading, setClearLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Checkout Modal State
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [checkoutForm, setCheckoutForm] = useState({
        street: '',
        village: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        paymentMethod: 'cash',
        utrId: '',
        paymentProof: ''
    });

    // Helper to get latest farmer data
    const getFarmerInfo = useCallback(() => {
        try {
            const token = localStorage.getItem('farmerToken');
            const raw = localStorage.getItem('farmerData');

            // Harden token check
            const validToken = (token && token !== "null" && token !== "undefined") ? token : null;
            if (!raw || raw === 'undefined' || raw === 'null') {
                return { token: validToken, farmerId: null, farmerData: null };
            }

            const parsed = JSON.parse(raw);

            // ✅ Deep search — handles ALL possible response shapes:
            const id =
                parsed?._id ||
                parsed?.id ||
                parsed?.farmerId ||
                parsed?.data?._id ||
                parsed?.data?.id ||
                parsed?.farmer?._id ||
                parsed?.user?._id;

            return { token: validToken, farmerId: id, farmerData: parsed };
        } catch {
            return { token: null, farmerId: null, farmerData: null };
        }
    }, []);

    const fetchCart = useCallback(async () => {
        const { token, farmerId } = getFarmerInfo();

        if (!farmerId) {
            console.error('Cart.jsx: Cannot fetch cart - farmerId is missing');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log(`Cart.jsx: Fetching cart for ${farmerId}...`);
            const res = await cartService.getCart(farmerId);
            console.log('Cart.jsx: Fetch cart success:', res.data);
            setCart(res.data.data);
        } catch (err) {
            console.error('Cart.jsx: Fetch cart error:', err);
            setError(err.response?.data?.message || 'Failed to load cart. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [getFarmerInfo]); // Removed 'token' from deps as it's now fetched inside getFarmerInfo

    useEffect(() => { fetchCart(); }, [fetchCart]);

    const setItemLoading = (productId, state) =>
        setActionLoading(prev => ({ ...prev, [productId]: state }));

    const increaseQty = async (productId) => {
        const { token, farmerId } = getFarmerInfo();
        if (!farmerId) return showToast('Session expired. Please re-login.', 'error');

        setItemLoading(productId, 'increase');
        try {
            const res = await cartService.increaseQty({ farmerId, productId });
            setCart(res.data.data);
        } catch (err) {
            console.error('Cart.jsx: Increase qty error:', err);
            showToast(err.response?.data?.message || 'Failed to increase quantity', 'error');
        } finally {
            setItemLoading(productId, null);
        }
    };

    const decreaseQty = async (productId, currentQty) => {
        const { token, farmerId } = getFarmerInfo();
        if (!farmerId) return showToast('Session expired. Please re-login.', 'error');

        setItemLoading(productId, 'decrease');
        try {
            const res = await cartService.decreaseQty({ farmerId, productId });
            setCart(res.data.data);
            if (currentQty === 1) showToast('Item removed from cart');
        } catch (err) {
            console.error('Cart.jsx: Decrease qty error:', err);
            showToast(err.response?.data?.message || 'Failed to decrease quantity', 'error');
        } finally {
            setItemLoading(productId, null);
        }
    };

    const removeItem = async (productId) => {
        const { token, farmerId } = getFarmerInfo();
        if (!farmerId) return showToast('Session expired. Please re-login.', 'error');

        setItemLoading(productId, 'remove');
        try {
            const res = await cartService.removeItem({ farmerId, productId });
            setCart(res.data.data);
            showToast('Item removed from cart');
        } catch (err) {
            console.error('Cart.jsx: Remove item error:', err);
            showToast(err.response?.data?.message || 'Failed to remove item', 'error');
        } finally {
            setItemLoading(productId, null);
        }
    };

    const clearCart = async () => {
        const { token, farmerId } = getFarmerInfo();
        if (!farmerId) return showToast('Session expired. Please re-login.', 'error');

        if (!window.confirm('Clear your entire cart?')) return;
        setClearLoading(true);
        try {
            await cartService.clearCart(farmerId);
            setCart(null);
            showToast('Cart cleared successfully');
        } catch (err) {
            console.error('Cart.jsx: Clear cart error:', err);
            showToast(err.response?.data?.message || 'Failed to clear cart', 'error');
        } finally {
            setClearLoading(false);
        }
    };

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const { token, farmerId } = getFarmerInfo();
        if (!farmerId) return showToast('Session expired. Please re-login.', 'error');

        // Validation
        const required = ['street', 'city', 'district', 'state', 'pincode'];
        for (const field of required) {
            if (!checkoutForm[field].trim()) return showToast(`Please enter ${field}`, 'error');
        }
        if (checkoutForm.paymentMethod === 'online' && !checkoutForm.utrId.trim()) {
            return showToast('Please enter UTR ID for online payment', 'error');
        }

        setOrderLoading(true);
        try {
            const orderPayload = {
                farmerId,
                selectedProductIds: cart.items.map(i => i.productId._id),
                paymentMethod: checkoutForm.paymentMethod,
                utrId: checkoutForm.utrId,
                paymentProof: checkoutForm.paymentProof || 'https://res.cloudinary.com/demo/image/upload/sample.jpg', // Dummy if not provided
                location: {
                    street: checkoutForm.street,
                    village: checkoutForm.village,
                    city: checkoutForm.city,
                    district: checkoutForm.district,
                    state: checkoutForm.state,
                    pincode: checkoutForm.pincode,
                    country: 'India'
                }
            };

            const res = await orderService.placeOrder(orderPayload);

            if (res.data.success) {
                showToast('Order placed successfully!');
                setTimeout(() => navigate('/orders'), 1500);
            }
        } catch (err) {
            console.error('Order Error:', err);
            showToast(err.response?.data?.message || 'Failed to place order', 'error');
        } finally {
            setOrderLoading(false);
        }
    };

    const items = cart?.items || [];
    const hasItems = items.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            <Header />

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-24 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium animate-in slide-in-from-right duration-300 ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-600'}`}>
                    {toast.type === 'error' ? <AlertCircle size={18} /> : <ShieldCheck size={18} />}
                    {toast.msg}
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-6 flex items-center justify-between text-white">
                            <div>
                                <h2 className="text-2xl font-bold">Delivery Details</h2>
                                <p className="text-green-100 text-sm opacity-80">Complete your order information</p>
                            </div>
                            <button onClick={() => setShowCheckout(false)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8 bg-emerald-50/20">
                            <form id="orderForm" onSubmit={handlePlaceOrder} className="space-y-6">
                                {/* Address Section */}
                                <div className="space-y-4">
                                    <h3 className="text-emerald-700 font-bold flex items-center gap-2 text-sm border-b border-emerald-100 pb-2">
                                        <MapPin size={16} /> Delivery Address
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="col-span-full">
                                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Street / Area</label>
                                            <input required type="text" placeholder="e.g. 123 Farm Road, Sector 4" className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={checkoutForm.street} onChange={e => setCheckoutForm({ ...checkoutForm, street: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Village (Optional)</label>
                                            <input type="text" placeholder="e.g. Rampur" className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={checkoutForm.village} onChange={e => setCheckoutForm({ ...checkoutForm, village: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">City</label>
                                            <input required type="text" placeholder="e.g. Bhopal" className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={checkoutForm.city} onChange={e => setCheckoutForm({ ...checkoutForm, city: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">District</label>
                                            <input required type="text" placeholder="e.g. Bhopal" className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={checkoutForm.district} onChange={e => setCheckoutForm({ ...checkoutForm, district: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">State</label>
                                            <input required type="text" placeholder="Madhya Pradesh" className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={checkoutForm.state} onChange={e => setCheckoutForm({ ...checkoutForm, state: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Pincode</label>
                                            <input required type="text" pattern="[0-9]{6}" placeholder="462001" className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition" value={checkoutForm.pincode} onChange={e => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div className="space-y-4">
                                    <h3 className="text-emerald-700 font-bold flex items-center gap-2 text-sm border-b border-emerald-100 pb-2">
                                        <CreditCard size={16} /> Payment Method
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cash' })} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition ${checkoutForm.paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-100 bg-white text-gray-500'}`}>
                                            <Wallet size={24} />
                                            <span className="font-bold">Cash on Delivery</span>
                                            {checkoutForm.paymentMethod === 'cash' && <Check className="ml-auto" size={16} />}
                                        </button>
                                        <button type="button" onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'online' })} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition ${checkoutForm.paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-100 bg-white text-gray-500'}`}>
                                            <CreditCard size={24} />
                                            <span className="font-bold">Online Payment</span>
                                            {checkoutForm.paymentMethod === 'online' && <Check className="ml-auto" size={16} />}
                                        </button>
                                    </div>

                                    {checkoutForm.paymentMethod === 'online' && (
                                        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 animate-in slide-in-from-top-4 duration-300">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-emerald-600 mb-1 uppercase">UTR Number / Transaction ID</label>
                                                    <input required type="text" placeholder="Enter your payment reference number" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white" value={checkoutForm.utrId} onChange={e => setCheckoutForm({ ...checkoutForm, utrId: e.target.value })} />
                                                </div>
                                                <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-emerald-100 border-dashed">
                                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                                                        <Camera size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-700">Upload Screenshot</p>
                                                        <p className="text-[10px] text-gray-500">Add payment proof for faster confirmation</p>
                                                    </div>
                                                    <label className="ml-auto bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-emerald-700 transition">
                                                        Browse
                                                        <input type="file" className="hidden" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-white border-t border-emerald-50 flex items-center justify-between gap-4">
                            <div className="hidden sm:block">
                                <p className="text-xs text-gray-400 font-medium">Order Total</p>
                                <p className="text-2xl font-bold text-emerald-600">₹{cart?.totalPrice}</p>
                            </div>
                            <div className="flex-1 flex justify-end gap-3">
                                <button onClick={() => setShowCheckout(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition border border-gray-100 text-sm">Cancel</button>
                                <button form="orderForm" disabled={orderLoading} className="flex-1 sm:flex-none px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition disabled:opacity-50 text-sm">
                                    {orderLoading ? <RefreshCw className="animate-spin" size={18} /> : <span>Confirm Order - ₹{cart?.totalPrice}</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 pt-28 pb-12 px-6 relative overflow-hidden text-center sm:text-left">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 left-20 w-56 h-28 rounded-full bg-emerald-300 blur-2xl" />
                </div>
                <div className="max-w-5xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <ShoppingCart className="text-white w-5 h-5" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Your Shopping Cart</h1>
                            {hasItems && (
                                <span className="ml-2 bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
                                </span>
                            )}
                        </div>
                        <p className="text-green-100 italic">Review and manage your selected agricultural items</p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500 text-base">Loading your cart...</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <p className="text-red-600 font-semibold">{error}</p>
                        <button
                            onClick={fetchCart}
                            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition"
                        >
                            <RefreshCw size={16} /> Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && !hasItems && (
                    <div className="text-center py-24 bg-white/50 rounded-3xl border border-dashed border-green-200">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                            <PackageOpen className="w-12 h-12 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Browse our products and add items to your cart</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition shadow-emerald-100"
                        >
                            <Leaf className="w-4 h-4" />
                            Browse Products
                        </Link>
                    </div>
                )}

                {/* Cart Content */}
                {!loading && !error && hasItems && (
                    <>
                        {/* Clear Cart */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={clearCart}
                                disabled={clearLoading}
                                className="flex items-center gap-2 text-sm text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-1.5 rounded-full transition font-medium"
                            >
                                {clearLoading
                                    ? <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                    : <Trash2 size={14} />}
                                Clear Cart
                            </button>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Items List */}
                            <div className="flex-1 space-y-4">
                                {items.map((item) => {
                                    const product = item.productId;
                                    const pricing = product?.pricing || {};
                                    const productId = product?._id;
                                    const busy = actionLoading[productId];

                                    return (
                                        <div
                                            key={item._id}
                                            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="p-4 flex gap-4">
                                                {/* Image */}
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={product?.productImages?.[0] || 'https://via.placeholder.com/96x96?text=Product'}
                                                        alt={product?.productName}
                                                        className="w-24 h-24 object-cover rounded-xl bg-emerald-50 border border-emerald-50"
                                                        onError={e => { e.target.src = 'https://via.placeholder.com/96x96?text=Product'; }}
                                                    />
                                                    {product?.isActive && (
                                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" title="Active" />
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h3 className="font-bold text-gray-800 text-base leading-tight">
                                                                {product?.productName}
                                                            </h3>
                                                            <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-100">
                                                                {product?.productCategory}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(productId)}
                                                            disabled={!!busy}
                                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition flex-shrink-0"
                                                            title="Remove item"
                                                        >
                                                            {busy === 'remove'
                                                                ? <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                                : <Trash2 size={15} />}
                                                        </button>
                                                    </div>

                                                    {/* Price Info */}
                                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Tag size={11} className="text-gray-400" />
                                                            MRP: ₹{pricing.mrpWithGst}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Percent size={11} className="text-gray-400" />
                                                            GST: {pricing.taxPercent}% (₹{pricing.taxAmount})
                                                        </span>
                                                    </div>

                                                    {/* Bottom Row */}
                                                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                                                        {/* Qty Controls */}
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => decreaseQty(productId, item.quantity)}
                                                                disabled={!!busy}
                                                                className="w-8 h-8 rounded-full border-2 border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 disabled:opacity-50 transition"
                                                            >
                                                                {busy === 'decrease'
                                                                    ? <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                                                    : <Minus size={14} />}
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-gray-800 text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => increaseQty(productId)}
                                                                disabled={!!busy}
                                                                className="w-8 h-8 rounded-full border-2 border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 disabled:opacity-50 transition"
                                                            >
                                                                {busy === 'increase'
                                                                    ? <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                                                    : <Plus size={14} />}
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-400">Unit price: ₹{item.unitPrice}</p>
                                                            <p className="text-lg font-bold text-emerald-600">₹{item.subTotal}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pricing breakdown bar */}
                                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100 px-4 py-2 flex gap-6 text-xs text-gray-500 flex-wrap">
                                                <span>Base: ₹{pricing.amountWithoutGst} × {item.quantity}</span>
                                                <span>Tax ({pricing.taxPercent}%): ₹{pricing.taxAmount * item.quantity}</span>
                                                <span className="text-emerald-700 font-semibold">
                                                    Subtotal: ₹{item.subTotal}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-72">
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24 hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <ShoppingCart size={18} className="text-emerald-600" />
                                        Order Summary
                                    </h3>

                                    <div className="space-y-3 text-sm">
                                        {items.map((item) => (
                                            <div key={item._id} className="flex justify-between text-gray-600 animate-in fade-in duration-300">
                                                <span className="truncate max-w-[160px] text-xs">
                                                    {item.productId?.productName} × {item.quantity}
                                                </span>
                                                <span className="font-medium">₹{item.subTotal}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-100 pt-3 flex justify-between text-gray-600">
                                            <span>Total Items</span>
                                            <span className="font-bold">{cart.totalItems}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery</span>
                                            <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Free</span>
                                        </div>
                                        <div className="border-t pt-3 flex flex-col font-bold text-gray-800">
                                            <span className="text-sm text-gray-400 font-medium">Grand Total</span>
                                            <span className="text-emerald-600 text-2xl">₹{cart.totalPrice}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <button
                                            onClick={() => setShowCheckout(true)}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-emerald-100 transition active:scale-[0.98]"
                                        >
                                            Checkout Now
                                            <ArrowRight size={18} />
                                        </button>
                                        <div className="p-3 bg-emerald-50/50 rounded-xl flex items-center gap-3 border border-emerald-100 border-dashed">
                                            <ShieldCheck className="text-emerald-600" size={16} />
                                            <span className="text-[10px] text-emerald-800 font-medium leading-tight">100% Secure Transaction & Authenticated Products</span>
                                        </div>
                                    </div>
                                    <Link
                                        to="/products"
                                        className="mt-4 block text-center text-xs text-gray-400 hover:text-emerald-600 transition font-medium"
                                    >
                                        ← Back to Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
