import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/userService";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
          .status(400)
          .json({ message: "Usuário e senha são obrigatórios" });
    }

    const user = await userService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("Chave secreta JWT não definida");
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
          .status(400)
          .json({ message: "Usuário, email e senha são obrigatórios" });
    }

    const newUser = await userService.createUser(username, email, password);
    if (!newUser) {
      return res.status(400).json({
        message:
            "Erro ao criar usuário. Verifique se o nome de usuário já está em uso.",
      });
    }

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export { login, register };
