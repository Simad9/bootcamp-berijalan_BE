import { Request, Response, NextFunction } from "express";
import {
  SCreateCounter,
  SDeleteCounter,
  SGetCounter,
  SGetCounters,
  SSoftDeleteCounter,
  SUpdateCounter,
} from "../services/counter.service";

export const CGetCounters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SGetCounters();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CGetCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SGetCounter();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CCreateCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, maxQueue } = req.body;
    const result = await SCreateCounter(name, maxQueue);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CUpdateCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const result = await SUpdateCounter(Number(id), isActive);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CSoftDeleteCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SSoftDeleteCounter(Number(id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CDeleteCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SDeleteCounter(Number(id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

