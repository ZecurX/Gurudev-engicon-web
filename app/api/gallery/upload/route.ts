import { NextRequest, NextResponse } from 'next/server';
import cloudinary, {
  GALLERY_CATEGORIES,
  GalleryCategory,
} from '@/lib/cloudinary';

// Default titles and descriptions for each category
const DEFAULT_CONTENT: Record<
  GalleryCategory,
  { titles: string[]; descriptions: string[] }
> = {
  'Building Construction': {
    titles: [
      'Government Building Project',
      'Police Station Construction',
      'Administrative Office Building',
      'Institutional Building',
      'Public Infrastructure Building',
    ],
    descriptions: [
      'Quality government building construction with modern design.',
      'Professional institutional building with structural excellence.',
      'Administrative office built to highest construction standards.',
    ],
  },
  'Highway Construction': {
    titles: [
      'Highway Development Project',
      'National Highway Construction',
      'Expressway Development',
      'Highway Infrastructure',
      'Road Expansion Project',
    ],
    descriptions: [
      'Large-scale highway construction with modern engineering techniques.',
      'Building robust highway infrastructure for efficient transportation.',
      'State-of-the-art highway project ensuring safety and durability.',
    ],
  },
  'Flyover Construction': {
    titles: [
      'Urban Flyover Project',
      'Elevated Road Structure',
      'City Flyover Development',
      'Grade Separator Construction',
      'Overpass Infrastructure',
    ],
    descriptions: [
      'Reducing traffic congestion with modern flyover construction.',
      'Advanced RCC flyover engineering for urban mobility.',
      'Elevated road structure designed for seamless city traffic flow.',
    ],
  },
  'Bridge Construction': {
    titles: [
      'River Bridge Project',
      'Concrete Bridge Construction',
      'Steel Bridge Development',
      'Railway Over Bridge',
      'Pedestrian Bridge',
    ],
    descriptions: [
      'Strong foundations and durable construction across water bodies.',
      'Engineering excellence in bridge construction and design.',
      'Long-lasting bridge infrastructure connecting communities.',
    ],
  },
  'Road Infrastructure': {
    titles: [
      'Urban Road Project',
      'Rural Road Connectivity',
      'Smart Road Development',
      'Road Rehabilitation Project',
      'City Road Network',
    ],
    descriptions: [
      'Smart roads with proper drainage and safety features.',
      'Connecting communities with reliable road infrastructure.',
      'Modern road construction ensuring durability and safety.',
    ],
  },
};

// Get a random item from an array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as GalleryCategory;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!category || !GALLERY_CATEGORIES[category]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    // Get default content for this category
    const defaults = DEFAULT_CONTENT[category];
    const finalTitle = title?.trim() || getRandomItem(defaults.titles);
    const finalDescription =
      description?.trim() || getRandomItem(defaults.descriptions);

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary with category folder
    const folder = GALLERY_CATEGORIES[category];
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: 'image',
      context: {
        custom: {
          title: finalTitle,
          description: finalDescription,
          category: category,
        },
      },
    });

    return NextResponse.json({
      success: true,
      image: {
        id: result.public_id,
        url: result.secure_url,
        title: finalTitle,
        description: finalDescription,
        category,
        width: result.width,
        height: result.height,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
