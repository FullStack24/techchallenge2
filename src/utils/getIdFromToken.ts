import jwt from "jsonwebtoken";

export function getIdFromToken(authorization: string) {
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : authorization;
  const result = jwt.decode(token);

  return (result as { userId: string }).userId;
}
