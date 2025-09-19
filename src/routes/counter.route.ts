import { Router } from "express";
import { MValidate } from "../middlewares/error.middleware";
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

// CRUD
// tugas#2 ~ get all counter
router.get("/", MCache(CachePresets.medium()), CGetCounters);
//tugas#2 ~ get singgle counter detail
router.get("/:id", MCache(CachePresets.medium()), CGetCounter);
//tugas#2 ~ create counter
router.post("/", MInvalidateCache(["medium_cache:*"]), CCreateCounter);
//tugas#2 ~ update counter
router.put("/:id", MInvalidateCache(["medium_cache:*"]), CUpdateCounter);
//tugas#2 ~ update status
router.put("/:id/status", MInvalidateCache(["medium_cache:*"]), CUpdateStatusCounter);
//tugas#2 ~ delete counter
router.delete("/:id", MInvalidateCache(["medium_cache:*"]), CDeleteCounter);
//tugas#2 ~ Disable
router.put(
  "/soft-delete/:id",
  MInvalidateCache(["medium_cache:*"]),
  CSoftDeleteCounter
);

// Bonus
router.get("/counter-first", MCache(CachePresets.medium()), CGetCounter);

export default router;
