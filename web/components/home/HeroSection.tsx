'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useEffect, useState, useRef } from 'react';

// Random number generator for particles
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function HeroSection() {
    const { dict } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // ensure random values are consistent after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll Parallax
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '30%']);
    const logoY = useTransform(scrollY, [0, 500], ['0%', '50%']);
    const textY = useTransform(scrollY, [0, 500], ['0%', '100%']);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = clientX / innerWidth - 0.5;
        const y = clientY / innerHeight - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ['5%', '-5%']);
    const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ['5%', '-5%']);

    // Logo 3D Tilt
    const logoRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
    const logoRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

    // Generate Particles (Starry Night Effect)
    const particles = mounted ? [...Array(50)].map((_, i) => ({
        id: i,
        x: random(0, 100),
        y: random(0, 100),
        size: random(2, 6), // Increased size
        duration: random(2, 5),
        delay: random(0, 5),
        initialColor: ['#d4af37', '#00d4ff', '#8b5cf6', '#ffffff'][Math.floor(random(0, 4))]
    })) : [];

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ x: bgX, y: bgY }}
            >
                <div
                    className="absolute inset-0 animate-gradient-shift opacity-60"
                    style={{
                        background: `
                            radial-gradient(circle at 50% 50%, rgba(20, 20, 40, 0) 0%, #000000 100%),
                            linear-gradient(135deg, #050510 0%, #0a0e27 25%, #1a103c 50%, #08061a 75%, #050510 100%)
                        `,
                    }}
                />
            </motion.div>

            {/* Background Image (Parallax) */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] z-0"
                style={{ y: backgroundY, x: bgX, scale: 1.1 }}
            >
                <div className="absolute inset-0 bg-black/95 z-10" />
                <img
                    src="/images/hero-bg.png"
                    alt="Gyeongbokgung Palace"
                    className="w-full h-full object-cover filter blur-[2px]"
                />
            </motion.div>

            {/* Starry Night Particles */}
            <div className="absolute inset-0 z-1 pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            boxShadow: `0 0 ${p.size * 3}px currentColor`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 1, 0.2], // Twinkle effect
                            scale: [1, 1.5, 1],
                            backgroundColor: ['#d4af37', '#00d4ff', '#8b5cf6', '#ffffff', '#d4af37'], // Color changing
                            color: ['#d4af37', '#00d4ff', '#8b5cf6', '#ffffff', '#d4af37'] // For box-shadow currentColor
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Ambient Light Spotlights */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[#d4af37] rounded-full mix-blend-screen filter blur-[120px] opacity-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[20%] w-[50%] h-[50%] bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[100px] opacity-10"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Content Container */}
            <motion.div
                className="relative z-20 container mx-auto px-4 text-center"
                style={{ y: textY, opacity }}
            >
                <div className="flex flex-col items-center">
                    {/* Main Logo — 3D Tilt & Aura */}
                    <div className="relative mb-16 lg:mb-20 perspective-500">
                        {/* Rotating Gold Aura */}
                        <motion.div
                            className="absolute inset-0 -m-10 border-[2px] border-[#d4af37]/20 rounded-full"
                            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 -m-4 border-[1px] border-dashed border-[#d4af37]/30 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-[50px]"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* 3D Logo */}
                        <motion.div
                            style={{
                                rotateX: logoRotateX,
                                rotateY: logoRotateY,
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <img
                                src="/images/wra_logo_main.png"
                                alt="World Royal Academy Emblem"
                                className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]"
                            />
                        </motion.div>
                    </div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-[#d4af37]/40 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_10px_#d4af37]" />
                        <span className="text-[#d4af37] text-sm font-semibold tracking-widest uppercase">
                            {dict.home.welcome}
                        </span>
                    </motion.div>

                    {/* Title — Cinematic Reveal */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter leading-tight text-white relative flex justify-center gap-3">
                        <motion.span
                            className="block"
                            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            {dict.home.titleLine1}
                        </motion.span>
                        <motion.span
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fffacd] to-[#d4af37] pb-2"
                            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            style={{
                                textShadow: "0 0 40px rgba(212,175,55,0.5)"
                            }}
                        >
                            {dict.home.titleLine2}
                        </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-14 leading-relaxed font-light break-keep"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 1 }}
                    >
                        {dict.home.subtitle}
                    </motion.p>

                    {/* CTA Buttons — Magnetic & Glow */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                    >
                        <Link href="/admissions" className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#EDC967] rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-200"></div>
                            <button className="relative px-10 py-5 bg-black rounded-xl leading-none flex items-center divide-x divide-gray-600">
                                <span className="flex items-center gap-3 space-x-5">
                                    <span className="text-[#d4af37] font-bold text-lg group-hover:text-white transition duration-200">{dict.home.startApplication}</span>
                                    <ArrowRight className="w-6 h-6 text-[#d4af37] group-hover:text-white group-hover:translate-x-1 transition-transform duration-200" />
                                </span>
                            </button>
                        </Link>

                        <Link href="/education/language">
                            <button className="px-10 py-5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                {dict.home.exploreCurriculum}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                onClick={scrollToFeatures}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-[#d4af37] transition-colors cursor-pointer"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">{dict.home.scrollDown}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />
            </motion.div>
        </section>
    );
}
