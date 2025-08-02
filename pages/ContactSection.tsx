"use client";

import { Cpu, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="contact" className="py-20 relative bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
      {/* Vertical soft background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b  via-blue-900/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to revolutionize your technology? Contact our team of experts to discuss your semiconductor needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {[
              { icon: Mail, label: "Email", value: "info@chipcore.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "Address", value: "Mohali, Punjab, 94043" },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted/10 border border-border rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form
            className={`space-y-6 transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-colors"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-colors"
            />

            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-colors resize-none"
            />

            <button
              type="submit"
              className="w-full px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cpu className="w-6 h-6 text-muted-foreground" />
            <span className="text-lg font-bold text-muted-foreground">Webber</span>
          </div>
          <p className="text-muted-foreground">© 2025 Webber. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
