import { defaultBlogEntries } from './default-content';

const READ_TIME_TAG_PREFIX = '@readTime:';
const defaultReadTimeBySlug = new Map(defaultBlogEntries.map((entry) => [entry.slug, entry.readTime]));

const sanitizeTag = (value: unknown) => {
  if (typeof value !== 'string') {
    return `${value ?? ''}`.trim();
  }

  return value.trim();
};

const estimateReadTime = (content?: string | null) => {
  if (!content) {
    return null;
  }

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (wordCount === 0) {
    return null;
  }

  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} menit`;
};

const computeFallbackReadTime = (slug: string, content?: string | null) =>
  defaultReadTimeBySlug.get(slug) ?? estimateReadTime(content);

export const parseTags = (value: unknown): string[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map(sanitizeTag)
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .map(sanitizeTag)
          .filter(Boolean);
      }
    } catch {
      // fall back to comma separated parsing below
    }

    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

export const extractReadTime = (tags: string[], slug: string, content?: string | null) => {
  let readTime: string | null = null;
  const cleanedTags: string[] = [];

  tags.forEach((tag) => {
    if (tag.startsWith(READ_TIME_TAG_PREFIX)) {
      const value = sanitizeTag(tag.slice(READ_TIME_TAG_PREFIX.length));
      if (value) {
        readTime = value;
      }
      return;
    }

    if (tag) {
      cleanedTags.push(tag);
    }
  });

  if (!readTime) {
    readTime = computeFallbackReadTime(slug, content) ?? null;
  }

  return { tags: cleanedTags, readTime };
};

export const resolveReadTime = (input: unknown, slug: string, content?: string | null) => {
  if (typeof input === 'string' && input.trim()) {
    return input.trim();
  }

  return computeFallbackReadTime(slug, content) ?? null;
};

export const prepareTagsForPersist = (
  input: unknown,
  slug: string,
  readTimeInput: unknown,
  content?: string | null,
) => {
  const initialTags = parseTags(input);
  const filteredTags = initialTags.filter((tag) => !tag.startsWith(READ_TIME_TAG_PREFIX));
  const readTime = resolveReadTime(readTimeInput, slug, content);

  const persistedTags = readTime ? [...filteredTags, `${READ_TIME_TAG_PREFIX}${readTime}`] : filteredTags;

  return {
    tags: JSON.stringify(persistedTags),
    readTime,
  };
};
