import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem ||
  mongoose.model("GalleryItem", GallerySchema);
