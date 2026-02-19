// import React from "react";
// import { Users, Award, Target, TrendingUp } from "lucide-react";
// import Header from "../Header";
// import Footer from "../Footer";

// // ===== MANAGER IMAGES (src/assets) =====
// import torandhakad from "../../assets/toran-dhakad.jpg";
// import rsrajput from "../../assets/rs-rajput.jpg";
// import mssolanki from "../../assets/ms-solanki.jpg";
// import lsmewara from "../../assets/ls-mewara.jpg";

// // ===== SWIPER =====
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // ===== BASE URL (VITE SAFE) =====
// const BASE = import.meta.env.BASE_URL;

// // ===== TEAM MANAGERS =====
// const teamManager = [
//   {
//     name: "Mr. T. D. Dhakad",
//     title: "Regional Sales Manager",
//     image: torandhakad,
//   },
//   {
//     name: "Mr. R. S. Rajput",
//     title: "Regional Sales Manager",
//     image: rsrajput,
//   },
//   {
//     name: "Mr. M. S. Solanki",
//     title: "Branch Manager",
//     image: mssolanki,
//   },
//   {
//     name: "Mr. L. S. Mewara",
//     title: "Branch Manager",
//     image: lsmewara,
//   },
// ];

// // ===== LEADERSHIP TEAM (public/images/team) =====
// const teamMembers = [
//   {
//     name: "Mr. S. S. Sisodiya",
//     title: "Regional Sales Manager",
//     image: `${BASE}images/team/ss-sisodiya.jpg`,
//   },
//   {
//     name: "Mr. S. S. Rajput",
//     title: "Regional Sales Manager",
//     image: `${BASE}images/team/ss-rajput.jpg`,
//   },
//   {
//     name: "Mr. Rajendra Mandloi",
//     title: "Branch Manager",
//     image: `${BASE}images/team/rajendraman.jpg`,
//   },
//   {
//     name: "Mr. Bablu Patel",
//     title: "Branch Manager",
//     image: `${BASE}images/team/bablu-patel.jpg`,
//   },
//   {
//     name: "Mr. Praveen Mohe",
//     title: "Branch Manager",
//     image: `${BASE}images/team/praveen.jpg`,
//   },
//   {
//     name: "Mr. S. S. Solanki",
//     title: "Divisional Sales Manager",
//     image: `${BASE}images/team/rajendra-singh-solanki.jpg`,
//   },
//   {
//     name: "Mr. Surendra Singh",
//     title: "Branch Manager",
//     image: `${BASE}images/team/team-1.jpg`,
//   },
//   {
//     name: "Mr. Vishwanath Singh",
//     title: "Branch Manager",
//     image: `${BASE}images/team/team-3.jpg`,
//   },
// ];

// // ===== STATS =====
// const stats = [
//   { icon: Users, label: "Team Members", value: "50+" },
//   { icon: Award, label: "Years Experience", value: "15+" },
//   { icon: Target, label: "Projects Done", value: "200+" },
//   { icon: TrendingUp, label: "Growth Rate", value: "25%" },
// ];

// const TeamCard = ({ name, title, image }) => {
//   console.log("IMAGE PATH:", image); 

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-md text-center">
//       <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-100">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <h3 className="mt-4 font-bold">{name}</h3>
//       <p className="text-sm text-gray-500">{title}</p>
//     </div>
//   );
// };


// // ===== MAIN PAGE =====
// export default function OurTeam() {
//   return (
//     <>
//       <Header />

//       {/* HERO */}
//       <section
//         className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40" />
//         <div className="relative text-center text-white max-w-2xl px-4">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Meet Our Team
//           </h1>
//           <p className="text-lg">
//             Passionate leaders and managers driving excellence across regions.Passionate leaders and managers committed to driving excellence across regions.
// They inspire teams, deliver results, and lead with purpose at every level.
//           </p>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((s, i) => (
//           <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
//             <s.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
//             <h3 className="text-3xl font-bold">{s.value}</h3>
//             <p className="text-sm text-gray-600">{s.label}</p>
//           </div>
//         ))}
//       </section>

