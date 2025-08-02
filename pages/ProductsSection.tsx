"use client";

import { Cpu, ArrowRight, Zap, Shield, Brain } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

function ProductsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const products = [
    {
      name: "ChipCore Pro X1",
      category: "High Performance Computing",
      specs: ["12-core Architecture", "5.2 GHz Max Frequency", "Advanced AI Processing"],
      icon: Brain,
      accent: "from-blue-500 to-cyan-500",
      description: "Ultimate performance for demanding workloads"
    },
    {
      name: "ChipCore Mobile M3",
      category: "Mobile & IoT",
      specs: ["Ultra Low Power", "Integrated 5G Modem", "Edge AI Capabilities"],
      icon: Zap,
      accent: "from-emerald-500 to-teal-500",
      description: "Efficient processing for mobile applications"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    },
    {
      name: "ChipCore Secure S2",
      category: "Enterprise Security",
      specs: ["Hardware Encryption", "Secure Boot", "Tamper Detection"],
      icon: Shield,
      accent: "from-violet-500 to-purple-500",
      description: "Military-grade security for critical systems"
    }
  ];

  return (
    <section id="products" className="py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 mr-2" />
            Our Product Portfolio
          </div>
          <h2 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Next-Generation
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Semiconductors</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Engineered for excellence. Built for the future. Experience cutting-edge performance across all computing domains.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-black/20 hover:-translate-y-2 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-br ${product.accent} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-8 translate-y-8" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {product.description}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-3 mb-8">
                    {product.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center text-slate-700 dark:text-slate-300">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${product.accent} rounded-full mr-3 flex-shrink-0`} />
                        <span className="text-sm font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full group/btn bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800 dark:hover:bg-slate-200 flex items-center justify-center">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Need a custom solution? Our engineering team is ready to help.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
            <span className="mr-2">Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductsSection; 