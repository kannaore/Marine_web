"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles =
        "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
        primary:
            "bg-ocean-500 text-white hover:bg-ocean-600 shadow-lg shadow-ocean-500/25 hover:shadow-ocean-500/40",
        secondary:
            "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
        ghost: "text-ocean-300 hover:text-ocean-100 hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
}
