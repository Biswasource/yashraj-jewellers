"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, Calendar, Video, MapPin, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function AppointmentModal() {
  const {
    isAppointmentOpen,
    setIsAppointmentOpen,
    isVideoCallOpen,
    setIsVideoCallOpen,
    showToast,
  } = useStore();

  const isOpen = isAppointmentOpen || isVideoCallOpen;
  const initialMode = isVideoCallOpen ? "video" : "store";

  const [bookingMode, setBookingMode] = useState<"store" | "video">(initialMode);
  const [storeLocation, setStoreLocation] = useState("Bhubaneswar Master Canteen Flagship");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Evening (5:00 PM - 8:00 PM)");
  const [interestCategory, setInterestCategory] = useState("Vivaha Bridal Sets (Heavy Gold & Kundan)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please provide your name and phone number.");
      return;
    }
    const ref = `YJ-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsBooked(true);
    showToast("Appointment confirmed! You will receive confirmation details on WhatsApp.");
  };

  const handleClose = () => {
    setIsAppointmentOpen(false);
    setIsVideoCallOpen(false);
    setIsBooked(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white text-stone-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 my-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC8]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#8F6D2C]" />
            <h3 className="font-serif font-bold text-xl text-stone-900">
              {bookingMode === "video"
                ? "Schedule Live Video Shopping"
                : "Book VIP Showroom Visit"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-stone-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isBooked ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBookingMode("store")}
                className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 transition ${
                  bookingMode === "store"
                    ? "border-[#8F6D2C] bg-[#FAF3E0] text-[#8F6D2C] font-bold shadow-xs"
                    : "border-stone-200 bg-white text-stone-700"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Showroom Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingMode("video")}
                className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 transition ${
                  bookingMode === "video"
                    ? "border-[#8F6D2C] bg-[#FAF3E0] text-[#8F6D2C] font-bold shadow-xs"
                    : "border-stone-200 bg-white text-stone-700"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>HD Video Call</span>
              </button>
            </div>

            {/* Showroom */}
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Preferred Showroom / Jewellery Suite:
              </label>
              <select
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
              >
                <option value="Bhubaneswar Master Canteen Flagship">
                  Bhubaneswar (Master Canteen Flagship • 4 Floors)
                </option>
                <option value="Bhubaneswar Raghunathpur">
                  Bhubaneswar (Raghunathpur Vivaha Suite)
                </option>
                <option value="Cuttack CDA Sector 9">
                  Cuttack (CDA Sector 9 Tarakasi Gallery)
                </option>
                <option value="Cuttack Cantonment Road">
                  Cuttack (Cantonment Road Boutique)
                </option>
                <option value="Brahmapur Royal Showroom">
                  Brahmapur (Giri Market Royal Showroom)
                </option>
                <option value="New Delhi Lajpat Boutique">
                  New Delhi (Lajpat Nagar Boutique)
                </option>
              </select>
            </div>

            {/* Interest */}
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Jewellery Category of Interest:
              </label>
              <select
                value={interestCategory}
                onChange={(e) => setInterestCategory(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
              >
                <option value="Vivaha Bridal Sets (Heavy Gold & Kundan)">
                  Vivaha Bridal Sets (Heavy Gold & Kundan)
                </option>
                <option value="Diamond Solitaire Rings & Cocktails">
                  Diamond Solitaire Rings & Cocktails (IGI Certified)
                </option>
                <option value="Cuttack Tarakasi Silver Filigree Masterpieces">
                  Cuttack Tarakasi Silver Filigree Masterpieces
                </option>
                <option value="22K Everyday Gold Bangles, Kadas & Chains">
                  22K Everyday Gold Bangles, Kadas & Chains
                </option>
                <option value="24K Pure Bullion Coins & Puja Idols">
                  24K Pure Bullion Coins & Silver Puja Idols
                </option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Preferred Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
                >
                  <option value="Morning (11:00 AM - 1:00 PM)">11:00 AM - 1:00 PM</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM)">2:00 PM - 5:00 PM</option>
                  <option value="Evening (5:00 PM - 8:00 PM)">5:00 PM - 8:00 PM</option>
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Specific Requests or Custom Designs:
              </label>
              <textarea
                rows={2}
                placeholder="Mention specific bridal requirements, budget preference, or custom design ideas..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg transition"
            >
              Confirm Appointment Booking
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h4 className="font-serif font-bold text-xl text-stone-900">
              VIP Appointment Reserved!
            </h4>
            <div className="p-4 bg-white rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span>Appointment Ref:</span>
                <strong className="font-mono text-stone-900">{bookingRef}</strong>
              </div>
              <div className="flex justify-between">
                <span>Guest Name:</span>
                <strong className="text-stone-900">{name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Location / Mode:</span>
                <strong className="text-stone-900">
                  {bookingMode === "video" ? "HD Video Shopping Call" : storeLocation}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Slot:</span>
                <strong className="text-stone-900">
                  {preferredDate} ({timeSlot})
                </strong>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              A dedicated Yashraj Jewellery Specialist has been assigned to you. Our concierge will contact you on WhatsApp at <strong>{phone}</strong> with private lounge details.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-2.5 rounded-xl bg-[#8F6D2C] text-white font-semibold text-xs hover:bg-[#72551F]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
