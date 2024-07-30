import { Router } from 'express';
import postController from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';
import {
  postValidationRules,
  validatePost,
} from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

router.post(
  '/',
  postValidationRules(),
  validatePost,
  postController.createPost
);
router.put(
  '/:id',
  authMiddleware,
  postValidationRules,
  validatePost,
  postController.updatePost
);

router.delete('/:id', authMiddleware, postController.deletePost);
router.get('/search', postController.searchPosts);

export default router;
