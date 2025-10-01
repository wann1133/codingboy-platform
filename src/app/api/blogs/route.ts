import { NextResponse } from 'next/server';

import { ensureDefaultBlogs } from '@/lib/seed-defaults';
import prisma from '@/lib/prisma';

const parseTags = (tags: string | null) => {
  if (!tags) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const ensureBlogSeed = async () => {
  await ensureDefaultBlogs();
};

export async function GET() {
  await ensureBlogSeed();

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return NextResponse.json({
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      tags: parseTags(post.tags),
      readTime: post.readTime,
      featured: post.featured,
      views: post.views,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
    })),
  });
}
