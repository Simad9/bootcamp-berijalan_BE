import { Router } from "express";
import {
  MCache,
  MInvalidateCache,
  CachePresets,
} from "../middlewares/cache.middleware";
import {
  CCreateQueue,
  CDeleteQueue,
  CGetQueue,
  CUpdateQueue,
} from "../controllers/queue.controller";

const router = Router();

// CRUD
router.get("/", MCache(CachePresets.medium()), CGetQueue);
router.post("/", MInvalidateCache(["medium_cache:*"]), CCreateQueue);
router.put("/:id", MInvalidateCache(["medium_cache:*"]), CUpdateQueue);
router.delete("/:id", MInvalidateCache(["medium_cache:*"]), CDeleteQueue);

export default router;
