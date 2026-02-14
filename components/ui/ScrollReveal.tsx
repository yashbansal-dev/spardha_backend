'use client';

import { motion, useInView, useAnimation, Variant } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
    threshold?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    yOffset = 50,
    threshold = 0.2
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: `0px 0px -${threshold * 100}px 0px` as any });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={mainControls}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
