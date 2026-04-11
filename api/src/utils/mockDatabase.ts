import fs from 'fs';
import path from 'path';

// Mock database for development without requiring actual database setup
const generateId = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });

const DATA_DIRECTORY = path.resolve(process.cwd(), '.runtime');
const DATA_FILE_PATH = path.join(DATA_DIRECTORY, 'mock-database.json');

const normalizeCategory = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, '-');

export interface MockUser {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  avatar?: string;
  bio?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  authorId: string;
  status: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockComment {
  id: string;
  content: string;
  articleId: string;
  authorId?: string;
  authorName: string;
  authorEmail?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindArticlesOptions {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface PaginatedArticles {
  articles: MockArticle[];
  total: number;
  page: number;
  pages: number;
}

interface PersistedMockUser extends Omit<MockUser, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

interface PersistedMockArticle
  extends Omit<MockArticle, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

interface PersistedMockComment
  extends Omit<MockComment, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

interface PersistedMockData {
  users: PersistedMockUser[];
  articles: PersistedMockArticle[];
  comments: PersistedMockComment[];
}

let users: MockUser[] = [];
let articles: MockArticle[] = [];
let comments: MockComment[] = [];

const serializeUser = (user: MockUser): PersistedMockUser => ({
  ...user,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
});

const serializeArticle = (article: MockArticle): PersistedMockArticle => ({
  ...article,
  createdAt: article.createdAt.toISOString(),
  updatedAt: article.updatedAt.toISOString(),
});

const serializeComment = (comment: MockComment): PersistedMockComment => ({
  ...comment,
  createdAt: comment.createdAt.toISOString(),
  updatedAt: comment.updatedAt.toISOString(),
});

const deserializeUser = (user: PersistedMockUser): MockUser => ({
  ...user,
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
});

const deserializeArticle = (article: PersistedMockArticle): MockArticle => ({
  ...article,
  createdAt: new Date(article.createdAt),
  updatedAt: new Date(article.updatedAt),
});

const deserializeComment = (comment: PersistedMockComment): MockComment => ({
  ...comment,
  createdAt: new Date(comment.createdAt),
  updatedAt: new Date(comment.updatedAt),
});

const ensureDataDirectory = () => {
  if (!fs.existsSync(DATA_DIRECTORY)) {
    fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
  }
};

export const persistMockData = () => {
  ensureDataDirectory();

  const payload: PersistedMockData = {
    users: users.map(serializeUser),
    articles: articles.map(serializeArticle),
    comments: comments.map(serializeComment),
  };

  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(payload, null, 2), 'utf8');
};

const loadPersistedMockData = (): boolean => {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return false;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf8');

    if (!raw.trim()) {
      return false;
    }

    const parsed = JSON.parse(raw) as Partial<PersistedMockData>;
    users = (parsed.users ?? []).map(deserializeUser);
    articles = (parsed.articles ?? []).map(deserializeArticle);
    comments = (parsed.comments ?? []).map(deserializeComment);
    return true;
  } catch (error) {
    console.error('Failed to load persisted mock data:', error);
    return false;
  }
};

export { generateId };

export const createUser = (
  userData: Omit<MockUser, 'id' | 'createdAt' | 'updatedAt'>
): MockUser => {
  const user: MockUser = {
    id: generateId(),
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(user);
  persistMockData();
  return user;
};

export const findUserByEmail = (email: string): MockUser | undefined =>
  users.find((user) => user.email === email);

export const findUserById = (id: string): MockUser | undefined =>
  users.find((user) => user.id === id);

export const createArticle = (
  articleData: Omit<MockArticle, 'id' | 'createdAt' | 'updatedAt'>
): MockArticle => {
  const article: MockArticle = {
    id: generateId(),
    ...articleData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  articles.push(article);
  persistMockData();
  return article;
};

export const findAllArticles = (options: FindArticlesOptions = {}): PaginatedArticles => {
  let filteredArticles = [...articles];

  if (options.category && options.category !== 'all') {
    const targetCategory = normalizeCategory(options.category);
    filteredArticles = filteredArticles.filter(
      (article) => normalizeCategory(article.category) === targetCategory
    );
  }

  if (options.search) {
    const searchTerm = options.search.toLowerCase();
    filteredArticles = filteredArticles.filter((article) => {
      const summary = article.summary || article.excerpt || '';
      return (
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        summary.toLowerCase().includes(searchTerm)
      );
    });
  }

  filteredArticles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    articles: filteredArticles.slice(startIndex, endIndex),
    total: filteredArticles.length,
    page,
    pages: Math.ceil(filteredArticles.length / limit),
  };
};

export const findArticleById = (id: string): MockArticle | undefined =>
  articles.find((article) => article.id === id);

export const updateArticle = (
  id: string,
  updateData: Partial<Omit<MockArticle, 'id' | 'createdAt' | 'updatedAt'>>
): MockArticle | null => {
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) {
    return null;
  }

  const existingArticle = articles[index];
  if (!existingArticle) {
    return null;
  }

  const updatedArticle: MockArticle = {
    ...existingArticle,
    ...updateData,
    updatedAt: new Date(),
  };

  articles[index] = updatedArticle;
  persistMockData();
  return updatedArticle;
};

export const deleteArticle = (id: string): boolean => {
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) {
    return false;
  }

  articles.splice(index, 1);
  persistMockData();
  return true;
};

