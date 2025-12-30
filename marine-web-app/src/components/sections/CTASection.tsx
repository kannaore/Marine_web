"use client";

import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function CTASection() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden py-24 md:py-32"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-marine-deeper to-marine-dark" />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            다음 프로젝트를 함께
                            <br />
                            <span className="text-gradient-ocean">시작하세요</span>
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                            해양조사에 관한 모든 문의를 환영합니다.
                            <br />
                            전문 컨설턴트가 최적의 솔루션을 제안해 드립니다.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Button size="lg" className="group">
                                프로젝트 문의하기
                                <ArrowRight
                                    size={18}
                                    className="ml-2 group-hover:translate-x-1 transition-transform"
                                />
                            </Button>
                            <Button variant="secondary" size="lg">
                                회사소개서 다운로드
                            </Button>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60">
                            <a
                                href="tel:02-1234-5678"
                                className="flex items-center gap-2 hover:text-ocean-300 transition-colors"
                            >
                                <Phone size={18} />
                                <span>02-1234-5678</span>
                            </a>
                            <a
                                href="mailto:info@marineresearch.co.kr"
                                className="flex items-center gap-2 hover:text-ocean-300 transition-colors"
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
