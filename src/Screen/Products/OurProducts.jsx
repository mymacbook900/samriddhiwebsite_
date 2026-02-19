import React, { useEffect, useState } from 'react';
import { Leaf, ShoppingCart, Check } from 'lucide-react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const OurProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartNotice, setCartNotice] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:3000/api/product/getAll");
      setProducts(response.data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('farmerToken');
    if (!token) {
      // Not logged in — check if registered
      const isRegistered = localStorage.getItem('isFarmerRegistered');
      if (isRegistered) {
        navigate('/farmer/login');
      } else {
        navigate('/farmer/signup');
      }
      return;
    }
    // Logged in — add to cart logic here
    setCartNotice(`"${product.productName}" added to cart!`);
    setTimeout(() => setCartNotice(null), 3000);
  };

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const isLoggedIn = !!localStorage.getItem('farmerToken');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <div
        className="text-white py-24 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Trusted Agricultural Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Quality Products for Better Harvest
            </h1>
            <p className="text-xl text-green-50 mb-8">
              Discover our range of premium agricultural products designed to maximize your crop yield
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Notice Toast */}
      {cartNotice && (
        <div className="fixed top-24 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <ShoppingCart className="w-5 h-5" />
          {cartNotice}
        </div>
      )}

      <div className="px-10 py-12">

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 text-lg">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={getData}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-20 text-lg">
                No products found.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-50 h-56">
                    <img
                      src={product.productImages?.[0]}
                      alt={product.productName}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'}`}
                    ></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">
                      {product.productName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                      {product.productDescription}
                    </p>

                    {/* Price + Add to Cart */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Price</p>
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ₹{product.pricing?.displayPriceWithGst}
                          </span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-200 active:scale-95 transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=400&fit=crop"
              alt="Agricultural field"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Product?</h2>
            <p className="text-lg mb-8 text-green-50">Our agricultural experts are here to assist you</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurProducts;