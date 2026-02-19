import React, { useState, useEffect } from 'react';
import { Sprout, Phone, Users, Bug, Leaf, BookOpen } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, index, isLeft }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
        <div className={`flex items-start gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className={isLeft ? 'text-left' : 'text-right'}>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesOffer = () => {
  const [plantScale, setPlantScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlantScale(s => s === 1 ? 1.05 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Sprout,
      title: 'Soil Analysis',
      description: 'Comprehensive soil testing and nutrient analysis to optimize crop yields and sustainability.',
      isLeft: true
    },
    {
      icon: Phone,
      title: 'Telephonic Advisory',
      description: 'Expert agricultural advice available anytime through our dedicated helpline service.',
      isLeft: false
    },
    {
      icon: Users,
      title: 'Farmers Consultations',
      description: 'One-on-one guidance and strategic planning for improved farming practices and profitability.',
      isLeft: true
    },
    {
      icon: BookOpen,
      title: 'Farmer & Dealer Training Program',
      description: 'Educational workshops and certification programs to enhance skills and knowledge.',
      isLeft: false
    },
    {
      icon: Bug,
      title: 'Pest Control',
      description: 'Integrated pest management solutions for healthy crops and sustainable agriculture.',
      isLeft: true
    },
    {
      icon: Leaf,
      title: 'Lawn Clean',
      description: 'Professional landscaping and maintenance services for pristine outdoor spaces.',
      isLeft: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-block">
          <span className="text-green-600 font-semibold text-sm tracking-widest uppercase animate-pulse">
            Solutions
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-6">
          Services Offer
        </h1>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-green-400"></div>
          <Sprout className="w-6 h-6 text-green-500" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-green-400"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" px-10 pb-16 ">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column */}
          <div className="space-y-6">
            {services.filter((_, i) => i % 3 === 0).map((service, idx) => (
              <ServiceCard key={service.title} {...service} index={idx} />
            ))}
          </div>

          {/* Center Column - Plant Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div 
              className="relative"
              style={{
                transform: `scale(${plantScale})`,
                transition: 'transform 1s ease-in-out'
              }}
            >
              <div className="absolute inset-0 bg-green-400 opacity-20 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=600&fit=crop" 
                alt="Growing plant" 
                className="relative w-64 h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500 rounded-full opacity-30 animate-ping"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {services.filter((_, i) => i % 3 === 1).map((service, idx) => (
              <ServiceCard key={service.title} {...service} index={idx + 2} />
            ))}
          </div>
        </div>

        {/* Bottom Row for Mobile */}
        <div className="mt-6 space-y-6 lg:hidden">
          {services.filter((_, i) => i % 3 === 2).map((service, idx) => (
            <ServiceCard key={service.title} {...service} index={idx + 4} isLeft={true} />
          ))}
        </div>

        {/* Mobile Plant Image */}
        <div className="lg:hidden mt-12 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 opacity-20 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=600&fit=crop" 
              alt="Growing plant" 
              className="relative w-48 h-72 object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        {/* Bottom Row for Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 mt-6 max-w-4xl mx-auto">
          {services.filter((_, i) => i % 3 === 2).map((service, idx) => (
            <ServiceCard key={service.title} {...service} index={idx + 4} isLeft={idx % 2 === 0} />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30 blur-xl animate-bounce"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-2xl animate-pulse"></div>
    </div>
  );
};

export default ServicesOffer;