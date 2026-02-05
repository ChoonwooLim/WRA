'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            Welcome to the Future of Education
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            World Royal <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-primary to-yellow-600">
              Academy
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The World Royal Academy combines prestigious tradition with cutting-edge blockchain technology.
            Join a global network of elite scholars and future leaders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-yellow-600 text-black font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Application <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
              Explore Curriculum
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-primary" />,
              title: "Blockchain Verified",
              desc: "Your credentials and achievements are mintable as Soulbound Tokens (SBTs), ensuring immutable proof of excellence."
            },
            {
              icon: <Globe className="w-8 h-8 text-blue-400" />,
              title: "Global Network",
              desc: "Connect with alumni and scholars from over 50 nations in our exclusive decentralized autonomous organization (DAO)."
            },
            {
              icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
              title: "Elite Curriculum",
              desc: "Learn from world-class experts in leadership, finance, and technology with our proprietary royal curriculum."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2026 World Royal Academy. All Rights Reserved.
      </footer>
    </div>
  );
}
