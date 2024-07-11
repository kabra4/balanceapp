import { Router } from "express";
import { updateBalance } from "../controllers/usersController.js";

const router = Router();

router.post("/:id/balance", updateBalance);

export default router;
