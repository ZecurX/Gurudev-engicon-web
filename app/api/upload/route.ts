import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Image from "@/lib/image";

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  const uploadRes = await cloudinary.uploader.upload_stream(
    { folder: "gallery" },
    async (error, result) => {
      if (error || !result) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
      }
    }
  );

  // Convert file to stream
  const stream = cloudinary.uploader.upload_stream(
    { folder: "gallery" },
    async (error, result) => {
      if (error) {
        return NextResponse.json({ error: "Cloudinary upload error" }, { status: 500 });
      }

      // Save to DB
      const saved = await Image.create({
        image_url: result?.secure_url,
        public_id: result?.public_id,
      });

      return NextResponse.json({ message: "Uploaded", image: saved });
    }
  );

  stream.end(buffer);
}
