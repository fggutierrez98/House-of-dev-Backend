import { DataTypes, Model } from "sequelize";
import db from "../database";
import bcrypt, { hashSync } from "bcrypt";

export class Users extends Model {
  public id!: number;
  public is_admin!: boolean;
  public first_name!: string;
  public last_name!: string;
  public gmail!: string;
  public password!: string;
  public photo!: string;
  public salt!: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    console.log("hash: ", hash);
    console.log("this.password: ", this.password);
    hash == this.password ? console.log(true) : console.log(false);
    // esto funciona el problema es que la promesa devuelve siempre falso.
    return hash == this.password;
  }
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
