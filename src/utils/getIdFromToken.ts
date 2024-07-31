import jwt from "jsonwebtoken";

export default function getIdFromToken(authorization: string) {
  const token = authorization.slice(7, authorization.length);
  const result = jwt.decode(token);

  return (result as { id: string }).id;
}
