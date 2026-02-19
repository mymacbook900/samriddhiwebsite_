import React, { useState, useEffect } from 'react';
import { Leaf, TrendingUp, Users, Award, ChevronRight } from 'lucide-react';
import ServicesOffer from './Components/ServicesOffer';
import RecentProduct from './Components/RecentProducts';
import WhyChooseUs from './Components/WhyChooseUs';
import Footer from '../Footer';
import ContactPage from './Components/ContactPage';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Leaf, title: 'Eco-Friendly', desc: 'Sustainable agricultural solutions' },
    { icon: TrendingUp, title: 'Growth Focus', desc: 'Boosting farmer productivity' },
    { icon: Users, title: 'Community', desc: 'Supporting rural development' },
    { icon: Award, title: 'Quality', desc: 'Premium product range' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      
 <Header/>
<section className="relative h-screen w-full overflow-hidden">
   <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source
      src="https://cdn.pixabay.com/video/2021/08/21/85897-591840755_large.mp4"
      type="video/mp4"
    />
  </video>

 
  <div className="absolute inset-0 bg-black/50"></div>

 
  <div className="relative z-10 flex items-center justify-center h-full px-4">
    <div
      className={`text-center max-w-3xl transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
        Welcome to <span className="text-green-400">Demonstration</span>
        <br />
        Fertilizer Company
      </h1>

      <p className="text-lg sm:text-xl text-gray-200 mb-8">
        "The growth of India is directly related to the growth of rural areas."
        <br />
        Empowering farmers with premium agricultural solutions.
      </p>

      <button
        onClick={() => navigate("/contact")}
        className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-xl"
      >
        Contact Us
      </button>
    </div>
  </div>
</section>





      
      <ServicesOffer />
      <RecentProduct />
      <WhyChooseUs />
    {/* CTA Section */}
      <section className="py-5 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join 1000+ farmers who trust KBC Group for agricultural excellence
          </p>
          <button onClick={()=>navigate("/contact")}
          className="px-10 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
            Contact Us Today
          </button>
        </div>
      </section>


      <Footer />
    </div>
  );
}