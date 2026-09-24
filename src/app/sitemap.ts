import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = business.domain;
  const currentDate = new Date().toISOString();

  // Core static routes
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/service-areas`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/get-a-quote`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // 8 Service detail pages
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 12 Blog & Content Cluster pages
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedDate || currentDate,
    changeFrequency: "weekly" as const,
    priority: post.isPillar ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
