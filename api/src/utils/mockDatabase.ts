// Mock database for development without requiring actual database setup
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Mock data storage
let users: any[] = [];
let articles: any[] = [];
let comments: any[] = [];

// Utility functions
export { generateId };

// User operations
export const createUser = (userData: any) => {
  const user = {
    id: generateId(),
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(user);
  return user;
};

export const findUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string) => {
  return users.find(user => user.id === id);
};

// Article operations
export const createArticle = (articleData: any) => {
  const article = {
    id: generateId(),
    ...articleData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  articles.push(article);
  return article;
};

export const findAllArticles = (options: any = {}) => {
  let filteredArticles = [...articles];
  
  // Filter by category
  if (options.category && options.category !== 'all') {
    filteredArticles = filteredArticles.filter(article => 
      article.category === options.category
    );
  }
  
  // Search by title or content
  if (options.search) {
    const searchTerm = options.search.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort by createdAt (newest first)
  filteredArticles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // Pagination
  const page = options.page || 1;
  const limit = options.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    articles: filteredArticles.slice(startIndex, endIndex),
    total: filteredArticles.length,
    page,
    pages: Math.ceil(filteredArticles.length / limit)
  };
};

export const findArticleById = (id: string) => {
  return articles.find(article => article.id === id);
};

export const updateArticle = (id: string, updateData: any) => {
  const index = articles.findIndex(article => article.id === id);
  if (index === -1) return null;
  
  articles[index] = {
    ...articles[index],
    ...updateData,
    updatedAt: new Date(),
  };
  
  return articles[index];
};

export const deleteArticle = (id: string) => {
  const index = articles.findIndex(article => article.id === id);
  if (index === -1) return false;
  
  articles.splice(index, 1);
  return true;
};

// Comment operations
export const createComment = (commentData: any) => {
  const comment = {
    id: generateId(),
    ...commentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  comments.push(comment);
  return comment;
};

export const findCommentsByArticleId = (articleId: string) => {
  return comments.filter(comment => comment.articleId === articleId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const deleteComment = (id: string) => {
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1) return false;
  
  comments.splice(index, 1);
  return true;
};

// Initialize with sample data
export const initializeMockData = () => {
  // Sample users
  const sampleUsers = [
    {
      id: generateId(),
      username: 'aimi',
      email: 'aimi@example.com',
      password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aimi',
      bio: '前端开发工程师，热爱技术分享',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    }
  ];
  
  users = [...sampleUsers];
  
  // Sample articles
  const sampleArticles = [
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
      excerpt: '深入探讨 React Hooks 的使用方法和最佳实践，帮助你写出更优雅的 React 代码。',
      coverImage: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=React+Hooks+programming+concept+with+modern+code+editor+interface+and+colorful+code+syntax+highlighting&image_size=landscape_16_9',
      category: 'React',
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
      authorId: users[0].id,
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
      excerpt: '探索 TypeScript 的高级特性，包括泛型、条件类型和实用工具类型。',
      coverImage: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=TypeScript+code+editor+with+type+annotations+and+modern+development+environment&image_size=landscape_16_9',
      category: 'TypeScript',
      tags: ['TypeScript', 'JavaScript', 'Types'],
      authorId: users[0].id,
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
      excerpt: '全面介绍 CSS Grid 布局系统，从基础概念到高级技巧。',
      coverImage: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CSS+Grid+layout+visualization+with+colorful+grid+lines+and+modern+web+design&image_size=landscape_16_9',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Layout', 'Frontend'],
      authorId: users[0].id,
      status: 'published',
      viewCount: 234,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    }
  ];
  
  articles = [...sampleArticles];
  
  // Sample comments
  const sampleComments = [
    {
      id: generateId(),
      content: '很棒的文章！学到了很多关于 React Hooks 的知识。',
      articleId: articles[0].id,
      authorId: users[0].id,
      authorName: '访客用户',
      authorEmail: 'visitor@example.com',
      status: 'approved',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: generateId(),
      content: 'TypeScript 的条件类型确实很强大，感谢分享！',
      articleId: articles[1].id,
      authorId: users[0].id,
      authorName: '技术爱好者',
      authorEmail: 'tech@example.com',
      status: 'approved',
      createdAt: new Date('2024-01-21'),
      updatedAt: new Date('2024-01-21'),
    }
  ];
  
  comments = [...sampleComments];
};

// Initialize mock data
initializeMockData();