import React, { useEffect, useState } from 'react';
import {
  Leaf, ShoppingCart, Check, X, Tag, Percent,
  Layers, ChevronLeft, ChevronRight, BadgeCheck,
  AlertCircle, ShieldCheck, ArrowLeft, Star, Package
} from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { productService, cartService } from '../../api/service';

// ─── Auth Helper ──────────────────────────────────────────────────────────────
const getFarmerInfo = () => {
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
};

// ─── Component ────────────────────────────────────────────────────────────────
const OurProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartProductIds, setCartProductIds] = useState(new Set()); // track what's in cart
  const navigate = useNavigate();

  const { token, farmerId } = getFarmerInfo();
  const isLoggedIn = !!token;

  // ─── Fetch Products ──────────────────────────────────────────────────────
  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAllProducts();
      setProducts(response.data.data || []);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Fetch existing cart to highlight already-added products ────────────
  const syncCart = async () => {
    if (!farmerId) return;
    try {
      const res = await cartService.getCart(farmerId);
      const items = res.data?.data?.items || [];
      const ids = new Set(items.map(i => i.productId?._id || i.productId));
      setCartProductIds(ids);
    } catch {
      // silent — cart sync is non-critical
    }
  };

  useEffect(() => {
    getData();
    syncCart();
  }, []);

  // ─── Toast ───────────────────────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ─── Add to Cart ─────────────────────────────────────────────────────────
  const handleAddToCart = async (product, e) => {
    if (e) e.stopPropagation();

    const { token: t, farmerId: fid } = getFarmerInfo();

    if (!t) {
      const isRegistered = localStorage.getItem('isFarmerRegistered');
      navigate(isRegistered ? '/farmer/login' : '/farmer/signup');
      return;
    }

    if (!fid) {
      showToast('Session expired. Please login again.', 'error');
      setTimeout(() => navigate('/farmer/login'), 1500);
      return;
    }

    const productId = product._id;
    setAddingToCart(productId);

    try {
      await cartService.addToCart({ farmerId: fid, productId, quantity: 1 });

      setCartProductIds(prev => new Set([...prev, productId]));
      showToast(`"${product.productName}" added to cart! 🛒`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add to cart', 'error');
    } finally {
      setAddingToCart(null);
    }
  };

  // ─── Modal ───────────────────────────────────────────────────────────────
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalImgIdx(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = '';
  };

  // ─── Derived Data ─────────────────────────────────────────────────────────
  const categories = ['all', ...new Set(products.map(p => p.productCategory).filter(Boolean))];
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.productCategory === activeCategory);

  const pricing = selectedProduct?.pricing || {};
  const images = selectedProduct?.productImages || [];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />

      {/* ── Hero ── */}
      <div
        className="text-white py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=500&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 to-emerald-700/60" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Trusted Agricultural Solutions
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Quality Products for Better Harvest</h1>
          <p className="text-xl text-green-50 mb-8">Discover premium agricultural products designed to maximize your yield</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {['100% Authentic', 'Fast Delivery', 'Expert Support'].map(f => (
              <div key={f} className="flex items-center gap-2"><Check className="w-5 h-5" /><span>{f}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-24 right-6 z-[300] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium transition-all duration-300 ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-600'}`}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <ShoppingCart className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      {/* ── Auth Warning Banner ── */}
      {!isLoggedIn && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-center gap-3 text-amber-800 text-sm">
          <ShieldCheck size={16} className="text-amber-500" />
          <span>Please <button onClick={() => navigate('/farmer/login')} className="font-bold underline">login</button> to add products to your cart</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* ── Category Filter ── */}
        {!loading && !error && categories.length > 1 && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeCategory === cat
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-transparent shadow-lg shadow-green-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700'
                  }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center items-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-600 text-lg">Loading products...</span>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button onClick={getData} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
              Retry
            </button>
          </div>
        )}

        {/* ── Products Grid ── */}
        {!loading && !error && (
          <>
            <p className="text-center text-gray-500 text-sm mb-6">
              Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No products found in this category.</p>
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const inCart = cartProductIds.has(product._id);
                  const isAdding = addingToCart === product._id;

                  return (
                    <div
                      key={product._id}
                      onClick={() => openModal(product)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-50 h-56">
                        <img
                          src={product.productImages?.[0]}
                          alt={product.productName}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=Product'; }}
                        />
                        {product.productCategory && (
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            {product.productCategory}
                          </div>
                        )}
                        {product.isActive ? (
                          <div className="absolute top-3 right-3 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow" title="In Stock" />
                        ) : (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            Out of Stock
                          </div>
                        )}
                        {/* In-cart badge */}
                        {inCart && (
                          <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                            <Check size={11} /> In Cart
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 right-0 left-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-white/95 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                            Click to view details
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors line-clamp-1">
                          {product.productName}
                        </h3>
                        {product.hindiName && (
                          <p className="text-xs text-gray-400 mb-1 font-medium">{product.hindiName}</p>
                        )}
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2 flex-1 leading-relaxed">
                          {product.productDescription || <span className="italic text-gray-300">No description available</span>}
                        </p>

                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-end justify-between mb-3">
                            <div>
                              <p className="text-xs text-gray-400 mb-0.5">Price (incl. GST)</p>
                              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                ₹{product.pricing?.displayPriceWithGst ?? '—'}
                              </span>
                            </div>
                            {product.pricing?.mrpWithGst &&
                              product.pricing?.displayPriceWithGst < product.pricing?.mrpWithGst && (
                                <div className="text-right">
                                  <span className="text-xs line-through text-gray-400 block">₹{product.pricing.mrpWithGst}</span>
                                  <span className="text-xs text-green-600 font-bold">
                                    {Math.round((1 - product.pricing.displayPriceWithGst / product.pricing.mrpWithGst) * 100)}% OFF
                                  </span>
                                </div>
                              )}
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={isAdding || !product.isActive}
                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 ${inCart
                              ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-200'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {isAdding ? (
                              <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Adding...
                              </>
                            ) : inCart ? (
                              <>
                                <Check className="w-4 h-4" />
                                Added to Cart
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                {product.isActive ? 'Add to Cart' : 'Out of Stock'}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* ── CTA ── */}
        <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=400&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Product?</h2>
            <p className="text-lg mb-8 text-green-50">Our agricultural experts are here to assist you</p>
            <button onClick={()=> navigate("/contact")} className="bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition shadow-lg">
              Contact an Expert
            </button>
          </div>
        </div>
      </div>

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-50 rounded-t-3xl overflow-hidden h-72">
              <img
                src={images[modalImgIdx] || 'https://via.placeholder.com/700x300?text=Product'}
                alt={selectedProduct.productName}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://via.placeholder.com/700x300?text=Product'; }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setModalImgIdx(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition shadow"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setModalImgIdx(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition shadow"
                  >
                    <ChevronRight size={18} />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setModalImgIdx(i)}
                        className={`h-2 rounded-full transition-all ${i === modalImgIdx ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 overflow-x-auto bg-gradient-to-t from-black/30 to-transparent">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setModalImgIdx(i)}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition ${i === modalImgIdx ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {selectedProduct.productCategory && (
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                      <Layers size={11} /> {selectedProduct.productCategory}
                    </span>
                  )}
                  {selectedProduct.isActive ? (
                    <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-100 flex items-center gap-1">
                      <BadgeCheck size={11} /> In Stock
                    </span>
                  ) : (
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100">
                      Out of Stock
                    </span>
                  )}
                  {cartProductIds.has(selectedProduct._id) && (
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                      <Check size={11} /> Already in Cart
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.productName}</h2>
                {selectedProduct.hindiName && (
                  <p className="text-gray-500 text-sm mt-0.5">{selectedProduct.hindiName}</p>
                )}
                {selectedProduct.technicalName && (
                  <p className="text-gray-400 text-xs mt-1 italic">Tech: {selectedProduct.technicalName}</p>
                )}
              </div>

              {selectedProduct.productDescription && (
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedProduct.productDescription}</p>
              )}

              {/* Crops */}
              {selectedProduct.crops?.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Suitable Crops</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.crops.map(crop => (
                      <span key={crop} className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SKU Packing */}
              {selectedProduct.skuPacking?.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Available Packing</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.skuPacking.map((sku, i) => (
                      <span key={i} className="bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200">
                        {sku.packingSize} {sku.unit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 mb-5 border border-emerald-100">
                <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-emerald-600" /> Pricing Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'MRP (with GST)', value: pricing.mrpWithGst ? `₹${pricing.mrpWithGst}` : '—', icon: <Tag size={13} /> },
                    { label: 'Base Price (excl. GST)', value: pricing.amountWithoutGst ? `₹${pricing.amountWithoutGst}` : '—', icon: <Tag size={13} /> },
                    { label: 'GST Rate', value: pricing.taxPercent ? `${pricing.taxPercent}%` : '—', icon: <Percent size={13} /> },
                    { label: 'Tax Amount', value: pricing.taxAmount ? `₹${pricing.taxAmount}` : '—', icon: <Percent size={13} /> },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-white rounded-xl p-3 border border-emerald-100 flex items-center gap-2">
                      <span className="text-emerald-500">{icon}</span>
                      <div>
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="font-bold text-gray-800 text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Your Price (incl. GST)</span>
                  <span className="text-white font-bold text-2xl">₹{pricing.displayPriceWithGst ?? '—'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={(e) => handleAddToCart(selectedProduct, e)}
                  disabled={addingToCart === selectedProduct._id || !selectedProduct.isActive}
                  className={`flex-[2] py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${cartProductIds.has(selectedProduct._id)
                    ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-200 active:scale-95'
                    }`}
                >
                  {addingToCart === selectedProduct._id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : cartProductIds.has(selectedProduct._id) ? (
                    <>
                      <Check size={17} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={17} />
                      {selectedProduct.isActive ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </button>
              </div>

              {!isLoggedIn && (
                <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <button onClick={() => navigate('/farmer/login')} className="underline text-emerald-600 font-medium">Login</button>
                  &nbsp;required to add items to cart
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OurProducts;