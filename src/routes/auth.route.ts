import { Router } from "express";
import {
  CDelete,
  CGetAdmin,
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
import { MAuthenticate } from "../middlewares/auth.middleware";

const router = Router();

// tugas#3 - admin
router.get("/", MAuthenticate, MCache(CachePresets.medium()), CGetAll);
router.get("/:id", MAuthenticate, MCache(CachePresets.medium()), CGetAdmin);

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
  MAuthenticate,
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CUpdate
); //Tugas#1 -  ini edit

router.delete(
  "/:id",
  MAuthenticate,
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CDelete
); //Tugas#1 - hapus

router.put(
  "/soft-delete/:id",
  MAuthenticate,
  MInvalidateCache(["medium_cache:*", "user_cache:*"]),
  CDelete
); //Tugas#1 - soft delete

export default router;
