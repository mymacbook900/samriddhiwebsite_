import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Leaf, PackageOpen } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Placeholder cart state — integrate with real cart state/API later
    const [cartItems, setCartItems] = useState([]);

    const updateQty = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item._id === id
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 pt-28 pb-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <ShoppingCart className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">My Cart</h1>
                    </div>
                    <p className="text-green-100 ml-13">Review and manage your selected products</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12">
                {cartItems.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                            <PackageOpen className="w-12 h-12 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Browse our products and add items to your cart</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition"
                        >
                            <Leaf className="w-4 h-4" />
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-center hover:shadow-md transition">
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="w-20 h-20 object-cover rounded-xl bg-green-50"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-800 truncate">{item.productName}</h3>
                                        <p className="text-green-600 font-semibold mt-1">₹{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQty(item._id, -1)}
                                            className="w-8 h-8 rounded-full border-2 border-green-200 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center font-bold text-gray-700">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item._id, 1)}
                                            className="w-8 h-8 rounded-full border-2 border-green-200 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <p className="w-20 text-right font-bold text-gray-800">₹{item.price * item.qty}</p>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-72">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                <h3 className="font-bold text-gray-800 text-lg mb-4">Order Summary</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-base">
                                        <span>Total</span>
                                        <span className="text-green-600">₹{subtotal}</span>
                                    </div>
                                </div>
                                <button className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition active:scale-95">
                                    Place Order
                                    <ArrowRight size={16} />
                                </button>
                                <Link to="/products" className="mt-3 block text-center text-sm text-green-600 hover:underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
