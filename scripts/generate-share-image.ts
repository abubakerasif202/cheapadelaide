import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement, type CSSProperties } from "react";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { business } from "../src/config/business";

// Regenerate with: npx tsx scripts/generate-share-image.ts
// All advertised prices and contact details come from the website configuration.
async function main() {
  const root = resolve(import.meta.dirname, "..");
  const logo = await readFile(resolve(root, "public/brand/logo-stacked.png"));
  const box = (style: CSSProperties, ...children: React.ReactNode[]) =>
    createElement("div", { style: { display: "flex", ...style } }, ...children);
  const text = (value: string, style: CSSProperties = {}) => box(style, value);
  const colors = business.brandColors;
  const cards = [business.pricing.twoMovers, business.pricing.threeMovers].map((team) =>
    box({ flexDirection: "column", width: 276, padding: 20, border: `2px solid ${colors.vividOrange}`, borderRadius: 16, background: colors.darkCharcoal },
      text(team.name, { fontSize: 21, color: "#E2E8F0" }),
      text(`From $${team.thirtyMinutes}`, { fontSize: 38, fontWeight: 700, color: colors.vividOrange, marginTop: 12 }),
      text("per 30 minutes", { fontSize: 21, color: "#E2E8F0", marginTop: 6 }),
    ),
  );
  const response = new ImageResponse(
    box({ width: "100%", height: "100%", padding: 48, gap: 38, alignItems: "center", color: "white", background: `linear-gradient(135deg, ${colors.primaryNavy}, #071834)`, fontFamily: "sans-serif" },
      box({ width: 430, padding: 24, borderRadius: 22, background: "white", alignItems: "center" },
        createElement("img", { src: `data:image/png;base64,${logo.toString("base64")}`, width: 382, height: 236 }),
      ),
      box({ width: 6, height: 510, background: colors.vividOrange, borderRadius: 3 }),
      box({ flexDirection: "column", width: 592 },
        text("Affordable Adelaide movers", { fontSize: 43, lineHeight: 1.12, fontWeight: 700 }),
        box({ gap: 18, marginTop: 28 }, ...cards),
        text("House • Apartment • Office • Furniture", { fontSize: 23, marginTop: 26 }),
        text(business.contact.primaryPhone, { fontSize: 32, color: "#7DD3FC", fontWeight: 700, marginTop: 20 }),
        text(business.hours, { fontSize: 22, marginTop: 7 }),
        text(new URL(business.domain).hostname, { fontSize: 22, color: "#CBD5E1", marginTop: 20 }),
        text("Final cost depends on inventory, access and travel.", { fontSize: 18, color: "#CBD5E1", marginTop: 15 }),
      ),
    ),
    { width: 1200, height: 630 },
  );
  const png = Buffer.from(await response.arrayBuffer());
  await writeFile(resolve(root, "public/brand/og-image.png"), png);
  await writeFile(resolve(root, "public/opengraph-image.png"), png);
  await sharp(png).jpeg({ quality: 90 }).toFile(resolve(root, "public/brand/og-image.jpg"));
  console.log(`Generated three 1200 × 630 share assets using configured rates: $${business.pricing.twoMovers.thirtyMinutes} and $${business.pricing.threeMovers.thirtyMinutes} per 30 minutes.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
