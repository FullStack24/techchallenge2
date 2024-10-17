import { Router } from "express";
import { listUsers } from "../controllers/userController";
import { authMiddleware } from "../middlewares";
import {register} from "../controllers/authController";

const router = Router();

router.get("/users", authMiddleware, listUsers);
router.post("/register", register);

export default router;
