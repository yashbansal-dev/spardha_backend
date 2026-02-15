'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const sportsArsenal = [
    { name: "BASKETBALL", image: "/assets/games/basketball.JPG", color: "from-orange-500 to-red-600" },
    { name: "FOOTBALL", image: "/assets/games/football.JPG", color: "from-green-500 to-emerald-600" },
    { name: "CRICKET", image: "/assets/games/cricket.JPG", color: "from-blue-500 to-cyan-600" },
    { name: "VOLLEYBALL", image: "/assets/games/volleyball_v2.jpg", color: "from-purple-500 to-pink-600" },
    { name: "BADMINTON", image: "/assets/games/badminton_v2.jpg", color: "from-red-500 to-rose-600" },
];

export default function SportsArsenal() {
    return (
        <section className="relative py-20 md:py-32 bg-black overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(227,114,51,0.15)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(0,255,255,0.1)_0%,_transparent_50%)]" />
            </div>

            {/* Section Title */}
            <div className="container mx-auto px-4 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
                        YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-red-600">BATTLEFIELD</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl">Choose your arena. Claim your victory.</p>
                </motion.div>
            </div>

            {/* CSS Animation Styles for Marquee */}
            <style jsx>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-left {
                    display: flex;
                    width: max-content;
                    animation: marquee-left 40s linear infinite;
                    will-change: transform;
                }
                .group:hover .animate-marquee-left {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Auto-Scrolling Marquee */}
            <div className="relative overflow-hidden group">
                <div className="animate-marquee-left flex gap-6">
                    {/* First set of cards */}
                    {sportsArsenal.map((sport, index) => (
                        <SportCard key={`first-${index}`} sport={sport} index={index} />
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {sportsArsenal.map((sport, index) => (
                        <SportCard key={`second-${index}`} sport={sport} index={index} />
                    ))}
                    {/* Triplicate set for larger screens/safety */}
                    {sportsArsenal.map((sport, index) => (
                        <SportCard key={`third-${index}`} sport={sport} index={index} />
                    ))}
                    {/* Quadruplicate set for safety */}
                    {sportsArsenal.map((sport, index) => (
                        <SportCard key={`fourth-${index}`} sport={sport} index={index} />
                    ))}
                </div>

                {/* Gradient Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
            </div>

            {/* Stats Banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="container mx-auto px-4 mt-16 relative z-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <StatPill label="Sports" value="20+" />
                    <StatPill label="Athletes" value="500+" />
                    <StatPill label="Colleges" value="40+" />
                    <StatPill label="Prize Pool" value="₹1.5L+" />
                </div>
            </motion.div>
        </section>
    );
}

function SportCard({ sport, index }: any) {
    return (
        <div className="group relative flex-shrink-0 w-[280px] md:w-[320px] h-[400px]">
            {/* Card Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={sport.image}
                        alt={sport.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 90vw, 320px"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Sport Name */}
                    <motion.h3
                        className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight group-hover:text-neon-orange transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        {sport.name}
                    </motion.h3>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`h-1 flex-1 bg-gradient-to-r ${sport.color} rounded-full`} />
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Compete</span>
                    </div>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`} />

                {/* Corner Brackets */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/30 group-hover:border-neon-orange transition-colors duration-300" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/30 group-hover:border-neon-orange transition-colors duration-300" />
            </div>

            {/* Floating Particles on Hover */}
            <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-neon-orange rounded-full opacity-0 group-hover:opacity-100"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    );
}

function StatPill({ label, value }: { label: string; value: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm group cursor-pointer overflow-hidden"
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/0 via-neon-orange/10 to-neon-orange/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative z-10 text-center">
                <div className="text-2xl md:text-3xl font-black text-neon-orange mb-1">{value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
            </div>
        </motion.div>
    );
}
