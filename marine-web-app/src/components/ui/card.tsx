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
            className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden ${hoverClass} ${className}`}
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

export function ServiceCard({
    title,
    description,
    icon,
    image,
}: ServiceCardProps) {
    return (
        <Card className="h-full">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marine-dark via-marine-dark/50 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-ocean-500/20 backdrop-blur-sm flex items-center justify-center text-ocean-300">
                    {icon}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-ocean-300 transition-colors">
                    {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{description}</p>
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

export function CaseStudyCard({
    title,
    location,
    category,
    image,
}: CaseStudyCardProps) {
    return (
        <Card className="min-w-[320px] md:min-w-[400px]">
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marine-dark via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-ocean-500/80 backdrop-blur-sm rounded-lg text-white">
                    {category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-white mb-1 group-hover:text-ocean-300 transition-colors">
                    {title}
                </h3>
                <p className="text-white/50 text-sm">{location}</p>
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
                <div className="absolute inset-0 bg-gradient-to-t from-marine-dark to-transparent" />
            </div>
            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-ocean-400">{category}</span>
                    <span className="text-xs text-white/40">{date}</span>
                </div>
                <h3 className="text-base font-display font-medium text-white group-hover:text-ocean-300 transition-colors line-clamp-2">
                    {title}
                </h3>
            </div>
        </Card>
    );
}
