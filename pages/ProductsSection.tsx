"use client"

import { Cpu } from 'lucide-react';
import React from 'react'
import { useInView } from 'react-intersection-observer';

function ProductsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="products" className="py-20 relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of semiconductor solutions designed for various industries and applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              name: "ChipCore Pro X1",
              category: "High Performance Computing",
              specs: ["12-core Architecture", "5.2 GHz Max Frequency", "Advanced AI Processing"],
              image: "bg-gradient-to-br from-gray-200 to-gray-300"
            },
            {
              name: "ChipCore Mobile M3",
              category: "Mobile & IoT",
              specs: ["Ultra Low Power", "Integrated 5G Modem", "Edge AI Capabilities"],
              image: "bg-gradient-to-br from-gray-100 to-gray-200"
            }
          ].map((product, index) => (
            <div
              key={index}
              className={`group p-8 bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-500 shadow-sm ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className={`w-full h-48 ${product.image} mb-6 relative overflow-hidden rounded-md`}>
                <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-gray-800/70" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                </div>

                <ul className="space-y-2">
                  {product.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection
