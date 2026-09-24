"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Layers,
  ChevronRight,
} from "lucide-react";
import { business } from "@/config/business";

export function AdelaideMoveBento() {
  const [selectedHomeType, setSelectedHomeType] = useState<"unit" | "house">("unit");

  const calculationData = {
    unit: {
      team: "2 Movers + Truck",
      rateHalfHour: 79,
      hourlyRef: 158,
      typicalHours: "2.5 – 3.5 hrs",
      estCost: "$395 – $553",
      truckCapacity: "20 – 25 m³ (approx 3T)",
      bestFor: "Studios, 1–2 bedroom units, townhouses & modest apartments",
      inclusions: [
        "2 experienced professional removalists",
        "Enclosed pantech truck with tail-lift",
        "Quilted furniture blankets & ratchet ties",
        "Zero stair surcharges",
      ],
    },
    house: {
      team: "3 Movers + Truck",
      rateHalfHour: 99,
      hourlyRef: 198,
      typicalHours: "3.5 – 5.5 hrs",
      estCost: "$693 – $1,089",
      truckCapacity: "35 – 45 m³ (approx 6T)",
      bestFor: "3–4 bedroom suburban homes, two-storey residences & large inventories",
      inclusions: [
        "3 experienced professional removalists",
        "Larger volume truck for single-trip capacity",
        "Continuous loading & stacking efficiency",
        "Reduces total moving time by up to 35%",
      ],
    },
  };

  const currentCalc = calculationData[selectedHomeType];

  return (
    <div className="w-full space-y-6">
      {/* Top Asymmetric Row (8 cols + 4 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Tile 1: The Intelligent Move Sizer (8 cols) */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-7 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:border-[#FF6A00]/40 lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Move Sizer & Crew Allocator</span>
              </div>

              {/* Selector Pills */}
              <div className="flex items-center rounded-2xl bg-slate-100 p-1 text-xs font-bold text-slate-700">
                <button
                  type="button"
                  onClick={() => setSelectedHomeType("unit")}
                  className={`rounded-xl px-4 py-2 transition-all ${
                    selectedHomeType === "unit"
                      ? "bg-[#0B2D5B] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  1–2 Bed Unit
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHomeType("house")}
                  className={`rounded-xl px-4 py-2 transition-all ${
                    selectedHomeType === "house"
                      ? "bg-[#0B2D5B] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  3–4 Bed House
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
              {/* Left Column: Live Numbers */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recommended Configuration
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5B] tracking-tight">
                  {currentCalc.team}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentCalc.bestFor}
                </p>

                <div className="pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#0B2D5B] tracking-tight font-mono">
                      ${currentCalc.rateHalfHour}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-500">
                      / 30 min
                    </span>
                    <span className="ml-2 rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#FF6A00] font-mono">
                      ${currentCalc.hourlyRef}/hr ref
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Typical Duration: <strong className="text-slate-800 font-mono">{currentCalc.typicalHours}</strong> (Est. <span className="font-mono text-[#0B2D5B] font-bold">{currentCalc.estCost}</span>)
                  </div>
                </div>
              </div>

              {/* Right Column: Inclusions & Fleet Spec */}
              <div className="md:col-span-6 rounded-3xl bg-slate-50 p-6 border border-slate-100 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-xs font-bold text-[#0B2D5B]">Truck Capacity</span>
                  <span className="text-xs font-mono font-bold text-slate-700">{currentCalc.truckCapacity}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {currentCalc.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
            <span className="text-xs text-slate-500 italic text-center sm:text-left">
              {business.pricing.disclaimer}
            </span>
            <Link
              href={`/get-a-quote?team=${selectedHomeType === "unit" ? "two-movers" : "three-movers"}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3 text-xs sm:text-sm font-bold text-[#071933] shadow-md transition hover:bg-orange-300 active:scale-[0.98]"
            >
              <span>Lock In This Configuration</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Tile 2: Live Operations Base Radar (4 cols) */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#071933] p-7 sm:p-10 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6A00] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF6A00]" />
                </span>
                <span>Active Dispatch</span>
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono text-slate-300 border border-white/10">
                Elizabeth Vale Base
              </span>
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] leading-snug">
              Rapid Metropolitan Adelaide Arterial Coverage
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Operating out of 20 Prunus Ave, Elizabeth Vale SA 5112 with direct arterial transit via Main North Road and the Northern Expressway.
            </p>

            {/* Travel Latency Matrix */}
            <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400">Salisbury & Mawson Lakes:</span>
                <span className="font-mono font-bold text-[#FF6A00]">8 – 14 mins</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400">Prospect & North Adelaide:</span>
                <span className="font-mono font-bold text-white">20 – 25 mins</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400">Adelaide CBD & Norwood:</span>
                <span className="font-mono font-bold text-white">26 – 32 mins</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400">Adelaide Hills (via SE Fwy):</span>
                <span className="font-mono font-bold text-slate-300">38 – 45 mins</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-300 hover:text-white transition"
            >
              <span>View full metropolitan zones</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Asymmetric Row (4 cols + 8 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Tile 3: The Zero-Surprise Policy Box (4 cols) */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-7 sm:p-9 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FF6A00]" />
              <span>Consumer Protection</span>
            </div>

            <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#0B2D5B] font-[family-name:var(--font-heading)]">
              Zero Hidden Moving Surcharges
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              We eliminate the predatory fees commonly buried in removalist contracts:
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">No Stair Surcharges:</strong>
                  <span className="text-slate-500">Billed only on standard elapsed time, not per flight.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Free Equipment Inclusions:</strong>
                  <span className="text-slate-500">Blankets, heavy ratchet straps, and dollies are complimentary.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-[#FF6A00] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Disclosed Travel Fees:</strong>
                  <span className="text-slate-500">Depot travel fees confirmed prior to booking.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2D5B] hover:text-[#FF6A00] transition"
            >
              <span>Explore our transparent pricing policy</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Tile 4: Adelaide Regional Logistics Master Matrix (8 cols) */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-50/70 p-7 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  Adelaide Metro Navigation
                </span>
                <h3 className="mt-1 text-2xl font-bold text-[#0B2D5B] font-[family-name:var(--font-heading)]">
                  Regional Logistical Mastery Across Greater Adelaide
                </h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200 shrink-0">
                Open 7 Days: 7am – 8pm
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B2D5B]">
                  <Building2 className="h-4 w-4 text-[#FF6A00]" />
                  <span>Adelaide CBD & North Adelaide</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Careful coordination with strata building managers for goods lift reservations, basement clearances, and City of Adelaide clearway parking restrictions.
                </p>
                <Link
                  href="/blog/moving-adelaide-cbd-apartment-guide"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6A00] hover:text-[#E63900]"
                >
                  <span>CBD Apartment Guide</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B2D5B]">
                  <MapPin className="h-4 w-4 text-[#FF6A00]" />
                  <span>Adelaide Hills (Stirling & Mt Barker)</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Navigating winding corridors, unsealed tracks, low eucalyptus branch canopies, and steep driveway gradients with optimized vehicle wheelbase allocation.
                </p>
                <Link
                  href="/blog/moving-to-adelaide-hills-removals-guide"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6A00] hover:text-[#E63900]"
                >
                  <span>Hills Moving Guide</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B2D5B]">
                  <Truck className="h-4 w-4 text-[#FF6A00]" />
                  <span>Northern & Western Suburbs</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Direct proximity to our Elizabeth Vale base provides rapid dispatch across Salisbury, Golden Grove, Mawson Lakes, Port Adelaide, and Semaphore.
                </p>
                <Link
                  href="/service-areas"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6A00] hover:text-[#E63900]"
                >
                  <span>Northern Suburbs Coverage</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B2D5B]">
                  <Layers className="h-4 w-4 text-[#FF6A00]" />
                  <span>Eastern & Southern Coastal Hubs</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Prompt transport to Burnside, Glenelg, Marion, Brighton, and Hallett Cove, including high-density townhouse stairs and narrow beachside lanes.
                </p>
                <Link
                  href="/services/house-removals"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6A00] hover:text-[#E63900]"
                >
                  <span>Residential House Moves</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>Operated from Elizabeth Vale SA | HF Removals Adelaide shared base</span>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-bold text-[#0B2D5B] hover:text-[#FF6A00]"
            >
              <span>Explore All Adelaide Guides & Insights</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
