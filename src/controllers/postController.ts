import { Request, Response } from "express";
import PostService from "../services/postService";

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

export {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getAllPosts,
};
