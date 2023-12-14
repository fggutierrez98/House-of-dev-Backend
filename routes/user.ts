import express from "express";
import client from "../database/";

const userRoute = express.Router();

/* client.query("", (data) => {
  userRoute.post("/register", (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });
});
 */
export default userRoute;
