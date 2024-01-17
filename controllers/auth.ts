import { Request, Response, NextFunction } from "express";
import { validateToken } from "../config/tokens";
import { User } from "../types/types.md";

export const validateCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send(console.error("Token does not validate "));
    }
    const payload = validateToken(token);
    typeof payload === "string"
      ? console.log("PAYLOAD ES UN STRING, error en back archivo auth")
      : (req.user = payload as User);

    next();
  } catch (error) {
    console.error("Error in the validation token", error);
    res.status(401).send("Error in the validation token");
  }
};
