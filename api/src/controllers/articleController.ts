import { Request, Response } from 'express';
import { findAllArticles, findArticleById, createArticle as createArticleMock, updateArticle as updateArticleMock, deleteArticle as deleteArticleMock } from '../utils/mockDatabase';
import { findUserById } from '../utils/mockDatabase';

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    const result = findAllArticles({
      category: category as string,
      search: search as string,
      page: Number(page),
      limit: Number(limit),
    });

    // Add author information to articles
    const articlesWithAuthors = result.articles.map(article => {
      const author = findUserById(article.authorId);
      return {
        ...article,
        author: author ? {
          id: author.id,
          username: author.username,
          email: author.email,
        } : null,
      };
    });

    res.json({
      success: true,
      data: {
        articles: articlesWithAuthors,
        pagination: {
          total: result.total,
          page: Number(page),
          limit: Number(limit),
          totalPages: result.pages,
        },
      },
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const article = findArticleById(id);

    if (!article) {
      res.status(404).json({
        success: false,
        message: 'Article not found',
      });
      return;
    }

    // Add author information
    const author = findUserById(article.authorId);
    const articleWithAuthor = {
      ...article,
      author: author ? {
        id: author.id,
        username: author.username,
        email: author.email,
      } : null,
    };

    res.json({
      success: true,
      data: articleWithAuthor,
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { title, content, excerpt, coverImage, category, tags } = req.body;

    const article = createArticleMock({
      title,
      content,
      excerpt,
      coverImage: coverImage || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=abstract+programming+concept+with+modern+code+editor+interface&image_size=landscape_16_9',
      category,
      tags: tags || [],
      authorId: userId,
      status: 'published',
      viewCount: 0,
    });

    // Add author information
    const author = findUserById(userId);
    const articleWithAuthor = {
      ...article,
      author: author ? {
        id: author.id,
        username: author.username,
        email: author.email,
      } : null,
    };

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: articleWithAuthor,
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const { title, content, excerpt, coverImage, category, tags } = req.body;

    const article = findArticleById(id);

    if (!article) {
      res.status(404).json({
        success: false,
        message: 'Article not found',
      });
      return;
    }

    if (article.authorId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this article',
      });
      return;
    }

    // Update article
    const updatedArticle = updateArticleMock(id, {
      ...(title && { title }),
      ...(content && { content }),
      ...(excerpt && { excerpt }),
      ...(coverImage && { coverImage }),
      ...(category && { category }),
      ...(tags && { tags }),
    });

    if (!updatedArticle) {
      res.status(404).json({
        success: false,
        message: 'Article not found',
      });
      return;
    }

    // Add author information
    const author = findUserById(userId);
    const articleWithAuthor = {
      ...updatedArticle,
      author: author ? {
        id: author.id,
        username: author.username,
        email: author.email,
      } : null,
    };

    res.json({
      success: true,
      message: 'Article updated successfully',
      data: articleWithAuthor,
    });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    const article = findArticleById(id);

    if (!article) {
      res.status(404).json({
        success: false,
        message: 'Article not found',
      });
      return;
    }

    if (article.authorId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this article',
      });
      return;
    }

    const success = deleteArticleMock(id);

    if (!success) {
      res.status(404).json({
        success: false,
        message: 'Article not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get unique categories from articles
    const categories = [...new Set(findAllArticles().articles.map(article => article.category))];
    
    const categoryList = categories.map(category => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, '-'),
      count: findAllArticles().articles.filter(article => article.category === category).length,
    }));

    res.json({
      success: true,
      data: categoryList,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};