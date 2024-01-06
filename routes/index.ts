import express, { Response, Request } from "express";
import userRoute from "./user.routes";
import adminRoute from "./admin.routes";
import { validateToken } from "../config/tokens";
import { validateCookie } from "../controllers/auth";
const route = express.Router();

route.use("/user", userRoute);
route.use("/admin", adminRoute);
route.get("/secret", (req, res) => {
  const token = req.cookies.token;
  //const {payload} = validateToken(token);
  //en teoria validateToken devuelve un objeto que contiene un payload por eso lo desestrutura. No puedo probar esta ruta por que no se como mandar una cookie por postman.
  //Puede que esto funcione así como esta por que lo destructuro cuando realizo el validateToken, en esa misma function pida traer al payload.
  const payload = validateToken(token);
  res.send(payload);
});
route.get("/me", validateCookie, (req: Request, res: Response) => {
  res.send(req.user);
});

export default route;
