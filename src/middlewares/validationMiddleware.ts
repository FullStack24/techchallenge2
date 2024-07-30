import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const postValidationRules = () => {
  return [
    check("title").notEmpty().withMessage("Title is required"),
    check("content").notEmpty().withMessage("Content is required"),
  ];
};

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
