// import React, { useState, useEffect } from 'react';
// import { Award, Target, Users, TrendingUp } from 'lucide-react';
// import Header from '../Header';
// import Footer from '../Footer';

// export default function AgricultureHero() {
//   const [scrollY, setScrollY] = useState(0);
// const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const features = [
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Trained Staff",
//       desc: "Expert team providing quality service"
//     },
//     {
//       icon: <Award className="w-8 h-8" />,
//       title: "Quality Work",
//       desc: "Research-based agro solutions"
//     },
//     {
//       icon: <Target className="w-8 h-8" />,
//       title: "Best Delivery",
//       desc: "Timely and efficient service"
//     },
//     {
//       icon: <TrendingUp className="w-8 h-8" />,
//       title: "Best Price",
//       desc: "Honest pricing for farmers"
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-gray-900 pt-20 md:pt-24">
//         <Header/>
//       {/* Video Background */}
//       <div className="fixed inset-0 z-0">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           <source
//             src="https://media.istockphoto.com/id/960839644/video/young-teenage-girl-farmer-with-digital-tablet-checking-saplings-in-sunny-rural-field-slow.mp4?s=mp4-640x640-is&k=20&c=e0EMnHFB4Ii633Qw1XzhYYCfsHaA81YJZQ8_-FDw1x4="
//             type="video/mp4"
//           />
//         </video>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex items-center">
//         <div className="container mx-auto px-4 py-20">
          
//           {/* Hero Content */}
//           <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
//             <div className="inline-block mb-6">
//               <span className="px-6 py-2 bg-green-600/80 text-white text-sm font-medium rounded-full backdrop-blur-sm">
//                 Empowering Farmers For A Better Future
//               </span>
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               6 Years of Best Solution
//               <br />
//               <span className="text-green-400">for Best Cultivation</span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
//               KBC Group empowers farmers with upgraded technology and honest pricing. 
//               We prevent exploitation and promote financial freedom through agricultural excellence.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
//               {/* <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
//                 Get Started
//               </button> */}
//              <button
//   onClick={() => setOpenModal(true)}
//   className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105"
// >
//   Learn More
// </button>

//             </div>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
//             {features.map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
//                 style={{
//                   animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`
//                 }}
//               >
//                 <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm">
//                   {feature.desc}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             {[
//               { number: "1000+", label: "Business Partners" },
//               { number: "32+", label: "C&F Centers" },
//               { number: "6", label: "Years Experience" },
//               { number: "30+", label: "Years Service" }
//             ].map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
//                 style={{
//                   animation: `fadeIn 0.8s ease-out ${idx * 0.15}s both`
//                 }}
//               >
//                 <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-300 text-xs md:text-sm">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
//         <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
//           <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
//         </div>
//       </div>
// <Footer/>
//       <style jsx>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         .animate-fade-in {
//           animation: fadeIn 1s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from '../Footer';
// Simplified Header and Footer components

