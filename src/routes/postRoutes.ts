import { Router } from "express";
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getAllPosts,
} from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";
import {
  postValidationRules,
  validatePost,
} from "../middlewares/validationMiddleware";

const router = Router();

router.get("/posts", getAllPosts);

router.get("/posts/search", searchPosts);

router.get("/posts/:id", getPostById);
router.put(
  "/posts/:id",
  authMiddleware,
  ...postValidationRules(),
  validatePost,
  updatePost,
);
router.delete("/posts/:id", authMiddleware, deletePost);

router.post(
  "/posts",
  authMiddleware,
  ...postValidationRules(),
  validatePost,
  createPost,
);

export default router;
