"use client"
import { Cpu } from 'lucide-react';
import React from 'react'
import { useInView } from 'react-intersection-observer';

function ProductsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="products" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-300">
            Our Products
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover our comprehensive range of semiconductor solutions designed for various industries and applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              name: "ChipCore Pro X1",
              category: "High Performance Computing",
              specs: ["12-core Architecture", "5.2 GHz Max Frequency", "Advanced AI Processing"],
              image: "bg-gradient-to-br from-slate-700 to-slate-800"
            },
            {
              name: "ChipCore Mobile M3",
              category: "Mobile & IoT",
              specs: ["Ultra Low Power", "Integrated 5G Modem", "Edge AI Capabilities"],
              image: "bg-gradient-to-br from-slate-600 to-slate-700"
            }
          ].map((product, index) => (
            <div
              key={index}
              className={`group p-8 bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className={`w-full h-48 ${product.image} mb-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-white/80" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 uppercase tracking-wide">{product.category}</p>
                  <h3 className="text-2xl font-bold text-slate-300">{product.name}</h3>
                </div>
                
                <ul className="space-y-2">
                  {product.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="text-slate-400 flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      {spec}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full mt-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-semibold transition-all duration-300">
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
