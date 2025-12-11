"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditImage() {
  const params = useParams();
  const router = useRouter();
  const [imageData, setImageData] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch(`/api/image/${params.id}`)
      .then((res) => res.json())
      .then((data) => setImageData(data));
  }, []);

  const updateImage = async () => {
    if (!file) return alert("Select a new image");

    const formData = new FormData();
    formData.append("image", file);

    await fetch(`/api/image/${params.id}`, {
      method: "POST",
      body: formData,
    });

    alert("Updated!");
    router.push("/admin/images");
  };

  return (
    <div className="p-6">
      {imageData && (
        <>
          <h1 className="text-xl font-bold">Edit Image</h1>
<img
  src={imageData.image_url}
  alt="Uploaded image"
  title="Uploaded image preview"
  className="w-64 h-64 object-cover mt-4"
/>

<label htmlFor="fileInput" className="mt-4 block font-medium">
  Upload new image
</label>

<input
  id="fileInput"
  type="file"
  className="mt-2"
  placeholder="Choose an image file"
  title="Select an image to upload"
  onChange={(e) => setFile(e.target.files?.[0] || null)}
/>


          <button className="btn mt-4" onClick={updateImage}>
            Update Image
          </button>
        </>
      )}
    </div>
  );
}
