"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import { AnimatedText, MotionFadeIn } from "./ui/AnimatedText";

// Exact luxury ring emblem icon from Lalchnd
function LuxuryEmblemIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
      <path d="M36.7273 41.9635C33.4546 41.9635 29.0182 39.9999 24.8728 36.5817L24.6546 36.3635C24.5091 36.2181 24.3637 36.0726 24.1455 35.9272C22.7637 34.6908 21.4546 33.309 20.3637 31.9272C17.6001 28.3635 16.3637 24.8726 16.8001 22.3999C16.9455 21.5271 17.3091 20.8726 17.7455 20.2908C18.7637 19.1999 20.3637 18.6908 22.4728 18.909C22.6182 18.909 22.7637 19.0544 22.7637 19.1999C23.0546 20.9453 23.9273 22.9817 25.3819 25.0908C26.5455 26.8362 28.0001 28.4362 29.6728 29.9635L29.8182 30.109C33.5273 33.4544 37.7455 35.5635 41.0182 35.9272C41.1637 35.9272 41.3091 36.0726 41.3091 36.2181C41.6001 38.0362 41.3091 39.5635 40.3637 40.5817C39.6364 41.5272 38.3273 41.9635 36.7273 41.9635ZM21.6001 19.5635C20.2182 19.5635 19.1273 19.9999 18.4001 20.7271C17.9637 21.1635 17.7455 21.7453 17.6001 22.3999C17.1637 24.7271 18.4728 28.0726 21.0182 31.4181C22.1091 32.7999 23.3455 34.109 24.6546 35.3453C24.8001 35.4908 24.9455 35.6362 25.1637 35.7817L25.3819 35.9999C31.2001 40.8726 37.6001 42.6908 40.0001 40.0726C40.7273 39.2726 41.0182 38.109 40.8001 36.5817C37.3819 36.1453 33.1637 33.9635 29.4546 30.6181C29.3819 30.5453 29.3091 30.5453 29.3091 30.4726C27.6364 28.9453 26.1091 27.2726 24.9455 25.5271C23.5637 23.4908 22.6182 21.4544 22.2546 19.6362C21.9637 19.5635 21.8182 19.5635 21.6001 19.5635Z" fill="#AE873E" />
      <path d="M41.0907 36.6544C37.5998 36.2908 33.2362 34.0362 29.4544 30.6908C29.3816 30.618 29.3089 30.618 29.3089 30.5453C27.6362 29.018 26.1089 27.3453 24.9453 25.5998C23.4907 23.418 22.5453 21.3089 22.1816 19.418C22.1816 19.2726 22.1816 19.1998 22.2544 19.1271C22.3271 18.9089 22.4725 18.9089 22.5453 18.9089C23.8544 19.0544 25.3816 19.4908 26.9816 20.1453C28.8725 20.9453 30.8362 22.1817 32.6544 23.6362L34.1816 24.9453C38.1816 28.5089 40.9453 32.7998 41.4544 36.2908C41.4544 36.4362 41.4544 36.5089 41.3816 36.5817C41.3089 36.5817 41.2362 36.6544 41.0907 36.6544ZM22.9816 19.7089C23.3453 21.3817 24.218 23.1998 25.5271 25.0908C26.6907 26.8362 28.1453 28.4362 29.818 29.9635L29.9635 30.1089C33.5271 33.2362 37.4544 35.3453 40.6544 35.8544C39.9271 32.6544 37.3089 28.7271 33.6725 25.4544C33.1635 25.018 32.7271 24.5817 32.1453 24.218C30.3271 22.8362 28.4362 21.6726 26.618 20.8726C25.3089 20.218 24.0726 19.8544 22.9816 19.7089Z" fill="#AE873E" />
      <path d="M39.418 41.309C39.1998 41.309 39.0544 41.1635 39.0544 40.9453C39.0544 40.7271 39.1998 40.5817 39.3453 40.5817C41.0907 40.4362 42.7635 39.4908 44.0725 38.0362C46.1816 35.6362 46.6907 32.1453 45.4544 28.8726C42.9089 22.2544 38.1816 17.5271 31.9271 15.1271C31.7089 15.0544 31.6362 14.8362 31.7089 14.6908C31.7816 14.4726 31.9998 14.3999 32.1453 14.4726C38.618 16.9453 43.4907 21.818 46.1816 28.5817C47.5635 32.0726 46.9816 35.8544 44.6544 38.4726C43.2726 40.1453 41.3816 41.0908 39.418 41.309Z" fill="#AE873E" />
      <path d="M15.4911 41.1637C15.0547 41.1637 14.6184 41.1637 14.182 41.091C11.8547 40.7273 9.89108 39.2728 8.58199 37.0182L8.50926 36.9455C7.2729 34.8364 6.69108 32.2182 6.90926 29.6728C7.34563 22.9091 10.2547 16.8728 14.9093 13.2364C18.1093 10.691 21.8184 9.60005 25.3093 10.1091C26.7638 10.3273 28.1456 10.8364 29.4547 11.6364C30.7638 12.4364 31.782 13.4546 32.4365 14.691C32.5093 14.8364 32.5093 14.9819 32.3638 15.1273C32.2911 15.2728 32.0729 15.2728 31.9274 15.2C30.6911 14.691 29.382 14.3273 28.0729 14.0364C27.5638 13.9637 27.1274 13.891 26.6184 13.8182C25.3093 13.7455 24.0729 13.9637 22.9093 14.4C19.4911 15.7819 17.5274 18.691 17.6002 22.4001V22.4728C17.1638 24.8 18.4729 28.1455 21.0184 31.4182C22.1093 32.8001 23.3456 34.1091 24.6547 35.3455C24.8002 35.491 24.9456 35.6364 25.1638 35.7819L25.382 36.0001C25.4547 36.0728 25.5274 36.1455 25.5274 36.291C25.5274 36.4364 25.4547 36.5091 25.382 36.5819C21.8184 39.5637 18.4002 41.1637 15.4911 41.1637ZM9.09108 36.5091C9.96381 38.0364 11.5638 39.9273 14.2547 40.3637C17.2365 40.8728 20.8002 39.491 24.582 36.291C24.4365 36.1455 24.2911 36.0728 24.2184 35.9273C22.8365 34.691 21.5274 33.3091 20.4365 31.9273C17.6729 28.3637 16.4365 24.8728 16.8729 22.4001C16.8002 18.4728 18.9093 15.2728 22.6184 13.8182C23.8547 13.3091 25.1638 13.091 26.6184 13.1637C27.1274 13.1637 27.7093 13.2364 28.1456 13.3819C29.1638 13.6 30.182 13.891 31.1274 14.1819C30.5456 13.4546 29.8184 12.8 28.9456 12.291C27.7093 11.5637 26.4002 11.1273 25.0911 10.9091C21.8184 10.4 18.3274 11.4182 15.2729 13.891C10.8365 17.4546 8.00017 23.2728 7.56381 29.8182C7.41835 32.0728 7.92744 34.5455 9.09108 36.5091Z" fill="#AE873E" />
      <path d="M29.5276 30.618C29.4548 30.618 29.3821 30.618 29.3094 30.5453C27.5639 28.9453 26.1094 27.2726 24.873 25.5271C23.4185 23.3453 22.473 21.2362 22.1094 19.3453C22.1094 19.1998 22.1094 19.1271 22.1821 19.0544C22.3276 18.9089 22.473 18.9089 22.5457 18.9089C23.8548 19.0544 25.3821 19.4908 26.9821 20.1453C28.873 20.9453 30.8366 22.1817 32.6548 23.6362C32.8003 23.7089 32.8003 23.8544 32.8003 23.9998C32.2185 26.1089 31.2003 28.2908 29.8912 30.3998C29.8185 30.5453 29.7457 30.618 29.5276 30.618C29.6003 30.618 29.6003 30.618 29.5276 30.618ZM22.9821 19.7089C23.3457 21.3817 24.2185 23.1998 25.5276 25.0908C26.6185 26.6908 28.0003 28.218 29.5276 29.6726C30.6185 27.7817 31.4912 25.8908 32.073 23.9998C30.3276 22.6908 28.5094 21.5271 26.7639 20.7998C25.3094 20.218 24.073 19.8544 22.9821 19.7089Z" fill="#AE873E" />
      <path d="M25.1638 25.6727H25.0183C24.8729 25.6 24.7274 25.3818 24.8729 25.1636C25.6002 23.5636 26.182 22.0363 26.4729 20.4363C26.5456 20.2182 26.6911 20.1454 26.9093 20.1454C27.1274 20.2182 27.2002 20.3636 27.2002 20.5818C26.9093 22.1818 26.3274 23.8545 25.5274 25.4545C25.4547 25.6 25.3092 25.6727 25.1638 25.6727ZM10.0365 37.1636C9.60016 37.1636 9.1638 37.1636 8.80016 37.0909C8.58198 37.0909 8.43652 36.9454 8.43652 36.7273C8.43652 36.5091 8.58198 36.3636 8.80016 36.3636C12.6547 36.8 16.9456 35.0545 20.4365 31.4182C20.582 31.2727 20.8002 31.2727 20.9456 31.4182C21.0911 31.5636 21.0911 31.7818 20.9456 31.9273C17.6729 35.2727 13.7456 37.1636 10.0365 37.1636ZM26.6183 13.8182C26.4729 13.8182 26.3274 13.7454 26.2547 13.5273C25.9638 12.5091 25.4547 11.4909 24.8729 10.6182C24.7274 10.4727 24.8002 10.2545 24.9456 10.1091C25.0911 9.96362 25.3093 10.0363 25.4547 10.1818C26.1093 11.1273 26.5456 12.2182 26.9093 13.3091C26.982 13.5273 26.8365 13.6727 26.6911 13.7454C26.6911 13.8182 26.6183 13.8182 26.6183 13.8182Z" fill="#AE873E" />
      <path d="M14.7637 41.1636C7.5637 40.8727 3.49098 38.109 1.67279 32.3636C1.30916 31.2727 1.1637 30.109 1.09098 28.8727C0.945521 20.7272 4.29097 13.9636 10.691 9.38177C13.091 7.63632 15.491 6.61813 17.9637 6.18177C24.291 5.16359 29.3819 8.14541 32.3637 14.6181C32.4364 14.7636 32.3637 14.909 32.291 15.0545C32.2183 15.1272 32.0001 15.2 31.9273 15.1272C30.691 14.6181 29.3819 14.2545 28.0728 13.9636C27.5637 13.8909 27.1273 13.8181 26.6182 13.7454C25.3092 13.6727 24.0728 13.8909 22.9092 14.3272C20.1455 15.4181 18.4001 17.5272 17.8182 20.2909L17.891 20.2181C18.9092 19.1272 20.5092 18.6181 22.6182 18.8363C23.9273 18.9818 25.3819 19.4181 26.9819 20.0727C28.8728 20.8727 30.8364 22.109 32.6546 23.5636C32.8001 23.709 32.8728 23.9272 32.7273 24.0727C32.5819 24.2181 32.3637 24.2909 32.2182 24.1454C30.4001 22.7636 28.5092 21.6 26.691 20.8C25.1637 20.1454 23.7819 19.709 22.5455 19.6363C20.7273 19.4181 19.2728 19.8545 18.4728 20.8C18.0364 21.2363 17.8182 21.8181 17.6728 22.4727C17.6728 22.6909 17.4546 22.7636 17.3092 22.7636C17.091 22.7636 16.9455 22.6181 16.9455 22.4C16.8728 18.4 18.9819 15.2727 22.691 13.7454C23.9273 13.2363 25.2364 13.0181 26.691 13.0909C27.2001 13.0909 27.7819 13.1636 28.2182 13.309C29.3092 13.5272 30.3273 13.8181 31.3455 14.1818C28.5092 8.58177 23.7819 6.03632 18.1092 6.98177C15.7819 7.34541 13.4546 8.36359 11.2001 10.0363C4.94552 14.4727 1.74552 21.0181 1.89098 28.9454C1.89098 30.0363 2.10916 31.1272 2.40007 32.2181C4.14552 37.6727 7.92734 40.2181 14.8364 40.509C15.0546 40.509 15.2001 40.6545 15.2001 40.8727C15.1273 41.0181 14.9092 41.1636 14.7637 41.1636Z" fill="#AE873E" />
    </svg>
  );
}