export const createComment = (
  commentData: Omit<MockComment, 'id' | 'createdAt' | 'updatedAt'>
): MockComment => {
  const comment: MockComment = {
    id: generateId(),
    ...commentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  comments.push(comment);
  persistMockData();
  return comment;
};

export const findCommentsByArticleId = (articleId: string): MockComment[] =>
  comments
    .filter((comment) => comment.articleId === articleId)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

export const deleteComment = (id: string): boolean => {
  const index = comments.findIndex((comment) => comment.id === id);
  if (index === -1) {
    return false;
  }

  comments.splice(index, 1);
  persistMockData();
  return true;
};

export const initializeMockData = () => {
  if (loadPersistedMockData()) {
    return;
  }

  const sampleUsers: MockUser[] = [
    {
      id: generateId(),
      username: 'aimi',
      email: 'aimi@example.com',
      password_hash:
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aimi',
      bio: '前端开发工程师，热爱技术分享',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ];

  users = [...sampleUsers];
  const defaultAuthor = sampleUsers[0];

  if (!defaultAuthor) {
    throw new Error('Failed to initialize mock users');
  }

  const sampleArticles: MockArticle[] = [
    {
      id: generateId(),
      title: 'React Hooks 最佳实践指南',
      content: `# React Hooks 最佳实践指南

React Hooks 是 React 16.8 引入的新特性，它让我们能够在函数组件中使用状态和其他 React 特性。

## useState Hook

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

useState 是最常用的 Hook 之一，用于在函数组件中添加状态。

## useEffect Hook

\`\`\`javascript
useEffect(() => {
  // 副作用代码
  return () => {
    // 清理函数
  };
}, [dependency]);
\`\`\`

## 最佳实践

1. 总是使用函数式更新来处理依赖于之前状态的状态更新
2. 使用 useCallback 和 useMemo 来优化性能
3. 正确设置依赖数组，避免无限循环`,
      summary: '深入探讨 React Hooks 的使用方法和最佳实践，帮助你写出更优雅的 React 代码。',
      excerpt: '深入探讨 React Hooks 的使用方法和最佳实践，帮助你写出更优雅的 React 代码。',
      coverImage:
        'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=React+Hooks+programming+concept+with+modern+code+editor+interface+and+colorful+code+syntax+highlighting&image_size=landscape_16_9',
      category: 'React',
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
      authorId: defaultAuthor.id,
      status: 'published',
      viewCount: 156,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: generateId(),
      title: 'TypeScript 进阶技巧',
      content: `# TypeScript 进阶技巧

TypeScript 为 JavaScript 添加了类型系统，让我们的代码更加健壮。

## 泛型约束

\`\`\`typescript
function identity<T extends { id: number }>(arg: T): T {
  return arg;
}
\`\`\`

## 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

## 实用工具类型

- \`Partial<T>\` - 将所有属性设为可选
- \`Required<T>\` - 将所有属性设为必需
- \`Pick<T, K>\` - 从 T 中挑选属性 K
- \`Omit<T, K>\` - 从 T 中省略属性 K`,
      summary: '探索 TypeScript 的高级特性，包括泛型、条件类型和实用工具类型。',
      excerpt: '探索 TypeScript 的高级特性，包括泛型、条件类型和实用工具类型。',
      coverImage:
        'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=TypeScript+code+editor+with+type+annotations+and+modern+development+environment&image_size=landscape_16_9',
      category: 'TypeScript',
      tags: ['TypeScript', 'JavaScript', 'Types'],
      authorId: defaultAuthor.id,
      status: 'published',
      viewCount: 89,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: generateId(),
      title: 'CSS Grid 布局完全指南',
      content: `# CSS Grid 布局完全指南

CSS Grid 是一个强大的二维布局系统，它可以同时处理行和列。

## 基本概念

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

## Grid 容器属性

- \`grid-template-columns\` - 定义列
- \`grid-template-rows\` - 定义行
- \`grid-gap\` - 设置间距
- \`grid-auto-flow\` - 控制自动放置算法

## Grid 项目属性

- \`grid-column\` - 控制列的起始和结束
- \`grid-row\` - 控制行的起始和结束
- \`grid-area\` - 简写属性`,
      summary: '全面介绍 CSS Grid 布局系统，从基础概念到高级技巧。',
      excerpt: '全面介绍 CSS Grid 布局系统，从基础概念到高级技巧。',
      coverImage:
        'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CSS+Grid+layout+visualization+with+colorful+grid+lines+and+modern+web+design&image_size=landscape_16_9',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Layout', 'Frontend'],
      authorId: defaultAuthor.id,
      status: 'published',
      viewCount: 234,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
  ];

  articles = [...sampleArticles];
  const reactArticle = sampleArticles[0];
  const typeScriptArticle = sampleArticles[1];

  if (!reactArticle || !typeScriptArticle) {
    throw new Error('Failed to initialize mock articles');
  }

  const sampleComments: MockComment[] = [
    {
      id: generateId(),
      content: '很棒的文章！学到了很多关于 React Hooks 的知识。',
      articleId: reactArticle.id,
      authorId: defaultAuthor.id,
      authorName: '访客用户',
      authorEmail: 'visitor@example.com',
      status: 'approved',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: generateId(),
      content: 'TypeScript 的条件类型确实很强大，感谢分享！',
      articleId: typeScriptArticle.id,
      authorId: defaultAuthor.id,
      authorName: '技术爱好者',
      authorEmail: 'tech@example.com',
      status: 'approved',
      createdAt: new Date('2024-01-21'),
      updatedAt: new Date('2024-01-21'),
    },
  ];

  comments = [...sampleComments];
  persistMockData();
};

initializeMockData();
