"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#072016] flex items-center justify-center text-[#DFBA73]">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#DFBA73] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs uppercase tracking-widest font-serif">Redirecting to Admin Login...</p>
      </div>
    </div>
  );
}
