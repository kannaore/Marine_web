"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
    const hoverClass = hover
        ? "hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300 ease-out"
        : "";

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm ${hoverClass} ${className}`}
        >
            {children}
        </div>
    );
}

interface ServiceCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    image: string;
}

export function ServiceCard({ title, description, icon, image }: ServiceCardProps) {
    return (
        <Card className="h-full">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="from-marine-dark via-marine-dark/50 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="bg-ocean-500/20 text-ocean-300 absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm">
                    {icon}
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-display group-hover:text-ocean-300 mb-2 text-xl font-semibold text-white transition-colors">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{description}</p>
            </div>
        </Card>
    );
}

interface CaseStudyCardProps {
    title: string;
    location: string;
    category: string;
    image: string;
}

export function CaseStudyCard({ title, location, category, image }: CaseStudyCardProps) {
    return (
        <Card className="min-w-[320px] md:min-w-[400px]">
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="from-marine-dark absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                <span className="bg-ocean-500/80 absolute top-4 left-4 rounded-lg px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="font-display group-hover:text-ocean-300 mb-1 text-lg font-semibold text-white transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-white/50">{location}</p>
            </div>
        </Card>
    );
}

interface NewsCardProps {
    title: string;
    date: string;
    category: string;
    image: string;
}

export function NewsCard({ title, date, category, image }: NewsCardProps) {
    return (
        <Card className="h-full">
            <div className="relative h-40 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="from-marine-dark absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
            <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                    <span className="text-ocean-400 text-xs font-medium">{category}</span>
                    <span className="text-xs text-white/40">{date}</span>
                </div>
                <h3 className="font-display group-hover:text-ocean-300 line-clamp-2 text-base font-medium text-white transition-colors">
                    {title}
                </h3>
            </div>
        </Card>
    );
}
