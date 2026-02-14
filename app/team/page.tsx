'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

// Placeholder for the background image
const bg1 = '/assets/images/media_1.jpeg';

const teamMembers = [
    {
        role: 'Faculty Coordinators',
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        members: [
            {
                name: 'Vijay Chellobonia',
                position: 'Vice-Chancellor',
                bio: 'Leading strategic initiatives with 15+ years of experience in sports management and academic excellence.'
            },
            {
                name: 'Deepak Sogani',
                position: 'Students Affairs - HEAD',
                bio: 'Championing athletic development and fostering a culture of sportsmanship across the institution.'
            }
        ]
    },
    {
        role: 'Organizing Heads',
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        members: [
            {
                name: 'Naman Shukla',
                position: 'Organizing Head',
                image: '/assets/Core_photos/NamanShuklaOH.jpg',
                bio: 'Orchestrating the vision and strategic execution of Spardha 2026.'
            },
            // {
            //     name: 'Arjun Tanwar',
            //     position: 'All Sports Core',
            //     image: '/assets/Core_photos/ArjunSinghTanwar.jpg',
            //     bio: 'Driving technical excellence and inter-departmental sports synergy.'
            // },
            {
                name: 'Garv Sharma',
                position: 'Organizing Head',
                bio: 'Seamlessly managing event operations and student collaboration.'
            },
            {
                name: 'Ashmit Sharma',
                position: 'Organizing Head',
                bio: 'Bridging administration and on-ground execution for India\'s premier sports fest.'
            }
        ]
    },
    {
        role: 'Core Committees',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        members: [
            { name: 'Tanik Gupta', position: 'Discipline Head', image: '/assets/Core_photos/TanikGupta_Core_Discipline.jpg' },
            { name: 'Kartik Sharma', position: 'Internal Arrangements', image: '/assets/Core_photos/KartikSharma.jpg' },
            { name: 'Roshan Jangir', position: 'Photography & Social Media', image: '/assets/Core_photos/Roshan_jangir.jpg' },
            { name: 'Smile Chhabra', position: 'Prize & Certificate', image: '/assets/Core_photos/Smilechhabra.jpeg' },
            { name: 'Jheel Jain', position: 'Prize & Certificate', image: '/assets/Core_photos/JheelJain.jpg' },
            { name: 'Satvik Agrawal', position: 'Food & Accommodation', image: '/assets/Core_photos/SatvikSharma.webp' },
            { name: 'Shlok Chaturvedi', position: 'First Aid Head', image: '/assets/Core_photos/ShlokChaturvedi.jpg' },
            { name: 'Parineeta Jain', position: 'Sponsorship & Promotion', image: '/assets/Core_photos/ParineetaJain.jpg' },
            { name: 'Gourang Tak', position: 'Transportation Head', image: '/assets/Core_photos/GourangTak.jpg' },
            { name: 'Rishika Sharma', position: 'Registration Head', image: '/assets/Core_photos/Rishikasharma.jpeg' },
            { name: 'Akshali Srivastava', position: 'Media Head', image: '/assets/Core_photos/AkshaliSrivastava.jpg' },
            { name: 'Yash Bansal', position: 'Tech & Support Head' }
        ]
    },
    {
        role: 'Sports Heads',
        gradient: 'from-orange-500 via-red-500 to-pink-500',
        members: [
            { name: 'Arjun Singh Tanwar', position: 'All Sports Core', image: '/assets/Core_photos/ArjunSinghTanwar.jpg' },
            { name: 'Harshveer Singh Rathore', position: 'Leather Cricket Head', image: '/assets/Core_photos/Harshveercricketcore.jpg' },
            { name: 'Vansh Sharma', position: 'Basketball Head', image: '/assets/Core_photos/Vanshbasketballcore.PNG' },
            { name: 'Mayank Gautam', position: 'E-Sports Head', image: '/assets/Core_photos/MayankGautam.png' },
            { name: 'Shiva Shankar', position: 'Kabaddi & Kho-Kho Head', image: '/assets/Core_photos/ShivaShankar.jpg' },
            { name: 'Mayank Shankar Pathak', position: 'Box Cricket Head', image: '/assets/Core_photos/MayankShankarPathak.jpg' },
            { name: 'Himanshu Gurjar', position: 'Volleyball Head' },
            { name: 'Gaurav Singh Bora', position: 'Football Head' },
            { name: 'Akshit Singhal', position: 'Badminton Head' },
            { name: 'Mukul Lakra', position: 'Indoor Games Head' }
        ]
    }
];


