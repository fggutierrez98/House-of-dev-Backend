import jwt from "jsonwebtoken";

const SECRET = "batman";
interface TokenPayload {}
export function generateToken(payload: object): TokenPayload {
  const token = jwt.sign({ payload }, SECRET, {
    expiresIn: "2h",
  });

  return token;
}

export function validateToken(token: string) {
  return jwt.verify(token, SECRET);
}
