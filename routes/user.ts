import express from "express";
import { Users, Properties } from "../models";

const userRoute = express.Router();

userRoute.post("/register", (req, res) => {
  const { first_name, last_name, gmail, password, photo } = req.body;
  Users.create({
    first_name: first_name,
    last_name: last_name,
    gmail: gmail,
    password: password,
    photo: photo,
  })
    .then((user) => res.send(user))
    .catch((error) => error);
});

userRoute.post("/login", (req, res) => {
  const { gmail, password } = req.body;
});

export default userRoute;
