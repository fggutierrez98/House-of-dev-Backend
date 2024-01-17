// types/express.d.ts

import { Request } from "express";
import { User } from "./types.md";

declare module "express" {
  interface Request {
    user?: User; // Cambia 'any' al tipo real de 'user' si lo conoces
  }
}
