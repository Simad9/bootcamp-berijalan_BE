import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IGlobalResponse } from "../interfaces/global.interface";
import { ICounterResponse } from "../interfaces/counter.interface";

const prisma = new PrismaClient();

export const SGetCounters = async (): Promise<
  IGlobalResponse<ICounterResponse[]>
> => {
  const counter = await prisma.counter.findMany({
    where: {
      isActive: true,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      currentQueue: true,
      maxQueue: true,
      queues: true,
      isActive: true,
    },
  });

  return {
    status: true,
    message: "Get counters success",
    data: counter,
  };
};

export const SGetCounter = async (): Promise<
  IGlobalResponse<ICounterResponse>
> => {
  const counter = await prisma.counter.findFirst({
    where: {
      isActive: true,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      currentQueue: true,
      maxQueue: true,
      queues: true,
      isActive: true,
    },
  });

  if (!counter) {
    throw new Error("Counter not found");
  }

  return {
    status: true,
    message: "Get counter success",
    data: counter,
  };
};

export const SCreateCounter = async (
  name: string,
  maxQueue: number
): Promise<IGlobalResponse<ICounterResponse>> => {
  const counter = await prisma.counter.create({
    data: {
      name,
      currentQueue: 0,
      maxQueue,
      queues: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return {
    status: true,
    message: "Create counter success",
    data: counter,
  };
};

export const SUpdateCounter = async (
  id: number,
  name: string,
  maxQueue: number
): Promise<IGlobalResponse<ICounterResponse>> => {
  const counter = await prisma.counter.update({
    where: {
      id,
    },
    data: {
      name,
      maxQueue,
      updatedAt: new Date(),
    },
  });

  return {
    status: true,
    message: "Update counter success",
    data: counter,
  };
};

export const SDeleteCounter = async (
  id: number
): Promise<IGlobalResponse<ICounterResponse>> => {
  const counter = await prisma.counter.update({
    where: {
      id,
    },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });

  return {
    status: true,
    message: "Delete counter success",
    data: counter,
  };
};
