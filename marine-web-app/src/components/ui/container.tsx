import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    fluid?: boolean;
}

export function Container({ className, children, fluid = false, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                "w-full mx-auto px-6 sm:px-8 md:px-10",
                fluid ? "max-w-full" : "max-w-[1400px]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
