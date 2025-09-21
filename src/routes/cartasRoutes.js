import express from "express";
import { createCarta, deleteCarta, getAllCartas, getById, updateCarta  } from "../controllers/cartasController.js";

const router = express.Router();

router.get("/", getAllCartas);
router.get("/:id", getById);
router.post("/", createCarta);
router.delete("/:id", deleteCarta);
router.put("/:id", updateCarta);

export default router;