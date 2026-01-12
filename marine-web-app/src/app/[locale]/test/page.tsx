"use client";

import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container, Section } from "@/components/ui";
import { ThreeCanvas } from "@/components/ui/ThreeCanvas";
import { EmblaCarousel, CardCarousel } from "@/components/ui/EmblaCarousel";

const isE2E = process.env.NEXT_PUBLIC_E2E === "1";

// Demo card component
function DemoCard({ title, color }: { title: string; color: string }) {
    return (
        <div
            className="flex h-64 items-center justify-center rounded-2xl text-2xl font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
        >
            {title}
        </div>
    );
}

// GSAP Animation Demo Section
function GSAPDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxesRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(".gsap-box", {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: boxesRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            gsap.to(".parallax-text", {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            <Section className="bg-gradient-to-b from-slate-900 to-slate-800">
                <Container>
                    <h2 className="mb-8 text-4xl font-bold text-white">GSAP ScrollTrigger 데모</h2>
                    <p className="mb-12 text-white/60">
                        스크롤하면 아래 박스들이 순차적으로 애니메이션됩니다.
                    </p>

                    <div ref={boxesRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {["#0066cc", "#00a8e8", "#003d5b", "#00cc88", "#cc6600", "#cc0066"].map(
                            (color, i) => (
                                <div
                                    key={i}
                                    className="gsap-box flex h-48 items-center justify-center rounded-2xl text-xl font-bold text-white backdrop-blur-md"
                                    style={{
                                        background: `linear-gradient(135deg, ${color}66, ${color}33)`,
                                        border: `1px solid ${color}44`,
                                    }}
                                >
                                    Box {i + 1}
                                </div>
                            )
                        )}
                    </div>
                </Container>
            </Section>

            {/* Parallax Section */}
            <Section className="parallax-section relative flex h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
                <h2 className="parallax-text absolute text-8xl font-bold text-white/10">
                    PARALLAX EFFECT
                </h2>
                <p className="relative z-10 text-2xl text-white">
                    스크롤하면 배경 텍스트가 다른 속도로 움직입니다
                </p>
            </Section>
        </div>
    );
}

// GSAP-only Interactive Demo Section
function InteractiveDemo() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = Array.from(containerRef.current.querySelectorAll(".interactive-card"));
        const listeners = cards.map((card) => {
            const enterHandler = () => {
                gsap.to(card, { scale: 1.05, y: -10, duration: 0.3, ease: "power2.out" });
            };
            const leaveHandler = () => {
                gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
            };
            card.addEventListener("mouseenter", enterHandler);
            card.addEventListener("mouseleave", leaveHandler);
            return { card, enterHandler, leaveHandler };
        });

        return () => {
            listeners.forEach(({ card, enterHandler, leaveHandler }) => {
                card.removeEventListener("mouseenter", enterHandler);
                card.removeEventListener("mouseleave", leaveHandler);
            });
        };
    }, []);

    return (
        <Section className="bg-gradient-to-b from-slate-900 to-slate-800">
            <Container>
                <h2 className="mb-8 text-4xl font-bold text-white">GSAP 인터랙션 데모</h2>
                <p className="mb-12 text-white/60">GSAP을 사용한 호버 인터랙션 테스트</p>

                <div ref={containerRef} className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="interactive-card flex h-48 cursor-pointer items-center justify-center rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/50 to-purple-700/50 text-white backdrop-blur-md">
                        <div className="text-center">
                            <p className="text-lg font-bold">Hover Scale</p>
                            <p className="text-sm text-white/60">호버시 확대</p>
                        </div>
                    </div>

                    <div className="interactive-card flex h-48 cursor-pointer items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/50 to-cyan-700/50 text-white backdrop-blur-md">
                        <div className="text-center">
                            <p className="text-lg font-bold">Smooth Motion</p>
                            <p className="text-sm text-white/60">부드러운 움직임</p>
                        </div>
                    </div>

                    <div className="interactive-card flex h-48 cursor-pointer items-center justify-center rounded-2xl border border-green-400/30 bg-gradient-to-br from-green-500/50 to-green-700/50 text-white backdrop-blur-md">
                        <div className="text-center">
                            <p className="text-lg font-bold">GSAP Power</p>
                            <p className="text-sm text-white/60">GSAP 애니메이션</p>
                        </div>
                    </div>

                    <div className="interactive-card flex h-48 cursor-pointer items-center justify-center rounded-2xl border border-orange-400/30 bg-gradient-to-br from-orange-500/50 to-orange-700/50 text-white backdrop-blur-md">
                        <div className="text-center">
                            <p className="text-lg font-bold">GSAP Only</p>
                            <p className="text-sm text-white/60">GSAP 전용</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

// 3D Demo Section
function ThreeDemo() {
    return (
        <Section className="bg-gradient-to-b from-slate-800 to-slate-900">
            <Container>
                <h2 className="mb-8 text-4xl font-bold text-white">React Three Fiber 3D 데모</h2>
                <p className="mb-12 text-white/60">
                    React Three Fiber를 사용한 3D 그래픽 (Three.js 대체)
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
                        <div className="border-b border-white/10 p-4">
                            <h3 className="text-xl font-bold text-white">Ocean 테마</h3>
                            <p className="text-sm text-white/60">해양 느낌의 3D 씬</p>
                        </div>
                        <ThreeCanvas scene="ocean" className="h-[400px]" />
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md">
                        <div className="border-b border-white/10 p-4">
                            <h3 className="text-xl font-bold text-white">Geometric 테마</h3>
                            <p className="text-sm text-white/60">
                                기하학적 3D 씬 (마우스로 회전 가능)
                            </p>
                        </div>
                        <ThreeCanvas scene="geometric" className="h-[400px]" enableControls />
                    </div>
                </div>
            </Container>
        </Section>
    );
}

function ThreeDemoFallback() {
    return (
        <Section className="bg-gradient-to-b from-slate-800 to-slate-900">
            <Container>
                <h2 className="mb-8 text-4xl font-bold text-white">React Three Fiber 3D Demo</h2>
                <p className="mb-12 text-white/60">
                    3D preview is disabled in E2E mode to keep automated tests stable.
                </p>
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-10 text-center text-white/60 backdrop-blur-md">
                    3D canvas disabled in E2E mode.
                </div>
            </Container>
        </Section>
    );
}

// Carousel Demo Section
function CarouselDemo() {
    const slides = [
        <DemoCard key={1} title="Slide 1" color="#0066cc" />,
        <DemoCard key={2} title="Slide 2" color="#00a8e8" />,
        <DemoCard key={3} title="Slide 3" color="#003d5b" />,
        <DemoCard key={4} title="Slide 4" color="#00cc88" />,
        <DemoCard key={5} title="Slide 5" color="#cc6600" />,
    ];

    return (
        <Section className="bg-gradient-to-b from-slate-900 to-slate-800">
            <Container>
                <h2 className="mb-8 text-4xl font-bold text-white">Embla Carousel 데모</h2>
                <p className="mb-12 text-white/60">
                    드래그 또는 화살표로 슬라이드를 이동할 수 있습니다
                </p>

                <div className="mb-16">
                    <h3 className="mb-6 text-2xl font-bold text-white">기본 캐러셀</h3>
                    <EmblaCarousel slides={slides} autoplay autoplayInterval={3000} />
                </div>

                <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">카드 캐러셀</h3>
                    <CardCarousel slidesPerView={3}>
                        {slides.map((slide, i) => (
                            <div key={i} className="h-48">
                                {slide}
                            </div>
                        ))}
                    </CardCarousel>
                </div>
            </Container>
        </Section>
    );
}

// Glassmorphism Demo (GSAP only)
function GlassmorphismDemo() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = Array.from(containerRef.current.querySelectorAll(".glass-card"));
        const listeners = cards.map((card) => {
            const enterHandler = () => {
                gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
            };
            const leaveHandler = () => {
                gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            };
            card.addEventListener("mouseenter", enterHandler);
            card.addEventListener("mouseleave", leaveHandler);
            return { card, enterHandler, leaveHandler };
        });

        return () => {
            listeners.forEach(({ card, enterHandler, leaveHandler }) => {
                card.removeEventListener("mouseenter", enterHandler);
                card.removeEventListener("mouseleave", leaveHandler);
            });
        };
    }, []);

    return (
        <Section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500 opacity-30 blur-[100px]" />
                <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500 opacity-30 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 opacity-20 blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <h2 className="mb-8 text-4xl font-bold text-white">Glassmorphism 데모</h2>
                <p className="mb-12 text-white/60">
                    Apple 스타일 글래스모피즘 UI (GSAP 애니메이션)
                </p>

                <div ref={containerRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="glass-card rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600">
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">빠른 성능</h3>
                        <p className="text-white/60">GSAP으로 최적화된 애니메이션</p>
                    </div>

                    <div className="glass-card rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600">
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">모던 UI</h3>
                        <p className="text-white/60">세련된 글래스모피즘 디자인</p>
                    </div>

                    <div className="glass-card rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600">
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">인터랙티브</h3>
                        <p className="text-white/60">부드러운 GSAP 효과</p>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

// Main Test Page
export default function TestPage() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            const title = heroRef.current.querySelector("h1");
            const desc = heroRef.current.querySelector("p");

            if (title) gsap.from(title, { opacity: 0, y: 30, duration: 0.6 });
            if (desc) gsap.from(desc, { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Hero */}
            <Section className="bg-gradient-to-b from-slate-800 to-slate-900 pt-32 pb-16">
                <Container>
                    <div ref={heroRef}>
                        <h1 className="mb-6 text-6xl font-bold text-white">
                            🧪 Component Test Lab
                        </h1>
                        <p className="max-w-2xl text-xl text-white/60">
                            GSAP, React Three Fiber, Embla Carousel, Glassmorphism 등 라이브러리와
                            효과들을 테스트하는 페이지입니다. (GSAP 기반)
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Demo Sections */}
            <GSAPDemo />
            <InteractiveDemo />
            {isE2E ? <ThreeDemoFallback /> : <ThreeDemo />}
            <CarouselDemo />
            <GlassmorphismDemo />
        </div>
    );
}
