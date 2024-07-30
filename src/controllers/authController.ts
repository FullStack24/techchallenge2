import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/userService";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await userService.validateUser(username, password);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "mySuperSecretKey12345!",
      { expiresIn: "1h" }
  );

  return res.status(200).json({ token });
};

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const newUser = await userService.createUser(username, password);
  if (!newUser) {
    return res.status(400).json({ message: "Erro ao criar usuário" });
  }

  return res.status(201).json({ message: "Usuário criado com sucesso" });
};

export { login, register };
