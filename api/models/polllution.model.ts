import { DataTypes, Sequelize } from "sequelize";

export const pollutionModel = (sequelize: Sequelize) => {
  return sequelize.define("pollution", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    observationDate: {
      type: DataTypes.DATE,
    },
    pollutionType: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    latitude: {
      // stocke les coordonnées GPS avec 6 décimales
      type: DataTypes.DECIMAL(9, 6),
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
    },
    photographUrl: {
      type: DataTypes.STRING,
    },
  });
};
