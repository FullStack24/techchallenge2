import { Router } from "express";
import {deleteUser, getUserById, listUsers, updateUser} from "../controllers/userController";
import { authMiddleware } from "../middlewares";
import {register} from "../controllers/authController";

const router = Router();

router.get("/users", authMiddleware, listUsers);
router.get("/users/:userId", authMiddleware, getUserById);
router.post("/register", register);
router.delete("/users/:userId", authMiddleware, deleteUser);
router.put("/users/:userId", authMiddleware, updateUser);

export default router;
