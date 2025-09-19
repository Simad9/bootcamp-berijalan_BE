import { Router } from "express";
import {
  MCache,
  MInvalidateCache,
  CachePresets,
} from "../middlewares/cache.middleware";
import {
  CClaimQueue,
  CCreateQueue,
  CCurrentQueue,
  CDeleteQueue,
  CGetQueue,
  CGetQueues,
  CNextCounterQueue,
  CReleaseQueue,
  CSkipCounterQueue,
  CUpdateQueue,
} from "../controllers/queue.controller";
import { SResetQueue } from "../services/queue.service";

const router = Router();

// Extra Endpoint ~ Tugas#3
router.post("/claim", MInvalidateCache(["medium_cache:*"]), CClaimQueue);
router.post("/release", MInvalidateCache(["medium_cache:*"]), CReleaseQueue);
router.get("/current", MCache(CachePresets.medium()), CCurrentQueue);
router.get("/next/:counter_id", MCache(CachePresets.medium()), CNextCounterQueue);
router.get("/skip/:counter_id", MCache(CachePresets.medium()), CSkipCounterQueue);
router.get("/reset", MInvalidateCache(["medium_cache:*"]), SResetQueue);

// CRUD ~ Tugas#3
router.get("/", MCache(CachePresets.medium()), CGetQueues);
router.post("/", MInvalidateCache(["medium_cache:*"]), CCreateQueue);
router.put("/:id", MInvalidateCache(["medium_cache:*"]), CUpdateQueue);
router.delete("/:id", MInvalidateCache(["medium_cache:*"]), CDeleteQueue);
router.get("/:id", MCache(CachePresets.medium()), CGetQueue);

export default router;
