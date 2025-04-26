import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: "No existe usuario" });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const { name, email } = req.body;
    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (err: any) {
    if (err.code === '23505') {
      res.status(409).json({ message: 'Email ya registrado' });
      return;
    }
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updated = await userService.updateUser(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const ok = await userService.deleteUser(id);
    if (!ok) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}
