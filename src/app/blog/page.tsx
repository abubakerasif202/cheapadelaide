import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";
import { FeaturedGuide, BlogCard } from "@/components/content";
import { constructMetadata, generateBreadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";

export const metadata: Metadata = constructMetadata({
  title: "Adelaide Moving Guides & Cost Advice | Cheap Adelaide Removalist",
  description:
    "Expert moving guides, rate benchmarks, truck sizing charts, and local Adelaide relocation advice. Transparent rates from $79/30 min.",
  canonical: "/blog",
});

export default function BlogIndexPage() {
  const pillarPost = blogPosts.find((p) => p.isPillar) || blogPosts[0];
  const clusterPosts = blogPosts.filter((p) => !p.isPillar);

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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Moving Guides", item: "/blog" },
  ]);

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="ca-section" style={{ background: "var(--paper)", borderBottom: "1px solid var(--border-default)", paddingBlock: 48 }}>
        <div className="ca-container">
          <Breadcrumbs crumbs={[{ name: "Moving Guides", href: "/blog" }]} />

          <div style={{ marginTop: 16, maxWidth: 720 }}>
            <span className="ca-badge ca-badge--accent" style={{ display: "inline-flex" }}>
              <BookOpen size={14} />
              <span>Adelaide Moving Hub & Insights</span>
            </span>
            <h1 className="ca-h1" style={{ marginTop: 12 }}>
              Adelaide Moving Guides & Cost Advice
            </h1>
            <p className="ca-lead" style={{ marginTop: 16 }}>
              Transparent rate breakdowns, local council logistics, packing blueprints, and realistic cost expectations for
              moving across Greater Adelaide.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Pillar Guide */}
      <section className="ca-section" style={{ paddingBlock: 48 }}>
        <div className="ca-container">
          <FeaturedGuide
            title={pillarPost.title}
            summary={pillarPost.summary}
            readTime={pillarPost.readTime}
            href={`/blog/${pillarPost.slug}`}
          />
        </div>
      </section>

      {/* Cluster Articles */}
      <section className="ca-section ca-section--subtle">
        <div className="ca-container">
          <div className="ca-sechead ca-sechead--split">
            <div className="ca-sechead__text">
              <span className="ca-eyebrow ca-eyebrow--rule">Topical Authority Cluster</span>
              <h2 className="ca-h2">Key Removalist Guides & Analyses</h2>
            </div>
            <p className="ca-small" style={{ maxWidth: 380 }}>
              Targeted advice covering rates, vehicle sizing, council rules, and preparation tactics across South Australia.
            </p>
          </div>

          {/* Spotlight pair */}
          <div className="ca-grid ca-grid--2" style={{ marginBottom: 24 }}>
            {spotlightPosts.map((post) => (
              <BlogCard
                key={post.slug}
                category={post.category}
                title={post.title}
                summary={post.summary}
                readTime={post.readTime}
                tier={post.tier}
                href={`/blog/${post.slug}`}
                size="lead"
              />
            ))}
          </div>

          {/* Remaining guides */}
          <div className="ca-grid ca-grid--2">
            {remainingPosts.map((post) => (
              <BlogCard
                key={post.slug}
                category={post.category}
                title={post.title}
                summary={post.summary}
                readTime={post.readTime}
                tier={post.tier}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Location Summary Strip */}
      <section className="ca-section" style={{ paddingBlock: 48 }}>
        <div className="ca-container">
          <div className="ca-notice">
            <div className="ca-notice__main">
              <span className="ca-icon-tile ca-icon-tile--navy" aria-hidden="true">
                <BookOpen size={20} />
              </span>
              <div>
                <h4 className="ca-h4" style={{ fontSize: 16 }}>
                  Direct Local Moving Operations in Elizabeth Vale SA
                </h4>
                <p className="ca-small" style={{ color: "var(--text-muted)", maxWidth: 640 }}>
                  {business.operatorNotice} Our operations base is situated at {business.location.fullAddress}. Open daily
                  7:00 am to 8:00 pm.
                </p>
              </div>
            </div>
            <Link href="/pricing" className="ca-btn ca-btn--outline">
              <span>View Moving Rates</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
