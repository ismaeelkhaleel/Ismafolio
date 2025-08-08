import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloud.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'smart_portfolio',
    allowed_formats: ['jpg', 'png', 'pdf'],
  },
});

export const upload = multer({ storage });