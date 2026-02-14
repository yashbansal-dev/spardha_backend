'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const HERO_IMAGES = [
    '/assets/images/media_1.jpeg',
    '/assets/images/media_2.jpeg',
    '/assets/images/media_3.jpeg',
    '/assets/images/media_4.jpeg',
    '/assets/images/media_5.jpeg',
    '/assets/images/media_6.jpeg',
];

export default function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(timer);
    }, []);

    // Parallax logic
    const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
    const contentY = useTransform(scrollY, [0, 600], [0, 150]);
    const textParallax = useTransform(scrollY, [0, 500], [0, -50]);

    // Mouse Parallax for subtle depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 20; // Reduced sensitivity
            const y = (e.clientY / innerHeight - 0.5) * 20;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            ref={ref}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#000]"
        >
            {/* --- BACKGROUND: Premium Depth & Slideshow --- */}

            {/* 0. Slideshow Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url("${HERO_IMAGES[currentImageIndex]}")`,
                            filter: 'brightness(0.5) contrast(1.1)',
                        }}
                        initial={{
                            opacity: 0,
                            scale: 1,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1.05, // Subtle Ken Burns zoom
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.05,
                        }}
                        transition={{
                            opacity: { duration: 1.2, ease: "easeInOut" },
                            scale: { duration: 7, ease: "linear" } // Slow zoom during display
                        }}
                    />
                </AnimatePresence>

                {/* Fallback/Base background */}
                <div className="absolute inset-0 bg-[#000] -z-10"></div>

                {/* Overlay Gradient to blend with black bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
            </motion.div>

            {/* 1. Noise Filter (Film Grain) */}
            <div className="bg-noise mix-blend-overlay"></div>

            {/* 2. Perspective Grid (Floor) */}
            <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-grid-perspective opacity-40 z-10 pointer-events-none"></div>

            {/* 3. Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none z-5"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none z-5"></div>

            {/* --- CONTENT --- */}
            <motion.div
                className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center p-4"
                style={{ y: contentY }}
            >
                <div className="relative w-full flex flex-col items-center justify-center">

                    {/* Background "Watermark" Text */}
                    <motion.h1
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[22rem] font-black leading-none select-none pointer-events-none text-stroke opacity-5 whitespace-nowrap z-0"
                        style={{
                            y: textParallax,
                            x: mouseX,
                        }}
                    >
                        VICTORY
                    </motion.h1>

                    {/* Foreground Content Stack */}
                    <div className="relative z-10 flex flex-col items-center text-center">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <span className="text-neon-cyan tracking-[0.3em] text-xs md:text-sm font-bold font-gang font-restore uppercase">JK Lakshmipat University Presents</span>
                        </motion.div>

                        {/* Main Title - Clean & Bold */}
                        <motion.h2
                            className="text-[14vw] sm:text-[15vw] md:text-[9rem] font-black tracking-tighter text-white uppercase leading-none mb-2 font-gang"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}

                        >
                            SPARDHA
                        </motion.h2>

                        {/* Year - Neon Accent */}
                        <motion.div
                            className="relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <h3 className="text-4xl sm:text-[3rem] md:text-[5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-red-600 italic tracking-wide transform -skew-x-12">
                                2026
                            </h3>
                        </motion.div>

                        {/* Prize Pool */}
                        <motion.div
                            className="mt-8 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                                Prize Pool Worth Over{" "}
                                <span className="text-neon-cyan font-bold">₹1,50,000+</span>
                            </p>
                        </motion.div>

                        {/* Unique Holographic Register Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mt-2"
                        >
                            <Link
                                href="/register"
                                className="group relative inline-block"
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                                }}
                            >
                                {/* Outer glow container */}
                                <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-neon-cyan via-neon-orange to-neon-purple animate-gradient-rotate overflow-hidden">

                                    {/* Animated border shine */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-border-flow"></div>
                                    </div>

                                    {/* Button content */}
                                    <div className="relative bg-black rounded-xl px-10 py-5 flex items-center gap-4 overflow-hidden">

                                        {/* Magnetic hover spotlight */}
                                        <div
                                            className="absolute w-40 h-40 rounded-full bg-neon-orange/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            style={{
                                                left: 'var(--mouse-x, 50%)',
                                                top: 'var(--mouse-y, 50%)',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        ></div>

                                        {/* Grid pattern overlay */}
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                                        {/* Scan line effect */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent h-full animate-scan-line"></div>

                                        {/* Corner accents */}
                                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-cyan opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-orange opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-orange opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-cyan opacity-60 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Text with glitch effect */}
                                        <span className="relative z-10 text-xl font-black tracking-wider text-white group-hover:text-neon-cyan transition-colors duration-300">
                                            <span className="relative inline-block">
                                                REGISTER NOW
                                                {/* Glitch layers */}
                                                <span className="absolute inset-0 text-neon-orange opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1" aria-hidden="true">REGISTER NOW</span>
                                                <span className="absolute inset-0 text-neon-cyan opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2" aria-hidden="true">REGISTER NOW</span>
                                            </span>
                                        </span>

                                        {/* Animated arrow with trail */}
                                        <div className="relative z-10">
                                            <FaArrowRight className="text-neon-orange group-hover:text-neon-cyan transition-all duration-300 group-hover:translate-x-1 text-xl" />
                                            <FaArrowRight className="absolute inset-0 text-neon-cyan opacity-0 group-hover:opacity-50 group-hover:translate-x-3 transition-all duration-300 blur-sm text-xl" />
                                        </div>

                                        {/* Energy particles */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute w-1 h-1 bg-neon-cyan rounded-full top-1/4 left-1/4 opacity-0 group-hover:opacity-100 group-hover:animate-particle-1"></div>
                                            <div className="absolute w-1 h-1 bg-neon-orange rounded-full top-3/4 left-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-particle-2"></div>
                                            <div className="absolute w-1 h-1 bg-neon-purple rounded-full top-1/2 right-1/4 opacity-0 group-hover:opacity-100 group-hover:animate-particle-3"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Outer glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-orange/20 to-neon-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-xl"></div>
                            </Link>
                        </motion.div>

                    </div>


                </div>
            </motion.div>

            {/* Bottom Vignette */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
