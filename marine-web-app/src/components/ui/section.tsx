import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export function Section({ className, children, fullWidth = false, ...props }: SectionProps) {
    return (
        <section
            className={cn(
                "relative overflow-hidden py-20 md:py-32",
                fullWidth ? "w-full" : "",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
