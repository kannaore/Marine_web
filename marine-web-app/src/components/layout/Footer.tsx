"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Facebook,
    Instagram,
} from "lucide-react";

const footerLinks = {
    services: [
        { nameKo: "해상풍력", nameEn: "Offshore Wind", href: "/services/offshore-wind" },
        { nameKo: "지구물리조사", nameEn: "Geophysical Survey", href: "/services/geophysical" },
        { nameKo: "수로조사", nameEn: "Hydrographic Survey", href: "/services/hydrographic" },
        { nameKo: "해양물리조사", nameEn: "Physical Oceanography", href: "/services/marine-physics" },
    ],
    company: [
        { nameKo: "회사소개", nameEn: "About Us", href: "/about" },
        { nameKo: "연혁", nameEn: "History", href: "/about/history" },
        { nameKo: "인증현황", nameEn: "Certifications", href: "/about/certifications" },
        { nameKo: "채용공고", nameEn: "Careers", href: "/careers" },
    ],
    support: [
        { nameKo: "문의하기", nameEn: "Contact Us", href: "/contact/inquiry" },
        { nameKo: "찾아오시는 길", nameEn: "Location", href: "/contact/location" },
        { nameKo: "ESG", nameEn: "Sustainability", href: "/sustainability" },
    ],
};

const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
    const locale = useLocale();
    const isKorean = locale === "ko";

    return (
        <footer className="bg-marine-dark border-t border-white/10">
            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Logo & Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Marine Research"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="font-display font-bold text-xl text-white">
                                {isKorean ? "마린리서치" : "Marine Research"}
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                            {isKorean
                                ? "해양조사 전문기업 마린리서치는 해상풍력, 지구물리탐사, 지오테크니컬 분야에서 최고의 전문성과 기술력으로 안전하고 지속 가능한 해양 미래를 만들어갑니다."
                                : "Marine Research is a professional marine survey company creating a safe and sustainable ocean future with the highest expertise in offshore wind, geophysical exploration, and geotechnical fields."}
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <MapPin size={16} className="text-ocean-400" />
                                <span>{isKorean ? "서울특별시 강남구 테헤란로 123" : "123 Teheran-ro, Gangnam-gu, Seoul"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <Phone size={16} className="text-ocean-400" />
                                <span>02-1234-5678</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <Mail size={16} className="text-ocean-400" />
                                <span>info@marineresearch.co.kr</span>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-6">
                            {isKorean ? "서비스" : "Services"}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-ocean-300 text-sm transition-colors"
                                    >
                                        {isKorean ? link.nameKo : link.nameEn}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-6">
                            {isKorean ? "회사" : "Company"}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-ocean-300 text-sm transition-colors"
                                    >
                                        {isKorean ? link.nameKo : link.nameEn}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-6">
                            {isKorean ? "고객지원" : "Support"}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-ocean-300 text-sm transition-colors"
                                    >
                                        {isKorean ? link.nameKo : link.nameEn}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/40 text-sm">
                        © 2024 {isKorean ? "마린리서치" : "Marine Research"}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-ocean-300 hover:border-ocean-500/50 hover:scale-110 active:scale-95 transition-all duration-200"
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
