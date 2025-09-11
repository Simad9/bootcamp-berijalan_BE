import { Router } from "express";
import {
  CDelete,
  CGetAll,
  Clogin,
  CRegister,
  CUpdate,
} from "../controllers/auth.controller";
import { MValidate } from "../middlewares/error.middleware";

const router = Router();

// Bonus
router.get("/", CGetAll); //Bonus - Cek data seluruhnya

// Auth
router.post("/login", Clogin);
router.post("/create", CRegister); //Tugas#1 - sama aja register
router.put("/:id", CUpdate); //Tugas#1 -  ini edit
router.delete("/:id", CDelete); //Tugas#1 - ini hapus

export default router;
