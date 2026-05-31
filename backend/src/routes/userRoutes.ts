import { Router } from 'express';
import { getProfile, updateProfile, updateSettings } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.put('/settings', updateSettings);

export default router;
