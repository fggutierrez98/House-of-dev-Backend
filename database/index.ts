import { Sequelize } from "sequelize";

const db = new Sequelize("proyectoIntegrador", "", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

console.log("Database conected ...");
export default db;
