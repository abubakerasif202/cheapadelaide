import Link from "next/link";
import { Phone, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { business } from "@/config/business";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Tell Us What You're Moving & Get a Clear Price Estimate",
  subtitle = "Our Adelaide removalists are ready 7 days a week. Speak directly with our dispatch team or submit your moving details online.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#071933] py-16 sm:py-24 text-white">
      {/* Subtle brand orange glow in corner */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF6A00]/10 blur-3xl" />
      <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-[#0B2D5B]/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] border border-white/10">
          Adelaide Moves Further Together
        </span>

        <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] leading-tight">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
          {subtitle}
        </p>

        {/* Feature badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#FF6A00]" />
            <span>Open 7:00 am – 8:00 pm Daily</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#FF6A00]" />
            <span>2 Movers from $79 / 30 min</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#FF6A00]" />
            <span>3 Movers from $99 / 30 min</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-a-quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#FF6A00] px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-500/25 transition hover:bg-[#E63900] active:scale-[0.98]"
          >
            <span>Request Free Moving Quote</span>
            <ArrowRight className="h-5 w-5" />
          </Link>

          <a
            href={business.contact.primaryPhoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98]"
          >
            <Phone className="h-5 w-5 text-[#FF6A00]" />
            <span>Call {business.contact.primaryPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
