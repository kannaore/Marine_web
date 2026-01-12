"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";

interface EmblaCarouselProps {
    slides: React.ReactNode[];
    options?: EmblaOptionsType;
    showDots?: boolean;
    showArrows?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
    className?: string;
}

export function EmblaCarousel({
    slides,
    options = { loop: true, align: "center" },
    showDots = true,
    showArrows = true,
    autoplay = false,
    autoplayInterval = 4000,
    className = "",
}: EmblaCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap());
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect(emblaApi);
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Autoplay
    useEffect(() => {
        if (!emblaApi || !autoplay) return;

        const intervalId = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, autoplayInterval);

        return () => clearInterval(intervalId);
    }, [emblaApi, autoplay, autoplayInterval]);

    return (
        <div className={`embla relative ${className}`}>
            {/* Viewport */}
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="embla__slide min-w-0 flex-[0_0_100%] pl-4 first:pl-0"
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows */}
            {showArrows && (
                <>
                    <button
                        onClick={scrollPrev}
                        disabled={!canScrollPrev && !options.loop}
                        className="embla__button embla__button--prev absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Previous slide"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!canScrollNext && !options.loop}
                        className="embla__button embla__button--next absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Next slide"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots */}
            {showDots && (
                <div className="embla__dots mt-6 flex justify-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                index === selectedIndex
                                    ? "bg-primary w-8"
                                    : "bg-white/30 hover:bg-white/50"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Card carousel variant - for project/service cards
interface CardCarouselProps {
    children: React.ReactNode[];
    slidesPerView?: number;
    className?: string;
}

export function CardCarousel({ children, slidesPerView = 3, className = "" }: CardCarouselProps) {
    const options: EmblaOptionsType = {
        loop: true,
        align: "start",
        slidesToScroll: 1,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };

        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);

    // Calculate slide width based on slidesPerView
    const slideWidth = `${100 / slidesPerView}%`;

    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="-ml-4 flex">
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="min-w-0 pl-4"
                            style={{ flex: `0 0 ${slideWidth}` }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows */}
            <div className="mt-6 flex justify-end gap-2">
                <button
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Previous"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Next"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
