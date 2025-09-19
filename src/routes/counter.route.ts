import { Router } from "express";
import {
  MCache,
  MInvalidateCache,
  CachePresets,
} from "../middlewares/cache.middleware";
import {
  CCreateCounter,
  CDeleteCounter,
  CGetCounter,
  CGetCounters,
  CSoftDeleteCounter,
  CUpdateCounter,
  CUpdateStatusCounter,
} from "../controllers/counter.controller";

const router = Router();

// tugas#2 ~ get all counters
router.get("/", MCache(CachePresets.medium()), CGetCounters);

// tugas#2 ~ create counter
router.post("/", MInvalidateCache(["medium_cache:*"]), CCreateCounter);

// tugas#2 ~ update status (lebih spesifik dari /:id)
router.put("/:id/status", MInvalidateCache(["medium_cache:*"]), CUpdateStatusCounter);

// tugas#2 ~ soft delete (lebih spesifik dari /:id)
router.put("/soft-delete/:id", MInvalidateCache(["medium_cache:*"]), CSoftDeleteCounter);

// tugas#2 ~ update counter
router.put("/:id", MInvalidateCache(["medium_cache:*"]), CUpdateCounter);

// tugas#2 ~ delete counter
router.delete("/:id", MInvalidateCache(["medium_cache:*"]), CDeleteCounter);

// tugas#2 ~ get single counter detail
router.get("/:id", MCache(CachePresets.medium()), CGetCounter);

export default router;
