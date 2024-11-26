import { Request, Response } from "express";
import CommentService from "../services/commentService";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { postId, author, content } = req.body;
        const comment = await CommentService.createComment({
            post_id: postId,
            author,
            content,
        });
        res.status(201).json(comment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unexpected error" });
        }
    }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const comments = await CommentService.getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unexpected error" });
        }
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { author, content } = req.body;
        const updatedComment = await CommentService.updateComment(id, { author, content });
        res.status(200).json(updatedComment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unexpected error" });
        }
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await CommentService.deleteComment(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unexpected error" });
        }
    }
};

export const replyToComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const { postId, author, content } = req.body;
        const reply = await CommentService.replyToComment({
            post_id: postId,
            author,
            content,
            parent_id: commentId
        });
        res.status(201).json(reply);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unexpected error" });
        }
    }
};