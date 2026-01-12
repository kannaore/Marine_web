"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
            });
        }
    }, []);

    return (
        <html lang="ko">
            <body className="bg-marine-dark">
                <div className="flex min-h-screen items-center justify-center px-6">
                    <div ref={containerRef} className="max-w-md text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
                            <AlertOctagon size={40} className="text-red-400" />
                        </div>

                        <h1 className="mb-4 text-3xl font-bold text-white">
                            심각한 오류가 발생했습니다
                        </h1>
                        <p className="mb-8 text-white/60">
                            애플리케이션에 문제가 발생했습니다.
                            <br />
                            페이지를 새로고침해주세요.
                        </p>

                        <button
                            onClick={reset}
                            className="bg-ocean-500 hover:bg-ocean-600 inline-flex items-center gap-2 rounded-full px-6 py-3 text-white transition-colors"
                        >
                            <RefreshCcw size={18} />
                            새로고침
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
