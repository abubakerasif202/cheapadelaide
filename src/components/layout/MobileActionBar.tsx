import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { business } from "@/config/business";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        {/* Call Button */}
        <a
          href={business.contact.primaryPhoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#0B2D5B] bg-white py-2.5 text-xs font-bold text-[#0B2D5B] shadow-sm transition active:scale-[0.98]"
        >
          <Phone className="h-4 w-4 text-[#FF6A00]" />
          <span>Call {business.contact.primaryPhone}</span>
        </a>

        {/* Free Quote Button */}
        <Link
          href="/get-a-quote"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF6A00] py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition active:scale-[0.98] hover:bg-[#E63900]"
        >
          <FileText className="h-4 w-4" />
          <span>Get Free Quote</span>
        </Link>
      </div>
    </div>
  );
}
