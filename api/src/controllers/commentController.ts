import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import {
  createComment as createCommentMock,
  deleteComment as deleteCommentMock,
  findCommentsByArticleId,
} from '../utils/mockDatabase';

export const getCommentsByArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { articleId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    if (!articleId) {
      res.status(400).json({
        success: false,
        message: 'Article ID is required',
      });
      return;
    }
    
    const allComments = findCommentsByArticleId(articleId);
    const total = allComments.length;
    const offset = (Number(page) - 1) * Number(limit);
    const comments = allComments.slice(offset, offset + Number(limit));

    res.json({
      success: true,
      data: {
        comments,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { articleId } = req.params;
    const { author_name, content } = req.body;

    if (!articleId) {
      res.status(400).json({
        success: false,
        message: 'Article ID is required',
      });
      return;
    }

    const comment = createCommentMock({
      articleId,
      authorName: author_name || '匿名用户',
      authorEmail: '',
      content,
      status: 'approved',
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Comment ID is required',
      });
      return;
    }

    const success = deleteCommentMock(id);

    if (!success) {
      res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
