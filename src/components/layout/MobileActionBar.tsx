"use client";

import { usePathname } from "next/navigation";
import { business } from "@/config/business";
import { Button } from "@/components/core";

export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/get-a-quote") return null;

  return (
    <div className="ca-actionbar ca-actionbar--responsive md:hidden">
      <div className="ca-actionbar__row">
        <Button href={business.contact.primaryPhoneHref} variant="outline" leadingIcon="phone">
          Call {business.contact.primaryPhone}
        </Button>
        <Button href="/get-a-quote" leadingIcon="file-text">
          Get a Quote
        </Button>
      </div>
    </div>
  );
}
