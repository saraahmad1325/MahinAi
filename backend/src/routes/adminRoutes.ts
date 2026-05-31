import { Router } from 'express';
import { getDashboard, listUsers } from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/dashboard', getDashboard);
router.get('/users', listUsers);

export default router;
