"use client"

import { Cpu } from 'lucide-react';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react'
import { useInView } from 'react-intersection-observer';

function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="contact" className="py-20 relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to revolutionize your technology? Contact our team of experts to discuss your semiconductor needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={`space-y-8 transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <Mail className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@chipcore.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <Phone className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">Mohali, Punjab, 94043</p>
              </div>
            </div>
          </div>

          <form className={`space-y-6 transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors"
            />

            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors resize-none"
            />

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cpu className="w-6 h-6 text-gray-500" />
            <span className="text-lg font-bold text-gray-600">Webber</span>
          </div>
          <p className="text-gray-400">© 2024 Webber. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
