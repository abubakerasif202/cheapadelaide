import Link from "next/link";
import { ArrowRight, Truck, Users } from "lucide-react";
import { business } from "@/config/business";
import { pricingPlans } from "@/data/pricing";

export function PricingCards() {
  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {pricingPlans.map((plan) => {
          const Icon = plan.id === "two-movers" ? Users : Truck;
          return (
            <article key={plan.id} className={`scroll-reveal interactive-card relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 sm:p-8 ${plan.popular ? "border-[#FF6A00] bg-[#071933] text-white shadow-2xl shadow-[#071933]/20" : "border-slate-200 bg-white text-[#0B2D5B] shadow-lg shadow-slate-900/5"}`}>
              <div aria-hidden="true" className={`absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full ${plan.popular ? "bg-[#FF6A00]/15" : "bg-orange-100/70"}`} />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${plan.popular ? "bg-[#FF6A00] text-[#071933]" : "bg-orange-50 text-[#0B2D5B]"}`}><Icon aria-hidden="true" className="h-6 w-6" /></span>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className={`mt-1 text-sm ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>{plan.suitability}</p>
                  </div>
                </div>
                <div className={`mt-7 rounded-2xl border p-5 sm:p-6 ${plan.popular ? "border-white/15 bg-white/5" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? "text-orange-200" : "text-slate-500"}`}>Starting rate</p>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className={`text-5xl font-extrabold tracking-tight ${plan.popular ? "text-white" : "text-[#0B2D5B]"}`}>{`$${plan.ratePerHalfHour}`}</span>
                    <span className={plan.popular ? "text-slate-300" : "text-slate-600"}>/ 30 min</span>
                  </p>
                  <p className={`mt-2 text-sm font-semibold ${plan.popular ? "text-orange-200" : "text-[#0B2D5B]"}`}>${plan.hourlyReference}/hr reference</p>
                </div>
                <p className={`mt-5 text-sm leading-relaxed ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>{business.pricing.disclaimer}</p>
              </div>
              <Link href={`/get-a-quote?team=${plan.id}`} className={`relative mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-colors ${plan.popular ? "bg-[#FF6A00] text-[#071933] hover:bg-orange-300" : "bg-[#0B2D5B] text-white hover:bg-[#071933]"}`}>
                {plan.ctaText}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
