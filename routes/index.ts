import express from "express";
import userRoute from "./user";
import adminRoute from "./admin";

const route = express.Router();

route.use("/user", userRoute);
route.use("/admin", adminRoute);

export default route;
