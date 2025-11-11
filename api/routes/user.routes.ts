import { Express, Router } from "express";
import { create, getAll } from "../controllers/pollution.controllers";

export function users(app: Express) {
  const router = Router();

  router.get("/", getAll);
  router.post("/", create);

  app.use("/api/users", router);
}
