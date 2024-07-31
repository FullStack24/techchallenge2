import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  if (!token) {
    return res.sendStatus(401);
  }

  const secret = process.env.JWT_SECRET || "your_secret_key";

  try {
    (req as Request & { user?: JwtPayload }).user = jwt.verify(
      token,
      secret,
    ) as JwtPayload;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
