"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  MessageCircle,
  Send,
  Building,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    scrollToProducts,
    showToast,
  } = useStore();

  // Enquiry modal states (Replacing checkout/payment)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [preferredShowroom, setPreferredShowroom] = useState(
    "Bhubaneswar Master Canteen Flagship"
  );
  const [notes, setNotes] = useState("");
  const [enquiryConfirmed, setEnquiryConfirmed] = useState(false);
  const [enquiryDocketNo, setEnquiryDocketNo] = useState("");

  if (!isCartOpen) return null;

  // Format multi-item WhatsApp message
  const itemsText = cart
    .map(
      (item, i) =>
        `${i + 1}. *${item.product.name}* (${item.product.code}) - Qty: ${item.quantity}, Price: ₹${(
          item.product.price * item.quantity
        ).toLocaleString("en-IN")}`
    )
    .join("\n");

  const whatsappMessage = encodeURIComponent(
    `Hello Yashraj Jewellers,\n\nI would like to enquire about the following ${cart.length} item(s) from your catalogue:\n\n${itemsText}\n\n*Total Estimated Quote:* ₹${cartTotal.toLocaleString(
      "en-IN"
    )}\n\nPlease share latest showroom availability, purity certs, and best pricing at my preferred showroom.\n\nThank you!`
  );

  const whatsappUrl = `https://wa.me/916742534016?text=${whatsappMessage}`;

  const handleSubmitShowroomEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast("Please provide your name and contact phone number.");
      return;
    }
    const newDocket = `YJ-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnquiryDocketNo(newDocket);
    setEnquiryConfirmed(true);
    clearCart();
    showToast(`Enquiry #${newDocket} successfully submitted!`);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
        <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-stone-200">
          {/* Header */}
          <div className="p-4 px-6 border-b border-[#E8DFC8] bg-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#8F6D2C]" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                My Enquiry Bag ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-800">
                  Your Enquiry Bag is Empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Add gold chokers, solitaires, or silver filigree pieces here to request price quotes and showroom availability.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToProducts();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#8F6D2C] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#72551F] transition"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-white rounded-xl border border-[#E8DFC8] flex space-x-3 shadow-2xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover border border-stone-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500 font-mono">
                        {item.product.code} • {item.selectedSize}
                      </p>
                      <p className="text-[10px] text-[#8F6D2C] font-semibold">
                        {item.product.purity} • Gross Wt: {item.product.grossWeight}g
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center space-x-2 border border-stone-200 rounded-lg px-2 py-0.5 bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-stone-500 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-stone-500 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold font-mono text-stone-900">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Enquiry Actions (Zero Payment Gateway!) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#E8DFC8] space-y-3 shadow-lg">
              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-stone-800">Estimated Total Valuation:</span>
                  <span className="font-mono text-lg font-bold text-[#8F6D2C]">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Includes hallmarked gold value, making charges, and 3% GST. Exact weight verified at showroom billing.
                </p>
              </div>

              {/* Direct WhatsApp Enquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire All on WhatsApp</span>
              </a>

              {/* Submit Showroom Enquiry Button */}
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Building className="w-4 h-4" />
                <span>Request Showroom Quotation</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SHOWROOM ENQUIRY MODAL (Replaces payment checkout) */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="p-4 px-6 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#8F6D2C]" />
                <h3 className="font-serif font-bold text-stone-900">
                  {enquiryConfirmed ? "Showroom Quotation Docket" : "Request Showroom Quotation"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsEnquiryOpen(false);
                  if (enquiryConfirmed) {
                    setIsCartOpen(false);
                    setEnquiryConfirmed(false);
                  }
                }}
                className="p-1 text-stone-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {!enquiryConfirmed ? (
                <form onSubmit={handleSubmitShowroomEnquiry} className="space-y-4 text-xs">
                  <div className="p-3 bg-[#FAF3E0] rounded-xl border border-[#DEC9A2] text-stone-700">
                    <p className="font-semibold text-stone-900">
                      Enquiring for {cart.length} item(s) • Est. Value: ₹{cartTotal.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      No online payment required. Our showroom manager will prepare your pieces for viewing and assist with final hallmarked billing at your preferred showroom.
                    </p>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanjeev Mohapatra"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Mobile / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Preferred Showroom
                      </label>
                      <select
                        value={preferredShowroom}
                        onChange={(e) => setPreferredShowroom(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900"
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
                      Notes or Viewing Timing Preference
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mention any custom size requirement, gold exchange inquiry, or preferred visit date..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Showroom Quotation Request</span>
                  </button>
                </form>
              ) : (
                /* OFFICIAL ENQUIRY DOCKET */
                <div className="space-y-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-1.5" />
                    <h4 className="font-serif font-bold text-lg">Enquiry Docket Confirmed!</h4>
                    <p className="text-xs">
                      Your showroom enquiry reference number is:
                    </p>
                    <p className="text-sm font-mono font-bold mt-1 tracking-wider text-stone-900">
                      {enquiryDocketNo}
                    </p>
                  </div>

                  {/* Printable Slip */}
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                      <div>
                        <h5 className="font-serif font-bold text-stone-900">YASHRAJ JEWELLERS</h5>
                        <p className="text-[10px] text-stone-500">Official Showroom Quotation Docket</p>
                      </div>
                      <span className="text-[10px] font-bold bg-[#FAF3E0] text-[#8F6D2C] px-2 py-0.5 rounded">
                        ENQUIRY REGISTERED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                      <div>
                        <span className="text-stone-400 block">Customer:</span>
                        <strong className="text-stone-800">{customerName}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Phone / WhatsApp:</span>
                        <strong className="text-stone-800">{customerPhone}</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-600">
                      <span className="text-stone-400 block">Designated Showroom:</span>
                      <strong className="text-stone-800">{preferredShowroom}</strong>
                    </div>

                    <p className="text-[11px] text-stone-500">
                      Our customer relationship manager will connect with you to confirm appointment or send live showroom videos of your requested pieces.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center space-x-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Quotation Slip</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEnquiryOpen(false);
                        setIsCartOpen(false);
                        setEnquiryConfirmed(false);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#8F6D2C] text-white text-xs font-semibold hover:bg-[#745821]"
                    >
                      Back to Showroom
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
