"use client";

import { Star } from "lucide-react";

const testimonials = [
  { name: "Ahmad Faris", review: "Rectronx helped me complete my IoT project on time. The system worked perfectly and the team was very professional throughout.", rating: 5 },
  { name: "Nurul Ain", review: "Delivered everything — hardware, code, and documentation — within 2 weeks. Very professional. I passed my viva with confidence.", rating: 5 },
  { name: "Kevin Lim", review: "Best decision I made for my FYP. The team explained everything so I could present confidently. Will recommend to others.", rating: 5 },
  { name: "Siti Hajar", review: "Very fast WhatsApp response and delivered earlier than expected. Circuit was neatly soldered with full schematics.", rating: 5 },
  { name: "Darshan R.", review: "Smooth process from start to finish. Got exactly what I needed with zero stress. The coaching session was a huge help.", rating: 5 },
  { name: "Melissa Tan", review: "Great communication and the project looked really professional. My supervisor was impressed. 100% recommended.", rating: 5 },
];

// Duplicate for seamless loop
const track1 = [...testimonials, ...testimonials];
const track2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#080E1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14">
        <p className="eyebrow mb-3">Student reviews</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-white">
            What they say.
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white/40 text-sm font-bold">4.7 · 33 Google reviews</span>
          </div>
        </div>
      </div>

      {/* Marquee row 1 */}
      <div className="mb-4 overflow-hidden">
        <div className="marquee-track marquee-forward flex gap-4">
          {track1.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white/[0.04] border border-white/8 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">&ldquo;{t.review}&rdquo;</p>
              <p className="text-white font-bold text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div className="overflow-hidden">
        <div className="marquee-track marquee-reverse flex gap-4">
          {track2.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] sm:w-[380px] bg-white/[0.04] border border-white/8 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">&ldquo;{t.review}&rdquo;</p>
              <p className="text-white font-bold text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Google link */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-10 flex justify-center">
        <a href="https://g.page/r/rectronx" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/30 hover:text-white transition-colors border border-white/10 px-5 py-3 rounded-full hover:border-white/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Read all 33 reviews on Google
        </a>
      </div>
    </section>
  );
}
