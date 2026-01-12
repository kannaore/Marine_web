"use client";

import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function CTASection() {
    return (
        <section id="contact" className="relative overflow-hidden py-24 md:py-32">
            {/* Background Gradient */}
            <div className="from-ocean-900 via-marine-deeper to-marine-dark absolute inset-0 bg-gradient-to-br" />

            {/* Decorative Elements */}
            <div className="bg-ocean-500/10 absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
            <div className="bg-ocean-600/10 absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="font-display mb-6 text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
                            다음 프로젝트를 함께
                            <br />
                            <span className="text-gradient-ocean">시작하세요</span>
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70 md:text-xl">
                            해양조사에 관한 모든 문의를 환영합니다.
                            <br />
                            전문 컨설턴트가 최적의 솔루션을 제안해 드립니다.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button size="lg" className="group">
                                프로젝트 문의하기
                                <ArrowRight
                                    size={18}
                                    className="ml-2 transition-transform group-hover:translate-x-1"
                                />
                            </Button>
                            <Button variant="secondary" size="lg">
                                회사소개서 다운로드
                            </Button>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-col items-center justify-center gap-8 text-white/60 sm:flex-row">
                            <a
                                href="tel:02-1234-5678"
                                className="hover:text-ocean-300 flex items-center gap-2 transition-colors"
                            >
                                <Phone size={18} />
                                <span>02-1234-5678</span>
                            </a>
                            <a
                                href="mailto:info@marineresearch.co.kr"
                                className="hover:text-ocean-300 flex items-center gap-2 transition-colors"
                            >
                                <Mail size={18} />
                                <span>info@marineresearch.co.kr</span>
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
