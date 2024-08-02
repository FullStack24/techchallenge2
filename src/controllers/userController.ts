import { Request, Response } from "express";
import userService from "../services/userService";

const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.listAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export { listUsers };
