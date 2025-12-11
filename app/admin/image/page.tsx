import Image from "next/image";
import Link from "next/link";

export default async function AdminImages() {
  const res = await fetch("http://localhost:3000/api/image");
  const images = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Uploaded Images</h1>

      <div className="grid grid-cols-3 gap-4">
        {images.map((img: any) => (
          <div key={img._id} className="border p-2 rounded">
            <Image src={img.image_url} width={200} height={200} alt="" />

            <div className="flex justify-between mt-2">
              <Link className="btn" href={`/admin/edit/${img._id}`}>✏ Edit</Link>

              <form action={`/api/image/${img._id}`} method="POST">
                <button className="btn bg-red-500 text-white">🗑 Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
