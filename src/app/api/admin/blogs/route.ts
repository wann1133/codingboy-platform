import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { UnauthenticatedError, requireAdminSession } from '@/lib/api-auth';
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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const serializePost = (post: Awaited<ReturnType<typeof prisma.blogPost.create>>) => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  image: post.image,
  category: post.category,
  tags: parseTags(post.tags),
  readTime: post.readTime,
  published: post.published,
  featured: post.featured,
  views: post.views,
  publishedAt: post.publishedAt,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

const ensureBlogSeed = async () => {
  await ensureDefaultBlogs();
};

export async function GET() {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  await ensureBlogSeed();

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ posts: posts.map(serializePost) });
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  await ensureBlogSeed();

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const {
    title,
    summary,
    content,
    category,
    image,
    tags,
    readTime,
    status,
    featured,
    publishedAt,
  } = body;

  if (!title || !content || !category) {
    return NextResponse.json({ error: 'Judul, kategori, dan konten wajib diisi.' }, { status: 400 });
  }

  const slug = slugify(title);
  const published = status === 'published';

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: summary ?? null,
        content,
        category,
        image: image ?? null,
        tags: JSON.stringify(
          typeof tags === 'string'
            ? tags
                .split(',')
                .map((tag: string) => tag.trim())
                .filter(Boolean)
            : Array.isArray(tags)
              ? tags
              : [],
        ),
        readTime: readTime ?? null,
        published,
        featured: Boolean(featured),
        publishedAt: published ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
      },
    });

    return NextResponse.json({ post: serializePost(post) }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug artikel sudah digunakan.' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Gagal membuat artikel.' }, { status: 500 });
  }
}
