import { Express } from "express";
import { pollutions } from "./pollution.routes";
import { users } from "./user.routes";

export default function routes(app: Express) {
  pollutions(app);
  users(app);
}
