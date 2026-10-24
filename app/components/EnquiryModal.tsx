"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import {
  X,
  MessageCircle,
  Phone,
  MapPin,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
  Send,
  Calendar,
} from "lucide-react";

export default function EnquiryModal() {
  const { enquireProduct, setEnquireProduct, showToast } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [preferredShowroom, setPreferredShowroom] = useState(
    "Bhubaneswar Master Canteen Flagship"
  );
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryDocketNo, setEnquiryDocketNo] = useState("");

  if (!enquireProduct) return null;

  const product = enquireProduct;

  const whatsappMessage = encodeURIComponent(
    `Hello Yashraj Jewellers,\n\nI would like to enquire about:\n*Product:* ${product.name}\n*SKU:* ${product.code}\n*Purity:* ${product.purity}\n*Gross Weight:* ${product.grossWeight}g\n*Quoted Price:* ₹${product.price.toLocaleString("en-IN")}\n\nPlease share latest showroom availability, purity certificate copy, and high-definition viewing options.\n\nThank you!`
  );

  const whatsappUrl = `https://wa.me/917008343796?text=${whatsappMessage}`;

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast("Please provide your name and contact phone.");
      return;
    }
    const docket = `YJ-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnquiryDocketNo(docket);
    setIsSubmitted(true);
    showToast(`Enquiry #${docket} submitted! Our showroom manager will contact you.`);
  };

  const handleClose = () => {
    setEnquireProduct(null);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white text-stone-900 w-full max-w-lg rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#8F6D2C]" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {isSubmitted ? "Showroom Enquiry Docket" : "Jewellery Enquiry & Price Quote"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {/* Product Mini Preview Box */}
          <div className="p-3 bg-white rounded-2xl border border-[#E8DFC8] flex space-x-3.5 shadow-2xs">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-20 rounded-xl object-cover border border-stone-200"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                  {product.code}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-[11px] text-[#8F6D2C] font-semibold">
                  {product.purity} • Gross Wt: {product.grossWeight}g
                </p>
              </div>
              <p className="text-sm font-bold font-mono text-stone-900">
                ₹{product.price.toLocaleString("en-IN")}{" "}
                <span className="text-[10px] font-normal text-stone-500 font-sans">
                  (Estimated transparent rate)
                </span>
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            <>
              {/* WhatsApp Quick Action Button */}
              <div className="pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire Instantly on WhatsApp</span>
                </a>
                <p className="text-[10px] text-stone-500 text-center mt-1.5">
                  Direct live chat with Yashraj Jewellers senior jewellery consultant.
                </p>
              </div>

              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-stone-200" />
                <span className="px-3 text-[11px] text-stone-400 uppercase font-semibold">
                  Or Submit Showroom Enquiry
                </span>
                <div className="flex-1 border-t border-stone-200" />
              </div>

              {/* Showroom Enquiry Form */}
              <form onSubmit={handleSubmitEnquiry} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Preferred Showroom
                    </label>
                    <select
                      value={preferredShowroom}
                      onChange={(e) => setPreferredShowroom(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                    >
                      <option value="Bhubaneswar Master Canteen Flagship">
                        Bhubaneswar (Master Canteen)
                      </option>
                      <option value="Bhubaneswar Raghunathpur">
                        Bhubaneswar (Raghunathpur)
                      </option>
                      <option value="Cuttack CDA Sector 9">
                        Cuttack (CDA Sector 9)
                      </option>
                      <option value="Cuttack Cantonment Road">
                        Cuttack (Cantonment Road)
                      </option>
                      <option value="Brahmapur Royal Showroom">
                        Brahmapur (Giri Market)
                      </option>
                      <option value="New Delhi Lajpat Boutique">
                        New Delhi (Lajpat Nagar)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Your Enquiry / Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., Inquire about customized sizing, gold weight adjustment, or bridal booking date..."
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg transition flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Jewellery Enquiry</span>
                </button>
              </form>
            </>
          ) : (
            /* OFFICIAL SHOWROOM ENQUIRY DOCKET */
            <div className="space-y-4">
              <div className="text-center p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-1.5" />
                <h4 className="font-serif font-bold text-lg">Enquiry Successfully Registered!</h4>
                <p className="text-xs">
                  Your official quotation docket reference is:
                </p>
                <p className="text-sm font-mono font-bold mt-1 tracking-wider text-stone-900">
                  {enquiryDocketNo}
                </p>
              </div>

              {/* Printable Enquiry Slip */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                  <div>
                    <h5 className="font-serif font-bold text-stone-900">YASHRAJ JEWELLERS</h5>
                    <p className="text-[10px] text-stone-500">Official Jewellery Quotation Enquiry</p>
                  </div>
                  <span className="text-[10px] font-bold bg-[#FAF3E0] text-[#8F6D2C] px-2 py-0.5 rounded">
                    ACTIVE ENQUIRY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                  <div>
                    <span className="text-stone-400 block">Enquirer Name:</span>
                    <strong className="text-stone-800">{customerName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Contact Phone:</span>
                    <strong className="text-stone-800">{customerPhone}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600">
                  <span className="text-stone-400 block">Target Showroom:</span>
                  <strong className="text-stone-800">{preferredShowroom}</strong>
                </div>

                <div className="p-2.5 bg-[#FAF8F5] rounded-xl text-[11px] text-stone-700">
                  <span className="text-stone-500 block mb-0.5">Item Requested:</span>
                  <strong>{product.name} ({product.code})</strong>
                  <div className="flex justify-between mt-1 text-stone-600">
                    <span>{product.purity} • Gross Wt: {product.grossWeight}g</span>
                    <span className="font-mono font-bold text-[#8F6D2C]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Enquiry Docket</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl bg-[#8F6D2C] text-white text-xs font-semibold hover:bg-[#745821]"
                >
                  Back to Catalogue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
