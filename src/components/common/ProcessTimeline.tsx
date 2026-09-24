import { FileText, PhoneCall, CalendarCheck, Truck, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Request a Fast Quote",
    description:
      "Submit your move details online or call our dispatch desk directly to get started.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Scope Inventory & Access",
    description:
      "Share your suburb locations, furniture list, and access notes (lifts, stairs, driveways).",
    icon: PhoneCall,
  },
  {
    step: "03",
    title: "Confirm Crew & Timing",
    description:
      "Choose 2 Movers ($79/30 min) or 3 Movers ($99/30 min) and lock in your scheduled arrival window.",
    icon: CalendarCheck,
  },
  {
    step: "04",
    title: "Punctual Moving Day",
    description:
      "Our crew blanket-wraps, secures, and transports your belongings to your new address.",
    icon: Truck,
  },
];

export function ProcessTimeline() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-[#FF6A00]/50 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-[#FF6A00] tracking-tight">
                    {item.step}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50/80 text-[#FF6A00] transition group-hover:bg-[#FF6A00] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#0B2D5B] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-400">
                <span>Phase {idx + 1} of 4</span>
                {idx < 3 ? (
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#FF6A00]" />
                ) : (
                  <span className="text-[#FF6A00] font-semibold">Complete</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
