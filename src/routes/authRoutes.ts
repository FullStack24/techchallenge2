import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.post('/login', authController.login);
router.post('/create', authController.create);

export default router;