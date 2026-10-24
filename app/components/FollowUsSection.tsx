"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Pause,
  X,
  ExternalLink,
  Phone,
  MessageCircle,
} from "lucide-react";
import { AnimatedText, MotionFadeIn } from "./ui/AnimatedText";

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

/**
 * Real Yashraj Jewellers Official YouTube Videos & Shorts
 */
export interface YouTubeVideoItem {
  id: string;
  title: string;
  rawTitle: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  contactNumber?: string;
  views?: string;
  tag?: string;
}

export const YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: "yt-1",
    title: "Yashraj Jewellers ✨❤️ Contact:- 8917652306",
    rawTitle: "Yashraj Jewellers ✨❤️ Contact:- 8917652306 #ytshorts #trending #content #viralvideos",
    category: "Bridal Jewellery",
    thumbnail: "https://img.youtube.com/vi/_xyru78leIM/hqdefault.jpg",
    youtubeId: "_xyru78leIM",
    contactNumber: "8917652306",
    views: "Trending #ytshorts",
    tag: "Trending Reel",
  },
  {
    id: "yt-2",
    title: "Yashraj Jewellers • Signature Royal Gold & Bridal Collections",
    rawTitle: "YASHRAJ JEWELLERS #instagram #viralvideo",
    category: "Signature Craft",
    thumbnail: "https://img.youtube.com/vi/atzSCPb3z3Q/hqdefault.jpg",
    youtubeId: "atzSCPb3z3Q",
    contactNumber: "8917652306",
    views: "Viral Design",
    tag: "Viral Showcase",
  },
  {
    id: "yt-3",
    title: "Service All Over Odisha • Call/WhatsApp: 8917652306 / 9583126745",
    rawTitle: "Call/whatsapp:8917652306/9583126745YASARAJ JEWELLERS ⚜️ // SERVICE ALL OVER ODISHA",
    category: "All Odisha Service",
    thumbnail: "https://img.youtube.com/vi/gTCCkVIQlfE/hqdefault.jpg",
    youtubeId: "gTCCkVIQlfE",
    contactNumber: "8917652306",
    views: "Statewide Delivery",
    tag: "Service All Odisha",
  },
  {
    id: "yt-4",
    title: "Yashraj Jewellers • Exclusive Royal Karigari & Traditional Sets",
    rawTitle: "YASHRAJ JEWELLERS #instagram",
    category: "Royal Karigari",
    thumbnail: "https://img.youtube.com/vi/CAf_fbTIEzg/hqdefault.jpg",
    youtubeId: "CAf_fbTIEzg",
    contactNumber: "8917652306",
    views: "Instagram Favorite",
    tag: "Exclusive Design",
  },
  {
    id: "yt-5",
    title: "Yashraj Jewellers • Pure Quality & Perfect Craftsmanship",
    rawTitle: "YASHRAJ JEWELLERS 🙏👍",
    category: "Pure Quality",
    thumbnail: "https://img.youtube.com/vi/f25wO1IQllo/hqdefault.jpg",
    youtubeId: "f25wO1IQllo",
    contactNumber: "8917652306",
    views: "Customer Trust",
    tag: "Hallmark Benchmark",
  },
];

