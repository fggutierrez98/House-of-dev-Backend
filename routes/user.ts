import express from "express";
import { Users } from "../models";
import bcrypt from "bcrypt";
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

  Users.findOne({ where: { gmail } })
    .then(async (user) => {
      if (!user) return res.sendStatus(404);

      (await user.validatePassword(password))
        ? res.sendStatus(200)
        : res.sendStatus(401);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

export default userRoute;
