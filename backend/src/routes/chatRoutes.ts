import { Router } from 'express';
import { getHistory, sendMessage } from '../controllers/chatController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/history', getHistory);
router.post('/message', sendMessage);

export default router;
