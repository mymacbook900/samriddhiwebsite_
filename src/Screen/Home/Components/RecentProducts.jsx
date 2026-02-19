import React, { useState, useEffect } from 'react';
import { Award, Target, Users, TrendingUp, Leaf, Sprout, Shield, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AgricultureHomePage() {
  const navigate=useNavigate()
  const [activeVideo, setActiveVideo] = useState('hero');

  const products = [
    {
      title: "Bio Fertilizers",
      desc: "Organic solutions for sustainable farming",
      icon: <Leaf className="w-12 h-12" />
    },
    {
      title: "Seeds & Technology",
      desc: "High-quality seeds with modern tech",
      icon: <Sprout className="w-12 h-12" />
    },
    {
      title: "Crop Protection",
      desc: "Advanced protection for better yield",
      icon: <Shield className="w-12 h-12" />
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Products Section */}
      <section className="py-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="px-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge agricultural solutions designed for Indian farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {product.desc}
                </p>
                <button onClick={()=>navigate("/products")} className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}