export default function FollowUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoItem | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll loop: smoothly advance carousel
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % YOUTUBE_VIDEOS.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + YOUTUBE_VIDEOS.length) % YOUTUBE_VIDEOS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % YOUTUBE_VIDEOS.length);
  };

  return (
    <section id="follow-us-section" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E8DFC9] overflow-hidden relative selection:bg-[#DFBA73]/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#DFBA73]/10 via-[#C5A059]/15 to-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <MotionFadeIn delay={0.1}>
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8F6D2C] bg-[#FAF3E0] border border-[#E0D5BE] px-4 py-1.5 rounded-full mb-3.5 shadow-2xs">
              <YouTubeIcon className="w-4 h-4 text-red-600" />
              <span>Official Yashraj Jewellers Videos</span>
            </div>
          </MotionFadeIn>

          <AnimatedText
            text="Follow Us"
            el="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#093B2A] tracking-tight justify-center"
          />

          <MotionFadeIn delay={0.25}>
            <p className="text-xs sm:text-sm text-[#5A6E82] mt-3 leading-relaxed max-w-2xl mx-auto font-sans">
              Watch real craftsmanship videos, customer moments, and live jewellery showcases direct from our workshops. Service available all over Odisha.
            </p>
          </MotionFadeIn>

          {/* Social Links Bar */}
          <MotionFadeIn delay={0.35}>
            <div className="flex items-center justify-center flex-wrap gap-3 mt-5">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs hover:shadow"
              >
                <YouTubeIcon className="w-4 h-4 text-white" />
                <span>Watch on YouTube</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/917008343796"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs hover:shadow"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp: 70083 43796</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="tel:8917652306"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 transition"
              >
                <Phone className="w-4 h-4 text-[#8F6D2C]" />
                <span>Call: 8917652306 / 9583126745</span>
              </motion.a>
            </div>
          </MotionFadeIn>
        </div>

        {/* =========================================================================
            3D SHORTS FOCUS SPOTLIGHT CAROUSEL (Portrait Video Format)
           ========================================================================= */}
        <div className="relative">
          <div className="relative h-[530px] sm:h-[580px] w-full max-w-4xl mx-auto flex items-center justify-center">
            {YOUTUBE_VIDEOS.map((item, idx) => {
              const total = YOUTUBE_VIDEOS.length;
              let diff = (idx - activeIndex + total) % total;
              if (diff > total / 2) diff -= total;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              return (
                <div
                  key={item.id}
                  onClick={() => isCenter ? setSelectedVideo(item) : setActiveIndex(idx)}
                  className={`absolute transition-all duration-700 ease-in-out cursor-pointer rounded-3xl overflow-hidden border ${
                    isCenter
                      ? "z-30 scale-100 sm:scale-105 opacity-100 bg-white border-2 border-[#C5A059] shadow-2xl ring-4 ring-[#E2A62C]/25 translate-x-0"
                      : isLeft
                      ? "z-10 scale-85 sm:scale-90 opacity-80 hover:opacity-100 bg-white border border-stone-300 -translate-x-[55%] sm:-translate-x-[65%] lg:-translate-x-[75%] shadow-lg"
                      : "z-10 scale-85 sm:scale-90 opacity-80 hover:opacity-100 bg-white border border-stone-300 translate-x-[55%] sm:translate-x-[65%] lg:translate-x-[75%] shadow-lg"
                  } w-[280px] sm:w-[320px] aspect-[9/16] group flex flex-col justify-between`}
                >
                  {/* Portrait Thumbnail Container */}
                  <div className="relative w-full h-full overflow-hidden bg-stone-900">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Gradient Overlay for Video Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35" />

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/75 px-3 py-1 rounded-full border border-white/20">
                        {item.tag}
                      </span>
                    </div>

                    {/* Central Play Button with Pulsing Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300">
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </div>
                    </div>

                    {/* Content Details on Bottom of Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-2">
                      <span className="text-[10px] text-[#DFBA73] font-bold uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-md">
                        {item.title}
                      </h4>

                      <div className="pt-2 flex items-center justify-between text-xs text-stone-300">
                        <span className="text-[11px] font-mono text-stone-400">
                          {item.views}
                        </span>
                        <span className="text-red-400 font-semibold flex items-center text-xs">
                          <YouTubeIcon className="w-3.5 h-3.5 mr-1" />
                          Watch Video
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls & Pagination Indicators */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous Video"
              className="w-10 h-10 rounded-full border border-[#E0D5BE] bg-white hover:bg-[#142A42] hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-xs hover:shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center space-x-1.5">
              {YOUTUBE_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to video ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-6 bg-[#E2A62C]" : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Video"
              className="w-10 h-10 rounded-full border border-[#E0D5BE] bg-white hover:bg-[#142A42] hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-xs hover:shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
              className="w-8 h-8 rounded-full border border-[#E0D5BE] bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-all ml-2"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          YOUTUBE VIDEO POPUP PLAYER MODAL (Portrait Shorts Aspect Ratio 503x895)
         ========================================================================= */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-[#07131F] rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col my-auto max-h-[95vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 bg-[#0B1E2D] text-white border-b border-stone-800">
              <div className="flex items-center space-x-2">
                <YouTubeIcon className="w-5 h-5 text-red-600 shrink-0" />
                <h4 className="font-serif font-bold text-xs sm:text-sm line-clamp-1">
                  {selectedVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0 ml-2"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player: Exact YouTube Embed from User Request */}
            <div className="relative aspect-[9/16] w-full bg-black max-h-[75vh]">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-[#0B1E2D] flex items-center justify-between text-xs text-stone-300 border-t border-stone-800">
              <span className="text-[#DFBA73] font-semibold">{selectedVideo.category}</span>
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-stone-300 hover:text-white transition"
              >
                <span>Open on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
