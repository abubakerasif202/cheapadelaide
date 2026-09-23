import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { business } from "@/config/business";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-4 pb-[calc(.625rem+env(safe-area-inset-bottom))] pt-2.5 shadow-lg backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        {/* Call Button */}
        <a
          href={business.contact.primaryPhoneHref}
          aria-label={`Call ${business.contact.primaryPhone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#0B2D5B] bg-white py-2.5 text-xs font-bold text-[#0B2D5B] shadow-sm transition active:scale-[0.98]"
        >
          <Phone className="h-4 w-4 text-[#FF6A00]" />
          <span>Call {business.contact.primaryPhone}</span>
        </a>

        {/* Free Quote Button */}
        <Link
          href="/get-a-quote"
          aria-label="Free Quote"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF6A00] py-2.5 text-xs font-bold text-[#071933] shadow-md shadow-orange-500/20 transition active:scale-[0.98] hover:bg-orange-300"
        >
          <FileText className="h-4 w-4" />
          <span>Free Quote</span>
        </Link>
      </div>
    </div>
  );
}
