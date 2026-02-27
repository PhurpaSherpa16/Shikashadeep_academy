import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        const letters = text.innerText.split("");
        text.innerHTML = letters
            .map((l) => `<span class="inline-block opacity-0 translate-y-10 blur-sm">${l === " " ? "&nbsp;" : l}</span>`)
            .join("");

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.inOut",
                        onComplete: onComplete
                    });
                }
            });

            // Text Reveal Animation
            tl.to(text.children, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.05,
                ease: "expo.out",
            })
                // Glow and Scale Effect
                .to(text, {
                    scale: 1.05,
                    textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                    duration: 1,
                    ease: "power2.inOut",
                }, "-=0.5")
                // Progress Bar Animation
                .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut", }, "-=1.5");

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-2000 flex flex-col items-center justify-center bg-gray-950 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.2)_0%,transparent_70%)]" />

            <div className="relative flex flex-col items-center">
                {/* Logo/Icon placeholder or simplified brand icon */}
                <div className="mb-8 p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20 backdrop-blur-xl animate-pulse">
                    <img src="/logo.svg" alt="logo" className="size-40 rounded-2xl bg-linear-to-tr from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20" />
                </div>

                <h1 ref={textRef} className="text-4xl md:text-6xl font-black text-white tracking-tighter text-center uppercase">
                    Shikshadeep Academy
                </h1>

                <div className="mt-12 w-48 md:w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div ref={progressRef} className="h-full w-full bg-linear-to-r from-blue-600 to-blue-400 origin-left"/>
                </div>
            </div>

            <p className="absolute bottom-12 text-sm text-gray-500 font-medium  text-center tracking-[0.2em] uppercase opacity-50">
                Excellence in Education Since 2063 B.S
            </p>
        </div>
    );
}
