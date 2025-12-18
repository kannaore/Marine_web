"use client";

import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-marine-dark flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-ocean-500/20 flex items-center justify-center">
                    <Compass size={48} className="text-ocean-400" />
                </div>

                <h1 className="font-display text-6xl font-bold text-white mb-4">
                    404
                </h1>
                <h2 className="font-display text-2xl font-semibold text-white mb-4">
                    페이지를 찾을 수 없습니다
                </h2>
                <p className="text-white/60 mb-8">
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 text-white rounded-full hover:bg-ocean-600 transition-colors"
                    >
                        <Home size={18} />
                        홈으로 이동
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        이전 페이지
                    </button>
                </div>
            </div>
        </div>
    );
}
