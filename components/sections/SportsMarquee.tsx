import ScrollReveal from "@/components/ui/ScrollReveal";

import {
    FaFutbol,
    FaBasketballBall,
    FaVolleyballBall,
    FaTableTennis,
    FaRunning,
    FaGamepad
} from 'react-icons/fa';
import { MdSportsCricket } from 'react-icons/md';
import { GiShuttlecock } from 'react-icons/gi';

const SPORTS = [
    { name: "Cricket", icon: MdSportsCricket, color: "text-neon-blue" },
    { name: "Football", icon: FaFutbol, color: "text-emerald-400" },
    { name: "Basketball", icon: FaBasketballBall, color: "text-orange-400" },
    { name: "Volleyball", icon: FaVolleyballBall, color: "text-yellow-400" },
    { name: "Badminton", icon: GiShuttlecock, color: "text-pink-400" },
    { name: "E-Sports", icon: FaGamepad, color: "text-purple-400" },
];

export default function SportsMarquee() {
    return (
        <section className="relative w-full py-12 overflow-hidden bg-black border-y border-white/5">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>

            {/* CSS Animation Styles */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 60s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000px;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>

            <ScrollReveal>
                <div className="group flex overflow-hidden w-full">
                    <div className="animate-marquee hover:paused flex">
                        {[...SPORTS, ...SPORTS, ...SPORTS, ...SPORTS].map((sport, idx) => (
                            <div
                                key={idx}
                                className="relative flex items-center gap-4 px-8 py-6 mx-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 min-w-[250px] cursor-default"
                            >
                                <sport.icon className={`text-3xl ${sport.color} hover:scale-110 transition-transform duration-300`} />
                                <span className="text-xl font-bold font-gang text-gray-200 tracking-wide uppercase hover:text-white transition-colors">
                                    {sport.name}
                                </span>

                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
