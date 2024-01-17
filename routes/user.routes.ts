import express from "express";
import { Users } from "../models";
import { generateToken } from "../config/tokens";

const userRoute = express.Router();

userRoute.post("/logout", (req, res) => {
  res.status(204).clearCookie;
});

userRoute.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) return res.sendStatus(401);
      if (!(await user.validatePassword(password))) return res.sendStatus(401);
      const token = generateToken(user);
      console.log("TOKEN: ", token);
      res.cookie("token", token);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

userRoute.post("/register", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  Users.create({
    first_name,
    last_name,
    email,
    password,
  })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => error);
});

export default userRoute;
