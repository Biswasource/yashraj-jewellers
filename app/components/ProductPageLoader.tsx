import React from "react";

interface ProductPageLoaderProps {
  message?: string;
  isFading?: boolean;
}

export default function ProductPageLoader({
  message = "Loading Creation...",
  isFading = false,
}: ProductPageLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 ease-out select-none ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      aria-label="Loading jewellery creation"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer clockwise spinning golden luxury ring */}
        <div
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#DFBA73]/25 border-t-[#C5A059] border-r-[#DFBA73] animate-spin"
          style={{ animationDuration: "1.2s" }}
        />

        {/* Counter-spinning decorative dashed jewelry accent ring */}
        <div
          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-[#DFBA73]/40"
          style={{ animation: "spin 4.5s linear infinite reverse" }}
        />

        {/* Soft gold pulsing halo glow behind the emblem */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#DFBA73]/20 blur-md animate-pulse" />

        {/* Round Central Emblem with Yashraj Logo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-2xl border-2 border-[#DFBA73] bg-[#072016] p-0.5 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Yashraj Jewellers"
            className="w-full h-full object-cover rounded-full select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Brand Label & Elegant Status indicator */}
      <div className="mt-7 text-center space-y-1.5 select-none px-4">
        <h2 className="font-serif tracking-[0.28em] uppercase text-sm sm:text-base font-bold text-[#1A130B]">
          Yashraj Jewellers
        </h2>
        <div className="flex items-center justify-center space-x-2 text-[11px] font-sans tracking-[0.22em] text-[#8F6D2C] uppercase font-semibold">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DFBA73] animate-ping" />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export { ProductPageLoader };
