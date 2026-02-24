'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Heart, Lightbulb, Handshake, Landmark, Shield } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CoreValuesPage() {
    const { dict } = useLanguage();
    const cv = dict.home.coreValues;

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: cv.hongik.title,
            desc: cv.hongik.desc,
            bgClass: 'bg-[#1a0508]', // Deep Rose/Crimson
            borderColor: 'border-[#ff3366]', // Vibrant Rose
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: cv.wisdom.title,
            desc: cv.wisdom.desc,
            bgClass: 'bg-[#050e1a]', // Deep Indigo
            borderColor: 'border-[#3366ff]', // Vibrant Blue
        },
        {
            icon: <Handshake className="w-8 h-8" />,
            title: cv.peace.title,
            desc: cv.peace.desc,
            bgClass: 'bg-[#051a14]', // Deep Emerald/Teal
            borderColor: 'border-[#00c9a7]', // Vibrant Teal
        },
        {
            icon: <Landmark className="w-8 h-8" />,
            title: cv.creation.title,
            desc: cv.creation.desc,
            bgClass: 'bg-[#15051a]', // Deep Purple
            borderColor: 'border-[#9d4edd]', // Vibrant Purple
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: cv.heritage.title,
            desc: cv.heritage.desc,
            bgClass: 'bg-[#1a0a05]', // Deep Bronze/Orange
            borderColor: 'border-[#ff8fab]', // Vibrant Pink/Rose
        },
    ];

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

    const mouseXSpring = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 40, damping: 20 });
    const logoRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['55deg', '-55deg']);
    const logoRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-55deg', '55deg']);

    return (
        <div className="bg-[#050510] min-h-screen" onMouseMove={handleMouseMove}>
            <HeroBanner
                title={cv.title}
                subtitle={cv.subtitle}
            />

            <section className="py-24 overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">

                    {/* Desktop Layout (Circular) from Main Page */}
                    <div className="hidden md:block relative w-full aspect-square max-w-3xl lg:max-w-[900px] mx-auto min-h-[700px] mt-10">
                        {/* Golden Bracelet Connecting Ring */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] rounded-full border-[6px] lg:border-[8px] border-[#B8860B] shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.4)_inset,0_0_60px_rgba(212,175,55,0.5)] pointer-events-none">
                            {/* Outer Metallic Bevel */}
                            <div className="absolute inset-[-6px] lg:inset-[-8px] rounded-full border-[2px] border-[#FFF8DC] opacity-60 mix-blend-overlay pointer-events-none" />
                            {/* Inner Metallic Bevel */}
                            <div className="absolute inset-0 rounded-full border-[2px] border-[#553b11] opacity-80 pointer-events-none" />
                            <div className="absolute inset-[2px] rounded-full border-[1px] border-[#FFF8DC] opacity-30 pointer-events-none" />
                        </div>

                        {/* Center Logo */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center pointer-events-none perspective-1000">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 0.25, scale: 1 }}
                                transition={{ duration: 1 }}
                                style={{
                                    rotateX: logoRotateX,
                                    rotateY: logoRotateY,
                                    transformStyle: "preserve-3d"
                                }}
                                className="w-full h-full flex items-center justify-center relative"
                            >
                                <div className="absolute inset-0 bg-[#d4af37]/15 rounded-full blur-[80px]" />
                                <img src="/images/wra_logo_main.png" alt="WRA Center" className="w-[100%] h-[100%] object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.6)] brightness-[1.2] contrast-125 saturate-110" />
                            </motion.div>
                        </div>

                        {/* Value Circles */}
                        {values.map((v, i) => {
                            const radius = 38; // 38% radius matches the ring perfectly
                            const angle = (i * 72 - 90) * (Math.PI / 180);
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <div
                                    key={i}
                                    className="absolute z-10"
                                    style={{
                                        left: `calc(50% + ${x}%)`,
                                        top: `calc(50% + ${y}%)`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.15 }}
                                        className={`w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] group rounded-full p-6 lg:p-8 ${v.bgClass} border-[3px] lg:border-[4px] ${v.borderColor} hover:border-[#d4af37] transition-all duration-300 flex flex-col items-center justify-center text-center hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] relative overflow-hidden`}
                                    >
                                        {/* Hover Gradient Overlay */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <div className="inline-flex mb-4 transition-transform group-hover:scale-110 duration-300">
                                            <div className="text-[#d4af37] scale-[1.3] lg:scale-[1.5] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">{v.icon}</div>
                                        </div>
                                        <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{v.title}</h3>
                                        <p className="text-gray-400 text-xs lg:text-sm leading-tight max-w-[90%] whitespace-pre-line break-keep">{v.desc}</p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Layout (flex column) */}
                    <div className="flex flex-col gap-6 md:hidden max-w-md mx-auto pt-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`group relative rounded-2xl p-6 border-[3px] ${v.borderColor} transition-all duration-300 text-center ${v.bgClass} hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:border-[#d4af37]`}
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                <div className="inline-flex mb-4">
                                    <div className="text-[#d4af37] scale-125">{v.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line break-keep">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
