"use client";

import { Cpu } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

function ProductsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const products = [
    {
      name: "ChipCore Pro X1",
      category: "High Performance Computing",
      specs: ["12-core Architecture", "5.2 GHz Max Frequency", "Advanced AI Processing"],
      image: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900",
    },
    {
      name: "ChipCore Mobile M3",
      category: "Mobile & IoT",
      specs: ["Ultra Low Power", "Integrated 5G Modem", "Edge AI Capabilities"],
      image: "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800",
    },
  ];

  return (
    <section id="products" className="py-20 relative bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of semiconductor solutions designed for various industries and applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group p-6 md:p-8 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-all duration-500 shadow-md ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className={`w-full h-48 ${product.image} mb-6 relative overflow-hidden rounded-lg`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-blue-300 group-hover:text-blue-400 transition-colors duration-300" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.category}</p>
                  <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                </div>

                <ul className="space-y-2">
                  {product.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="text-foreground/80 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300">
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

export default ProductsSection;
