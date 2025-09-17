import { PrismaClient } from "@prisma/client";
import cron, { ScheduledTask } from "node-cron";
import { CleanupResult } from "../interfaces/scheduler.interface";

const jobs = new Map<string, ScheduledTask>();

const prisma = new PrismaClient();

const createCronTask = (
  expression: string,
  taskFuncition: () => Promise<void>,
  timezone: string = "Asia/Jakarta"
): ScheduledTask => {
  return cron.schedule(
    expression,
    async () => {
      try {
        await taskFuncition();
      } catch (error) {
        console.error("Cron task failed:", error);
      }
    },
    { timezone }
  );
};

const calculateCutoffDate = (daysOld: number): Date => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  return cutoffDate;
};

export const cleanupExpireQueues = async (
  daysOld: number = 1
): Promise<CleanupResult> => {
  try {
    const cutoffDate = calculateCutoffDate(daysOld);

    const deleteResult = await prisma.queue.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    const deleteCount = deleteResult.count;
    const message = `Successfully cleaned up ${deleteCount} expired queue entries`;

    console.log(`${message}`);

    return {
      deleteCount,
      message,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Error during queue cleanup:", error);
    throw new Error(
      `Queue cleanup failed: ${
      error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const scheduleQueueCleanup = (): void => {
  const taskFuncition = async () => {
    console.log("Running scheduled queue cleanup...");
    const result = await cleanupExpireQueues(1); // hapus data lebih dari 1 hari
    console.log("Cleanup result:", result);
  }

  const task = createCronTask("0 2 * * *", taskFuncition);
  jobs.set("queueCleanup", task);
  console.log("Queue clean job scheduled: Every day at 02:00 (Asia/Jakarta)");
}

export const initializeCronJobs = (): void => {
  console.log("Initializing cron jobs...");

  scheduleQueueCleanup();

  console.log("All cron jobs initialized successfully");
}
