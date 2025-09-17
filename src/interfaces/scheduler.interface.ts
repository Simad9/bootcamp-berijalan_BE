export interface CleanupResult {
  deleteCount: number;
  message: string;
  timestamp: Date;
}

export interface FullCleanupResult {
  queueCleanup: CleanupResult;
  cacheCleanup: boolean;
}
