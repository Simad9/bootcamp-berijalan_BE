import { Router } from "express";
import { MValidate } from "../middlewares/error.middleware";
import {
  MCache,
  MInvalidateCache,
  CachePresets,
} from "../middlewares/cache.middleware";
import { CCreateCounter, CDeleteCounter, CGetCounter, CGetCounters, CUpdateCounter } from "../controllers/counter.controller";

const router = Router();

// CRUD
router.get("/", MCache(CachePresets.medium()), CGetCounters);
router.post("/", MInvalidateCache(["medium_cache:*"]), CCreateCounter);
router.put("/:id", MInvalidateCache(["medium_cache:*"]), CUpdateCounter);
router.put("/soft-delete/:id", MInvalidateCache(["medium_cache:*"]), CDeleteCounter);

// Bonus
router.get("/counter-first", MCache(CachePresets.medium()), CGetCounter);

export default router;
