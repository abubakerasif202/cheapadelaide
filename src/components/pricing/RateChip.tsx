import { business } from "@/config/business";

export interface RateChipProps {
  code?: string;
  name?: string;
  rate?: number;
  hourly?: number;
  inverse?: boolean;
}

export function RateChip({ code = "2P", name = business.pricing.twoMovers.name, rate = business.pricing.twoMovers.thirtyMinutes, hourly = rate * 2, inverse = false }: RateChipProps) {
  return (
    <div className={"ca-rate" + (inverse ? " ca-rate--inverse" : "")}>
      <span className="ca-rate__code">{code}</span>
      <div>
        <div className="ca-rate__name">{name}</div>
        <div className="ca-rate__price">
          From <strong>${rate}</strong> / 30 min {hourly ? <em>(${hourly}/hr)</em> : null}
        </div>
      </div>
    </div>
  );
}
