import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Image from "@/lib/image";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: Request, { params }: any) {
  await connectDB();
  const image = await Image.findById(params.id);

  return NextResponse.json(image);
}
export async function POST(req: Request, { params }: any) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) return NextResponse.json({ error: "No image uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const oldImage = await Image.findById(params.id);

  // Delete old image from Cloudinary
  await cloudinary.uploader.destroy(oldImage.public_id);

  // Upload new one
  const stream = cloudinary.uploader.upload_stream(
    { folder: "gallery" },
    async (error, result) => {
      if (error) {
        return NextResponse.json({ error: "Upload error" }, { status: 500 });
      }

      oldImage.image_url = result?.secure_url;
      oldImage.public_id = result?.public_id;
      await oldImage.save();

      return NextResponse.json({ message: "Updated", image: oldImage });
    }
  );

  stream.end(buffer);
}
export async function DELETE(req: Request, { params }: any) {
  await connectDB();

  const image = await Image.findById(params.id);
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(image.public_id);

  // Delete from DB
  await Image.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Deleted" });
}
