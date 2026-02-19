import React, { useState, useEffect } from 'react';
import { Droplets, Award, Leaf, Gift } from 'lucide-react';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Droplets,
      title: 'Experienced Workers',
      description: 'We have a range of water specialists who can help you along the way.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Award,
      title: 'Established with Licensed',
      description: 'We have a range of water specialists who can help you along the way.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Leaf,
      title: 'Suitable Service From Our Workers',
      description: 'We have a range of water specialists who can help you along the way.',
      color: 'from-teal-400 to-teal-600'
    },
    {
      icon: Gift,
      title: 'We Are Providing Free Consultations',
      description: 'We have a range of water specialists who can help you along the way.',
      color: 'from-emerald-400 to-emerald-600'
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className=" px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Header */}
            <div>
              <p className="text-green-600 font-semibold mb-2 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Our Assessment
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h1>
              <div className="w-20 h-1 bg-green-500 rounded-full"></div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              We have a range of water specialists who can help you along the way. Whether you want a massive fountain or just a small water feature, we can design the right solution for you.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className={`group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=1000&fit=crop"
                alt="Happy family outdoors"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">15+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUs;