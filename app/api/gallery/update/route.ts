import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function PUT(request: NextRequest) {
  try {
    const { publicId, title, description } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const trimmedTitle = title.trim();
    const trimmedDescription = description?.trim() || '';

    // Update the context metadata in Cloudinary using the correct format
    // Context must be a pipe-separated string: "key1=value1|key2=value2"
    const contextString = `title=${trimmedTitle}|description=${trimmedDescription}`;

    await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      context: contextString,
    });

    return NextResponse.json({
      success: true,
      image: {
        id: publicId,
        title: trimmedTitle,
        description: trimmedDescription,
      },
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}
