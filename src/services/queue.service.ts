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

export const SGetQueue = async (
  id: number
): Promise<IGlobalResponse<IQueueResponse>> => {
  const queue = await prisma.queue.findUnique({
    where: { id },
    select: {
      id: true,
      number: true,
      status: true,
      counterId: true,
    },
  });

  if (!queue) {
    throw new Error("Queue not found");
  }

  return {
    status: true,
    message: "Create queue success",
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
    select: {
      id: true,
      number: true,
      status: true,
      counterId: true,
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

export const SDeleteQueue = async (
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

  return {
    status: true,
    message: "Delete queue success",
    data: queue,
  };
};

// EXTRA - SERVICE QUEUE
export const SClaimQueue = async (): Promise<IGlobalResponse> => {
  // Ambil Counter dengan atrian terpendek
  const counter = await prisma.counter.findFirst({
    where: { isActive: true, deletedAt: null },
    orderBy: [{ queues: "asc" }, { id: "asc" }],
  });

  // counter gak ada
  if (!counter) {
    throw new Error("No active counters available");
  }

  // Buat Queue Baru
  const queue = await SCreateQueue(counter.id);

  // update counter queues + 1
  await prisma.counter.update({
    where: { id: counter.id },
    data: { queues: counter.queues + 1 },
  });

  // return kan
  return {
    status: true,
    message: "Queue claimed successfully",
    data: queue,
  };
};

export const SReleaseQueue = async (id: number): Promise<IGlobalResponse> => {
  // Ambil Queue
  const queue = await prisma.queue.findUnique({
    where: { id },
    select: {
      status: true,
      counterId: true,
    },
  });

  // queue gak ditemukan
  if (!queue) {
    throw new Error("Queue not found");
  }

  // Kalo statusnya bukan claimed
  if (queue.status != "claimed") {
    throw new Error("Queue still calimed");
  }

  // Kalo statusnya claimed ubah jadi realsesd
  const q = await prisma.queue.update({
    where: { id },
    data: {
      status: "released",
      updatedAt: new Date(),
    },
  });

  // update counter --> queues nya berkurang
  await prisma.counter.update({
    where: { id: queue.counterId },
    data: { queues: queue.counterId - 1 },
  });

  // return kan
  return {
    status: true,
    message: "Queue released successfully",
    data: q,
  };
};

export const SCurrentQueue = async (): Promise<IGlobalResponse> => {
  const counters = await prisma.counter.findMany({
    where: { isActive: true, deletedAt: null },
    select: {
      id: true,
      name: true,
      currentQueue: true,
      maxQueue: true,
      isActive: true,
      queues: true,
    },
  });

  if (!counters) {
    return {
      status: false,
      message: "No active counters available",
      data: [],
    };
  }

  return {
    status: true,
    message: "Get current queue success",
    data: counters,
  };
};

export const SNextCounterQueue = async (
  counterId: number
): Promise<IGlobalResponse> => {
  // cari counter dengan queue status claimed
  const q = await prisma.queue.findFirst({
    where: {
      counterId,
      status: "claimed",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // kalo gak ketemu
  if (!q) {
    throw new Error("Queue not found");
  }

  // update queue nya jadi status called
  const queue = await prisma.queue.update({
    where: {
      id: q.id,
    },
    data: {
      status: "called",
      updatedAt: new Date(),
    },
    select: {
      id: true,
      number: true,
      status: true,
      counterId: true,
    },
  });

  // return kan
  return {
    status: true,
    message: "Update queue success",
    data: queue,
  };
};

// BINGUNG LOGIKA YANG BAGIAN INI
export const SSkipCounterQueue = async (
  counterId: number
): Promise<IGlobalResponse> => {
  // cari queue status called
  const q = await prisma.queue.findFirst({
    where: {
      status: "called",
      counterId,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
    },
  });

  if (!q) {
    throw new Error("Queue not found");
  }

  // ubah status queue jadi skipped
  await prisma.queue.update({
    where: {
      id: q.id,
    },
    data: {
      status: "skipped",
      updatedAt: new Date(),
    },
  });

  // cari queue berikutnya dan upadte status jadi called
  const nextQueue = await prisma.queue.findFirst({
    where: {
      counterId,
      status: "claimed",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      status: true,
    },
    skip: 1,
  });

  if (nextQueue) {
    await prisma.queue.update({
      where: {
        id: nextQueue.id,
      },
      data: {
        status: "called",
        updatedAt: new Date(),
      },
    });

    // update counter currentQueue nya
    await prisma.counter.update({
      where: {
        id: counterId,
      },
      data: {
        currentQueue: q.id + 1,
      },
    });
  }

  // object untuk nampilin skip dan queue
  const data = {
    skip: q,
    queue: nextQueue,
  };

  return {
    status: true,
    message: "Skip queue success",
    data: data,
  };
};

export const SResetQueue = async (
  counterId?: number
): Promise<IGlobalResponse> => {
  // reset queue
  await prisma.queue.updateMany({
    where: {
      status: { in: ["called", "scaled", "skipped"] },
    },
    data: {
      status: "reset",
      updatedAt: new Date(),
    },
  });

  // set counter jadi 0, dan queus nya 0 juga
  await prisma.counter.updateMany({
    where: {
      id: counterId,
    },
    data: {
      currentQueue: 0,
      queues: 0,
    },
  });

  // return kan
  return {
    status: true,
    message: "Reset queue success",
  };
};
