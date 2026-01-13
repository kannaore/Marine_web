"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.error("Page Error:", error);

        // Entrance animation
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
            });
        }
        if (iconRef.current) {
            gsap.from(iconRef.current, {
                scale: 0.8,
                duration: 0.4,
                delay: 0.1,
            });
        }
    }, [error]);

    return (
        <div className="bg-marine-dark flex min-h-screen items-center justify-center px-6">
            <div ref={containerRef} className="max-w-md text-center">
                <div
                    ref={iconRef}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20"
                >
                    <AlertTriangle size={40} className="text-red-400" />
                </div>

                <h1 className="font-display mb-4 text-3xl font-bold text-white">
                    오류가 발생했습니다
                </h1>
                <p className="mb-8 text-white/60">
                    페이지를 불러오는 중 문제가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </p>

                {error.digest && (
                    <p className="mb-6 text-sm text-white/40">Error ID: {error.digest}</p>
                )}

                {process.env.NODE_ENV === "development" && (
                    <pre className="mb-6 max-h-40 overflow-auto rounded-lg bg-red-500/10 p-4 text-left text-xs text-red-400">
                        {error.message}
                        {"\n\n"}
                        {error.stack}
                    </pre>
                )}

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        onClick={reset}
                        className="bg-ocean-500 hover:bg-ocean-600 inline-flex items-center gap-2 rounded-full px-6 py-3 text-white transition-colors"
                    >
                        <RefreshCcw size={18} />
                        다시 시도
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white transition-colors hover:bg-white/20"
                    >
                        <Home size={18} />
                        홈으로 이동
                    </Link>
                </div>
            </div>
        </div>
    );
}
