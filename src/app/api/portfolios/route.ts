import { NextResponse } from 'next/server';

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

const ensurePortfolioSeed = async () => {
  await ensureDefaultPortfolios();
};

export async function GET() {
  await ensurePortfolioSeed();

  const portfolios = await prisma.portfolio.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    portfolios: portfolios.map((item) => ({
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
      status: item.status,
      createdAt: item.createdAt,
    })),
  });
}
