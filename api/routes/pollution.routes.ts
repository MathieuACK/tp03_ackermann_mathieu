import { Express, Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../controllers/pollution.controllers";

export function pollutions(app: Express) {
  const router = Router();

  router.get("/", getAll);
  router.get("/:id", getById);
  router.post("/", create);
  router.put("/:id", update);
  router.delete("/:id", deleteById);

  app.use("/api/pollutions", router);
}
