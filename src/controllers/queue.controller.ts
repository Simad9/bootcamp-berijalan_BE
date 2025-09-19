import { Request, Response, NextFunction } from "express";
import {
  SCreateQueue,
  SGetQueues,
  SUpdateQueue,
  SDeleteQueue
} from "../services/queue.service";

export const CGetQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SGetQueues();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CCreateQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { counterId } = req.body;
    const result = await SCreateQueue(Number(counterId));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CUpdateQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await SUpdateQueue(Number(id), status);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CDeleteQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SDeleteQueue(Number(id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
