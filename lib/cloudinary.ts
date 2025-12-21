import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Category mapping for folder organization
export const GALLERY_CATEGORIES = {
  'Highway Construction': 'gurudev-gallery/highways',
  'Flyover Construction': 'gurudev-gallery/flyovers',
  'Bridge Construction': 'gurudev-gallery/bridges',
  'Road Infrastructure': 'gurudev-gallery/roads',
} as const;

export type GalleryCategory = keyof typeof GALLERY_CATEGORIES;

export const CATEGORY_FOLDERS = Object.values(GALLERY_CATEGORIES);
