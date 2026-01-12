"use client";

import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="bg-marine-dark flex min-h-screen items-center justify-center px-6">
            <div className="max-w-md text-center">
                <div className="bg-ocean-500/20 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full">
                    <Compass size={48} className="text-ocean-400" />
                </div>

                <h1 className="font-display mb-4 text-6xl font-bold text-white">404</h1>
                <h2 className="font-display mb-4 text-2xl font-semibold text-white">
                    페이지를 찾을 수 없습니다
                </h2>
                <p className="mb-8 text-white/60">
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="bg-ocean-500 hover:bg-ocean-600 inline-flex items-center gap-2 rounded-full px-6 py-3 text-white transition-colors"
                    >
                        <Home size={18} />
                        홈으로 이동
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white transition-colors hover:bg-white/20"
                    >
                        <ArrowLeft size={18} />
                        이전 페이지
                    </button>
                </div>
            </div>
        </div>
    );
}
