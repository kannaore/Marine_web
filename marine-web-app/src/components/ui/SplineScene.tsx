"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
    ssr: false,
    loading: () => null,
});

interface SplineSceneProps {
    scene: string;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
}

export function SplineScene({ scene, className, onLoad, onError }: SplineSceneProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = useCallback(
        (spline: Application) => {
            setIsLoaded(true);
            onLoad?.();
        },
        [onLoad]
    );

    // Timeout fallback - if Spline doesn't load in 10 seconds, trigger onLoad anyway
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoaded) {
                console.warn("Spline scene failed to load, using fallback");
                setHasError(true);
                onLoad?.(); // Trigger animation anyway
                onError?.();
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [isLoaded, onLoad, onError]);

    if (hasError) {
        // Fallback gradient background when Spline fails
        return (
            <div 
                className={className}
                style={{
                    background: "radial-gradient(ellipse at center, #0a2540 0%, #000814 50%, #000000 100%)",
                }}
            />
        );
    }

    return (
        <div className={className}>
            <Spline
                scene={scene}
                onLoad={handleLoad}
                style={{
                    width: "100%",
                    height: "100%",
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.8s ease-out",
                }}
            />
        </div>
    );
}
