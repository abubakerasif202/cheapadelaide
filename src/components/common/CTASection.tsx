import { CTASection as CTASectionBase } from "@/components/marketing";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({ title, subtitle }: CTASectionProps) {
  return <CTASectionBase title={title} subtitle={subtitle} />;
}
