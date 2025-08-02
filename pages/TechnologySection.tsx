"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Battery, Shield, Activity, Thermometer, CheckCircle } from 'lucide-react';

function TechnologySection() {
    const [sectionInView, setSectionInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSectionInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const coreFeatures = [
        {
            icon: <Battery className="w-10 h-10" />,
            title: "Easy Battery Pack Paralleling",
            subtitle: "SCALABLE VEHICLE DESIGN",
            description: "State of the art and reliable battery pack paralleling technique without software communication between battery packs. Unhindered power delivery even while large SOC mismatch.",
            highlight: "Value | Reliable | Agile"
        },
        {
            icon: <Shield className="w-10 h-10" />,
            title: "Unparalleled Reliability",
            subtitle: "THERMAL/STRUCTURAL STRESS TESTED",
            description: "Unbreakable design tested for millions of kms with >15K deployments. Infallible at even thousands of dead short circuits.",
            highlight: "15K+ Deployments"
        },
        {
            icon: <Activity className="w-10 h-10" />,
            title: "Better Cell Balancing",
            subtitle: "ALGORITHM FOR FASTER EQUILIBRIUM",
            description: "400mA Balancing Current works in unison with unique charging profile control algorithms for fastest cell balancing and better DoD Control.",
            highlight: "400mA Current"
        },
        {
            icon: <Thermometer className="w-10 h-10" />,
            title: "Superior Thermal Stability",
            subtitle: "2X LESSER TEMPERATURE RISE",
            description: "Highly optimized thermals with use of industry first and innovative MOSFET mounting technique. Extract 2x better thermal performance from PDU.",
            highlight: "2X Performance"
        }
    ];

    const advancedFeatures = [
        "AIS 156 PH-2 Certified",
        "Isolated CAN Communication Interface",
        "Bluetooth interface for wireless monitoring",
        "Accurate coulomb counting for SoC estimation",
        "High side MOSFET and Contactor architecture for uninterrupted battery ground",
        "Onboard Data Storage and Buzzer for AIS-156 PH-2 compliance",
        "Temperature sensor-based algorithms for Early Detection of Thermal Runaway",
        "Infallible at even thousands of dead short circuits",
        "Pre-discharge control and MOSFET Failure detection",
        "Cell Open Wire Detection and Deep Discharge Prevention",
        "State of Power control to optimize between vehicle performance and range",
        "Charging profile control for faster balancing",
        "Parallel Battery Pack Operation without Intercommunication"
    ];

    return (
        <>
            {/* <section
                id="technology"
                className="py-20 relative bg-gradient-to-b from-slate-800/5 via-slate-700/10 to-slate-800/5"
                style={{
                    backgroundImage: 'url("/bg/whit.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            > */}
                {/* Minimal background overlay */}
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="absolute inset-0 overflow-hidden">
                    {/* <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
                    <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-500/20 to-transparent"></div> */}
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>
                    {/* Section Header */}
                    <div className={`text-center mb-16 py-6 transition-all duration-1000 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-blue-600/40 border border-blue-400/60 rounded-full text-white text-sm font-medium uppercase tracking-wide shadow-lg">
                                First Principle Design Approach
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-2xl">
                            Fueling Our Winning Streak
                        </h2>
                        <p className="text-lg text-white max-w-3xl mx-auto drop-shadow-lg">
                            Our R&D approach combines cutting-edge battery management technology with proven reliability,
                            delivering superior performance across millions of kilometers.
                        </p>
                    </div>

                    {/* Core Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {coreFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={`group p-8 bg-white/15 backdrop-blur-none border border-white/30 rounded-xl hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${200 + index * 150}ms` }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300 flex-shrink-0 group-hover:scale-110 transform">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-50 transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <span className="px-3 py-1 bg-blue-500/40 text-blue-100 text-xs font-semibold rounded-full group-hover:bg-blue-500/50 transition-colors duration-300">
                                                {feature.highlight}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-blue-200 mb-3 uppercase tracking-wide group-hover:text-blue-100 transition-colors duration-300">
                                            {feature.subtitle}
                                        </div>
                                        <p className="text-white leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Advanced Functionality Section */}
                    <div className={`transition-all duration-1000 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`} style={{ transitionDelay: '800ms' }}>
                        <div className="text-center mb-12">
                            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white drop-shadow-2xl">
                                Advanced Functionality
                            </h3>
                            <p className="text-lg text-white drop-shadow-lg">At Your Fingertips</p>
                        </div>

                        <div className="bg-white/15 backdrop-blur-none border border-white/30 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-500">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {advancedFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start space-x-3 p-4 rounded-lg hover:bg-blue-500/15 hover:shadow-lg transition-all duration-300 group ${sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                                            }`}
                                        style={{ transitionDelay: `${1000 + index * 50}ms` }}
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5 group-hover:text-green-200 group-hover:scale-110 transition-all duration-300" />
                                        <span className="text-white text-sm font-medium leading-relaxed group-hover:text-blue-100 transition-colors duration-300">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className={`mt-16 text-center transition-all duration-1000 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`} style={{ transitionDelay: '1200ms' }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-blue-500/15 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group">
                                <div className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">400mA</div>
                                <div className="text-sm text-gray-200 uppercase tracking-wide group-hover:text-gray-100 transition-colors duration-300">Balancing Current</div>
                            </div>
                            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-blue-500/15 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group">
                                <div className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">15K+</div>
                                <div className="text-sm text-gray-200 uppercase tracking-wide group-hover:text-gray-100 transition-colors duration-300">Deployments</div>
                            </div>
                            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-blue-500/15 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group">
                                <div className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">2X</div>
                                <div className="text-sm text-gray-200 uppercase tracking-wide group-hover:text-gray-100 transition-colors duration-300">Better Thermal</div>
                            </div>
                            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-blue-500/15 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group">
                                <div className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">AIS-156</div>
                                <div className="text-sm text-gray-200 uppercase tracking-wide group-hover:text-gray-100 transition-colors duration-300">PH-2 Certified</div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </section> */}
        </>
    );
}

export default TechnologySection;