export default function LuxuryEditorialShowcase() {
  const { setSelectedMetal, setEnquireProduct } = useStore();

  const handleEnquireGold = () => {
    setSelectedMetal("gold");
    const goldProd = PRODUCTS.find((p) => p.metal === "gold") || PRODUCTS[0];
    setEnquireProduct(goldProd);
  };

  const handleEnquireDiamond = () => {
    setSelectedMetal("diamond");
    const diamondProd = PRODUCTS.find((p) => p.metal === "diamond") || PRODUCTS[1];
    setEnquireProduct(diamondProd);
  };

  return (
    <section className="w-full bg-white overflow-hidden">
      {/* =========================================================================
          BLOCK 1: GOLD JEWELLERY CRAFTED WITH TRUST (Image Left, Content Right)
         ========================================================================= */}
      <div className="py-16 sm:py-20 border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Image Card with Smooth Scale and Slide In */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="relative w-full max-w-[540px] overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src="https://lalchnd.com/images/lalchnd/home/gold-main.webp"
                  alt="Gold Jewellery Crafted With Trust"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right: Text Content with Word Staggering */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6 lg:pl-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <LuxuryEmblemIcon />
              </motion.div>

              <div>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-script text-[#E2A62C] font-normal text-5xl sm:text-6xl lg:text-7xl block -mb-2"
                >
                  Gold
                </motion.span>
                <AnimatedText
                  text="Jewellery Crafted With Trust"
                  el="h2"
                  className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-[#093B2A] font-semibold leading-[1.18] tracking-tight"
                />
              </div>

              <MotionFadeIn delay={0.2}>
                <p className="text-[#5A6E82] text-xs sm:text-sm font-sans leading-relaxed max-w-xl">
                  Yashraj offers gold jewellery in a range of traditional and contemporary styles, including pieces designed for different occasions and personal preferences. The collection combines skilled workmanship with thoughtful detailing, offering gold jewellery that reflects timeless appeal and lasting value.
                </p>
              </MotionFadeIn>

              <MotionFadeIn delay={0.3} className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnquireGold}
                  className="inline-flex items-center space-x-3 bg-[#093B2A] hover:bg-[#124831] text-white text-[11px] font-bold tracking-[0.2em] px-8 py-3.5 uppercase transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>EXPLORE GOLD COLLECTION</span>
                  <span className="text-sm">→</span>
                </motion.button>
              </MotionFadeIn>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCK 2: DIAMOND COLLECTIONS TO CHERISH ALWAYS (Content Left, Image Right)
         ========================================================================= */}
      <div className="py-16 sm:py-20 border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Text Content with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6 lg:pr-6 order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <LuxuryEmblemIcon />
              </motion.div>

              <div>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-script text-[#E2A62C] font-normal text-5xl sm:text-6xl lg:text-7xl block -mb-2"
                >
                  Diamond
                </motion.span>
                <AnimatedText
                  text="Collections to Cherish Always"
                  el="h2"
                  className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-[#093B2A] font-semibold leading-[1.18] tracking-tight"
                />
              </div>

              <MotionFadeIn delay={0.2}>
                <p className="text-[#5A6E82] text-xs sm:text-sm font-sans leading-relaxed max-w-xl">
                  From graceful everyday pieces to striking designs for life&apos;s special moments, our diamond collection brings together captivating brilliance, distinctive styles and timeless elegance. Find a piece that feels as special as the moment you choose it.
                </p>
              </MotionFadeIn>

              <MotionFadeIn delay={0.3} className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnquireDiamond}
                  className="inline-flex items-center space-x-3 bg-[#093B2A] hover:bg-[#124831] text-white text-[11px] font-bold tracking-[0.2em] px-8 py-3.5 uppercase transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>EXPLORE DIAMOND COLLECTION</span>
                  <span className="text-sm">→</span>
                </motion.button>
              </MotionFadeIn>
            </motion.div>

            {/* Right: Image Card with Smooth Slide and Hover Zoom */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex justify-center order-1 lg:order-2"
            >
              <div className="relative w-full max-w-[540px] overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src="https://lalchnd.com/images/lalchnd/home/diamond-main.webp"
                  alt="Diamond Collections to Cherish Always"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
