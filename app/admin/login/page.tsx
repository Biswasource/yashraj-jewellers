"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Store,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, isAdminAuthenticated } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      router.push("/admin");
    }
  }, [isAdminAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(email, password);
      if (success) {
        router.push("/admin");
      } else {
        setErrorMsg("Invalid credentials. Please check your admin email and password.");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#041710] via-[#072016] to-[#0D261E] text-[#F5E8CB] flex flex-col justify-between selection:bg-[#DFBA73]/30">
      {/* Top Bar with Storefront Link */}
      <header className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A059] bg-[#072016] shadow-md group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Yashraj Jewellers" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-white uppercase tracking-wider group-hover:text-[#DFBA73] transition-colors leading-tight">
              Yashraj
            </h1>
            <p className="text-[9px] font-sans tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
              Jewellers • HQ Admin
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-[#DFBA73] hover:text-white transition flex items-center space-x-1.5 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-[#DFBA73]/30 backdrop-blur-xs"
        >
          <Store className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-[#0A261B]/95 rounded-3xl border-2 border-[#DFBA73]/40 p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle gold radial background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Emblem Icon */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#DFBA73] to-[#9E7B35] flex items-center justify-center text-stone-950 shadow-lg mb-3 border border-[#F5E8CB]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DFBA73] block mb-1">
              Internal Administration Portal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Inventory &amp; Product Control
            </h2>
            <p className="text-xs text-emerald-100/70 mt-1">
              Sign in with your master credentials to add, edit, or manage jewellery pieces.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center space-x-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email / Username */}
            <div className="space-y-1.5">
              <label className="font-semibold uppercase tracking-wider text-[11px] text-[#DFBA73]">
                Admin Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yashrajjewellers.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#051A12] border border-[#DFBA73]/30 text-white placeholder-emerald-100/30 focus:outline-hidden focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] text-xs transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-semibold uppercase tracking-wider text-[11px] text-[#DFBA73]">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#051A12] border border-[#DFBA73]/30 text-white placeholder-emerald-100/30 focus:outline-hidden focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] text-xs transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-300/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.99] transition duration-200 flex items-center justify-center space-x-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-[11px] text-emerald-200/50 font-light">
        Yashraj Jewellers © 2026 • Encrypted 256-Bit Showroom Inventory System
      </footer>
    </div>
  );
}
