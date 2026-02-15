'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState, ReactNode, ReactElement } from 'react';

interface DockItemProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    mouseX: MotionValue;
    mouseY: MotionValue;
    spring: any;
    distance: number;
    magnification: number;
    baseItemSize: number;
    isVertical: boolean;
    position: 'top' | 'left' | 'bottom';
}

function DockItem({ children, className = '', onClick, mouseX, mouseY, spring, distance, magnification, baseItemSize, isVertical, position }: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(isVertical ? mouseY : mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            y: 0,
            width: baseItemSize,
            height: baseItemSize
        };
        if (isVertical) {
            return val - rect.y - baseItemSize / 2;
        } else {
            return val - rect.x - baseItemSize / 2;
        }
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center rounded-full bg-[#060010]/90 border-white/10 border shadow-lg backdrop-blur-md cursor-pointer transition-colors hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(227,114,51,0.3)] ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, (child) => cloneElement(child as ReactElement, { isHovered, position }))}
        </motion.div>
    );
}

function DockLabel({ children, className = '', ...rest }: any) {
    const { isHovered, position } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', (latest: number) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    // Dynamic Label Position Logic
    let labelClasses = "absolute left-1/2 -translate-x-1/2 w-fit whitespace-nowrap rounded-md border border-white/10 bg-[#060010]/90 px-3 py-1 text-xs text-white font-mono tracking-wider shadow-xl z-50 pointer-events-none";
    let initialAnim = {};
    let animateAnim = {};
    let exitAnim = {};

    if (position === 'top') {
        labelClasses += " top-full mt-2";
        initialAnim = { opacity: 0, y: -10, x: "-50%" };
        animateAnim = { opacity: 1, y: 0, x: "-50%" };
        exitAnim = { opacity: 0, y: -10, x: "-50%" };
    } else if (position === 'bottom') {
        labelClasses += " bottom-full mb-2";
        initialAnim = { opacity: 0, y: 10, x: "-50%" };
        animateAnim = { opacity: 1, y: 0, x: "-50%" };
        exitAnim = { opacity: 0, y: 10, x: "-50%" };
    } else { // left
        labelClasses = "absolute left-full ml-3 top-1/2 -translate-y-1/2 w-fit whitespace-nowrap rounded-md border border-white/10 bg-[#060010]/90 px-3 py-1 text-xs text-white font-mono tracking-wider shadow-xl z-50 pointer-events-none";
        initialAnim = { opacity: 0, x: -10, y: "-50%" };
        animateAnim = { opacity: 1, x: 0, y: "-50%" };
        exitAnim = { opacity: 0, x: -10, y: "-50%" };
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={initialAnim}
                    animate={animateAnim}
                    exit={exitAnim}
                    transition={{ duration: 0.2 }}
                    className={`${className} ${labelClasses}`}
                    role="tooltip"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`flex items-center justify-center text-white ${className}`}>{children}</div>;
}

interface DockProps {
    items: { icon: ReactNode; label: string; onClick: () => void; className?: string }[];
    className?: string;
    spring?: { mass: number; stiffness: number; damping: number };
    magnification?: number;
    distance?: number;
    panelHeight?: number;
    dockHeight?: number;
    baseItemSize?: number;
    position?: 'top' | 'left' | 'bottom';
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 80,
    distance = 200,
    panelHeight = 68,
    dockHeight = 256,
    baseItemSize = 50,
    position = 'top'
}: DockProps) {
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    // Fixed bottom positioning for consistent hydration
    const isVertical = position === 'left';

    // Responsive positioning via CSS: bottom on mobile/tablet, top on desktop (xl: 1280px+)
    const containerStyles = "fixed bottom-8 xl:bottom-auto xl:top-6 left-0 right-0 z-[9999] flex items-end xl:items-start justify-center pointer-events-none pb-[env(safe-area-inset-bottom)] xl:pb-0";

    const dockStyles = isVertical
        ? `${className} pointer-events-auto flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl py-4 px-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)]`
        : `${className} pointer-events-auto flex items-start gap-2 md:gap-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl pt-3 px-2 md:px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] max-w-[95vw] overflow-x-auto no-scrollbar`;

    return (
        <motion.div
            style={{
                height: isVertical ? 'auto' : height,
                width: isVertical ? 'auto' : undefined,
            }}
            className={containerStyles}
        >
            <motion.div
                onMouseMove={({ pageX, pageY }) => {
                    isHovered.set(1);
                    if (isVertical) {
                        mouseY.set(pageY);
                    } else {
                        mouseX.set(pageX);
                    }
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                    mouseY.set(Infinity);
                }}
                className={dockStyles}
                style={{
                    height: isVertical ? 'auto' : panelHeight,
                    width: isVertical ? panelHeight : 'auto'
                }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        isVertical={isVertical}
                        position={position}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
