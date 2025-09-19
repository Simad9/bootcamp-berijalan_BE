import { PrismaClient } from "@prisma/client";
import { IGlobalResponse } from "../interfaces/global.interface";
import { IQueueResponse } from "../interfaces/queue.interface";

const prisma = new PrismaClient();

export const SGetQueues = async (): Promise<
  IGlobalResponse<IQueueResponse[]>
> => {
  const queue = await prisma.queue.findMany({
    select: {
      id: true,
      number: true,
      status: true,
      counterId: true,
    },
  });

  return {
    status: true,
    message: "Get queues success",
    data: queue,
  };
};

export const SCreateQueue = async (
  counterId: number
): Promise<IGlobalResponse<IQueueResponse>> => {
  // Ambil currentNumber di counter
  const counter = await prisma.counter.findUnique({
    where: { id: counterId },
    select: { id: true, currentQueue: true },
  });

  if (!counter) {
    throw new Error("Counter not found");
  }

  // number sekarang
  const newNumber = counter.currentQueue + 1;

  // Buat queue baru
  const queue = await prisma.queue.create({
    data: {
      number: newNumber,
      status: "claimed",
      counterId: counterId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // update Counter karena sudah diambil
  await prisma.counter.update({
    where: { id: counterId },
    data: { currentQueue: newNumber },
  });

  return {
    status: true,
    message: "Create queue success",
    data: queue,
  };
};

export const SUpdateQueue = async (
  id: number,
  status: string
): Promise<IGlobalResponse<IQueueResponse>> => {
  const queue = await prisma.queue.update({
    where: {
      id,
    },
    data: {
      status: status,
      updatedAt: new Date(),
    },
    select: {
      id: true,
      number: true,
      status: true,
      counterId: true,
    },
  });

  return {
    status: true,
    message: "Update queue success",
    data: queue,
  };
};

export const SDeleteQueue = async(
  id: number
): Promise<IGlobalResponse<IQueueResponse>> => {
  const queue = await prisma.queue.delete({
    where: {
      id,
    },
    select: {
      id: true,
      number: true,
      status: true,
      counterId: true,
    },
  });

  return ({
    status: true,
    message: "Delete queue success",
    data: queue
  })
}