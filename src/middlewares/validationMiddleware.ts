import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const postValidationRules = () => {
  return [
    check("title")
      .notEmpty()
      .withMessage("O título é obrigatório.")
      .isLength({ max: 255 })
      .withMessage("O título deve ter no máximo 255 caracteres."),
    check("content")
      .notEmpty()
      .withMessage("O conteúdo é obrigatório.")
      .isLength({ max: 5000 })
      .withMessage("O conteúdo deve ter no máximo 5000 caracteres."),
  ];
};

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "Dados de entrada inválidos.",
      message: "Verifique os erros abaixo e tente novamente.",
      errors: errors.array(),
    });
  }
  next();
};
