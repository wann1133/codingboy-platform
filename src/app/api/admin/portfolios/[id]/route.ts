import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { UnauthenticatedError, requireAdminSession } from '@/lib/api-auth';
import prisma from '@/lib/prisma';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const { id } = params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
  });

  if (!portfolio) {
    return NextResponse.json({ error: 'Portfolio item not found.' }, { status: 404 });
  }

  return NextResponse.json({ portfolio });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
    description,
    category,
    image,
    url,
    duration,
    client,
    testimonial,
    rating,
    features,
    featured,
    active,
    status,
  } = body;

  if (!title || !description || !category || !duration) {
    return NextResponse.json({ error: 'Judul, deskripsi, kategori, dan durasi wajib diisi.' }, { status: 400 });
  }

  const slug = slugify(title);
  const parsedRating = Number.parseInt(rating, 10);

  try {
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        category,
        image: image ?? null,
        url: url ?? null,
        duration,
        client: client ?? null,
        testimonial: testimonial ?? null,
        rating: !Number.isNaN(parsedRating) ? parsedRating : 5,
        features:
          typeof features === 'string'
            ? features
                .split(',')
                .map((feature: string) => feature.trim())
                .filter(Boolean)
            : Array.isArray(features)
            ? features
            : [],
        featured: Boolean(featured),
        active: active === false ? false : true,
        status: status === 'completed' ? 'completed' : 'ongoing',
      },
    });

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug portofolio sudah digunakan.' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Gagal memperbarui portofolio.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Portfolio item deleted successfully.' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to delete portfolio item.' }, { status: 500 });
  }
}