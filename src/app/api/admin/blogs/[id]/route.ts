import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { UnauthenticatedError, requireAdminSession } from '@/lib/api-auth';
import prisma from '@/lib/prisma';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const { id } = params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const { id } = params;
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
    const post = await prisma.blogPost.update({
      where: { id },
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

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug artikel sudah digunakan.' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Gagal memperbarui artikel.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const { id } = params;

  try {
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Blog post deleted successfully.' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}