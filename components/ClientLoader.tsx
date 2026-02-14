"use client";

import { useState, useEffect } from "react";
import SpardhaLoader from "@/components/ui/SpardhaLoader";
import { usePathname } from "next/navigation";

export default function ClientLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Check if we've already shown the loader in this session
        const hasLoaded = sessionStorage.getItem("hasLoaded");
        if (hasLoaded) {
            setIsLoading(false);
        }
    }, []);

    const handleComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
    };

    return (
        <>
            {isLoading && (
                <SpardhaLoader
                    onComplete={handleComplete}
                    className="z-[9999]"
                />
            )}
            {children}
        </>
    );
}
