import { NextResponse } from 'next/server';

import { ensureDefaultBlogs } from '@/lib/seed-defaults';
import prisma from '@/lib/prisma';
import { extractReadTime, parseTags } from '@/lib/blog-tags';

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
    posts: posts.map((post) => {
      const parsedTags = parseTags(post.tags);
      const { tags, readTime } = extractReadTime(parsedTags, post.slug, post.content);

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        tags,
        readTime,
        featured: post.featured,
        views: post.views,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
      };
    }),
  });
}















