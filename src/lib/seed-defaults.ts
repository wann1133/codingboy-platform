import prisma from '@/lib/prisma';
import { blogSeedPayload, portfolioSeedPayload } from '@/lib/default-content';

export async function ensureDefaultBlogs() {
  await Promise.all(
    blogSeedPayload.map((entry) =>
      prisma.blogPost.upsert({
        where: { slug: entry.slug },
        update: {
          title: entry.title,
          excerpt: entry.excerpt,
          content: entry.content,
          image: entry.image ?? null,
          category: entry.category,
          tags: entry.tags,
          readTime: entry.readTime,
          published: true,
          featured: entry.featured,
          views: entry.views,
          publishedAt: entry.publishedAt,
        },
        create: entry,
      }),
    ),
  );
}

export async function ensureDefaultPortfolios() {
  await Promise.all(
    portfolioSeedPayload.map((entry) =>
      prisma.portfolio.upsert({
        where: { slug: entry.slug },
        update: {
          title: entry.title,
          description: entry.description,
          category: entry.category,
          image: entry.image ?? null,
          url: entry.url ?? null,
          features: entry.features,
          duration: entry.duration,
          client: entry.client ?? null,
          testimonial: entry.testimonial ?? null,
          rating: entry.rating ?? 5,
          featured: entry.featured,
          active: entry.active ?? true,
          status: entry.status,
        },
        create: entry,
      }),
    ),
  );
}
