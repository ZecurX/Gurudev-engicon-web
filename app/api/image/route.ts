import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Image from "@/lib/image";

export async function GET() {
  await connectDB();

  const images = await Image.find().sort({ createdAt: -1 });
  return NextResponse.json(images);
}
