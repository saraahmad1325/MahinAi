import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/fileController.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

router.post('/upload', requireAuth, upload.single('file'), uploadFile);

export default router;
