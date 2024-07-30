import { Request, Response } from "express";
import PostService from "../services/postService";

const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const post = await PostService.createPost({ title, content, author });
  res.status(201).json(post);
};

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getPostById(Number(id));
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Postagem não encontrada" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await PostService.updatePost(Number(id), { title, content });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Postagem não encontrada" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getPostById(Number(id));

  if (post) {
    await PostService.deletePost(Number(id));
    res.status(200).json({ message: "Postagem excluída com sucesso" });
  } else {
    res.status(404).json({ message: "Postagem não encontrada" });
  }
};

const searchPosts = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  const posts = await PostService.searchPosts(keyword as string);
  res.status(200).json(posts);
};

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await PostService.getAllPosts();
  res.status(200).json(posts);
};

export {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getAllPosts,
};
