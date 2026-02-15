'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { smartShuffle } from '@/utils/smartShuffle';
import { SPORTS_IMAGES } from '@/data/galleryImages';

// ... existing constants ...
const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 200;
const SPACING = 40;
const TILE_WIDTH = 5 * IMAGE_WIDTH + 5 * SPACING;
const TILE_HEIGHT = 5 * IMAGE_HEIGHT + 5 * SPACING;

// ... existing BASE_GRID ...
const BASE_GRID = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => ({
        x: col * (IMAGE_WIDTH + SPACING),
        y: row * (IMAGE_HEIGHT + SPACING),
    }))
).flat();

export default function SeamlessInfiniteGallery() {
    // Motion Values for performant updates
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics (optional, but good for drag momentum)
    const smoothX = useSpring(x, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(y, { damping: 50, stiffness: 400 });

    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Grid State (only updates when crossing tile boundaries)
    const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);

    // Mouse Pos for cursor (keep in React state or use MotionValue if causing re-renders)
    // Using motion value for cursor to avoid re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Initialize shuffled images on mount
    useEffect(() => {
        setShuffledImages(smartShuffle(SPORTS_IMAGES));
    }, []);

    // Update grid offset when motion values change significantly
    useMotionValueEvent(x, "change", (latest) => {
        const newGridX = Math.floor(-latest / TILE_WIDTH);
        if (newGridX !== gridOffset.x) {
            setGridOffset(prev => ({ ...prev, x: newGridX }));
        }
    });

    useMotionValueEvent(y, "change", (latest) => {
        const newGridY = Math.floor(-latest / TILE_HEIGHT);
        if (newGridY !== gridOffset.y) {
            setGridOffset(prev => ({ ...prev, y: newGridY }));
        }
    });

    const getTiledPositions = useCallback(() => {
        if (shuffledImages.length === 0) return [];

        const positions: Array<{ src: string; x: number; y: number; key: string }> = [];
        const centerX = gridOffset.x;
        const centerY = gridOffset.y;

        // Render 3x3 window around current tile
        for (let ty = centerY - 1; ty <= centerY + 1; ty++) {
            for (let tx = centerX - 1; tx <= centerX + 1; tx++) {
                BASE_GRID.forEach((pos, idx) => {
                    const tileRow = Math.floor(idx / 5);
                    const tileCol = idx % 5;
                    const globalRow = ty * 5 + tileRow;
                    const globalCol = tx * 5 + tileCol;
                    const linearIndex = globalRow * 5 + globalCol;

                    const len = shuffledImages.length;
                    const imageIndex = ((linearIndex % len) + len) % len;
                    const src = shuffledImages[imageIndex];

                    if (src) {
                        positions.push({
                            src,
                            x: pos.x + (tx * TILE_WIDTH),
                            y: pos.y + (ty * TILE_HEIGHT),
                            key: `${tx}-${ty}-${idx}`,
                        });
                    }
                });
            }
        }
        return positions;
    }, [gridOffset, shuffledImages]);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        if (!isDragging.current) return;

        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;

        x.set(x.get() + dx);
        y.set(y.get() + dy);

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleWheel = (e: React.WheelEvent) => {
        x.set(x.get() - e.deltaX);
        y.set(y.get() - e.deltaY);
    };

    const tiledPositions = getTiledPositions();


    return (
        <section
            className="relative w-screen h-screen overflow-hidden bg-[#050505] cursor-none select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        >
            {/* Custom Shuttlecock Cursor */}
            <motion.div
                className="fixed z-[100] pointer-events-none transition-transform duration-75 ease-out"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: isDragging.current ? 0.8 : 1, // Note: this scale ref won't trigger re-render, fine for now or use useTransform
                }}
            >
                <svg width="32" height="48" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    <path d="M20 5 L5 45 L35 45 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
                    <circle cx="20" cy="48" r="7" fill="#FFD700" />
                    <rect x="13" y="45" width="14" height="2" fill="#B22222" />
                </svg>
            </motion.div>

            {/* Tiled Canvas - Smooth unbounded world coordinate system */}
            <motion.div
                className="absolute inset-0"
                style={{
                    x: smoothX,
                    y: smoothY,
                    willChange: 'transform',
                }}
            >
                {tiledPositions.map((item) => (
                    <div
                        key={item.key}
                        className="absolute group"
                        style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            width: IMAGE_WIDTH,
                            height: IMAGE_HEIGHT,
                        }}
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:z-50 ring-1 ring-white/10 group-hover:ring-gold-500/50">
                            <Image
                                src={item.src}
                                alt="Spardha moment"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="320px"
                                draggable={false}
                                priority={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* HUD Info */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1 pointer-events-none">
                <div className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
                    Archive Link / System_Infinite
                </div>
                {/* Use a separate component or just hide coords if not needed, or use MotionValue to render text */}
                <MotionCoordDisplay x={x} y={y} shuffles={shuffledImages.length} />
            </div>
        </section>
    );
}

function MotionCoordDisplay({ x, y, shuffles }: { x: any, y: any, shuffles: number }) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useMotionValueEvent(x, "change", (latest) => {
        setCoords(prev => ({ ...prev, x: Math.round(latest as number) }));
    });
    useMotionValueEvent(y, "change", (latest) => {
        setCoords(prev => ({ ...prev, y: Math.round(latest as number) }));
    });

    return (
        <div className="text-white/10 font-mono text-[9px]">
            COORD: {coords.x}, {coords.y} | POOL: {shuffles}
        </div>
    );
}
