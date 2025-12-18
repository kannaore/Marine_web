"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Page Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-marine-dark flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
                >
                    <AlertTriangle size={40} className="text-red-400" />
                </motion.div>

                <h1 className="font-display text-3xl font-bold text-white mb-4">
                    오류가 발생했습니다
                </h1>
                <p className="text-white/60 mb-8">
                    페이지를 불러오는 중 문제가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </p>

                {error.digest && (
                    <p className="text-white/40 text-sm mb-6">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Debug: Show error message in development */}
                {process.env.NODE_ENV === 'development' && (
                    <pre className="text-left text-xs text-red-400 bg-red-500/10 p-4 rounded-lg mb-6 overflow-auto max-h-40">
                        {error.message}
                        {'\n\n'}
                        {error.stack}
                    </pre>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 text-white rounded-full hover:bg-ocean-600 transition-colors"
                    >
                        <RefreshCcw size={18} />
                        다시 시도
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                    >
                        <Home size={18} />
                        홈으로 이동
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
