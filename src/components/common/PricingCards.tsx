import { pricingPlans } from "@/data/pricing";
import { PricingCard } from "@/components/pricing";

export function PricingCards() {
  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            suitability={plan.suitability}
            rate={plan.ratePerHalfHour}
            hourly={plan.hourlyReference}
            featured={plan.popular}
            icon={plan.id === "two-movers" ? "users" : "truck"}
            cta={plan.ctaText}
            href={`/get-a-quote?team=${plan.id}`}
          />
        ))}
      </div>
    </div>
  );
}
