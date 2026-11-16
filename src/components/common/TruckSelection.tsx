"use client";
import { truckOptions, truckQuoteNotice, type TruckPreference } from "@/data/pricing";
import { useEffect, useState } from "react";
import { Truck, Check } from "lucide-react";

export function TruckSelection() {
  const [selected, setSelected] = useState<TruckPreference>("unsure");
  useEffect(() => {
    const update = (event: Event) => setSelected((event as CustomEvent<TruckPreference>).detail);
    window.addEventListener("cheap-truck-selection", update);
    return () => window.removeEventListener("cheap-truck-selection", update);
  }, []);
  function choose(id: TruckPreference) {
    setSelected(id);
    window.dispatchEvent(new CustomEvent("cheap-truck-selection", { detail: id }));
    const form = document.querySelector<HTMLFormElement>("form.ca-form");
    form?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    form?.querySelector<HTMLSelectElement>("#selectedTruck")?.focus({ preventScroll: true });
  }
  return <section className="truck-section" aria-labelledby="truck-heading">
    <div className="truck-intro"><p className="truck-eyebrow">Moving truck with movers · Adelaide</p><h2 id="truck-heading">Choose the Right Truck for Your Move</h2><p>From smaller apartment moves to larger family relocations, tell us what you&apos;re moving and we&apos;ll help match the right truck and crew to your job.</p></div>
    <fieldset className="truck-grid"><legend className="sr-only">Preferred truck size</legend>{truckOptions.map((truck) => <article key={truck.id} className={`truck-card ${selected === truck.id ? "truck-card--selected" : ""}`}>
      <div className={`truck-art truck-art--${truck.id}`} aria-hidden="true"><Truck strokeWidth={1.2} /><span>{truck.id === "small" ? "Compact move planning" : "Room for a bigger plan"}</span></div>
      <div className="truck-content"><label className="truck-choice"><input type="radio" name="truckPreference" value={truck.id} checked={selected === truck.id} onChange={() => { setSelected(truck.id); window.dispatchEvent(new CustomEvent("cheap-truck-selection", { detail: truck.id })); }} /><h3>{truck.name}</h3></label><p>{truck.description}</p><p className="truck-price">Request a tailored quote</p><p>Capacity and crew confirmed after reviewing your move.</p><ul>{truck.benefits.map(benefit => <li key={benefit}><Check size={18} aria-hidden="true" />{benefit}</li>)}</ul><button type="button" onClick={() => choose(truck.id)}>Select {truck.name}<span aria-hidden="true"> →</span></button></div>
    </article>)}</fieldset><p className="truck-notice">{truckQuoteNotice}</p>
  </section>;
}
