import { Article, Category, User } from '../types';

interface Frontmatter {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  coverImage?: string;
  publishedAt: string;
}

interface ArticleCollection {
  articles: Article[];
  categories: Category[];
}

const siteAuthor: User = {
  id: 'site-author',
  username: 'Aimi',
  email: 'hello@aiminote.dev',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const normalizeCategory = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, '-');

const markdownModules = import.meta.glob('./posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const parseFrontmatter = (raw: string): { frontmatter: Frontmatter; body: string } => {
  if (!raw.startsWith('---')) {
    throw new Error('Article file is missing frontmatter.');
  }

  const closingIndex = raw.indexOf('\n---', 3);

  if (closingIndex === -1) {
    throw new Error('Article file has invalid frontmatter.');
  }

  const frontmatterBlock = raw.slice(3, closingIndex).trim();
  const body = raw.slice(closingIndex + 4).trim();
  const values: Record<string, string> = {};

  for (const line of frontmatterBlock.split('\n')) {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    values[key] = value;
  }

  return {
    frontmatter: {
      title: values.title || 'Untitled',
      summary: values.summary || '',
      category: values.category || 'Other',
      tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      coverImage: values.coverImage || undefined,
      publishedAt: values.publishedAt || new Date().toISOString(),
    },
    body,
  };
};

const buildArticleCollection = (): ArticleCollection => {
  const articles = Object.entries(markdownModules)
    .map(([path, raw]) => {
      const slug = path.split('/').pop()?.replace(/\.md$/, '') || `${Date.now()}`;
      const { frontmatter, body } = parseFrontmatter(raw);

      return {
        id: slug,
        title: frontmatter.title,
        summary: frontmatter.summary,
        excerpt: frontmatter.summary,
        content: body,
        category: frontmatter.category,
        tags: frontmatter.tags,
        coverImage: frontmatter.coverImage,
        author: siteAuthor,
        createdAt: frontmatter.publishedAt,
        updatedAt: frontmatter.publishedAt,
      } satisfies Article;
    })
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );

  const categoryMap = new Map<string, Category>();

  for (const article of articles) {
    const slug = normalizeCategory(article.category);
    const existingCategory = categoryMap.get(slug);

    if (existingCategory) {
      existingCategory.count = (existingCategory.count || 0) + 1;
      continue;
    }

    categoryMap.set(slug, {
      id: slug,
      name: article.category,
      slug,
      count: 1,
    });
  }

  return {
    articles,
    categories: [...categoryMap.values()],
  };
};

const articleCollection = buildArticleCollection();

export const getArticleBySlug = (slug: string) =>
  articleCollection.articles.find((article) => article.id === slug);

export const getCategories = () => articleCollection.categories;

export const filterArticles = (category?: string, search?: string) => {
  let filteredArticles = [...articleCollection.articles];

  if (category && category !== 'all') {
    const normalized = normalizeCategory(category);
    filteredArticles = filteredArticles.filter(
      (article) => normalizeCategory(article.category) === normalized
    );
  }

  if (search && search.trim()) {
    const query = search.trim().toLowerCase();
    filteredArticles = filteredArticles.filter((article) => {
      const haystack = [
        article.title,
        article.summary,
        article.excerpt || '',
        article.content,
        article.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }

  return filteredArticles;
};
