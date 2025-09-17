import { Router } from "express";
import {
  CDelete,
  CGetAll,
  Clogin,
  CRegister,
  CUpdate,
} from "../controllers/auth.controller";
import { MValidate } from "../middlewares/error.middleware";
import {
  MCache,
  MInvalidateCache,
  CachePresets,
} from "../middlewares/cache.middleware";
import { LoginSchema, RegisterSchema } from "../interfaces/auth.interface";

const router = Router();

// Bonus
router.get("/", MCache(CachePresets.medium()), CGetAll); //Bonus - Cek data seluruhnya

// Auth
router.post("/login", MValidate(LoginSchema), Clogin);

router.post(
  "/create",
  MValidate(RegisterSchema),
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CRegister
); //Tugas#1 - sama aja register

router.put(
  "/:id",
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CUpdate
); //Tugas#1 -  ini edit

router.put(
  "/soft-delete/:id",
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CDelete
); //Tugas#1 - ini hapus

export default router;
