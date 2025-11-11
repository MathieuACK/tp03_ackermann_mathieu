import { Sequelize } from "sequelize";
import { config } from "../config";
import { pollutionModel } from "./polllution.model";
import { usersModel } from "./users.model";

const { BDD } = config;

const sequelize = new Sequelize(
  `postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`,
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true,
      native: true,
    },
    define: {
      timestamps: false,
    },
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const Pollutions = pollutionModel(sequelize);
const Users = usersModel(sequelize);

const db = {
  sequelize: sequelize,
  pollutions: Pollutions,
  users: Users,
};

export default db;
