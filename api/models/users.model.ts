import { DataTypes, Sequelize } from "sequelize";

export const usersModel = (sequelize: Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  return Users;
};
