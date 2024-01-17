import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import db from "./database";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use("/api", routes);

db.sync({ force: false })
  .then(function () {
    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch(console.error);
