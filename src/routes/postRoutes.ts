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

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: "Lista todos os posts"
 *     description: "Retorna uma lista de todos os posts."
 *     responses:
 *       200:
 *         description: "Lista de posts"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get("/posts", getAllPosts);


router.get("/posts/search", searchPosts);
router.get("/posts/:id", getPostById);

router.post(
  "/posts",
  authMiddleware,
  ...postValidationRules(),
  validatePost,
  createPost,
);
router.put(
  "/posts/:id",
  authMiddleware,
  ...postValidationRules(),
  validatePost,
  updatePost,
);

router.delete("/posts/:id", authMiddleware, deletePost);

export default router;
