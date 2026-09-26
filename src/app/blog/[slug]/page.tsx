import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { business } from "@/config/business";
import { constructMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/config/seo";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";
import { AnswerCapsule, Callout, QuoteAside, TableOfContents } from "@/components/content";
import { CostTable } from "@/components/pricing";
import { FAQAccordion } from "@/components/common/FAQAccordion";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return constructMetadata({
      title: "Guide Not Found",
      description: "The requested moving guide could not be found.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    canonical: `/blog/${post.slug}`,
  });
}

function slugifyQuestion(question: string, index: number): string {
  const base = question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base ? `${base}-${index}` : `faq-${index}`;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedArticlesData = blogPosts.filter((p) => post.relatedArticles.includes(p.slug));
  const utilityPages: Record<string, { title: string; href: string }> = {
    pricing: { title: "Removalist Pricing", href: "/pricing" },
    faq: { title: "Moving FAQs", href: "/faq" },
    contact: { title: "Contact Us", href: "/contact" },
  };
  const relatedServicesData: { slug: string; title: string; href: string; startingRate?: string }[] =
    post.relatedServices.flatMap((slug) => {
      const service = services.find((item) => item.slug === slug);
      if (service) return [{ slug, title: service.title, href: `/services/${slug}`, startingRate: service.startingRate }];
      const page = utilityPages[slug];
      return page ? [{ slug, ...page }] : [];
    });

  const faqItems = post.faqs.map((faq, idx) => ({
    id: slugifyQuestion(faq.question, idx),
    question: faq.question,
    answer: faq.answer,
  }));

  const tocItems = post.sections.map((section) => ({ id: section.h2Id, label: section.h2 }));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${business.domain}/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      "@id": `${business.domain}/#moving-company`,
      name: business.name,
      url: business.domain,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${business.domain}/#moving-company`,
      name: business.name,
      url: business.domain,
      logo: {
        "@type": "ImageObject",
        url: `${business.domain}/brand/logo-horizontal.png`,
      },
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
  };

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Moving Guides", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  const faqSchema = post.faqs.length > 0 ? generateFAQSchema(post.faqs) : null;

  return (
    <div className="flex flex-col bg-white">
      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Header & Breadcrumbs */}
      <section className="ca-pagehero">
        <div className="ca-container">
          <Breadcrumbs
            crumbs={[
              { name: "Moving Guides", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div style={{ marginTop: 16, maxWidth: 880 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <span className="ca-badge ca-badge--accent">{post.category}</span>
              {post.isPillar && <span className="ca-badge ca-badge--navy">Pillar Master Guide</span>}
              <span className="ca-caption">{post.readTime}</span>
              <time className="ca-caption" dateTime={post.publishDate}>
                Published {new Date(`${post.publishDate}T12:00:00`).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Australia/Adelaide",
                })}
              </time>
            </div>

            {/* Exactly ONE H1 tag on the page */}
            <h1 className="ca-h1" style={{ marginTop: 16 }}>
              {post.title}
            </h1>

            <p className="ca-lead" style={{ marginTop: 16, maxWidth: 720 }}>
              {post.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <div className="ca-container" style={{ paddingBlock: 64 }}>
        <div className="ca-article">
          {/* Main Article Body */}
          <article className="ca-prose">
            {/* AEO Direct Answer Capsule (Target for AI Engine Snippets) */}
            {post.aeoDirectAnswer && (
              <AnswerCapsule
                question={post.aeoDirectAnswer.question}
                answer={post.aeoDirectAnswer.answer}
                takeaways={post.aeoDirectAnswer.keyTakeaways}
              />
            )}

            {/* Article Sections */}
            {post.sections.map((section) => (
              <section key={section.h2Id} id={section.h2Id}>
                <h2 className="ca-h2">{section.h2}</h2>

                {section.lead && <p className="ca-prose__lead">{section.lead}</p>}

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.bullets && (
                  <ul className="ca-dotlist" style={{ marginTop: 4 }}>
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <CostTable headers={section.table.headers} rows={section.table.rows} caption={section.table.caption} />
                )}

                {section.callout && (
                  <Callout type={section.callout.type} title={section.callout.title}>
                    {section.callout.text}
                  </Callout>
                )}

                {section.subsections && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="ca-card ca-card--flat" style={{ gap: 12 }}>
                        <h3 className="ca-h3" style={{ fontSize: 20 }}>
                          {sub.h3}
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {sub.paragraphs.map((subP, spIdx) => (
                            <p key={spIdx} className="ca-small">
                              {subP}
                            </p>
                          ))}
                        </div>
                        {sub.bullets && (
                          <ul className="ca-dotlist">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="ca-small">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* In-Article FAQs */}
            {faqItems.length > 0 && (
              <section>
                <span className="ca-eyebrow ca-eyebrow--rule">Frequently Asked Questions</span>
                <h2 className="ca-h2" style={{ marginTop: 8 }}>
                  Common Questions About This Guide
                </h2>
                <div style={{ marginTop: 16 }}>
                  <FAQAccordion items={faqItems} />
                </div>
              </section>
            )}

            {/* Operational Truth & Transparency Box */}
            <div className="ca-notice">
              <div className="ca-notice__main">
                <span className="ca-icon-tile ca-icon-tile--navy" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  </svg>
                </span>
                <div>
                  <h4 className="ca-h4" style={{ fontSize: 16 }}>
                    Cheap Adelaide Removalist Operational Standards
                  </h4>
                  <p className="ca-caption">
                    {business.location.fullAddress} • Open 7 Days: 7:00 am – 8:00 pm
                  </p>
                </div>
              </div>
              <p className="ca-small" style={{ color: "var(--text-muted)" }}>
                {business.operatorNotice} All rate quotes are supplied with complete clarity. Starting rates begin from $79
                per 30 minutes ($158/hr) for 2 movers and a truck, and $99 per 30 minutes ($198/hr) for 3 movers and a
                truck. Final pricing depends on move size, inventory, access, travel and any additional services
                required.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="ca-aside ca-aside--sticky">
            <QuoteAside />

            {tocItems.length > 0 && <TableOfContents items={tocItems} />}

            {/* Pillar Connection (If not currently on pillar) */}
            {!post.isPillar && (
              <div className="ca-card ca-card--compact" style={{ borderColor: "var(--border-accent-soft)", background: "var(--orange-50)" }}>
                <span className="ca-eyebrow">Core Topic Guide</span>
                <h4 className="ca-h4" style={{ fontSize: 14, marginTop: 4 }}>
                  The Complete Guide to Cheap Removalists & Moving House in Adelaide
                </h4>
                <p className="ca-caption" style={{ marginTop: 6 }}>
                  Explore our pillar resource covering moving costs, team configurations, and council access across
                  Greater Adelaide.
                </p>
                <Link href="/blog/cheap-removalists-adelaide-guide" className="ca-btn ca-btn--link" style={{ marginTop: 12 }}>
                  Read Master Guide
                </Link>
              </div>
            )}

            {/* Related Guides Cluster */}
            {relatedArticlesData.length > 0 && (
              <div className="ca-card ca-card--compact">
                <h3 className="ca-aside-label">Related Moving Guides</h3>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                  {relatedArticlesData.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="ca-group" style={{ display: "block" }}>
                      <span className="ca-caption">{related.category}</span>
                      <h4 className="ca-h4 ca-card__title" style={{ fontSize: 14, marginTop: 2 }}>
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Services */}
            {relatedServicesData.length > 0 && (
              <div className="ca-card ca-card--compact">
                <h3 className="ca-aside-label">Related Services &amp; Pages</h3>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
                  {relatedServicesData.map((srv) => (
                    <Link
                      key={srv.slug}
                      href={srv.href}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 32, fontSize: 13, fontWeight: 700, color: "var(--navy-900)" }}
                    >
                      <span>{srv.title}</span>
                      <span className="ca-caption" style={{ fontWeight: 400 }}>
                        {srv.startingRate?.split("(")[0] ?? ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