const About = () => {
  const [openModal, setOpenModal] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 3D Wheat/Grain particles
    class AgriParticle {
      constructor() {
        this.reset();
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.depth = Math.random();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.3;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw wheat grain shape
        const scale = 0.5 + (this.depth * 0.5);
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity * scale})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * scale, this.size * 2 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Water droplets
    class WaterDrop {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
          this.reset();
          this.y = -10;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new AgriParticle());
    const drops = Array.from({ length: 30 }, () => new WaterDrop());

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drops.forEach(drop => {
        drop.update();
        drop.draw();
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      
      {/* ===== HERO SECTION WITH 3D AGRICULTURE ANIMATION ===== */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
        {/* Animated Canvas Background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: 'multiply' }}
        />
        
        {/* 3D Rotating Sun */}
        <div className="absolute top-20 right-20 w-32 h-32 animate-rotate-slow">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-60 animate-pulse-slow" />
            <div className="absolute inset-2 bg-yellow-300 rounded-full blur-xl opacity-80" />
            <div className="absolute inset-4 bg-yellow-200 rounded-full" />
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-16 bg-yellow-300/40 origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Tractor Icon */}
        <div className="absolute bottom-32 left-10 animate-bounce-slow opacity-80">
          <svg className="w-24 h-24 text-green-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm14-3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM7.82 6L5 12v4h3.5c.5-1.16 1.6-2 2.95-2s2.45.84 2.95 2H18v-4.68L15.5 6h-7.68zM19 13l-2.5-5.5c-.27-.55-.81-.88-1.42-.88H8.08c-.61 0-1.15.33-1.42.88L4 13v7c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h10v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-7z"/>
          </svg>
        </div>

        {/* Animated Growing Plants */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-8 pb-8 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-grow-plant"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <svg className="w-12 h-32 text-green-600/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1zm-2-8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-2zm-4-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-2zm8 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-2zM12 2L7 7c0 2.21 1.79 4 4 4v2c0-2.21 1.79-4 4-4l-5-5z"/>
              </svg>
            </div>
          ))}
        </div>

       
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-seed"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-3 bg-amber-600/30 rounded-full transform rotate-45" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 w-96 h-48 bg-white/30 rounded-full blur-3xl animate-drift-cloud" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-32 right-10 w-80 h-40 bg-white/20 rounded-full blur-3xl animate-drift-cloud" 
               style={{ animationDelay: '3s' }} />
          <div className="absolute top-64 left-1/2 w-72 h-36 bg-white/25 rounded-full blur-3xl animate-drift-cloud" 
               style={{ animationDelay: '6s' }} />
        </div>

        
        <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="mb-8 animate-slide-down">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6">
              <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.84L18 12v6h-4v-4h-4v4H6v-6l6-6.16z"/>
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-4 drop-shadow-lg">
              About Our Agriculture
            </h1>
          </div>

          <p className="text-lg md:text-xl text-green-700 max-w-3xl mb-10 leading-relaxed animate-slide-up backdrop-blur-sm bg-white/50 p-6 rounded-2xl shadow-xl">
            Passionate leaders and managers committed to driving agricultural excellence across regions. 
            We work closely with farmers to cultivate growth, trust, and sustainable success.
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="group relative px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Learn More
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* ===== MODAL POPUP ===== */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-scale-in overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-50" />
            
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-300 text-2xl font-bold z-10"
            >
              ✕
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-800">Who We Are</h2>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  We are an agriculture-focused organization dedicated to empowering farmers with innovative 
                  solutions, high-quality products, and expert guidance across every stage of cultivation.
                </p>
                <p>
                  Our experienced leadership team bridges modern agricultural science with practical field 
                  knowledge to improve productivity and long-term sustainability.
                </p>
                <p className="text-green-700 font-semibold">
                  Agriculture is more than a business for us — it is a responsibility toward farmers, 
                  communities, and future generations.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="mt-8 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* ===== ANIMATIONS ===== */}
      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes grow-plant {
          0% { transform: scaleY(0); transform-origin: bottom; }
          60% { transform: scaleY(1.1); }
          100% { transform: scaleY(1); }
        }

        @keyframes float-seed {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          25% { 
            transform: translate(10px, -20px) rotate(90deg);
            opacity: 0.6;
          }
          50% { 
            transform: translate(-10px, -10px) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translate(5px, -30px) rotate(270deg);
            opacity: 0.5;
          }
        }

        @keyframes drift-cloud {
          0%, 100% { 
            transform: translateX(0) translateY(0);
            opacity: 0.3;
          }
          50% { 
            transform: translateX(50px) translateY(-20px);
            opacity: 0.5;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        .animate-grow-plant {
          animation: grow-plant 3s ease-out forwards;
        }

        .animate-float-seed {
          animation: float-seed 8s ease-in-out infinite;
        }

        .animate-drift-cloud {
          animation: drift-cloud 12s ease-in-out infinite;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default About;