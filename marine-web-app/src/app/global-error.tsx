"use client";

import { motion } from "framer-motion";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="ko">
            <body className="bg-marine-dark">
                <div className="min-h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-md"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertOctagon size={40} className="text-red-400" />
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-4">
                            심각한 오류가 발생했습니다
                        </h1>
                        <p className="text-white/60 mb-8">
                            애플리케이션에 문제가 발생했습니다.
                            <br />
                            페이지를 새로고침해주세요.
                        </p>

                        <button
                            onClick={reset}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 text-white rounded-full hover:bg-ocean-600 transition-colors"
                        >
                            <RefreshCcw size={18} />
                            새로고침
                        </button>
                    </motion.div>
                </div>
            </body>
        </html>
    );
}
