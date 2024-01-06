import { User } from "./api/services/types.md";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
