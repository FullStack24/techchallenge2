import { Router } from "express";
import {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
    replyToComment,
} from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";
import {
    commentValidationRules,
    validateComment,
} from "../middlewares/validationMiddleware";

const router = Router();

router.get("/posts/:postId/comments", getCommentsByPost);

router.post(
    "/posts/:postId/comments",
    ...commentValidationRules(),
    validateComment,
    createComment
);

router.put(
    "/comments/:id",
    ...commentValidationRules(),
    validateComment,
    updateComment
);

router.delete("/comments/:id", authMiddleware, deleteComment);

router.post("/comments/:commentId/reply", authMiddleware, replyToComment);

export default router;