import { Request, Response } from 'express';
import PostService from '../services/postService';
import { IPost } from '../interfaces/IPost';
import { AppError } from '../errors/AppError';
import logger from '../config/logger';

const postController = {
  getAllPosts: async (req: Request, res: Response): Promise<void> => {
    try {
      const posts: IPost[] = await PostService.getAllPosts();
      res.json(posts);
    } catch (error: unknown) {
      logger.error('Erro ao recuperar posts: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      throw new AppError('Erro ao recuperar posts', 500);
    }
  },

  getPostById: async (req: Request, res: Response): Promise<void> => {
    try {
      const post: IPost | null = await PostService.getPostById(Number(req.params.id));
      if (!post) {
        logger.warn(`Post not found with ID: ${req.params.id}`);
        throw new AppError('Post not found', 404);
      }
      res.json(post);
    } catch (error: unknown) {
      logger.error('Erro ao recuperar o post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro ao recuperar o post' });
      }
    }
  },

  createPost: async (req: Request, res: Response): Promise<void> => {
    try {
      const newPost: IPost = await PostService.createPost(req.body);
      res.status(201).json(newPost);
    } catch (error: unknown) {
      logger.error('Erro ao criar post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      throw new AppError('Erro ao criar post', 500);
    }
  },

  updatePost: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedPost: IPost | null = await PostService.updatePost(Number(req.params.id), req.body);
      if (!updatedPost) {
        logger.warn(`Post not found with ID: ${req.params.id}`);
        throw new AppError('Post not found', 404);
      }
      res.json(updatedPost);
    } catch (error: unknown) {
      logger.error('Erro ao atualizar o post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro ao atualizar o post' });
      }
    }
  },

  deletePost: async (req: Request, res: Response): Promise<void> => {
    try {
      await PostService.deletePost(Number(req.params.id));
      res.status(204).send(); // Retorna 204 No Content após a exclusão
    } catch (error: unknown) {
      logger.error('Erro ao deletar o post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      throw new AppError('Erro ao deletar o post', 500);
    }
  },

  searchPosts: async (req: Request, res: Response): Promise<void> => {
    try {
      const posts: IPost[] = await PostService.searchPosts(req.query.q as string);
      res.json(posts);
    } catch (error: unknown) {
      logger.error('Erro ao buscar posts: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      throw new AppError('Erro ao buscar posts', 500);
    }
  }
};

export default postController;