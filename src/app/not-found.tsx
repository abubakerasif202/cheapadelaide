import type { Metadata } from "next";
import { EmptyState } from "@/components/feedback";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
  alternates: {},
};

export default function NotFound() {
  return (
    <div className="ca-container" style={{ paddingBlock: 64 }}>
      <EmptyState
        variant="page"
        as="h1"
        markSrc="/brand/logo-mark.png"
        code="404"
        eyebrow="Page Not Found"
        title="Looks Like This Move Went Off Route."
        description="The page you are looking for doesn't exist or may have been relocated. Let's get you back on track to your Adelaide move."
        actions={[
          { label: "Back to Home", href: "/", icon: "home", variant: "secondary" },
          { label: "Our Services", href: "/services", icon: "truck", variant: "outline" },
          { label: "Get a Quote", href: "/get-a-quote", icon: "file-text", variant: "primary" },
        ]}
      />
    </div>
  );
}
