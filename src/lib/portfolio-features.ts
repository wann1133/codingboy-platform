import { defaultPortfolioEntries } from './default-content';

const STATUS_PREFIX = '@status:';
const defaultStatusBySlug = new Map(defaultPortfolioEntries.map((entry) => [entry.slug, entry.status ?? 'ongoing']));

const sanitizeFeature = (value: unknown) => String(value ?? '').trim();

export const parseFeaturesValue = (value: unknown): string[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map(sanitizeFeature)
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .map(sanitizeFeature)
          .filter(Boolean);
      }
    } catch {
      // ignore parse errors, fall back to comma separation
    }

    return value
      .split(',')
      .map((feature) => feature.trim())
      .filter(Boolean);
  }

  return [];
};

const computeFallbackStatus = (slug: string) => defaultStatusBySlug.get(slug) ?? 'ongoing';

export const extractPortfolioStatus = (features: string[], slug: string) => {
  let status: string | null = null;
  const cleaned: string[] = [];

  features.forEach((feature) => {
    if (feature.startsWith(STATUS_PREFIX)) {
      const value = sanitizeFeature(feature.slice(STATUS_PREFIX.length));
      if (value) {
        status = value;
      }
      return;
    }

    if (feature) {
      cleaned.push(feature);
    }
  });

  if (!status) {
    status = computeFallbackStatus(slug);
  }

  return { features: cleaned, status };
};

export const prepareFeaturesForPersist = (input: unknown, slug: string, statusInput: unknown) => {
  const parsed = parseFeaturesValue(input);
  const filtered = parsed.filter((feature) => !feature.startsWith(STATUS_PREFIX));
  const status = typeof statusInput === 'string' && statusInput.trim() ? statusInput.trim() : computeFallbackStatus(slug);

  return {
    features: status ? [...filtered, `${STATUS_PREFIX}${status}`] : filtered,
    status,
  };
};


