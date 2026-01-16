"use client";

import { SectionHeading, NewsCard, Button } from "@/components/ui";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations";
import { ArrowRight } from "lucide-react";

const newsItems = [
    {
        title: "마린리서치, 신안 해상풍력 8차 지반조사 수주",
        date: "2024.12.15",
        category: "수주소식",
        image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80",
    },
    {
        title: "해양조사선 '마린익스플로러' 신규 도입",
        date: "2024.12.10",
        category: "회사소식",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
        title: "ISO 9001:2015 품질경영시스템 갱신 인증",
        date: "2024.12.05",
        category: "인증",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    },
];

export function NewsSection() {
    return (
        <section id="news" className="section-padding bg-marine-dark">
            <div className="container-custom">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        title="뉴스 & 소식"
                        subtitle="마린리서치의 최신 소식을 확인하세요"
                        align="left"
                    />
                    <Button variant="ghost" className="group">
                        전체 뉴스 보기
                        <ArrowRight
                            size={16}
                            className="ml-2 transition-transform group-hover:translate-x-1"
                        />
                    </Button>
                </div>

                <ScrollReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {newsItems.map((news) => (
                        <ScrollRevealItem key={news.title}>
                            <NewsCard
                                title={news.title}
                                date={news.date}
                                category={news.category}
                                image={news.image}
                            />
                        </ScrollRevealItem>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
