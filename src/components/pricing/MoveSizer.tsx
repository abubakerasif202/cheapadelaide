"use client";

import { useState } from "react";
import { business } from "@/config/business";
import { Icon, Badge, Button } from "@/components/core";

interface SizeConfig {
  label: string;
  team: string;
  id: string;
  rate: number;
  hourly: number;
  bestFor: string;
  quoteDetails: string[];
}

const DATA: Record<"unit" | "house", SizeConfig> = {
  unit: {
    label: "1–2 Bed Unit",
    team: "2 Movers + Truck",
    id: "two-movers",
    rate: business.pricing.twoMovers.thirtyMinutes,
    hourly: business.pricing.twoMovers.hourlyReference,
    bestFor: "For smaller moves such as units or apartments. Share your inventory and access details to discuss team size.",
    quoteDetails: ["Items to be moved", "Pickup and delivery suburbs", "Date and access details"],
  },
  house: {
    label: "3–4 Bed House",
    team: "3 Movers + Truck",
    id: "three-movers",
    rate: business.pricing.threeMovers.thirtyMinutes,
    hourly: business.pricing.threeMovers.hourlyReference,
    bestFor: "For larger moves such as multi-bedroom homes. Share your inventory and access details to discuss team size.",
    quoteDetails: ["Items to be moved", "Pickup and delivery suburbs", "Date and access details"],
  },
};

export interface MoveSizerProps {
  defaultSize?: "unit" | "house";
}

export function MoveSizer({ defaultSize = "unit" }: MoveSizerProps) {
  const [key, setKey] = useState<"unit" | "house">(defaultSize);
  const config = DATA[key];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="ca-tile__head">
        <Badge icon="sparkles">Move Sizer & Crew Allocator</Badge>
        <div className="ca-seg" role="group" aria-label="Home size">
          {(Object.entries(DATA) as [keyof typeof DATA, SizeConfig][]).map(([k, v]) => (
            <button key={k} type="button" aria-pressed={key === k} onClick={() => setKey(k)}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div className="ca-grid ca-grid--2" style={{ marginTop: 32, alignItems: "center", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span className="ca-eyebrow" style={{ color: "var(--text-muted)" }}>
            Team option
          </span>
          <h3 className="ca-h2" style={{ fontSize: "clamp(1.5rem,1.3rem + 1vw,1.875rem)" }}>
            {config.team}
          </h3>
          <p className="ca-small">{config.bestFor}</p>
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            <span className="ca-stat" style={{ color: "var(--navy-900)" }}>
              ${config.rate}
            </span>
            <span className="ca-small" style={{ fontWeight: 600, color: "var(--text-muted)" }}>
              / 30 min
            </span>
            <span
              className="ca-num"
              style={{ marginLeft: 4, padding: "4px 10px", borderRadius: 8, background: "var(--orange-50)", color: "var(--orange-700)", fontSize: 12, fontWeight: 700 }}
            >
              ${config.hourly}/hr ref
            </span>
          </div>
          <p className="ca-caption">
            Starting rate only. Request a quote for your move details.
          </p>
        </div>
        <div className="ca-card ca-card--flat ca-card--compact" style={{ gap: 12 }}>
          <div className="ca-kv" style={{ paddingTop: 0, borderBottom: "1px solid var(--border-default)", paddingBottom: 12 }}>
            <span style={{ fontWeight: 700, color: "var(--navy-900)" }}>Details to include in your quote</span>
          </div>
          <ul className="ca-checklist">
            {config.quoteDetails.map((item) => (
              <li key={item} style={{ fontSize: 13 }}>
                <Icon name="check-circle-2" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ca-tile__foot" style={{ marginTop: 32 }}>
        <span className="ca-caption" style={{ fontStyle: "italic", maxWidth: 380 }}>
          {business.pricing.disclaimer}
        </span>
        <Button href={`/get-a-quote?team=${config.id}`} trailingIcon="arrow-right">
          Request This Team Option
        </Button>
      </div>
    </div>
  );
}
