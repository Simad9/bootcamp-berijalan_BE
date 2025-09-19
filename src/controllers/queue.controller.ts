import { Request, Response, NextFunction } from "express";
import {
  SCreateQueue,
  SGetQueues,
  SUpdateQueue,
  SDeleteQueue,
  SGetQueue,
  SClaimQueue,
  SReleaseQueue,
  SCurrentQueue,
  SNextCounterQueue,
  SResetQueue,
} from "../services/queue.service";

export const CGetQueues = async (
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

export const CGetQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SGetQueue(Number(id));

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

// EXTRA - SERVICE QUEUE
export const CClaimQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SClaimQueue();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CReleaseQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { queueId } = req.body;
    const result = await SReleaseQueue(Number(queueId));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CCurrentQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SCurrentQueue();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CNextCounterQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { counter_id } = req.params;
    const result = await SNextCounterQueue(Number(counter_id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CSkipCounterQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { counter_id } = req.params;
    const result = await SNextCounterQueue(Number(counter_id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const CResetQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await SResetQueue();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
