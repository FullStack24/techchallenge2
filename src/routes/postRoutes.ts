import { Router } from "express";
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getAllPosts,
  likePost,
} from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";
import {
  postValidationRules,
  validatePost,
} from "../middlewares/validationMiddleware";

const router = Router();

// Rotas públicas
router.get("/posts", getAllPosts);
router.get("/posts/search", searchPosts);
router.get("/posts/:id", getPostById);
router.get("/posts/admin", authMiddleware, getAllPosts);

router.post(
    "/posts",
    authMiddleware,
    ...postValidationRules(),
    validatePost,
    createPost
);
router.put(
    "/posts/:id",
    authMiddleware,
    ...postValidationRules(),
    validatePost,
    updatePost
);
router.delete("/posts/:id", authMiddleware, deletePost);
router.post("/posts/:postId/like", authMiddleware, likePost);

export default router;