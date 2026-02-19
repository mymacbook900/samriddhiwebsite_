import React, { useState, useEffect } from "react";
import {
  Leaf,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    "Pest Control",
    "Soil Analysis",
    "Transportation",
    "Farmers Consultations",
    "Farmer & Dealer Training",
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/ourTeam" },
    { name: "Products", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-gradient-to-b from-green-700 to-green-700 text-white relative overflow-hidden">

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* COMPANY INFO */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-green-400" size={32} />
              <h3 className="text-2xl font-bold">Demonstration</h3>
            </div>
            <p className="text-gray-300 mb-6">
              We provide professional agri and landscaping solutions with
              quality service.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-green-600 p-2 rounded-full"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS (FIX HERE ✅) */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <Link
                    to={link.path}
                    onClick={scrollToTop}   // ✅ FIX
                    className="text-gray-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>📧 info@demo.com</p>
            <p>📞 +91 98765 43210</p>
          </div>

        </div>

        <div className="border-t border-green-800 mt-8 pt-6 text-center text-sm">
          © 2026 Demonstration. All Rights Reserved.
        </div>
      </div>

      {/* SCROLL TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 p-3 rounded-full shadow-lg"
        >
          <ArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
