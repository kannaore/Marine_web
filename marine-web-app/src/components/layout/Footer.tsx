"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
        { name: "해상풍력 조사", href: "#" },
        { name: "지구물리탐사", href: "#" },
        { name: "지반조사", href: "#" },
        { name: "해양환경조사", href: "#" },
    ],
    company: [
        { name: "회사소개", href: "#about" },
        { name: "연혁", href: "#" },
        { name: "인증현황", href: "#" },
        { name: "채용공고", href: "#" },
    ],
    support: [
        { name: "문의하기", href: "#contact" },
        { name: "자료실", href: "#" },
        { name: "FAQ", href: "#" },
    ],
};

const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
    return (
        <footer className="bg-marine-dark border-t border-white/10">
            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Logo & Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt="마린리서치"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="font-display font-bold text-xl text-white">
                                마린리서치
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                            해양조사 전문기업 마린리서치는 해상풍력, 지구물리탐사,
                            지오테크니컬 분야에서 최고의 전문성과 기술력으로 안전하고 지속
                            가능한 해양 미래를 만들어갑니다.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <MapPin size={16} className="text-ocean-400" />
                                <span>서울특별시 강남구 테헤란로 123</span>
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
                            서비스
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-ocean-300 text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-6">
                            회사
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-ocean-300 text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-6">
                            고객지원
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-ocean-300 text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/40 text-sm">
                        © 2024 마린리서치. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-ocean-300 hover:border-ocean-500/50 transition-colors"
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