//       {/* TEAM MANAGERS */}
//       <section className="py-14 bg-blue-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-10">
//             Our Team Managers
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamManager.map((m, i) => (
//               <TeamCard key={i} {...m} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* LEADERSHIP SLIDER */}
//       <section className="py-14 px-4 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-10">
//           Our Leadership Team
//         </h2>

//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={20}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 4 },
//           }}
//         >
//           {teamMembers.map((m, i) => (
//             <SwiperSlide key={i}>
//               <TeamCard {...m} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       <Footer />
//     </>
//   );
// }

import React, { useState } from "react";
import { Users, Award, Target, TrendingUp, Linkedin, Mail, ChevronRight, Leaf } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

// ===== MANAGER IMAGES (src/assets) =====
import torandhakad from "../../assets/toran-dhakad.jpg";
import rsrajput from "../../assets/rs-rajput.jpg";
import mssolanki from "../../assets/ms-solanki.jpg";
import lsmewara from "../../assets/ls-mewara.jpg";

// ===== SWIPER =====
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// ===== BASE URL (VITE SAFE) =====
const BASE = import.meta.env.BASE_URL;

// ===== TEAM MANAGERS =====
const teamManager = [
  {
    name: "Mr. T. D. Dhakad",
    title: "Regional Sales Manager",
    image: torandhakad,
    expertise: "Strategic Planning & Market Development",
  },
  {
    name: "Mr. R. S. Rajput",
    title: "Regional Sales Manager",
    image: rsrajput,
    expertise: "Client Relations & Business Growth",
  },
  {
    name: "Mr. M. S. Solanki",
    title: "Branch Manager",
    image: mssolanki,
    expertise: "Operations & Team Leadership",
  },
  {
    name: "Mr. L. S. Mewara",
    title: "Branch Manager",
    image: lsmewara,
    expertise: "Performance Optimization & Excellence",
  },
];

// ===== LEADERSHIP TEAM (public/images/team) =====
const teamMembers = [
  {
    name: "Mr. S. S. Sisodiya",
    title: "Regional Sales Manager",
    image: `${BASE}images/team/ss-sisodiya.jpg`,
  },
  {
    name: "Mr. S. S. Rajput",
    title: "Regional Sales Manager",
    image: `${BASE}images/team/ss-rajput.jpg`,
  },
  {
    name: "Mr. Rajendra Mandloi",
    title: "Branch Manager",
    image: `${BASE}images/team/rajendraman.jpg`,
  },
  {
    name: "Mr. Bablu Patel",
    title: "Branch Manager",
    image: `${BASE}images/team/bablu-patel.jpg`,
  },
  {
    name: "Mr. Praveen Mohe",
    title: "Branch Manager",
    image: `${BASE}images/team/praveen.jpg`,
  },
  {
    name: "Mr. S. S. Solanki",
    title: "Divisional Sales Manager",
    image: `${BASE}images/team/rajendra-singh-solanki.jpg`,
  },
  {
    name: "Mr. Surendra Singh",
    title: "Branch Manager",
    image: `${BASE}images/team/team-1.jpg`,
  },
  {
    name: "Mr. Vishwanath Singh",
    title: "Branch Manager",
    image: `${BASE}images/team/team-3.jpg`,
  },
];

// ===== STATS (AGRICULTURE THEMED) =====
const stats = [
  { icon: Users, label: "Team Members", value: "50+", color: "from-green-500 to-emerald-500" },
  { icon: Award, label: "Years Experience", value: "15+", color: "from-lime-500 to-green-600" },
  { icon: Target, label: "Projects Done", value: "200+", color: "from-emerald-500 to-teal-500" },
  { icon: TrendingUp, label: "Growth Rate", value: "25%", color: "from-green-600 to-lime-600" },
];

// ===== PREMIUM TEAM CARD (AGRICULTURE GREEN) =====
const PremiumTeamCard = ({ name, title, image, expertise }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gradient-to-br from-white to-green-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 group-hover:from-green-600/10 group-hover:to-emerald-600/10 transition-all duration-500 z-10" />
      
      {/* Leaf Pattern Background */}
      <div className="absolute top-0 right-0 opacity-5">
        <Leaf size={80} className="text-green-600" />
      </div>
      
      {/* Content */}
      <div className="relative z-20 p-6">
        {/* Image Container with Ring Animation */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse opacity-20" />
          <div className={`absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} style={{ padding: '3px' }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm font-semibold text-green-600 mb-3 uppercase tracking-wide">
            {title}
          </p>
          {expertise && (
            <p className="text-xs text-gray-600 leading-relaxed px-2">
              {expertise}
            </p>
          )}
        </div>

        {/* Social Icons (appear on hover) */}
        <div className={`flex justify-center gap-3 mt-5 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button className="p-2 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-full transition-all duration-300">
            <Linkedin size={16} />
          </button>
          <button className="p-2 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-full transition-all duration-300">
            <Mail size={16} />
          </button>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
    </div>
  );
};

// ===== COMPACT TEAM CARD FOR SLIDER =====
const CompactTeamCard = ({ name, title, image }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full border-2 border-green-100 hover:border-green-300">
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 text-center bg-gradient-to-br from-white to-green-50">
        <h3 className="font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-green-600 font-medium">{title}</p>
      </div>
    </div>
  );
};

// ===== ANIMATED STAT CARD (AGRICULTURE GREEN) =====
const StatCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-green-100 hover:border-green-300">
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} p-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
          <Icon className="w-full h-full text-white" />
        </div>
        <h3 className="text-4xl font-bold bg-gradient-to-br bg-clip-text text-transparent from-green-700 to-emerald-600 mb-2">
          {value}
        </h3>
        <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
          {label}
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full" />
    </div>
  );
};

