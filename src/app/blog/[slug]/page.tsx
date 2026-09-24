import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Phone,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { business } from "@/config/business";
import { constructMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/config/seo";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CTASection } from "@/components/common/CTASection";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related articles data
  const relatedArticlesData = blogPosts.filter((p) =>
    post.relatedArticles.includes(p.slug)
  );

  // Related services data
  const relatedServicesData = services.filter((s) =>
    post.relatedServices.includes(s.slug)
  );

  // JSON-LD Article Schema
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
      name: business.name,
      url: business.domain,
    },
    publisher: {
      "@type": "Organization",
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

  const faqSchema =
    post.faqs.length > 0 ? generateFAQSchema(post.faqs) : null;

  return (
    <div className="flex flex-col bg-white">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header & Breadcrumbs */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { name: "Moving Guides", href: "/blog" },
              { name: post.category, href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mt-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                {post.category}
              </span>
              {post.isPillar && (
                <span className="rounded-full bg-[#0B2D5B] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Pillar Master Guide
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime}</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>Published Sept 2026</span>
              </span>
            </div>

            {/* Exactly ONE H1 tag on the page */}
            <h1 className="mt-4 text-3xl font-extrabold text-[#0B2D5B] sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {post.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Article Body (8 cols) */}
          <article className="lg:col-span-8">
            {/* AEO Direct Answer Capsule (Target for AI Engine Snippets) */}
            {post.aeoDirectAnswer && (
              <div className="mb-10 rounded-2xl border-2 border-orange-200 bg-orange-50/60 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Direct Answer & Quick Summary</span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-[#0B2D5B]">
                  {post.aeoDirectAnswer.question}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {post.aeoDirectAnswer.answer}
                </p>

                {post.aeoDirectAnswer.keyTakeaways && (
                  <div className="mt-5 border-t border-orange-200/80 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Key Takeaways:
                    </span>
                    <ul className="mt-2.5 space-y-2">
                      {post.aeoDirectAnswer.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6A00] mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Article Sections */}
            <div className="space-y-12">
              {post.sections.map((section) => (
                <section key={section.h2Id} id={section.h2Id} className="scroll-mt-24">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2D5B] font-[family-name:var(--font-heading)]">
                    {section.h2}
                  </h2>

                  {section.lead && (
                    <p className="mt-3 text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                      {section.lead}
                    </p>
                  )}

                  <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-slate-700">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Responsive Table */}
                  {section.table && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#0B2D5B] text-white font-semibold">
                            <tr>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-3 sm:px-6 sm:py-3.5 whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 sm:px-6 sm:py-3.5 text-slate-700">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {section.table.caption && (
                        <div className="bg-slate-50 px-4 py-2 text-xs text-slate-500 italic border-t border-slate-100">
                          {section.table.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      className={`mt-6 rounded-2xl p-5 border ${
                        section.callout.type === "tip"
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                          : section.callout.type === "warning"
                          ? "bg-amber-50/70 border-amber-200 text-amber-950"
                          : "bg-blue-50/70 border-blue-200 text-blue-950"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {section.callout.type === "tip" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        {section.callout.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                        {section.callout.type === "info" && <Info className="h-4 w-4 text-blue-600" />}
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Subsections (H3) */}
                  {section.subsections && (
                    <div className="mt-8 space-y-6">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
                          <h3 className="text-lg sm:text-xl font-bold text-[#0B2D5B]">
                            {sub.h3}
                          </h3>
                          <div className="mt-2 space-y-3 text-sm text-slate-700">
                            {sub.paragraphs.map((subP, spIdx) => (
                              <p key={spIdx}>{subP}</p>
                            ))}
                          </div>
                          {sub.bullets && (
                            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700">
                              {sub.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2">
                                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
                                  <span>{b}</span>
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
            </div>

            {/* In-Article FAQs */}
            {post.faqs.length > 0 && (
              <section className="mt-14 pt-10 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  <HelpCircle className="h-4 w-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-[#0B2D5B]">
                  Common Questions About This Guide
                </h2>

                <div className="mt-6 space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-[#0B2D5B]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Operational Truth & Transparency Box */}
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B2D5B] text-white">
                  <ShieldCheck className="h-5 w-5 text-[#FF6A00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B2D5B]">
                    Cheap Adelaide Removalist Operational Standards
                  </h4>
                  <p className="text-xs text-slate-500">
                    {business.location.fullAddress} • Open 7 Days: 7:00 am – 8:00 pm
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {business.operatorNotice} All rate quotes are supplied with complete clarity. Starting rates begin from $79 per 30 minutes ($158/hr) for 2 movers and a truck, and $99 per 30 minutes ($198/hr) for 3 movers and a truck. Final pricing depends on move size, inventory, access, travel and any additional services required.
              </p>
            </div>
          </article>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Quick Action Card */}
            <div className="rounded-[2rem] border border-white/10 bg-[#0B2D5B] p-7 text-white shadow-[0_20px_40px_-15px_rgba(11,45,91,0.25)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                Instant Moving Estimate
              </span>
              <h3 className="mt-2 text-xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
                Book Adelaide Movers Today
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Transparent 30-minute rates with zero hidden stair surcharges. Share your move details to discuss an estimate.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <div className="font-semibold text-white">2 Movers + Truck:</div>
                  <div className="text-slate-300 font-mono">From $79 / 30 min ($158/hr)</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <div className="font-semibold text-white">3 Movers + Truck:</div>
                  <div className="text-slate-300 font-mono">From $99 / 30 min ($198/hr)</div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  href="/get-a-quote"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-4 py-3.5 text-xs sm:text-sm font-bold text-[#071933] shadow-md transition-all hover:bg-orange-300 active:scale-[0.98]"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={business.contact.primaryPhoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4 text-[#FF6A00]" />
                  <span>Call {business.contact.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B2D5B]">
                In This Guide
              </h3>
              <nav className="mt-4 flex flex-col space-y-2">
                {post.sections.map((section) => (
                  <a
                    key={section.h2Id}
                    href={`#${section.h2Id}`}
                    className="flex items-center justify-between text-xs sm:text-sm text-slate-600 transition hover:text-[#FF6A00] py-1 border-b border-slate-50"
                  >
                    <span className="line-clamp-1">{section.h2}</span>
                    <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Pillar Connection (If not currently on pillar) */}
            {!post.isPillar && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                  Core Topic Guide
                </span>
                <h4 className="mt-1 text-sm font-bold text-[#0B2D5B]">
                  The Complete Guide to Cheap Removalists & Moving House in Adelaide
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Explore our pillar resource covering moving costs, team configurations, and council access across Greater Adelaide.
                </p>
                <Link
                  href="/blog/cheap-removalists-adelaide-guide"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6A00] hover:text-[#E63900]"
                >
                  <span>Read Master Guide</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}

            {/* Related Guides Cluster */}
            {relatedArticlesData.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B2D5B]">
                  Related Moving Guides
                </h3>
                <div className="mt-4 space-y-3.5">
                  {relatedArticlesData.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block rounded-xl border border-slate-100 p-3 transition hover:border-[#FF6A00]/50 hover:bg-slate-50"
                    >
                      <span className="text-xs font-semibold text-slate-400">
                        {related.category}
                      </span>
                      <h4 className="mt-0.5 text-xs sm:text-sm font-bold text-[#0B2D5B] group-hover:text-[#FF6A00] line-clamp-2">
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Services */}
            {relatedServicesData.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B2D5B]">
                  Adelaide Moving Services
                </h3>
                <div className="mt-4 space-y-2.5">
                  {relatedServicesData.map((srv) => (
                    <Link
                      key={srv.slug}
                      href={`/services/${srv.slug}`}
                      className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0B2D5B] transition hover:text-[#FF6A00] py-1"
                    >
                      <span>{srv.title}</span>
                      <span className="text-xs font-normal text-slate-400">
                        {srv.startingRate.split("(")[0]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
}
