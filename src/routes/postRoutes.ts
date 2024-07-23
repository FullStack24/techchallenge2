import { Router } from 'express';
import postController from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';
import { postValidationRules, validatePost } from '../middlewares/validationMiddleware';

const router = Router();

router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);

router.post('/posts', postValidationRules(), validatePost, postController.createPost);
router.put('/posts/:id', authMiddleware, postValidationRules, validatePost, postController.updatePost);

router.delete('/posts/:id', authMiddleware, postController.deletePost);
router.get('/posts/search', postController.searchPosts);

export default router;