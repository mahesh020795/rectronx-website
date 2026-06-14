"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Faris",
    role: "Final Year Student, USM",
    review:
      "Rectronx helped me complete my IoT project on time. The system worked perfectly during my viva and my supervisor was impressed. Highly recommend!",
    rating: 5,
  },
  {
    name: "Nurul Ain",
    role: "Engineering Student, UiTM",
    review:
      "I was worried about my FYP deadline but Rectronx delivered everything — hardware, code, and documentation — within 2 weeks. Very professional service.",
    rating: 5,
  },
  {
    name: "Kevin Lim",
    role: "Computer Science Student",
    review:
      "Best decision I made for my final year project. The team explained how everything works so I could present it confidently. Will recommend to my juniors.",
    rating: 5,
  },
  {
    name: "Siti Hajar",
    role: "Electrical Engineering Student",
    review:
      "Very fast response on WhatsApp and delivery was earlier than expected. The circuit was neatly soldered and came with full schematics. 5 stars!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[#0F1C2E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2B7FD4] bg-[#2B7FD4]/10 px-3 py-1 rounded-full mb-3">
            Student Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What Students Say About Us
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-400 text-sm ml-2">4.7 · 33 Google Reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/8 transition-colors"
            >
              <Quote size={20} className="text-[#2B7FD4] shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                "{t.review}"
              </p>
              <div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google badge */}
        <div className="text-center mt-10">
          <a
            href="https://g.page/r/rectronx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            View all 33 reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
