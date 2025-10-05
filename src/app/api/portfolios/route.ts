import { NextResponse } from 'next/server';

import { ensureDefaultPortfolios } from '@/lib/seed-defaults';
import prisma from '@/lib/prisma';
import { extractPortfolioStatus, parseFeaturesValue } from '@/lib/portfolio-features';

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
    portfolios: portfolios.map((item) => {
      const parsedFeatures = parseFeaturesValue(item.features);
      const { features: cleanedFeatures } = extractPortfolioStatus(parsedFeatures, item.slug);

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        category: item.category,
        image: item.image,
        url: item.url,
        features: cleanedFeatures,
        duration: item.duration,
        client: item.client,
        testimonial: item.testimonial,
        rating: item.rating,
        featured: item.featured,
        status: item.status,
        createdAt: item.createdAt,
      };
    }),
  });
}
