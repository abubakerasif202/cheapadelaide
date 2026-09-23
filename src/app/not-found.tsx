import Link from "next/link";
import Image from "next/image";
import { Home, Truck, FileText } from "lucide-react";
import { business } from "@/config/business";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="relative mb-6">
        <Image
          src="/brand/logo-mark.png"
          alt="Cheap Adelaide Removalist"
          width={100}
          height={100}
          className="mx-auto rounded-3xl shadow-lg shadow-orange-500/10"
        />
        <div className="absolute -bottom-2 -right-2 rounded-full bg-[#FF6A00] px-3 py-1 text-xs font-black text-[#071933] shadow-md">
          404
        </div>
      </div>

      <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
        Page Not Found
      </span>

      <h1 className="mt-4 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
        Looks Like This Move Went Off Route.
      </h1>

      <p className="mt-4 max-w-md text-base text-slate-600 leading-relaxed">
        The page you are looking for doesn&apos;t exist or may have been relocated. Let&apos;s get you back on track to your Adelaide move.
      </p>

      {/* Suggested Routes */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B2D5B] px-5 py-3 text-sm font-bold text-white hover:bg-[#071933] transition"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
        >
          <Truck className="h-4 w-4 text-[#FF6A00]" />
          <span>Our Services</span>
        </Link>

        <Link
          href="/get-a-quote"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 hover:bg-[#E63900] transition"
        >
          <FileText className="h-4 w-4" />
          <span>Get a Quote</span>
        </Link>
      </div>

      <p className="mt-12 text-xs text-slate-400">
        Need direct assistance? Call dispatch on{" "}
        <a
          href={business.contact.primaryPhoneHref}
          className="font-bold text-[#0B2D5B] hover:text-[#FF6A00]"
        >
          {business.contact.primaryPhone}
        </a>
      </p>
    </div>
  );
}
