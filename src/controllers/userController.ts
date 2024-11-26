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

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};


const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, userData);
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await userService.deleteUser(userId);
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return res.status(500).json({ message: "Erro ao excluir usuário" });
  }
};

export { listUsers, updateUser, getUserById, deleteUser };
