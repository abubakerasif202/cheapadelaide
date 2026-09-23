import { FileText, PhoneCall, CalendarCheck, Truck } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Request a Quote",
    description:
      "Share your move details through the online form or call us directly.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Tell Us About Your Move",
    description:
      "Include your inventory, property access, pickup and delivery locations, and any additional service requests.",
    icon: PhoneCall,
  },
  {
    step: "03",
    title: "Confirm the Plan",
    description:
      "Discuss the move details and the available team options before confirming arrangements.",
    icon: CalendarCheck,
  },
  {
    step: "04",
    title: "Moving Day",
    description:
      "The movers transport your belongings from the pickup location to the delivery address.",
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
              className="scroll-reveal relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#FF6A00]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-[#FF6A00] font-[family-name:var(--font-heading)]">
                    {item.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#0B2D5B]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              {/* Connecting indicator */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#0B2D5B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]" />
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
