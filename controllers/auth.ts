import { Request, Response, NextFunction } from "express";
import { validateToken } from "../config/tokens";

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
    req.user = payload;

    next();
  } catch (error) {
    console.error("Error in the validation token", error);
    res.status(401).send("Error in the validation token");
  }
};
