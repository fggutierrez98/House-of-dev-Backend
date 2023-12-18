import { DataTypes, Model } from "sequelize";
import db from "../database";
import bcrypt from "bcrypt";

export class Users extends Model {
  public id!: number;
  public is_admin!: boolean;
  public first_name!: string;
  public last_name!: string;
  public gmail!: string;
  public password!: string;
  public photo!: string;
  public salt!: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "user",
    tableName: "users",
  }
);

Users.beforeCreate(async (user: Users) => {
  user.salt = bcrypt.genSaltSync(8);

  const hash = await bcrypt.hash(user.password, user.salt);

  user.password = hash;
});
