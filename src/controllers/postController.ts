import { Request, Response } from "express";
import PostService from "../services/postService";
import {AuthenticatedRequest} from "../types/express";

const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  try {
    const post = await PostService.createPost({ title, content, author });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar postagem" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await PostService.getPostById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Postagem não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar postagem" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const existingPost = await PostService.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    const updatedPost = await PostService.updatePost(id, {
      title,
      content,
      author,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar postagem" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await PostService.getPostById(id);
    if (post) {
      await PostService.deletePost(id);
      res.status(200).json({ message: "Postagem excluída com sucesso" });
    } else {
      res.status(404).json({ message: "Postagem não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir postagem" });
  }
};

const searchPosts = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  try {
    const posts = await PostService.searchPosts(keyword as string);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar postagens" });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar postagens" });
  }
};

const likePost = async (req: AuthenticatedRequest, res: Response) => {
  const { postId } = req.params;

  if (!req.user) {
    console.log("User not authenticated.");
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  const userId = req.user.id;
  console.log("User ID:", userId);

  try {
    const alreadyLiked = await PostService.userLikedPost(userId, postId);
    console.log("Already liked:", alreadyLiked);
    if (alreadyLiked) {
      return res.status(400).json({ message: "Você já curtiu este post." });
    }

    await PostService.addLike(userId, postId);
    const post = await PostService.incrementLikes(postId);
    console.log("Post after liking:", post);
    return res.status(200).json(post);
  } catch (error) {
    console.error("Erro ao dar like no post:", error);
    return res.status(500).json({ message: "Erro ao dar like no post." });
  }
};

export {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getAllPosts,
  likePost
};
