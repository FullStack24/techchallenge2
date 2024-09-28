import { Request, Response } from "express";
import CommentService from "../services/commentService";

const createComment = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { author, content }: { author: string; content: string } = req.body;

    console.log("postId recebido:", postId);

    try {
        const comment = await CommentService.createComment({ post_id: postId, author, content });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({ message: "Erro ao criar comentário" });
    }
};

const getCommentsByPost = async (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
        const comments = await CommentService.getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ message: "Erro ao buscar comentários" });
    }
};

const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { author, content } = req.body;

    try {
        const updatedComment = await CommentService.updateComment(id, { author, content });
        if (!updatedComment) {
            return res.status(404).json({ message: "Comentário não encontrado" });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        res.status(500).json({ message: "Erro ao atualizar comentário" });
    }
};

const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await CommentService.deleteComment(id);
        res.status(200).json({ message: "Comentário excluído com sucesso" });
    } catch (error) {
        console.error('Erro ao excluir comentário:', error);
        res.status(500).json({ message: "Erro ao excluir comentário" });
    }
};

export {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
};
