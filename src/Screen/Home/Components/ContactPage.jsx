import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-20 md:pt-10">
      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600">
            Don’t hesitate to contact us for any kind of information
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ================= FORM ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Send us a message
              </h2>
              <p className="text-gray-600 mb-6">
                We usually reply within 24 hours.
              </p>

              <div className="space-y-5">
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                {/* Subject */}
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                />

                {/* Message */}
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                />

                {/* Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="space-y-4">
            {/* Phone */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3 hover:shadow-lg transition">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Phones</h3>
                <a href="tel:9111104896" className="block text-sm text-gray-700 hover:text-blue-600">
                  9111 10 4896
                </a>
                <a href="tel:9981817616" className="block text-sm text-gray-700 hover:text-blue-600">
                  9981 81 7616
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3 hover:shadow-lg transition">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900">Emails</h3>
                <a
                  href="mailto:contact@samriddhiagritech.com"
                  className="block text-xs text-gray-700 hover:text-green-600 break-all"
                >
                  contact@samriddhiagritech.com
                </a>
                <a
                  href="mailto:samriddhiagritech@gmail.com"
                  className="block text-xs text-gray-700 hover:text-green-600 break-all"
                >
                  samriddhiagritech@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-lg transition">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Address</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  201, Vishal Tower, 2nd Floor,<br />
                  Navlakha Bus Stand,<br />
                  Indore (MP), India
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-600 hover:text-white transition"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAP ================= */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 md:h-80 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.3351907470253!2d75.87634931495804!3d22.719568785095633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd4b9f2c7c37%3A0x5d5a5c5c5c5c5c5c!2sNavlakha%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
