import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const postValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('O título é obrigatório.'),
    body('content').notEmpty().withMessage('O conteúdo é obrigatório.'),
  ];
};

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
