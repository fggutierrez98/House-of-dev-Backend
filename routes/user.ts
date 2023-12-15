import express from "express";
import { Users, Properties } from "../models";

const userRoute = express.Router();

userRoute.post("/register", (req, res) => {
  Users.create();
});

export default userRoute;
