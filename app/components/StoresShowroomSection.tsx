"use client";

import React, { useState } from "react";
import { SHOWROOMS } from "../data/products";
import { useStore } from "../context/StoreContext";
import { MapPin, Phone, Clock, Layers, Calendar, ExternalLink, Navigation } from "lucide-react";

export default function StoresShowroomSection() {
  const [selectedCity, setSelectedCity] = useState("All");
  const { setIsAppointmentOpen } = useStore();

  const cities = ["All", "Bhubaneswar", "Cuttack", "Brahmapur", "New Delhi"];

  const filteredShowrooms =
    selectedCity === "All"
      ? SHOWROOMS
      : SHOWROOMS.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <section id="showrooms-section" className="py-20 bg-white scroll-mt-20 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8F6D2C] bg-stone-100 px-3 py-1 rounded-full">
            Points of Pure Perfection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 mt-1">
            Yashraj in Your City
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Experience our palatial showrooms across Eastern India and the National Capital Region, where top-notch product purity meets royal hospitality.
          </p>

          {/* City Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition ${
                  selectedCity === city
                    ? "bg-[#8F6D2C] text-white shadow-sm"
                    : "bg-white text-stone-700 border border-stone-200 hover:border-[#8F6D2C]"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowrooms.map((store, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#DEC9A2] hover:border-[#8F6D2C] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6D2C] bg-[#FAF3E0] px-2.5 py-0.5 rounded">
                      {store.city}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-stone-900 mt-1.5 group-hover:text-[#8F6D2C] transition-colors">
                      {store.name}
                    </h3>
                  </div>
                  <div className="p-2 bg-[#FAF8F5] rounded-xl text-[#8F6D2C]">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed flex items-start space-x-2">
                  <span>{store.address}</span>
                </p>

                <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-[#8F6D2C]" />
                    <a href={`tel:${store.phone.split("/")[0].trim()}`} className="hover:underline text-stone-800">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#8F6D2C]" />
                    <span>{store.timing}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-[11px] text-[#7A5B1F] bg-[#FAF3E0] p-2 rounded-lg">
                    <Layers className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{store.floors}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center space-x-3">
                <button
                  onClick={() => setIsAppointmentOpen(true)}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#8F6D2C] hover:bg-[#745821] text-white font-semibold text-xs transition flex items-center justify-center space-x-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book VIP Visit</span>
                </button>
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-stone-200 hover:border-[#8F6D2C] text-stone-700 hover:text-[#8F6D2C] transition"
                  title="View on Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
