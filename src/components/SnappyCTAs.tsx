"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function SnappyCTAs() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-snappy-cta]")
    );

    const enter = (el: HTMLElement) => {
      gsap.to(el, { scale: 1.06, y: -2, duration: 0.18, ease: "power3.out" });
      burst(el);
    };
    const leave = (el: HTMLElement) => {
      gsap.to(el, { scale: 1, y: 0, duration: 0.25, ease: "power2.out" });
    };

    const burst = (el: HTMLElement) => {
      const count = 6;
      const rect = el.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("span");
        dot.className = "snappy-token";
        // position within the element
        const x = rect.width / 2;
        const y = rect.height / 2;
        Object.assign(dot.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        el.appendChild(dot);

        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
        const distance = 18 + Math.random() * 18; // px
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        gsap.fromTo(
          dot,
          { opacity: 1, scale: 0.6, x: 0, y: 0, rotate: 0 },
          {
            opacity: 0,
            scale: 1,
            x: dx,
            y: dy,
            rotate: Math.random() * 180,
            duration: 0.45 + Math.random() * 0.2,
            ease: "back.out(1.7)",
            onComplete: () => dot.remove(),
          }
        );
      }
    };

    const handlers: Array<[HTMLElement, (e: Event) => void, (e: Event) => void]> = [];

    items.forEach((el) => {
      const onEnter = () => enter(el);
      const onLeave = () => leave(el);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      handlers.push([el, onEnter, onLeave]);
    });

    return () => {
      handlers.forEach(([el, onEnter, onLeave]) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return null;
}

