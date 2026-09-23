import Link from "next/link";
import { Check, ArrowRight, Truck, Users } from "lucide-react";
import { pricingPlans, priceDisclaimer } from "@/data/pricing";

export function PricingCards() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition duration-200 ${
                plan.popular
                  ? "border-2 border-[#FF6A00] bg-white shadow-xl shadow-orange-500/10 ring-1 ring-[#FF6A00]/20"
                  : "border border-slate-200 bg-white shadow-md hover:border-slate-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 right-6 rounded-full bg-[#FF6A00] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-orange-50 text-[#FF6A00]"
                        : "bg-slate-100 text-[#0B2D5B]"
                    }`}
                  >
                    {plan.id === "two-movers" ? (
                      <Users className="h-6 w-6" />
                    ) : (
                      <Truck className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2D5B]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500">{plan.suitability}</p>
                  </div>
                </div>

                {/* Rate Display */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-6 border border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      From
                    </span>
                    <span className="text-4xl font-extrabold tracking-tight text-[#0B2D5B]">
                      ${plan.ratePerHalfHour}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                      / 30 minutes
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-[#FF6A00]">
                    Hourly reference: ${plan.hourlyReference}/hr
                  </div>
                </div>

                {/* Feature List */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What is Included:
                  </span>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href={`/get-a-quote?team=${plan.id}`}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition shadow-sm ${
                    plan.popular
                      ? "bg-[#FF6A00] text-white hover:bg-[#E63900] shadow-orange-500/20"
                      : "bg-[#0B2D5B] text-white hover:bg-[#071933]"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Required Qualifier Note */}
      <div className="mx-auto mt-6 max-w-3xl text-center">
        <p className="rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-600 border border-slate-200">
          <span className="font-semibold text-slate-800">Please note: </span>
          {priceDisclaimer}
        </p>
      </div>
    </div>
  );
}
