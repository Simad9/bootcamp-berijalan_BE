import { Request, Response, NextFunction } from "express";
import {
  SCreateCounter,
  SDeleteCounter,
  SGetCounter,
  SGetCounters,
  SSoftDeleteCounter,
  SUpdateCounter,
  SUpdateStatusCounter,
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
    const { name, maxQueue } = req.body;
    const result = await SUpdateCounter(Number(id), name, maxQueue);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CUpdateStatusCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let updateData: any = {};

    if (status === "active") {
      updateData.isActive = true;
      updateData.deletedAt = null;
    } else if (status === "inactive") {
      updateData.isActive = false;
    } else if (status === "disable") {
      updateData.deletedAt = new Date();
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid status value. Use active/inactive/disable.",
      });
    }

    const result = await SUpdateStatusCounter(Number(id), updateData);

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
