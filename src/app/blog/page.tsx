import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  HelpCircle,
  Truck,
  DollarSign,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";
import { constructMetadata } from "@/config/seo";
import { business } from "@/config/business";

export const metadata: Metadata = constructMetadata({
  title: "Adelaide Moving Guides & Cost Advice | Cheap Adelaide Removalist",
  description:
    "Expert moving guides, rate benchmarks, truck sizing charts, and local Adelaide relocation advice. Transparent rates from $79/30 min.",
  canonical: "/blog",
});

const categoryIcons: Record<string, React.ElementType> = {
  "Cost & Pricing": DollarSign,
  "Logistics & Planning": MapPin,
  "Comparisons & Hacks": Sparkles,
  "Specialist Removals": Truck,
};

export default function BlogIndexPage() {
  const pillarPost = blogPosts.find((p) => p.isPillar) || blogPosts[0];
  const clusterPosts = blogPosts.filter((p) => !p.isPillar);

  // Split into featured spotlight pair and remaining cluster guides
  const spotlightPosts = clusterPosts.slice(0, 2);
  const remainingPosts = clusterPosts.slice(2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Adelaide Moving Guides & Removalist Cost Hub",
    description:
      "Comprehensive moving guides, pricing analyses, and logistics resources for Greater Adelaide.",
    url: `${business.domain}/blog`,
    publisher: {
      "@type": "MovingCompany",
      name: business.name,
      url: business.domain,
    },
    hasPart: blogPosts.map((post) => ({
      "@type": "Article",
      name: post.title,
      url: `${business.domain}/blog/${post.slug}`,
      description: post.metaDescription,
    })),
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section (Left-Aligned Editorial) */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ name: "Moving Guides", href: "/blog" }]} />

          <div className="mt-4 max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Adelaide Moving Hub & Insights</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] tracking-tight leading-tight">
              Adelaide Moving Guides & Cost Advice
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Transparent rate breakdowns, local council logistics, packing blueprints, and realistic cost expectations for moving across Greater Adelaide.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Pillar Card (Asymmetric Presentation) */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0B2D5B] via-[#0D3469] to-[#071933] p-8 sm:p-12 text-white shadow-[0_25px_50px_-12px_rgba(11,45,91,0.25)]">
            <div className="relative z-10 max-w-3xl text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6A00] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#071933]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Featured Master Guide</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl font-[family-name:var(--font-heading)] tracking-tight">
                <Link
                  href={`/blog/${pillarPost.slug}`}
                  className="transition hover:text-orange-200"
                >
                  {pillarPost.title}
                </Link>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
                {pillarPost.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="h-4 w-4 text-[#FF6A00]" />
                  <span>{pillarPost.readTime}</span>
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="h-4 w-4 text-[#FF6A00]" />
                  <span>Updated Sept 2026</span>
                </span>
                <span className="rounded-full bg-white/10 px-3 py-0.5 font-mono font-medium text-white border border-white/10">
                  2 Movers from $79 / 30 min
                </span>
              </div>

              <div className="mt-8">
                <Link
                  href={`/blog/${pillarPost.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3.5 text-sm font-bold text-[#071933] shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-300 active:scale-[0.98]"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cluster Articles (Asymmetric Bento Spotlight + 2-Column Zig-Zag) */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-10">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Topical Authority Cluster
              </span>
              <h2 className="mt-1 text-2xl font-bold text-[#0B2D5B] sm:text-3xl tracking-tight font-[family-name:var(--font-heading)]">
                Key Removalist Guides & Analyses
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md text-left md:text-right">
              Targeted advice covering rates, vehicle sizing, council rules, and preparation tactics across South Australia.
            </p>
          </div>

          {/* Row 1: Spotlight Pair (Asymmetric 7-col / 5-col) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-8">
            {spotlightPosts.map((post, idx) => {
              const CategoryIcon = categoryIcons[post.category] || HelpCircle;
              const isLead = idx === 0;
              return (
                <article
                  key={post.slug}
                  className={`flex flex-col justify-between rounded-[2rem] border border-slate-200/90 bg-white p-8 sm:p-9 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] transition-all hover:border-[#FF6A00]/50 hover:shadow-lg ${
                    isLead ? "lg:col-span-7" : "lg:col-span-5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#FF6A00]">
                        <CategoryIcon className="h-3.5 w-3.5" />
                        <span>{post.category}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#0B2D5B] leading-snug tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-[#FF6A00]"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Tier {post.tier} Analysis
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6A00] transition hover:text-[#E63900] active:scale-[0.98]"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Row 2: Remaining Guides (2-Column Asymmetric Grid, NOT 3-col card spam) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {remainingPosts.map((post) => {
              const CategoryIcon = categoryIcons[post.category] || HelpCircle;
              return (
                <article
                  key={post.slug}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] transition-all hover:border-[#FF6A00]/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        <CategoryIcon className="h-3.5 w-3.5 text-[#FF6A00]" />
                        <span>{post.category}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#0B2D5B] leading-snug tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-[#FF6A00]"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      Tier {post.tier}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6A00] transition hover:text-[#E63900] active:scale-[0.98]"
                    >
                      <span>Read Guide</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Location Summary Strip with Liquid Glass styling */}
      <section className="bg-white py-12 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-50 p-6 sm:p-8 border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B2D5B] text-white">
                <ShieldCheck className="h-6 w-6 text-[#FF6A00]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0B2D5B] tracking-tight">
                  Direct Local Moving Operations in Elizabeth Vale SA
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {business.operatorNotice} Our operations base is situated at {business.location.fullAddress}. Open daily 7:00 am to 8:00 pm.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-[#0B2D5B] bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0B2D5B] transition hover:bg-slate-100 active:scale-[0.98]"
            >
              <span>View Moving Rates</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
}
