import { NextRequest, NextResponse } from 'next/server';
import cloudinary, { GALLERY_CATEGORIES } from '@/lib/cloudinary';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  context?: {
    custom?: {
      title?: string;
      description?: string;
      category?: string;
    };
  };
}

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

interface GalleryData {
  highways: GalleryImage[];
  flyovers: GalleryImage[];
  bridges: GalleryImage[];
  roads: GalleryImage[];
  buildings: GalleryImage[];
}

async function fetchImagesFromFolder(folder: string): Promise<GalleryImage[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .with_field('context')
      .max_results(50)
      .execute();

    return result.resources.map((resource: any) => {
      const context = resource.context?.custom || resource.context || {};

      return {
        id: resource.public_id,
        url: resource.secure_url,
        title:
          context.title ||
          folder.split('/').pop()?.replace('-', ' ') ||
          'Project Image',

        description: context.description || '',
        width: resource.width,
        height: resource.height,
      };
    });
  } catch (error) {
    console.error(`Error fetching from folder ${folder}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // If specific category is requested
    if (
      category &&
      GALLERY_CATEGORIES[category as keyof typeof GALLERY_CATEGORIES]
    ) {
      const folder =
        GALLERY_CATEGORIES[category as keyof typeof GALLERY_CATEGORIES];
      const images = await fetchImagesFromFolder(folder);
      return NextResponse.json({ images });
    }

    // Fetch all categories
    const [highways, flyovers, bridges, roads, buildings] = await Promise.all([
      fetchImagesFromFolder(GALLERY_CATEGORIES['Highway Construction']),
      fetchImagesFromFolder(GALLERY_CATEGORIES['Flyover Construction']),
      fetchImagesFromFolder(GALLERY_CATEGORIES['Bridge Construction']),
      fetchImagesFromFolder(GALLERY_CATEGORIES['Road Infrastructure']),
      fetchImagesFromFolder(GALLERY_CATEGORIES['Building Construction']),
    ]);

    const galleryData: GalleryData = {
      highways,
      flyovers,
      bridges,
      roads,
      buildings,
    };

    return NextResponse.json(galleryData);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
