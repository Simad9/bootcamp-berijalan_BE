import { Request, Response, NextFunction } from "express";
import {
  SDelete,
  SGetAdmin,
  SGetAll,
  SLogin,
  SRegister,
  SUpdate,
} from "../services/auth.service";

export const Clogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const result = await SLogin(username, password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password, email, name } = req.body;
    const result = await SRegister(username, password, email, name);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, password, email, name } = req.body;
    const result = await SUpdate(Number(id), username, password, email, name);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SDelete(Number(id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Untuk Admin
export const CGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SGetAll();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CGetAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SGetAdmin(Number(id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
