import db from "../models";
import { v7 } from "uuid";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const data = await db.users.findAll().catch((err: Error) => {
    res.status(400).send(err);
  });

  res.json(data);
}

export async function create(req: Request, res: Response) {
  const id = v7();

  const user = {
    id: id,
    login: req.body.login,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
  };

  if (user.login && user.password && user.lastname && user.firstname) {
    return db.users.create(user).then((data) => {
      res.send(data);
    });
  }

  let message = "missing parameters";
  if (!user.login) {
    message += " login";
  }
  if (!user.password) {
    message += " password";
  }
  if (!user.lastname) {
    message += " lastname";
  }
  if (!user.firstname) {
    message += " firstname";
  }

  res.status(400).send({ message: message });
}
