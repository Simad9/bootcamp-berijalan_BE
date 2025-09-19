import { Router } from "express";
import {
  CDelete,
  CGetAdmin,
  CGetAll,
  Clogin,
  CRegister,
  CSoftDelete,
  CUpdate,
} from "../controllers/auth.controller";
import { MValidate } from "../middlewares/error.middleware";
import {
  MCache,
  MInvalidateCache,
  CachePresets,
} from "../middlewares/cache.middleware";
import { LoginSchema, RegisterSchema } from "../interfaces/auth.interface";
import { MAuthenticate } from "../middlewares/auth.middleware";

const router = Router();

// 🔒 Auth
router.post("/login", MValidate(LoginSchema), Clogin);

router.post(
  "/",
  MValidate(RegisterSchema),
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CRegister
); // Register

// 🔧 Update / Delete (spesifik)
router.put(
  "/soft-delete/:id",
  MAuthenticate,
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CSoftDelete
); // Soft delete

router.put(
  "/:id",
  MAuthenticate,
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CUpdate
); // Edit

router.delete(
  "/:id",
  MAuthenticate,
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CDelete
); // Hard delete

// 📋 Admin (read)
router.get("/", MAuthenticate, MCache(CachePresets.medium()), CGetAll);
router.get("/:id", MAuthenticate, MCache(CachePresets.medium()), CGetAdmin);

export default router;
