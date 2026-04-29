'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useEffect, useState, useRef } from 'react';

// Random number generator for particles
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function HeroSection() {
    const { dict, language } = useLanguage();
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
    const logoRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['35deg', '-35deg']);
    const logoRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-35deg', '35deg']);

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


            {/* Background Image (Parallax) */}
            <motion.div
                className="absolute top-[-50%] left-[-8%] w-[120%] h-[150%] z-0 block"
                style={{ y: backgroundY, x: bgX, scale: 1.15 }}
            >
                <div className="absolute inset-0 bg-[#050510]/75 z-10" />
                <img
                    src="/images/new_bg.jpg"
                    alt="WRA Royal Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>



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
                            className="absolute inset-0 -m-10 border-[2px] border-[#d4af37]/10 rounded-full"
                            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 -m-4 border-[1px] border-dashed border-[#d4af37]/10 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-[#d4af37]/10 rounded-full blur-[50px]"
                            animate={{ opacity: [0.2, 0.4, 0.2] }}
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
                                src="/images/wra-crown.png?v=4"
                                alt="World Royal Academy Emblem"
                                className="relative w-48 md:w-64 lg:w-[19rem] object-contain"
                            />
                        </motion.div>
                    </div>


                    {/* Title — Cinematic Reveal (image-based logo) */}
                    <motion.div
                        className="mb-8 flex justify-center w-full"
                        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        {language === 'en' ? (
                            <img
                                src="/images/wra-title-en.png?v=2"
                                alt="World Royal Academy"
                                className="h-16 md:h-24 lg:h-28 w-auto object-contain"
                                style={{
                                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.55)) drop-shadow(0 0 28px rgba(212,175,55,0.35))',
                                }}
                            />
                        ) : (
                            <motion.div
                                role="img"
                                aria-label="세계왕립아카데미"
                                className="w-[19rem] md:w-[28.5rem] lg:w-[33.3rem]"
                                style={{
                                    aspectRatio: '2403 / 404',
                                    WebkitMaskImage: 'url(/images/wra-title-ko.png?v=3)',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: 'url(/images/wra-title-ko.png?v=3)',
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    backgroundImage:
                                        'linear-gradient(90deg, #ffffff 0%, #ffffff 25%, #fceda6 42%, #d4af37 50%, #fceda6 58%, #ffffff 75%, #ffffff 100%)',
                                    backgroundSize: '200% 100%',
                                    backgroundRepeat: 'repeat',
                                }}
                                animate={{
                                    backgroundPosition: ['200% 0%', '0% 0%'],
                                    filter: [
                                        'hue-rotate(0deg) drop-shadow(0 2px 6px rgba(0,0,0,0.55))',
                                        'hue-rotate(360deg) drop-shadow(0 2px 6px rgba(0,0,0,0.55))',
                                    ],
                                }}
                                transition={{
                                    backgroundPosition: {
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    filter: {
                                        duration: 18,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                }}
                            />
                        )}
                    </motion.div>

                    {/* English Subtitle (gold wordmark) */}
                    <motion.div
                        className="mb-14 flex justify-center w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 1 }}
                    >
                        <img
                            src="/images/wra-title-en.png?v=2"
                            alt="World Royal Academy"
                            className="w-[19rem] md:w-[28.5rem] lg:w-[33.3rem] h-auto object-contain"
                            style={{
                                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5)) drop-shadow(0 0 12px rgba(212,175,55,0.25))',
                            }}
                        />
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
