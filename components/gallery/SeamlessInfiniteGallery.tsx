'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { smartShuffle } from '@/utils/smartShuffle';
import { SPORTS_IMAGES } from '@/data/galleryImages';

// Game-world tiling configuration
const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 200;
const SPACING = 40;

// Calculate exact tile size based on 5x5 grid
const TILE_WIDTH = 5 * IMAGE_WIDTH + 5 * SPACING;
const TILE_HEIGHT = 5 * IMAGE_HEIGHT + 5 * SPACING;

// Create base grid coordinates for a clean 5x5 tile
const BASE_GRID = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => ({
        x: col * (IMAGE_WIDTH + SPACING),
        y: row * (IMAGE_HEIGHT + SPACING),
    }))
).flat();

export default function SeamlessInfiniteGallery() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    // Initialize shuffled images on mount
    useEffect(() => {
        setShuffledImages(smartShuffle(SPORTS_IMAGES));
    }, []);

    // Generate tiled positions based on the current viewport window
    const getTiledPositions = () => {
        try {
            if (shuffledImages.length === 0) return [];

            const positions: Array<{ src: string; x: number; y: number; key: string }> = [];

            // Determine which tile index the camera is currently over
            const centerX = Math.floor(-offset.x / TILE_WIDTH);
            const centerY = Math.floor(-offset.y / TILE_HEIGHT);

            // Render a 3x3 window of tiles around the camera (reduced from 5x5)
            for (let ty = centerY - 1; ty <= centerY + 1; ty++) {
                for (let tx = centerX - 1; tx <= centerX + 1; tx++) {
                    BASE_GRID.forEach((pos, idx) => {
                        // local row/col in the 5x5 tile
                        const tileRow = Math.floor(idx / 5);
                        const tileCol = idx % 5;

                        // global coordinate (in terms of image cells)
                        const globalRow = ty * 5 + tileRow;
                        const globalCol = tx * 5 + tileCol;

                        // Linear spatial index:
                        // Moving 1 cell right => index + 1
                        // Moving 1 cell down => index + 5
                        // This maintains local spatial coherence relative to the shuffled array
                        // "Smart Shuffle" ensures A[i] and A[i+1]...A[i+4] are distinct.
                        // So adjacent cells (horizontally and vertically) should be distinct events.
                        const linearIndex = globalRow * 5 + globalCol;

                        const len = shuffledImages.length;
                        // Safe python-like modulo
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
        } catch (error) {
            console.error("Error in getTiledPositions:", error);
            return [];
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
        if (!isDragging) return;

        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = requestAnimationFrame(() => {
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;
            setOffset({ x: newX, y: newY });
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = requestAnimationFrame(() => {
            setOffset(prev => ({
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            }));
        });
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
            <div
                className="fixed z-[100] pointer-events-none transition-transform duration-75 ease-out"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: `translate(-50%, -50%) scale(${isDragging ? 0.8 : 1})`,
                }}
            >
                <svg width="32" height="48" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    <path d="M20 5 L5 45 L35 45 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
                    <circle cx="20" cy="48" r="7" fill="#FFD700" />
                    <rect x="13" y="45" width="14" height="2" fill="#B22222" />
                </svg>
            </div>

            {/* Tiled Canvas - Smooth unbounded world coordinate system */}
            <div
                className="absolute inset-0"
                style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
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
            </div>

            {/* HUD Info */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1 pointer-events-none">
                <div className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
                    Archive Link / System_Infinite
                </div>
                <div className="text-white/10 font-mono text-[9px]">
                    COORD: {Math.round(offset.x)}, {Math.round(offset.y)} | POOL: {shuffledImages.length}
                </div>
            </div>
        </section>
    );
}
