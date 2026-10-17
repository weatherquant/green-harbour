"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GreenHarbourLogo from "@/components/GreenHarbourLogo";

export default function PublicHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f7f7f2]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-[#163d30]">
          <GreenHarbourLogo />
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] text-[#555a54] md:flex">
          <a
            href="#strategy"
            className="transition hover:text-[#111]"
          >
            Strategy
          </a>

          <a
            href="#portfolio"
            className="transition hover:text-[#111]"
          >
            Portfolio
          </a>

          <a
            href="#approach"
            className="transition hover:text-[#111]"
          >
            Approach
          </a>

          <a
            href="#opportunities"
            className="transition hover:text-[#111]"
          >
            Opportunities
          </a>
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/platform"
            className="hidden text-[10px] tracking-[0.08em] text-[#555a54] transition hover:text-black sm:block"
          >
            INVESTOR PORTAL
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-[#173f32] px-4 py-2.5 text-[10px] font-medium tracking-[0.08em] text-white transition hover:bg-[#0f3025]"
          >
            CLIENT LOGIN
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </header>
  );
}