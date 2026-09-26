import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = business.domain;

  // Core static routes
  const staticRoutes = [
    { url: `${baseUrl}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/service-areas`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/get-a-quote`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  // Published service detail pages
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Published moving guides
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    ...(post.updatedDate ? { lastModified: post.updatedDate } : {}),
    changeFrequency: "weekly" as const,
    priority: post.isPillar ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
