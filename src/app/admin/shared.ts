import { defaultBlogEntries, defaultPortfolioEntries } from '@/lib/default-content';

export const slugify = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export type BlogStatus = 'draft' | 'published';
export type ProjectStatus = 'ongoing' | 'completed';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  image: string | null;
  tags: string[];
  readTime: string | null;
  published: boolean;
  featured: boolean;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string | null;
  url: string | null;
  features: string[];
  duration: string;
  client: string | null;
  testimonial: string | null;
  rating: number | null;
  featured: boolean;
  active: boolean;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type BlogFormState = {
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string;
  status: BlogStatus;
  featured: boolean;
  image: string;
};

export type PortfolioFormState = {
  title: string;
  description: string;
  category: string;
  image: string;
  url: string;
  duration: string;
  client: string;
  testimonial: string;
  rating: string;
  features: string;
  status: ProjectStatus;
  featured: boolean;
  active: boolean;
};

export const blogCategories = [
  'Produk & Design',
  'Digital Marketing',
  'Growth & Analytics',
  'Teknologi',
  'Kisah Klien',
] as const;

export const projectCategories = [
  'Web Application',
  'Corporate Website',
  'Landing Page',
  'Booking Platform',
  'E-Commerce',
  'Design System',
] as const;

export const defaultBlogForm = (): BlogFormState => ({
  title: '',
  summary: '',
  content: '',
  category: blogCategories[0],
  publishedAt: new Date().toISOString().slice(0, 10),
  readTime: '5 menit',
  tags: '',
  status: 'draft',
  featured: false,
  image: '',
});

export const defaultPortfolioForm = (): PortfolioFormState => ({
  title: '',
  description: '',
  category: projectCategories[0],
  image: '',
  url: '',
  duration: '7 hari',
  client: '',
  testimonial: '',
  rating: '5',
  features: '',
  status: 'ongoing',
  featured: false,
  active: true,
});

const ensureArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const normalizeBlogPost = (raw: unknown): BlogPost => {
  const post = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = typeof post.title === 'string' ? post.title : 'Untitled';
  const slugValue = typeof post.slug === 'string' ? post.slug : slugify(title);
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : null;
  const content = typeof post.content === 'string' ? post.content : '';
  const category = typeof post.category === 'string' ? post.category : 'Lainnya';
  const image = typeof post.image === 'string' ? post.image : null;
  const tags = ensureArray(post.tags);
  const readTime = typeof post.readTime === 'string' ? post.readTime : null;
  const published = typeof post.published === 'boolean' ? post.published : Boolean(post.published);
  const featured = typeof post.featured === 'boolean' ? post.featured : Boolean(post.featured);
  const viewsValue =
    typeof post.views === 'number'
      ? post.views
      : Number.parseInt(typeof post.views === 'string' ? post.views : '0', 10) || 0;
  const publishedAt = typeof post.publishedAt === 'string' ? post.publishedAt : null;
  const createdAt = typeof post.createdAt === 'string' ? post.createdAt : new Date().toISOString();
  const updatedAt = typeof post.updatedAt === 'string' ? post.updatedAt : new Date().toISOString();

  return {
    id: typeof post.id === 'string' ? post.id : crypto.randomUUID(),
    title,
    slug: slugValue,
    excerpt,
    content,
    category,
    image,
    tags,
    readTime,
    published,
    featured,
    views: viewsValue,
    publishedAt,
    createdAt,
    updatedAt,
  };
};

export const normalizePortfolioItem = (raw: unknown): PortfolioItem => {
  const item = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = typeof item.title === 'string' ? item.title : 'Untitled Project';
  const slugValue = typeof item.slug === 'string' ? item.slug : slugify(title);
  const description = typeof item.description === 'string' ? item.description : '';
  const category = typeof item.category === 'string' ? item.category : 'General';
  const image = typeof item.image === 'string' ? item.image : null;
  const url = typeof item.url === 'string' ? item.url : null;
  const features = ensureArray(item.features);
  const duration = typeof item.duration === 'string' ? item.duration : '7 hari';
  const client = typeof item.client === 'string' ? item.client : null;
  const testimonial = typeof item.testimonial === 'string' ? item.testimonial : null;
  const ratingValue =
    typeof item.rating === 'number'
      ? item.rating
      : Number.parseInt(typeof item.rating === 'string' ? item.rating : '0', 10) || null;
  const status = item.status === 'completed' ? 'completed' : 'ongoing';
  const featured = typeof item.featured === 'boolean' ? item.featured : Boolean(item.featured);
  const active = item.active !== false;
  const createdAt = typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString();
  const updatedAt = typeof item.updatedAt === 'string' ? item.updatedAt : new Date().toISOString();

  return {
    id: typeof item.id === 'string' ? item.id : crypto.randomUUID(),
    title,
    slug: slugValue,
    description,
    category,
    image,
    url,
    features,
    duration,
    client,
    testimonial,
    rating: ratingValue,
    featured,
    active,
    status,
    createdAt,
    updatedAt,
  };
};

export const fallbackAdminBlogPosts: BlogPost[] = defaultBlogEntries.map((entry, index) => ({
  id: `fallback-blog-${index}`,
  title: entry.title,
  slug: entry.slug,
  excerpt: entry.excerpt ?? null,
  content: entry.content,
  category: entry.category,
  image: entry.image ?? null,
  tags: entry.tags,
  readTime: entry.readTime,
  published: true,
  featured: entry.featured,
  views: entry.views,
  publishedAt: entry.publishedAt.toISOString(),
  createdAt: entry.publishedAt.toISOString(),
  updatedAt: entry.publishedAt.toISOString(),
}));

export const fallbackAdminPortfolio: PortfolioItem[] = defaultPortfolioEntries.map((entry, index) => ({
  id: `fallback-portfolio-${index}`,
  title: entry.title,
  slug: entry.slug,
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
