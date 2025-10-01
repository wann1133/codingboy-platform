import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { UnauthenticatedError, requireAdminSession } from '@/lib/api-auth';
import { ensureDefaultPortfolios } from '@/lib/seed-defaults';
import prisma from '@/lib/prisma';

const parseFeatures = (features: string | null) => {
  if (!features) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(features);
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

const serializePortfolio = (item: Awaited<ReturnType<typeof prisma.portfolio.create>>) => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  description: item.description,
  category: item.category,
  image: item.image,
  url: item.url,
  features: parseFeatures(item.features),
  duration: item.duration,
  client: item.client,
  testimonial: item.testimonial,
  rating: item.rating,
  featured: item.featured,
  active: item.active,
  status: item.status,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

const ensurePortfolioSeed = async () => {
  await ensureDefaultPortfolios();
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

  await ensurePortfolioSeed();

  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ portfolios: portfolios.map(serializePortfolio) });
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

  await ensurePortfolioSeed();

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

  try {
    const portfolio = await prisma.portfolio.create({
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
        rating: typeof rating === 'number' ? rating : Number.parseInt(rating ?? '5', 10),
        features: JSON.stringify(
          typeof features === 'string'
            ? features
                .split(',')
                .map((feature: string) => feature.trim())
                .filter(Boolean)
            : Array.isArray(features)
              ? features
              : [],
        ),
        featured: Boolean(featured),
        active: active === false ? false : true,
        status: status === 'completed' ? 'completed' : 'ongoing',
      },
    });

    return NextResponse.json({ portfolio: serializePortfolio(portfolio) }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug portofolio sudah digunakan.' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Gagal menyimpan portofolio.' }, { status: 500 });
  }
}
