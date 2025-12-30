"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let hasRegistered = false;

export function ensureGSAP() {
    if (hasRegistered || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    hasRegistered = true;
}

ensureGSAP();

export { gsap, ScrollTrigger, useGSAP };