// ===== MAIN PAGE =====
export default function OurTeam() {
  return (
    <>
      <Header />

      {/* HERO SECTION - AGRICULTURE GREEN THEME */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated Background - Agricultural Field */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-slow-zoom"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070')",
          }}
        />
        
        {/* Green Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-green-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Animated Leaf Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute text-green-300 animate-float"
              size={20 + Math.random() * 20}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-fade-in">
            <div className="inline-block mb-6 px-6 py-2 bg-green-600/30 backdrop-blur-md rounded-full border-2 border-green-400/50">
              <p className="text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
                <Leaf size={16} className="text-green-300" />
                Growing Agriculture Together
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Meet Our <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Agricultural</span> Team
            </h1>
            
            <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed max-w-3xl mx-auto">
           Passionate leaders and managers committed to driving agricultural excellence across regions.
They inspire high-performing teams and lead with integrity and vision.
Through innovation, collaboration, and accountability, they deliver measurable results.
Their leadership cultivates sustainable growth and long-term value at every level.
            </p>

            <button className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-full font-semibold text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
              Explore Our Team
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-300/70 rounded-full p-1">
            <div className="w-1.5 h-3 bg-green-300 rounded-full mx-auto animate-scroll" />
          </div>
        </div> */}
      </section>

      {/* STATS SECTION - GREEN THEME */}
      

      {/* TEAM MANAGERS SECTION - GREEN THEME */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Leaf size={100} className="text-green-600" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Leaf size={120} className="text-green-600 transform rotate-45" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-green-100 rounded-full border-2 border-green-300">
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wider">Leadership</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Team <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Managers</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the visionary leaders who cultivate our success and inspire agricultural excellence across all regions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamManager.map((m, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <PremiumTeamCard {...m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP SLIDER - GREEN THEME */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-emerald-100 rounded-full border-2 border-emerald-300">
              <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Extended Team</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Leadership <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dedicated professionals committed to agricultural excellence and innovation
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-16"
          >
            {teamMembers.map((m, i) => (
              <SwiperSlide key={i} className="!w-72">
                <CompactTeamCard {...m} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


<section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-green-100 rounded-full border-2 border-green-300">
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wider flex items-center gap-2 justify-center">
                <Leaf size={14} className="text-green-600" />
                Our Impact
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Agricultural Excellence in <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Numbers</span>
            </h2>
            <p className="text-gray-600 text-lg">Cultivating success through dedication and innovation</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>
      {/* CTA SECTION - GREEN THEME */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-emerald-600 to-green-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute text-white"
              size={40 + Math.random() * 60}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border-2 border-green-300/50">
            <p className="text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
              <Leaf size={16} className="text-green-300" />
              Join Our Mission
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Grow Your Career with Us
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Be part of something extraordinary. We're cultivating the future of agriculture and looking for passionate individuals to join our mission.
          </p>
          <button className="px-8 py-4 bg-white text-green-700 rounded-full font-semibold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 hover:bg-green-50">
            View Open Positions
          </button>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}