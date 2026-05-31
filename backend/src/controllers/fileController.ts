import type { Request, Response } from 'express';
import { cloudinary } from '../config/cloudinary.js';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'File is required' });
    return;
  }
  const file = req.file;

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'mahinai' }, (error, uploadResult) => {
      if (error || !uploadResult) {
        reject(error ?? new Error('Upload failed'));
        return;
      }
      resolve(uploadResult as { secure_url: string; public_id: string });
    });
    stream.end(file.buffer);
  });

  res.json({ url: result.secure_url, publicId: result.public_id });
};
