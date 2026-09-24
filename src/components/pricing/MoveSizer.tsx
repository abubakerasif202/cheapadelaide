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
  hours: string;
  est: string;
  capacity: string;
  bestFor: string;
  inclusions: string[];
}

const DATA: Record<"unit" | "house", SizeConfig> = {
  unit: {
    label: "1–2 Bed Unit",
    team: "2 Movers + Truck",
    id: "two-movers",
    rate: 79,
    hourly: 158,
    hours: "2.5 – 3.5 hrs",
    est: "$395 – $553",
    capacity: "20 – 25 m³ (approx 3T)",
    bestFor: "Studios, 1–2 bedroom units, townhouses & modest apartments",
    inclusions: [
      "2 experienced professional removalists",
      "Enclosed pantech truck with tail-lift",
      "Quilted furniture blankets & ratchet ties",
      "Zero stair surcharges",
    ],
  },
  house: {
    label: "3–4 Bed House",
    team: "3 Movers + Truck",
    id: "three-movers",
    rate: 99,
    hourly: 198,
    hours: "3.5 – 5.5 hrs",
    est: "$693 – $1,089",
    capacity: "35 – 45 m³ (approx 6T)",
    bestFor: "3–4 bedroom suburban homes, two-storey residences & large inventories",
    inclusions: [
      "3 experienced professional removalists",
      "Larger volume truck for single-trip capacity",
      "Continuous loading & stacking efficiency",
      "Reduces total moving time by up to 35%",
    ],
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
            Recommended Configuration
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
            Typical duration: <strong className="ca-num" style={{ color: "var(--slate-800)" }}>{config.hours}</strong> (Est.{" "}
            <strong className="ca-num" style={{ color: "var(--navy-900)" }}>{config.est}</strong>)
          </p>
        </div>
        <div className="ca-card ca-card--flat ca-card--compact" style={{ gap: 12 }}>
          <div className="ca-kv" style={{ paddingTop: 0, borderBottom: "1px solid var(--border-default)", paddingBottom: 12 }}>
            <span style={{ fontWeight: 700, color: "var(--navy-900)" }}>Truck Capacity</span>
            <span className="ca-num" style={{ fontWeight: 700, color: "var(--slate-700)" }}>
              {config.capacity}
            </span>
          </div>
          <ul className="ca-checklist">
            {config.inclusions.map((item) => (
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
          Lock In This Configuration
        </Button>
      </div>
    </div>
  );
}