const Team = () => {
    // Check if we are in the browser to safely use window
    const isFullPage = typeof window !== 'undefined' ? window.location.pathname === '/team' : true;
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const [hoveredEditorial, setHoveredEditorial] = useState<string | null>(null);

    const content = (
        <div className={isFullPage ? 'min-h-screen bg-black pt-24' : ''}>
            {isFullPage && <Navbar />}
            {isFullPage && (
                <section className="section-padding bg-black">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-spardha-text mb-6">
                                Meet The <span className="text-spardha-gold">Team</span>
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-spardha-textMuted max-w-4xl mx-auto px-4 sm:px-0">
                                The dedicated individuals working tirelessly to make Spardha 2026 an unforgettable experience
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            <section id="team" className={`${isFullPage ? 'section-padding' : 'min-h-screen section-padding'} bg-black`}>
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    {!isFullPage && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-spardha-text mb-4">
                                The <span className="text-spardha-gold">Architects</span>
                            </h2>
                            <div className="w-24 h-1 bg-spardha-gold mx-auto rounded-full"></div>
                        </motion.div>
                    )}

                    <div className="space-y-24">
                        {teamMembers.map((category, catIndex) => (
                            <div key={catIndex}>
                                {/* Category Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-12"
                                >
                                    <h3 className="text-xl font-semibold text-spardha-textMuted uppercase tracking-widest mb-2 text-center">
                                        {category.role}
                                    </h3>
                                    <div className="w-16 h-[1px] bg-spardha-gold/40 mx-auto"></div>
                                </motion.div>

                                {/* EDITORIAL MINIMALIST DESIGN FOR FIRST TWO CATEGORIES */}
                                {catIndex < 2 ? (
                                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                        {category.members.map((member, memIndex) => {
                                            const cardId = `${catIndex}-${memIndex}`;
                                            const isHovered = hoveredEditorial === cardId;

                                            return (
                                                <motion.div
                                                    key={memIndex}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: memIndex * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                    onMouseEnter={() => setHoveredEditorial(cardId)}
                                                    onMouseLeave={() => setHoveredEditorial(null)}
                                                    className="group"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            height: isHovered ? '560px' : '480px'
                                                        }}
                                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                        className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
                                                    >
                                                        {/* Image Container */}
                                                        <div className="relative h-full overflow-hidden">
                                                            {/* Gradient Image Placeholder */}
                                                            <motion.div
                                                                animate={{
                                                                    filter: isHovered ? 'blur(0px) grayscale(0%)' : 'blur(8px) grayscale(60%)',
                                                                    scale: isHovered ? 1.05 : 1
                                                                }}
                                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                                className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
                                                            >
                                                                {/* Member Image */}
                                                                {/* @ts-expect-error: image exists on some members */}
                                                                {member.image && (
                                                                    <div
                                                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                                                        style={{ backgroundImage: `url(${member.image})` }}
                                                                    ></div>
                                                                )}

                                                                {/* Subtle Pattern */}
                                                                <div className="absolute inset-0 opacity-20" style={{
                                                                    backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                                                                    backgroundSize: '30px 30px'
                                                                }}></div>

                                                                {/* Large Initials as "Portrait" */}
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white/25">
                                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                                    </span>
                                                                </div>
                                                            </motion.div>

                                                            {/* Gradient Overlays */}
                                                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

                                                            {/* Position Label - Top */}
                                                            <motion.div
                                                                animate={{
                                                                    y: isHovered ? '-60px' : '0px',
                                                                    opacity: isHovered ? 0 : 1
                                                                }}
                                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                                className="absolute top-0 left-0 right-0 p-6"
                                                            >
                                                                <p className="text-xs text-white/80 uppercase tracking-widest font-light">
                                                                    {member.position}
                                                                </p>
                                                            </motion.div>

                                                            {/* Bio - Center by default, slides to bottom on hover */}
                                                            <motion.div
                                                                animate={{
                                                                    y: isHovered ? '240px' : '0px'
                                                                }}
                                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                                className="absolute inset-0 flex items-center justify-center px-8"
                                                            >
                                                                <p className="text-sm text-white/90 leading-relaxed text-center font-light">
                                                                    {member.bio}
                                                                </p>
                                                            </motion.div>

                                                            {/* Name - Bottom by default, slides down on hover */}
                                                            <motion.div
                                                                animate={{
                                                                    y: isHovered ? '80px' : '0px'
                                                                }}
                                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-spardha-base via-spardha-base/95 to-transparent"
                                                            >
                                                                <h4 className="text-2xl font-semibold text-spardha-text tracking-tight">
                                                                    {member.name}
                                                                </h4>
                                                            </motion.div>

                                                            {/* Social Links Section - Revealed on Hover */}
                                                            <AnimatePresence>
                                                                {isHovered && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, y: 20 }}
                                                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                                                        className="absolute bottom-0 left-0 right-0 bg-spardha-base/95 backdrop-blur-md p-6"
                                                                    >
                                                                        {/* Divider */}
                                                                        <div className="w-12 h-[1px] bg-spardha-gold/60 mb-4"></div>

                                                                        {/* Social Links - Minimal */}
                                                                        <div className="flex gap-3">
                                                                            <a
                                                                                href="#"
                                                                                className="w-10 h-10 rounded-full border border-spardha-gold/30 flex items-center justify-center text-spardha-textMuted hover:text-spardha-gold hover:border-spardha-gold transition-all duration-300"
                                                                                aria-label="LinkedIn"
                                                                            >
                                                                                <FaLinkedin className="text-sm" />
                                                                            </a>
                                                                            <a
                                                                                href="#"
                                                                                className="w-10 h-10 rounded-full border border-spardha-gold/30 flex items-center justify-center text-spardha-textMuted hover:text-spardha-gold hover:border-spardha-gold transition-all duration-300"
                                                                                aria-label="Instagram"
                                                                            >
                                                                                <FaInstagram className="text-sm" />
                                                                            </a>
                                                                            <a
                                                                                href="#"
                                                                                className="w-10 h-10 rounded-full border border-spardha-gold/30 flex items-center justify-center text-spardha-textMuted hover:text-spardha-gold hover:border-spardha-gold transition-all duration-300"
                                                                                aria-label="Email"
                                                                            >
                                                                                <FaEnvelope className="text-sm" />
                                                                            </a>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>

                                                        {/* Subtle Shadow on Hover */}
                                                        <motion.div
                                                            animate={{
                                                                opacity: isHovered ? 1 : 0
                                                            }}
                                                            transition={{ duration: 0.4 }}
                                                            className="absolute inset-0 -z-10 blur-2xl bg-spardha-gold/10 scale-95"
                                                        ></motion.div>
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* ACCORDION DESIGN FOR OTHER CATEGORIES */
                                    <>
                                        <div
                                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap gap-4 lg:gap-2 p-4 max-w-full overflow-hidden"
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            {category.members.map((member, memIndex) => {
                                                const globalIndex = `${catIndex}-${memIndex}`;
                                                const isHovered = hoveredIndex === globalIndex;
                                                const isAnyHovered = hoveredIndex !== null && hoveredIndex.startsWith(`${catIndex}-`);

                                                return (
                                                    <motion.div
                                                        key={memIndex}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: memIndex * 0.05, duration: 0.4 }}
                                                        onMouseEnter={() => setHoveredIndex(globalIndex)}
                                                        className="group relative transition-all duration-500 ease-out"
                                                        style={{
                                                            flex: isHovered ? '5' : '1',
                                                            minWidth: isAnyHovered && !isHovered ? '40px' : '90px',
                                                            maxWidth: isHovered ? '450px' : '220px'
                                                        }}
                                                    >
                                                        <div className="relative bg-spardha-base rounded-2xl overflow-hidden border border-spardha-gold/10 hover:border-spardha-gold/40 transition-all duration-500 h-[400px] hover:shadow-2xl hover:shadow-spardha-gold/20">
                                                            <div className="relative h-full overflow-hidden">
                                                                {/* @ts-expect-error: image exists on some members */}
                                                                {member.image || category.img ? (
                                                                    <>
                                                                        <div
                                                                            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                                                                            /* @ts-expect-error: image exists on some members */
                                                                            style={{ backgroundImage: `url(${member.image || category.img})` }}
                                                                        ></div>
                                                                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                                                    </>
                                                                ) : (
                                                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                                                )}


                                                                <div className="absolute inset-0 opacity-20" style={{
                                                                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                                                                    backgroundSize: '20px 20px'
                                                                }}></div>

                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className={`font-heading font-black text-white/30 group-hover:text-white/40 transition-all duration-500 ${isHovered ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-4xl sm:text-5xl md:text-6xl'}`}>
                                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                                    </span>
                                                                </div>

                                                                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-spardha-base via-spardha-base to-transparent p-6 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                                                    <h4 className="text-lg md:text-xl font-bold text-spardha-text mb-2 group-hover:text-spardha-gold transition-colors leading-tight">
                                                                        {member.name}
                                                                    </h4>
                                                                    <p className="text-sm text-spardha-textMuted mb-4 leading-tight">
                                                                        {member.position}
                                                                    </p>
                                                                    <div className={`h-[2px] w-16 mb-4 bg-gradient-to-r ${category.gradient}`}></div>
                                                                    <div className="flex gap-2">
                                                                        <a href="#" className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white hover:scale-110 transition-transform`} aria-label="LinkedIn">
                                                                            <FaLinkedin className="text-sm" />
                                                                        </a>
                                                                        <a href="#" className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white hover:scale-110 transition-transform`} aria-label="Instagram">
                                                                            <FaInstagram className="text-sm" />
                                                                        </a>
                                                                        <a href="#" className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white hover:scale-110 transition-transform`} aria-label="Email">
                                                                            <FaEnvelope className="text-sm" />
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                {isAnyHovered && !isHovered && (
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <div className="transform -rotate-90 whitespace-nowrap">
                                                                            <span className="text-white font-bold text-sm tracking-wider">
                                                                                {member.name.split(' ')[0]}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* View Committee Button - Shows on Hover */}
                                                                {isHovered && (
                                                                    <motion.button
                                                                        initial={{ opacity: 0, y: -10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: 0.2 }}
                                                                        onClick={() => setHoveredIndex(`modal-${catIndex}`)}
                                                                        className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${category.gradient} text-white text-xs font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg`}
                                                                    >
                                                                        View Committee
                                                                    </motion.button>
                                                                )}
                                                            </div>
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Modal Overlay - Polaroid Cards */}
                                        <AnimatePresence>
                                            {hoveredIndex === `modal-${catIndex}` && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
                                                    onClick={() => setHoveredIndex(null)}
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.9, opacity: 0 }}
                                                        transition={{ type: "spring", duration: 0.5 }}
                                                        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-spardha-baseLight rounded-3xl p-8"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {/* Close Button */}
                                                        <button
                                                            onClick={() => setHoveredIndex(null)}
                                                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-spardha-base border border-spardha-gold/30 flex items-center justify-center text-spardha-gold hover:bg-spardha-gold hover:text-spardha-base transition-all z-10"
                                                        >
                                                            ✕
                                                        </button>

                                                        {/* Modal Header */}
                                                        <div className="text-center mb-8">
                                                            <h3 className="text-3xl font-heading font-bold text-spardha-gold mb-2">
                                                                {category.role}
                                                            </h3>
                                                            <p className="text-spardha-textMuted">Meet the full committee</p>
                                                        </div>

                                                        {/* Coordinators Section */}
                                                        <div className="mb-12">
                                                            <h4 className="text-xl font-heading font-bold text-spardha-text mb-6 flex items-center gap-2">
                                                                <span className={`w-1 h-6 bg-gradient-to-b ${category.gradient} rounded-full`}></span>
                                                                Coordinators
                                                            </h4>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                                {category.members.slice(0, 2).map((member, idx) => (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{ opacity: 0, y: 20, rotate: -5 }}
                                                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                                                        transition={{ delay: idx * 0.1 }}
                                                                        whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
                                                                        className="group cursor-pointer"
                                                                    >
                                                                        {/* Polaroid Card */}
                                                                        <div className="bg-white p-3 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                                                                            {/* Photo Area */}
                                                                            <div className={`relative aspect-square bg-gradient-to-br ${category.gradient} rounded-md mb-3 overflow-hidden`}>
                                                                                {/* Member Image */}
                                                                                {/* @ts-expect-error: image exists on some members */}
                                                                                {member.image && (
                                                                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }}></div>
                                                                                )}

                                                                                {/* Pattern */}
                                                                                <div className="absolute inset-0 opacity-20" style={{
                                                                                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                                                                    backgroundSize: '15px 15px'
                                                                                }}></div>


                                                                                {/* Initials */}
                                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                                    <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white/40">
                                                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                                                    </span>
                                                                                </div>

                                                                                {/* Coordinator Badge */}
                                                                                <div className={`absolute top-2 right-2 px-2 py-1 bg-gradient-to-r ${category.gradient} rounded text-white text-xs font-bold`}>
                                                                                    Lead
                                                                                </div>
                                                                            </div>

                                                                            {/* Caption Area */}
                                                                            <div className="text-center">
                                                                                <h4 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
                                                                                    {member.name}
                                                                                </h4>
                                                                                <p className="text-xs text-gray-600 leading-tight">
                                                                                    {member.position}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Volunteers Section */}
                                                        {category.members.length > 2 && (
                                                            <div>
                                                                <h4 className="text-xl font-heading font-bold text-spardha-text mb-6 flex items-center gap-2">
                                                                    <span className={`w-1 h-6 bg-gradient-to-b ${category.gradient} rounded-full`}></span>
                                                                    Volunteers
                                                                </h4>
                                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                                    {category.members.slice(2).map((member, idx) => (
                                                                        <motion.div
                                                                            key={idx + 2}
                                                                            initial={{ opacity: 0, y: 20, rotate: -5 }}
                                                                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                                                                            transition={{ delay: (idx + 2) * 0.1 }}
                                                                            whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
                                                                            className="group cursor-pointer"
                                                                        >
                                                                            {/* Polaroid Card */}
                                                                            <div className="bg-white p-3 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                                                                                {/* Photo Area */}
                                                                                <div className={`relative aspect-square bg-gradient-to-br ${category.gradient} rounded-md mb-3 overflow-hidden`}>
                                                                                    {/* Member Image */}
                                                                                    {/* @ts-expect-error: image exists on some members */}
                                                                                    {member.image && (
                                                                                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }}></div>
                                                                                    )}

                                                                                    {/* Pattern */}
                                                                                    <div className="absolute inset-0 opacity-20" style={{
                                                                                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                                                                        backgroundSize: '15px 15px'
                                                                                    }}></div>

                                                                                    {/* Initials */}
                                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                                        <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white/40">
                                                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Caption Area */}
                                                                                <div className="text-center">
                                                                                    <h4 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
                                                                                        {member.name}
                                                                                    </h4>
                                                                                    <p className="text-xs text-gray-600 leading-tight">
                                                                                        {member.position}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );

    return content;
};

export default Team;
